 
import express from 'express';
const router = express.Router();

router.post('/create', (req, res) => {
  // TODO: Create battle
});

router.get('/:id', (req, res) => {
  // TODO: Get battle by ID
});

router.post('/:id/submit', (req, res) => {
  // TODO: Submit solution for battle
});

export default router;