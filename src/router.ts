import { Router } from "express";

const router = Router();

// Routing
router.get('/', (req, res) => {
    res.json('Desde get');
});

router.post('/', (req, res) => {
    res.json('Desde post');
});

router.put('/', (req, res) => {
    res.json('Desde put');
});

router.delete('/', (req, res) => {
    res.json('Desde delete');
});

router.patch('/', (req, res) => {
    res.json('Desde patch');
});

export default router;