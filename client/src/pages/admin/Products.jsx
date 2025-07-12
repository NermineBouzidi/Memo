// src/pages/Products.jsx
import { useState, useEffect } from "react";
import { Box, Package, Plus, Pencil, Trash2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { getAllProducts, deleteProduct, createProduct, updateProduct } from "../../api/products";
import ConfirmationModal from "../../components/ConfirmationModal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "",
    imageUrl: "",
    features: [""]
  });
  
  const [errors, setErrors] = useState({});

  // Fetch products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await getAllProducts();
        console.log("Product API response:", res.data);
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Error loading products:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Initialize form for new product
  const initForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      duration: "",
      category: "",
      imageUrl: "",
      features: [""]
    });
    setErrors({});
    setIsEditing(false);
    setCurrentProduct(null);
  };

  // Open modal for adding product
  const handleAddClick = () => {
    initForm();
    setShowProductModal(true);
  };

  // Open modal for editing product
  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      duration: product.duration || "",
      category: product.category || "",
      imageUrl: product.imageUrl || "",
      features: product.features?.length ? [...product.features] : [""]
    });
    setErrors({});
    setIsEditing(true);
    setShowProductModal(true);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Handle feature input changes
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  // Add a new feature field
  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ""] }));
  };

  // Remove a feature field
  const removeFeature = (index) => {
    if (formData.features.length > 1) {
      const newFeatures = [...formData.features];
      newFeatures.splice(index, 1);
      setFormData(prev => ({ ...prev, features: newFeatures }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(parseFloat(formData.price))) {
      newErrors.price = "Price must be a number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        features: formData.features.filter(f => f.trim() !== "")
      };
      
      if (isEditing && currentProduct) {
        await updateProduct(currentProduct._id, productData);
      } else {
        await createProduct(productData);
      }
      
      // Refresh products
      const res = await getAllProducts();
      setProducts(res.data.products);
      
      // Close modal
      setShowProductModal(false);
    } catch (err) {
      console.error("Error saving product:", err.response?.data || err.message);
      alert("Failed to save product. Please try again.");
    }
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Delete product
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(deleteId);
      const res = await getAllProducts();
      setProducts(res.data.products);
      // Reset to first page if current page becomes invalid
      if (currentPage > Math.ceil(res.data.products.length / itemsPerPage)) {
        setCurrentPage(1);
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with action button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <div className="flex items-center space-x-3 mb-2">
            <Package className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Product Management</h1>
          </div>
          <p className="text-gray-600">Manage your products, pricing, and features</p>
        </div>
        
        <button 
          onClick={handleAddClick}
          className="btn-primary flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Product Table Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-8 text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <Package className="w-12 h-12 text-gray-400 mb-2" />
                        <p className="text-lg">No products found</p>
                        <p className="text-sm mt-1">Try adding a new product</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentProducts.map((product) => (
                    <tr
                      key={product._id || product.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="flex items-center gap-3 px-6 py-4 whitespace-nowrap">
                        {product.imageUrl ? (
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="w-10 h-10 rounded-md object-cover"
                          />
                        ) : (
                          <div className="bg-indigo-100 p-2 rounded-md">
                            <Package className="w-5 h-5 text-indigo-600" />
                          </div>
                        )}
                        <span className="text-gray-800 font-medium">{product.name}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 max-w-xs">
                        <p className="truncate max-w-[200px]">{product.description}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        <span className="bg-indigo-100 text-indigo-800 text-xs px-2.5 py-0.5 rounded-full">
                          {product.category || "Uncategorized"}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleEditClick(product)}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors"
                          title="Edit product"
                        >
                          <div className="bg-indigo-50 p-2 rounded-lg hover:bg-indigo-100">
                            <Pencil className="w-4 h-4" />
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteClick(product._id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete product"
                        >
                          <div className="bg-red-50 p-2 rounded-lg hover:bg-red-100">
                            <Trash2 className="w-4 h-4" />
                          </div>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {products.length > itemsPerPage && (
          <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between sm:px-6">
            <div className="flex-1 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, products.length)}
                  </span>{" "}
                  of <span className="font-medium">{products.length}</span> products
                </span>
                
                <select
                  className="ml-4 border-gray-300 rounded-md text-sm py-1 px-2"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  {[5, 10, 20].map((size) => (
                    <option key={size} value={size}>
                      Show {size}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-3 py-1.5 rounded-md border border-gray-300 text-sm font-medium ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`relative inline-flex items-center px-3 py-1.5 text-sm font-medium ${
                          currentPage === number
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        } rounded-md border border-gray-300`}
                      >
                        {number}
                      </button>
                    )
                  )}
                </div>
                
                <button
                  onClick={() =>
                    currentPage < totalPages && paginate(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-3 py-1.5 rounded-md border border-gray-300 text-sm font-medium ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ConfirmationModal
          message="product"
          itemId={deleteId}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {/* Product Form Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {isEditing ? "Edit Product" : "Add New Product"}
                </h2>
                <button 
                  onClick={() => setShowProductModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter product name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>
                  
                  {/* Description */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.description ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter product description"
                    ></textarea>
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                    )}
                  </div>
                  
                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.price ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                    )}
                  </div>
                  
                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="e.g., 30 minutes"
                    />
                  </div>
                  
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter category"
                    />
                  </div>
                  
                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  {/* Features */}
                  <div className="col-span-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Features
                      </label>
                      <button
                        type="button"
                        onClick={addFeature}
                        className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Feature
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder={`Feature ${index + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="text-red-500 hover:text-red-700 p-2"
                            disabled={formData.features.length <= 1}
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                  >
                    {isEditing ? "Update Product" : "Create Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;