import { NextFunction, Request, Response } from 'express';

class HomeController {
  async index(req: Request, res: Response) {
    res.render('login', {
      login: true,
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

  async postLogout(req: Request, res: Response, next: NextFunction) {
    req.session.destroy(err => {
      if (err) return next(err);

      res.redirect('/');
    });
  }
}

export default new HomeController();
