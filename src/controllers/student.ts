import { Request, Response } from 'express';

class StudentController {
  async studentDashboard(req: Request, res: Response) {
    res.render('student/student-dashboard', {
      title: 'Student Dashboard',
    });
  }
}

export default new StudentController();
