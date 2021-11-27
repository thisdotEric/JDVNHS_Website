import { Request, Response } from 'express';

class TeacherController {
  async teacherDashboard(req: Request, res: Response) {
    res.render('teacher/teacher-dashboard', {
      title: 'Teacher Dashboard',
    });
  }
}

export default new TeacherController();
