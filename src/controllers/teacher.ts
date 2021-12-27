import { Request, Response } from 'express';
import apiFetch from '../utils/api-fetch';
import links from '../constants/sidenav-link';

function setSelected(currentTab: string) {
  links.map(item => {
    item.selected = false;

    if (item.name === currentTab) item.selected = true;
  });
}

class TeacherController {
  async teacherDashboard(req: Request, res: Response) {
    const handledSubjects = await apiFetch('/teacher/1111111/subjects', 'GET');

    const countPromise = [];

    for (let i = 0; i < handledSubjects.data.data.length; i++) {
      const count = apiFetch(
        `/subject/${handledSubjects.data.data[i].subject_id}/students/count`
      );

      countPromise.push(count);
    }

    const result = await Promise.all(countPromise);
    const subjects = handledSubjects.data.data.map(
      (item: any, index: number) => {
        item.count = result[index].data.data[0].count;

        return item;
      }
    );

    setSelected('Students');

    res.render('handled-subjects', {
      title: 'Teacher Dashboard',
      header: 'Handled subject lists',
      subjects,
      links,
      selectedSubject: req.session.currentSubject,
      error: req.session.error,
    });
  }

  async viewStudents(req: Request, res: Response) {
    const subject_id = req.params.subject;

    if (!req.session.currentSubject) {
      req.session.error = 'Select a subject first &#10006;';
      res.redirect('/teacher/dashboard');
    } else {
      setSelected('Students');

      // Change the link of the current page
      links[0].url = `/teacher/${req.session.currentSubject}/students`;

      res.render('all-students', {
        title: `${req.session.currentSubject} Students`,
        header: `${subject_id} list of enrolled students`,
        links,
        selectedSubject: req.session.currentSubject,
      });
    }
  }

  async viewAttendance(req: Request, res: Response) {
    setSelected('Attendance');

    res.render('attendance', {
      title: 'Attendance',
      header: `Attendance`,
      links,
    });
  }

  async selectSubject(req: Request, res: Response) {
    const subjectId = req.query.subjectId;

    req.session.currentSubject = `${subjectId}`;
    res.redirect(`${req.session.currentSubject}/students`);
  }
}

export default new TeacherController();
