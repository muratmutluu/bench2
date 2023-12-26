import express from 'express';

import {
  createReservation,
  getReservations,
  getReservationsUser,
} from '../controllers/reservation.controller.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.js';

const router = express.Router();

router.post('/create', createReservation);
router.get('/', getReservations);
router.get('/list', getReservationsUser);

export default router;
