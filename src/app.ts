import 'dotenv/config';
import express from 'express';
import { engine } from 'express-handlebars';
import { join } from 'path';

// Routes
import homeRoutes from './routes/home';
import studentRoutes from './routes/student';
import teacherRoutes from './routes/teacher';

const app = express();

// Serve public folder
app.use(express.static(join(__dirname, 'public')));

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', join(__dirname, 'views'));

// Body Parser
app.use(express.json());

// Routes
app.use('/', homeRoutes);
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);

const PORT = parseInt(<string>process.env.PORT, 10) || 3002;
app.listen(PORT, () => {
  console.log(`JDVNHS Website running on port ${PORT}`);
});
