import session from 'express-session';

declare module 'express-session' {
  interface Teacher {
    teacherId: string;
  }

  export interface SessionData {
    teacher: Teacher;
    currentSubject: string;
    error: string;
  }
}
