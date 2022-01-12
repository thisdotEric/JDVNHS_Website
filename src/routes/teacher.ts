import { Router } from 'express';
import teacherController from '../controllers/teacher';

const router = Router();

router.get('/dashboard', teacherController.teacherDashboard);
router.get('/:subject/students', teacherController.viewStudents);
router.get('/attendance', teacherController.viewAttendance);
router.get('/attendance/update', teacherController.updateAtendance);
router.get('/attendance/add', teacherController.addAttendance);
router.post('/attendance/add', teacherController.postAddAttendance);
router.post('/select-subject', teacherController.selectSubject);

export default router;
