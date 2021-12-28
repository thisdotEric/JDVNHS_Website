import session from 'express-session';

declare module 'express-session' {
  interface User {
    userType: 'student' | 'teacher';
    userID: string;
    firstName: string;
    middleName: string;
    lastName: string;
  }

  export interface SessionData {
    user: User;
    currentSubject: string;
    error: string;
  }
}
