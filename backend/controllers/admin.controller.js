import { db } from '../db/connect.js';

export const getAllReservations = (req, res) => {
  const q =
    'SELECT reservations.id, users.username, users.email, users.phone_number, reservations.time_id, reservations.field_id, reservations.date AS reservation_date, times.slot AS reservation_time, fields.name AS field_name, fields.price AS field_price FROM reservations JOIN times ON times.id = reservations.time_id JOIN fields ON fields.id = reservations.field_id JOIN users ON users.id = reservations.user_id';

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getAllUsers = (req, res) => {
  const q =
    'SELECT users.id,users.username,users.email,users.phone_number,users.created_time FROM users';
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const deleteReservation = (req, res) => {
  const q = 'DELETE FROM reservations WHERE id = ?';
  db.query(q, req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const deleteUsers = (req, res) => {
  const q = 'DELETE FROM users WHERE id = ? AND users.isAdmin = 0';
  db.query(q, req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getDashboardData = async (req, res) => {
  const q1 = 'SELECT COUNT(*) AS total_reservations FROM reservations';
  const q2 = 'SELECT COUNT(*) AS total_users FROM users';
  const q3 = 'SELECT COUNT(*) AS total_fields FROM fields';
  const q4 = 'SELECT COUNT(*) AS total_admins FROM users WHERE isAdmin = 1';
  const q5 = 'CALL `aylara_gore_rezervasyon_sayisi`()';
  const q6 = 'CALL `aylara_gore_user_sayisi`()';
  const q7 = 'SELECT COUNT(*) AS completed_reservations FROM reservations WHERE status = 1';
  const q8 = 'SELECT COUNT(*) AS pending_reservations FROM reservations WHERE status = 0';
  const q9 = 'CALL `gunlere_gore_rezervasyon_sayisi`()';

  const [total_reservations] = await db.promise().query(q1);
  const [total_users] = await db.promise().query(q2);
  const [total_fields] = await db.promise().query(q3);
  const [total_admins] = await db.promise().query(q4);
  const [reservations_by_months] = await db.promise().query(q5);
  const [users_by_months] = await db.promise().query(q6);
  const [completed_reservations] = await db.promise().query(q7);
  const [pending_reservations] = await db.promise().query(q8);
  const [reservations_by_days] = await db.promise().query(q9);

  const data = {
    total_reservations: total_reservations[0].total_reservations,
    total_users: total_users[0].total_users,
    total_fields: total_fields[0].total_fields,
    total_admins: total_admins[0].total_admins,
    reservations_by_months: reservations_by_months[0],
    users_by_months: users_by_months[0],
    completed_reservations: completed_reservations[0].completed_reservations,
    pending_reservations: pending_reservations[0].pending_reservations,
    reservations_by_days: reservations_by_days[0],
  };

  return res.status(200).json(data);
};
