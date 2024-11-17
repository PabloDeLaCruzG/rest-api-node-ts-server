import swaggerJSDoc from "swagger-jsdoc";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        tags: [
            {
                name: "Products",
                description: "API Operations about products"
            }
        ],
        info: {
            title: "REST API / Node.js / Express / TypeScript",
            version: "1.0.0",
            description: "API DOCS for Products",
        }
    },
    apis: ["./src/router.ts"]
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    deepLinking: true,
    displayOperationId: true,
    defaultModelsExpandDepth: 1,
    defaultModelExpandDepth: 1,
    defaultModelRendering: 'model',
    docExpansion: 'list',
    filter: false,
    showExtensions: true,
    showCommonExtensions: true,
    showMutatedRequest: true,
    syntaxHighlight: {
        activate: true,
        theme: 'agate',
        themeCSS: '.swagger-ui .highlight pre { background-color: #fff !important }',
    },
};


export default swaggerSpec;
export { swaggerUiOptions };