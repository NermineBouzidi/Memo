import { useState, useEffect } from "react";
import {
  Mail,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  Reply,
  Archive,
  Trash2,
  Circle,
  CheckCircle,
  Clock,
  User,
  MailOpen,
  ArrowLeft,
  Eye,
} from "lucide-react";
import {
  getAllContacts,
  updateContact,
  deleteContact,
  sendReply,
} from "../../api/contacts";
import ConfirmationModal from "../../components/ConfirmationModal";

const SupportInbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Status options
  const statusOptions = [
    { value: "all", label: "All Messages" },
    {
      value: "unread",
      label: "Unread",
      icon: Circle,
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "read",
      label: "Read",
      icon: MailOpen,
      color: "bg-gray-100 text-gray-800",
    },
    {
      value: "pending",
      label: "Pending",
      icon: Clock,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "resolved",
      label: "Resolved",
      icon: CheckCircle,
      color: "bg-green-100 text-green-800",
    },
    {
      value: "archived",
      label: "Archived",
      icon: Archive,
      color: "bg-purple-100 text-purple-800",
    },
  ];

  // Fetch messages
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await getAllContacts();
        setMessages(res.data.messages || []);
        setFilteredMessages(res.data.messages || []);
      } catch (err) {
        console.error(
          "Error loading messages:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...messages];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (msg) =>
          msg.name.toLowerCase().includes(term) ||
          msg.email.toLowerCase().includes(term) ||
          msg.subject.toLowerCase().includes(term) ||
          msg.message.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((msg) => msg.status === statusFilter);
    }

    setFilteredMessages(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, messages]);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMessages = filteredMessages.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status details
  const getStatusDetails = (status) => {
    const statusInfo = statusOptions.find((option) => option.value === status);
    return statusInfo || { label: status, color: "bg-gray-100 text-gray-800" };
  };

  // Select message to view
  const handleViewMessage = async (message) => {
    setSelectedMessage(message);

    // Mark as read if unread
    if (message.status === "unread") {
      try {
        await updateContact(message._id, { status: "read" });
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === message._id ? { ...msg, status: "read" } : msg
          )
        );
      } catch (err) {
        console.error("Error updating message status:", err);
      }
    }
  };

  // Close message view
  const closeMessageView = () => {
    setSelectedMessage(null);
    setReplyContent("");
  };

  // Handle status change
  const handleStatusChange = async (newStatus) => {
    if (!selectedMessage) return;

    try {
      await updateContact(selectedMessage._id, { status: newStatus });
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === selectedMessage._id ? { ...msg, status: newStatus } : msg
        )
      );
      setSelectedMessage((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error("Error updating message status:", err);
    }
  };

  // Handle reply submission
  const handleReplySubmit = async () => {
    if (!selectedMessage || !replyContent.trim()) return;

    try {
      await sendReply(selectedMessage._id, {
        replyMessage: replyContent,
      });

      // Update local state
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === selectedMessage._id
            ? {
                ...msg,
                status: "resolved",
                reply: replyContent,
                repliedAt: new Date().toISOString(),
              }
            : msg
        )
      );

      setSelectedMessage((prev) => ({
        ...prev,
        status: "resolved",
        reply: replyContent,
        repliedAt: new Date().toISOString(),
      }));

      setReplyContent("");
    } catch (err) {
      console.error("Error sending reply:", err.response?.data || err.message);
    }
  };

  // Delete message
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteContact(deleteId);
      setMessages((prev) => prev.filter((msg) => msg._id !== deleteId));
      setFilteredMessages((prev) => prev.filter((msg) => msg._id !== deleteId));

      // Close message view if deleting the currently viewed message
      if (selectedMessage && selectedMessage._id === deleteId) {
        closeMessageView();
      }

      // Reset to first page if current page becomes invalid
      if (currentPage > Math.ceil(filteredMessages.length / itemsPerPage)) {
        setCurrentPage(1);
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setShowDeleteModal(false);
    }
  };

  // Archive message
  const handleArchive = async (id) => {
    try {
      await updateContact(id, { status: "archived" });
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === id ? { ...msg, status: "archived" } : msg
        )
      );

      // Update selected message if it's the current one
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage((prev) => ({ ...prev, status: "archived" }));
      }
    } catch (err) {
      console.error("Archive error:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <div className="flex items-center space-x-3 mb-2">
            <Mail className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Support Inbox
            </h1>
          </div>
          <p className="text-gray-600">Manage and respond to user messages</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Messages
              </p>
              <p className="text-xl font-bold mt-1">{messages.length}</p>
            </div>
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Mail className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unread</p>
              <p className="text-xl font-bold mt-1">
                {messages.filter((m) => m.status === "unread").length}
              </p>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg">
              <Circle className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-xl font-bold mt-1">
                {messages.filter((m) => m.status === "pending").length}
              </p>
            </div>
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-xl font-bold mt-1">
                {messages.filter((m) => m.status === "resolved").length}
              </p>
            </div>
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Archived</p>
              <p className="text-xl font-bold mt-1">
                {messages.filter((m) => m.status === "archived").length}
              </p>
            </div>
            <div className="bg-purple-100 p-2 rounded-lg">
              <Archive className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search messages, names, subjects..."
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {(searchTerm || statusFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Messages List */}
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
                    Sender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentMessages.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center p-8 text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <Mail className="w-12 h-12 text-gray-400 mb-2" />
                        <p className="text-lg">No messages found</p>
                        <p className="text-sm mt-1">
                          Try adjusting your filters
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentMessages.map((message) => {
                    const statusInfo = getStatusDetails(message.status);
                    const isUnread = message.status === "unread";

                    return (
                      <tr
                        key={message._id || message.id}
                        className={`hover:bg-gray-50 transition-colors ${
                          isUnread ? "bg-blue-50" : ""
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="bg-indigo-100 p-2 rounded-full mr-3">
                              <User className="w-4 h-4 text-indigo-600" />
                            </div>
                            <div>
                              <div
                                className={`font-medium ${
                                  isUnread ? "text-indigo-700" : "text-gray-900"
                                }`}
                              >
                                {message.name}
                              </div>
                              <div className="text-sm text-gray-500 truncate max-w-[120px]">
                                {message.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`font-medium ${
                              isUnread
                                ? "text-indigo-700 font-semibold"
                                : "text-gray-900"
                            }`}
                          >
                            {message.subject}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-600 truncate max-w-[200px]">
                            {message.message}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {formatDate(message.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                          >
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex justify-center gap-2">
                          <button
                            onClick={() => handleViewMessage(message)}
                            className="text-indigo-600 hover:text-indigo-900 transition-colors"
                            title="View message"
                          >
                            <div className="bg-indigo-50 p-2 rounded-lg hover:bg-indigo-100">
                              <Eye className="w-4 h-4" />
                            </div>
                          </button>

                          <button
                            onClick={() => handleArchive(message._id)}
                            className="text-purple-600 hover:text-purple-900 transition-colors"
                            title="Archive message"
                          >
                            <div className="bg-purple-50 p-2 rounded-lg hover:bg-purple-100">
                              <Archive className="w-4 h-4" />
                            </div>
                          </button>

                          <button
                            onClick={() => handleDeleteClick(message._id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                            title="Delete message"
                          >
                            <div className="bg-red-50 p-2 rounded-lg hover:bg-red-100">
                              <Trash2 className="w-4 h-4" />
                            </div>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {filteredMessages.length > itemsPerPage && (
          <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between sm:px-6">
            <div className="flex-1 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, filteredMessages.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredMessages.length}</span>{" "}
                  messages
                </span>

                <select
                  className="ml-4 border-gray-300 rounded-md text-sm py-1 px-2"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  {[5, 10, 20, 50].map((size) => (
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
          message="message"
          itemId={deleteId}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 pt-16">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <button
                  onClick={closeMessageView}
                  className="mr-4 text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-bold text-gray-800 flex-1">
                  {selectedMessage.subject}
                </h2>
                <button
                  onClick={closeMessageView}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="border-b border-gray-200 pb-4 mb-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <User className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {selectedMessage.name}
                      </h3>
                      <p className="text-gray-600">{selectedMessage.email}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDate(selectedMessage.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={selectedMessage.status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
                    >
                      {statusOptions.slice(1).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none mb-8">
                <p className="text-gray-700 whitespace-pre-line">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Reply to {selectedMessage.name}
                </h3>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4"
                  placeholder="Type your response here..."
                ></textarea>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeMessageView}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleReplySubmit}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                  >
                    <Reply className="w-4 h-4" />
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportInbox;