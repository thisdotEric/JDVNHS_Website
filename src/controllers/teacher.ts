import { Request, Response } from 'express';

class TeacherController {
  async teacherDashboard(req: Request, res: Response) {
    const subjects = [
      {
        subject_id: 'MMW1',
        subject: 'Mathematics in the Modern World',
        studentCount: 40,
      },
      {
        subject_id: 'OOP',
        subject: 'Object Oriented Programming',
        studentCount: 20,
      },
    ];

    res.render('teacher/handled-subjects', {
      title: 'Teacher Dashboard',
      header: 'Handled subject lists',
      subjects,
    });
  }
}

export default new TeacherController();
