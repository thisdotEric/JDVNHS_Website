import { Router } from 'express';
import studentController from '../controllers/student';

const router = Router();

router.get('/dashboard', studentController.studentDashboard);
router.get('/:lrn', studentController.viewStudentProfile);

export default router;
