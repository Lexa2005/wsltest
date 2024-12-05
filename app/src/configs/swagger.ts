// todo - Swagger Docs

import {version} from "./version";

export const options: object = {
    info: {
        version: version.version,
        title: 'M9M9Ra | Development',
        license: {
            name: 'MIT',
        },
        description: "Сервер для себя )) MWS\n *      __M9M9Ra | Development__",
        termsOfService: "http://example.com/terms/",
        contact: {
            "name": "API Support",
            "url": "http://www.example.com/support",
            "email": "support@example.com"
        }
    },
    security: {
        BasicAuth: {
            type: 'http',
            scheme: 'basic',
        },
        BearerAuth: {
            type: 'http',
            scheme: 'bearer',
        }
    },
    servers: [
        {
            "url": "http://localhost/api/v1",
            "description": "Local server"
        },
        {
            "url": "https://dev.m9m9ra.com/api/v1",
            "description": "Development server"
        },
        {
            "url": "https://m9m9ra.com/api/v1",
            "description": "Production server"
        }],
    baseDir: __dirname,
    filesPattern: [
        '../controller/*.ts',
        '../controller/api/v1/*.ts',
        '../controller/api/v1/request/*.ts',
        '../controller/api/v1/response/*.ts',
        '../controller/admin/*.ts',
        '../entity/*.ts',
        '../types/*.ts'
    ],
    swaggerUIPath: '/api/v3/swagger',
    exposeSwaggerUI: false,
    exposeApiDocs: true,
    apiDocsPath: '/api/v1/swagger',
    notRequiredAsNullable: true,
    swaggerUiOptions: {},
    multiple: true,
};