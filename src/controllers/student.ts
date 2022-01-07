import { Request, Response } from 'express';
import apiFetch from '../utils/api-fetch';

class StudentController {
  async studentDashboard(req: Request, res: Response) {
    res.render('student-dashboard', {
      title: 'Student Dashboard',
    });
  }

  async viewStudentProfile(req: Request, res: Response) {
    const LRN = req.params.lrn;

    const student = await apiFetch(`student/${LRN}`);

    const fullname = `${student.data.data.first_name} ${student.data.data.middle_name} ${student.data.data.last_name}`;

    res.render('student-profile', {
      title: 'Student Profile',
      fullname,
      student: {
        LRN: student.data.data.user_id,
        Gender: student.data.data.gender,
        Contact: student.data.data.contact_number,
        'Birth Date': student.data.data.birth_date,
        Address: student.data.data.address,
        'Grade Level': student.data.data.grade_level,
      },
      header: 'Student Profile',
    });
  }
}

export default new StudentController();
