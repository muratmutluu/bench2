import jwt from 'jsonwebtoken';
export const verifyAdmin = (req, res, next) => {
  const { access_token } = req.cookies;
  if (!access_token)
    return res.status(401).json({
      success: false,
      message: 'User has not been authenticated!',
    });

  jwt.verify(access_token, process.env.JWT_SECRET, (err, decoded) => {
    console.log(decoded);
    if (err) return res.status(403).json({ success: false, message: 'Invalid token!' });
    req.userInfo = decoded;
    if (req.userInfo.isAdmin) return next();
  
    return res.status(403).json({ success: false, message: 'User is not an admin!' });
  });
};
