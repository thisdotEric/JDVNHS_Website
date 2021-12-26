import { Request, Response } from 'express';

let links = [
  {
    name: 'Subjects',
    url: '/teacher/dashboard',
    selected: false,
  },
  {
    name: 'Attendance',
    url: '/teacher/attendance',
    selected: false,
  },
  {
    name: 'Lessons',
    url: '',
    selected: false,
  },
  {
    name: 'Scores',
    url: '',
    selected: false,
  },
  {
    name: 'Grades',
    url: '',
    selected: false,
  },
];

function setSelected(currentTab: string) {
  links.map(item => {
    item.selected = false;

    if (item.name === currentTab) item.selected = true;
  });
}

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

    setSelected('Subjects');

    res.render('handled-subjects', {
      title: 'Teacher Dashboard',
      header: 'Handled subject lists',
      subjects,
      links,
    });
  }

  async viewStudents(req: Request, res: Response) {
    const subject_id = req.params.subject;

    setSelected('Subjects');

    res.render('all-students', {
      title: 'Teacher Dashboard',
      header: `${subject_id} list of enrolled students`,
      links,
    });
  }

  async viewAttendance(req: Request, res: Response) {
    setSelected('Attendance');

    res.render('attendance', {
      title: 'Attendance',
      header: `Attendance`,
      links,
    });
  }
}

export default new TeacherController();
