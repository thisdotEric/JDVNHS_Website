import { Request, Response } from 'express';

class HomeController {
  async index(req: Request, res: Response) {
    res.render('login', {
      title: 'JDVNHS Login',
    });
  }

  async postLogin(req: Request, res: Response) {
    const { password, user_id } = req.body;

    let isStudent = false;

    if (isStudent) {
      res.redirect('student/dashboard');
    } else {
      res.redirect('teacher/dashboard');
    }
  }
}

export default new HomeController();
