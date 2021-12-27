require('dotenv').config();

import express from 'express';
import { engine } from 'express-handlebars';
import { join } from 'path';
import bodyParser from 'body-parser';
import expressSession from 'express-session';

// Routes
import homeRoutes from './routes/home';
import studentRoutes from './routes/student';
import teacherRoutes from './routes/teacher';

const app = express();

// Trust proxy
app.set('trust proxy', 1);

// Body Parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Session
app.use(
  expressSession({
    secret: 'seccc',
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
  })
);

// Serve public folder
app.use(express.static(join(__dirname, 'public')));

app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    helpers: {
      setActive: (isActive: boolean) => (isActive ? 'active' : ''),
      checkError: (err: string) => (err === '' ? false : true),
    },
  })
);
app.set('view engine', 'hbs');
app.set('views', join(__dirname, 'views'));

// Routes
app.use('/', homeRoutes);
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);

const PORT = parseInt(<string>process.env.PORT, 10) || 3002;
app.listen(PORT, () => {
  console.log(`JDVNHS Website running on port ${PORT}`);
});
