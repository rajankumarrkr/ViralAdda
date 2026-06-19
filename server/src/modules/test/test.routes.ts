import { Router } from 'express';
import { testTelegramConnection, testTelegramUpload } from './test.controller.js';
import { upload } from '../../middlewares/upload.middleware.js';

export const testRoutes = Router();

testRoutes.get('/telegram', testTelegramConnection);
testRoutes.post('/upload', upload.single('image'), testTelegramUpload);
