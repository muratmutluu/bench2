import jwt from 'jsonwebtoken';
import { db } from '../db/connect.js';
import { dayController } from '../utils/index.js';

export const createReservation = (req, res) => {
  const token = req.cookies.access_token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: 'Lütfen giriş yapın!',
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json({ success: false, message: 'Invalid token!' });

    const q =
      'SELECT `time_id`, `field_id`, `date` FROM reservations WHERE `time_id` = ? AND `field_id` = ? AND `date` = ?';
    console.log(req.body.timeSlot.id);

    const values = [req.body.timeSlot.id, req.body.fieldId, req.body.day];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length)
        return res
          .status(400)
          .json({ success: false, message: 'Rezervasyon önceden oluşturulmuş!' });

      if (!dayController(req.body.day))
        return res.status(400).json({ success: false, message: 'Geçersiz Tarih!' });

      const q = 'INSERT INTO reservations (`user_id`, `time_id`, `field_id`, `date`) VALUES (?)';
      const values = [userInfo.id, req.body.timeSlot.id, req.body.fieldId, req.body.day];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res
          .status(201)
          .json({ success: true, message: 'Rezervasyon başarıyla oluşturuldu!' });
      });
    });
  });
};

export const getReservationsUser = (req, res) => {
  const token = req.cookies.access_token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: 'Lütfen giriş yapın!',
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ success: false, message: 'Invalid token!' });

    const userInfo = decoded;

    const q =
      'SELECT reservations.id, users.username, reservations.time_id, reservations.field_id, reservations.date AS reservation_date, times.slot AS reservation_time, fields.name AS field_name, fields.price AS field_price,reservations.status FROM reservations JOIN times ON times.id = reservations.time_id JOIN fields ON fields.id = reservations.field_id JOIN users ON users.id = reservations.user_id WHERE reservations.user_id = ?';
    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const deleteReservationUser = (req, res) => {
  const token = req.cookies.access_token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: 'Lütfen giriş yapın!',
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ success: false, message: 'Invalid token!' });

    const userInfo = decoded;

    const q = 'DELETE FROM reservations WHERE id = ? AND user_id = ?';

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getReservations = (req, res) => {
  const q =
    "UPDATE reservations SET reservations.status = '1' WHERE reservations.date < CURDATE() AND reservations.status = '0';";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    const q =
      'SELECT reservations.id, reservations.time_id,reservations.field_id,reservations.date AS reservation_date,times.slot AS reservation_time,fields.name AS field_name, fields.price AS field_price, reservations.status FROM reservations JOIN times ON times.id = reservations.time_id JOIN fields ON fields.id = reservations.field_id';
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
