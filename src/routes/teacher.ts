import { Router } from 'express';
import teacherController from '../controllers/teacher';

const router = Router();

router.get('/dashboard', teacherController.teacherDashboard);
router.get('/:subject/students', teacherController.viewStudents);
router.get('/attendance', teacherController.viewAttendance);

export default router;
