import { Router } from 'express';
import teacherController from '../controllers/teacher';

const router = Router();

router.get('/dashboard', teacherController.teacherDashboard);

export default router;
