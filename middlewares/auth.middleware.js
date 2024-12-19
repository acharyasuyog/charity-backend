import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

const verifyToken = (req, res, next) => {
  let token = req.header('Authorization');
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, message: 'Token is required,Access Denied' });
  }
  token = req.header('Authorization').replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

export default verifyToken;
