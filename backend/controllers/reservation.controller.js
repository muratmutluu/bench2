import jwt from 'jsonwebtoken';

export const createReservation = (req, res) => {
  const token = req.cookies.access_token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: 'Not logged in!',
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(401).json({ success: false, message: 'Invalid token!' });
    
    
});
};

export const getReservation = (req, res) => {};
export const getReservations = (req, res) => {};
