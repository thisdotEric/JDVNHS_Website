import { Router } from 'express';
import studentController from '../controllers/student';

const router = Router();

router.get('/dashboard', studentController.studentDashboard);

export default router;
