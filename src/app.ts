import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import exphbs from 'express-handlebars';
import { join } from 'path';

// Routes
import homeRoutes from './routes/home';
import studentRoutes from './routes/student';
import teacherRoutes from './routes/teacher';

const app = express();

// Set View Engine
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: join(__dirname, 'views/mainLayout'),
});

app.engine('hbs', hbs.engine);
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Serve public folder
app.use(express.static(join(__dirname, 'public')));

// Body Parser
app.use(express.json());

// Routes
app.use('/', homeRoutes);
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`JDVNHS Website running on port ${PORT}`);
});
