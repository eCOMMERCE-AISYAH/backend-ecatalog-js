import express from 'express';

const router = express.Router();

router.get('/hello', (req, res) => {
  console.log('success');
  return res.json({
    message: 'hallo world',
  });
});

export default router;
