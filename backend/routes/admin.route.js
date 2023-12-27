import express from 'express';
import { deleteReservation, deleteUsers, getAllReservations, getAllUsers, getDashboardData } from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/all_reservations', getAllReservations);
router.get('/all_users', getAllUsers);
router.delete('/delete_reservation/:id', deleteReservation);
router.delete('/delete_user/:id', deleteUsers);
router.get('/dashboard', getDashboardData);

export default router;
