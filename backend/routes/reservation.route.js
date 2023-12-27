import express from 'express';

import {
  createReservation,
  deleteReservationUser,
  getReservations,
  getReservationsUser,
} from '../controllers/reservation.controller.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.js';

const router = express.Router();

router.post('/create', createReservation);
router.get('/', getReservations);
router.get('/list', getReservationsUser);
router.delete('/delete/:id', deleteReservationUser);

export default router;
