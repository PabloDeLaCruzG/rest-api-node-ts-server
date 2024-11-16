import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();

// Routing
router.get('/', getProducts);

router.get('/:id', 
    param("id").isInt().withMessage("Id not valid"),
    handleInputErrors,
    getProductById
);

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

router.put('/:id', 
    param("id").isInt().withMessage("Id not valid"),
    body("name")
            .notEmpty().withMessage("Product name is required"),
    body("price")
            .isNumeric().withMessage("Product price must be numeric")
            .notEmpty().withMessage("Product price is required")
            .custom( value => value > 0 ).withMessage("Product price must be greater than 0"),
    body("availability")
            .isBoolean().withMessage("Product availability must be boolean"),
    handleInputErrors,
    updateProduct
);

router.patch('/:id', 
    param("id").isInt().withMessage("Id not valid"),
    handleInputErrors,
    updateAvailability
);

router.delete('/:id', 
    param("id").isInt().withMessage("Id not valid"),
    handleInputErrors,
    deleteProduct
);

export default router;