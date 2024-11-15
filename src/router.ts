import { Router } from "express";
import { createProduct } from "./handlers/product";
import { body } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();

// Routing
router.get('/', (req, res) => {
    res.json('Desde get');
});

router.post('/', 
    
    body("name")
            .notEmpty().withMessage("Product name is required"),
    body("price")
            .isNumeric().withMessage("Product price must be numeric")
            .notEmpty().withMessage("Product price is required")
            .custom( value => value > 0 ).withMessage("Product price must be greater than 0"),
    handleInputErrors,
    createProduct
);

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