import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: req.cookies });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id) {
      req.body.userId = decoded.id;
    } else {
      return res.status(401).json({ success: false, message: decoded });
    }
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: token });
  }
};
export default userAuth;