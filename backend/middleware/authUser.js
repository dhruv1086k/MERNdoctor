import jwt from "jsonwebtoken";

// user authentication middleware
const authUser = async (req, res, next) => {
  try {
    // logic for verifiying token
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not authorizes login again",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.body.userId = token_decode.id;

    next();
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

export default authUser;
