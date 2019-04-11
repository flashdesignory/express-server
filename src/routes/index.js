import express from 'express';
import logger from '../utils/logger.simple';

const router = express.Router();

router.get('/', (req, res) => {
  logger.info('index route requested');
  res.send('hello world!');
});

export default router;
