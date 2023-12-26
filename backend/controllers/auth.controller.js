import { db } from '../db/connect.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
  const q = 'SELECT * FROM users WHERE email = ? OR username = ?';

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) throw res.json(err);
    if (data.length)
      return res.status(409).json({
        success: false,
        message: 'User already exists!',
      });

    const salt = bcryptjs.genSaltSync(10);
    const hashPass = bcryptjs.hashSync(req.body.password, salt);

    const q = 'INSERT INTO users(username, email,phone_number, password) VALUES(?)';
    const values = [req.body.username, req.body.email, req.body.phone_number, hashPass];

    db.query(q, [values], (err, data) => {
      if (err) throw res.json(err);
      return res.status(201).json({
        success: true,
        message: 'User has been created!',
      });
    });
  });
};

export const login = (req, res) => {
  const q = 'SELECT * FROM users WHERE email = ?';

  db.query(q, [req.body.email], (err, data) => {
    if (err) throw res.json(err);
    if (data.length === 0)
      return res.status(404).json({
        success: false,
        message: 'User does not exist!',
      });

    const comparePass = bcryptjs.compareSync(req.body.password, data[0].password);
    if (!comparePass)
      return res.status(401).json({
        success: false,
        message: 'Wrong credentials!',
      });

    const token = jwt.sign({ id: data[0].id, isAdmin: data[0].isAdmin }, process.env.JWT_SECRET);
    const { password, ...other } = data[0];

    res.cookie('access_token', token, { httpOnly: true }).status(200).json({
      data: other,
    });
  });
};

export const logout = (req, res) => {
  res
    .clearCookie('access_token', {
      secure: true,
      sameSite: 'none',
    })
    .status(200)
    .json({
      success: true,
      message: 'User has been logged out!',
    });
};
