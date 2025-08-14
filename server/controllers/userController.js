import userModel from "../models/userModel.js";


//-------------------------------------create user (admin only)-------------------------------------
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new user without requiring verification
    const newUser = new userModel({
      name,
      email,
      password,
      role: role || 'user',
      isAccountVerified: true // Automatically verify admin-created users
    });

    await newUser.save();

    // Remove sensitive data before sending response
    const userResponse = newUser.toObject();
    delete userResponse.password;
    delete userResponse.verifyOtp;
    delete userResponse.verifyOtpExpiresAt;
    delete userResponse.resetOtp;
    delete userResponse.resetOtpExpiresAt;

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: userResponse
    });
  } catch (error) {
    next(error);
  }
};
//-------------------------------------update user-------------------------------------
// Update the updateUser function
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Don't allow updating password via this endpoint
    if (updates.password) {
      delete updates.password;
    }

    const user = await userModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    }).select("-password -__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    next(error);
  }
};

//-------------------------------------get all users-------------------------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password -__v");
    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
//-------------------------------------get user by id-------------------------------------    
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id).select("-password -__v");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//-------------------------------------delete user-------------------------------------
export const deleteUser = async (req, res) => { 
    const { id } = req.params;
    try {
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
    }
    export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const adminUsers = await userModel.countDocuments({ role: 'admin' });
    const regularUsers = await userModel.countDocuments({ role: 'user' });
    
    return res.status(200).json({
      success: true,
      stats: {
        total: totalUsers,
        admins: adminUsers,
        users: regularUsers,
        // Add more stats if needed
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};