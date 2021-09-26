import { Router } from 'express';
import homeController from '../controllers/home';

const router = Router();

router.get('/', homeController.index);
router.post('/login', homeController.postLogin);

export default router;
