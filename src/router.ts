import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();

/**
 * 
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *      description: The unique identifier for the product
 *      example: 1
 *     name:
 *      type: string
 *      description: The name of the product
 *      example: Product Name
 *     price:
 *      type: number
 *      description: The price of the product
 *      example: 10.99
 *     availability:
 *      type: boolean
 *      description: Whether the product is available for purchase
 *      example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get all products
 *    tags:
 *      - Products
 *    description: Returns a list of all products
 *    responses:
 *      200:
 *        description: A list of products
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by ID
 *    tags:
 *      - Products
 *    description: Returns a product by ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: A product
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: Product not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The error message
 *                  example: Product not found
 *      400:
 *        description: Invalid request body
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: The error message
 *                    example: Product name is required
 */
router.get('/:id', 
    param("id").isInt().withMessage("Id not valid"),
    handleInputErrors,
    getProductById
);

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Create a new product
 *    tags:
 *      - Products
 *    description: Creates a new product
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The name of the product
 *                example: Product Name
 *              price:
 *                type: number
 *                description: The price of the product
 *                example: 10.99
 *              availability:
 *                type: boolean
 *                description: Whether the product is available for purchase
 *                example: true
 *    responses:
 *      201:
 *        description: A new product
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'        
 *      400:
 *        description: Invalid request body
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: The error message
 *                    example: Product name is required
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Update a product by ID
 *    tags:
 *      - Products
 *    description: Updates a product by ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: The ID of the product to update
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The name of the product
 *                example: Product Name
 *              price:
 *                type: number
 *                description: The price of the product
 *                example: 10.99
 *              availability:
 *                type: boolean
 *                description: Whether the product is available for purchase
 *                example: true
 *    responses:
 *      200:
 *        description: A product
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Invalid request body
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: The error message
 *                    example: Product name is required
 *      404:
 *        description: Product not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The error message  
 *                  example: Product not found
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update the availability of a product by ID
 *    tags:
 *      - Products
 *    description: Updates the availability of a product by ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: The ID of the product to update
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              availability:
 *                type: boolean
 *                description: Whether the product is available for purchase
 *                example: true
 *    responses:
 *      200:
 *        description: A product
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Invalid request body
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: The error message
 *                    example: Product name is required
 *      404:
 *        description: Product not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The error message  
 *                  example: Product not found
 */
router.patch('/:id', 
    param("id").isInt().withMessage("Id not valid"),
    handleInputErrors,
    updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete a product by ID
 *    tags:
 *      - Products
 *    description: Deletes a product by ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: The ID of the product to delete
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Product deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              description: The message
 *              example: Product deleted
 *      404:
 *        description: Product not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The error message  
 *                  example: Product not found
 */
router.delete('/:id', 
    param("id").isInt().withMessage("Id not valid"),
    handleInputErrors,
    deleteProduct
);

export default router;