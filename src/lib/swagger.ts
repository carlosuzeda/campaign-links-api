import { Express } from "express";
import swaggerUi from "swagger-ui-express";

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Campaign Links API",
    version: "1.0.0",
    description: "API REST para gerenciamento dinâmico de links de campanha",
  },
  servers: [{ url: "http://localhost:3333" }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Token JWT obtido no endpoint /auth/login",
      },
    },
  },
  paths: {
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Criar usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string", example: "José Silva" },
                  email: { type: "string", example: "jose@email.com" },
                  password: { type: "string", example: "senha123" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Usuário criado com sucesso" },
          409: { description: "E-mail já cadastrado" },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Autenticar usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", example: "jose@email.com" },
                  password: { type: "string", example: "senha123" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Token JWT retornado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { token: { type: "string" } },
                },
              },
            },
          },
          401: { description: "Credenciais inválidas" },
        },
      },
    },
    "/projects": {
      post: {
        tags: ["Projects"],
        summary: "Criar projeto",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: { type: "string", example: "Campanha Black Friday" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Projeto criado" },
          401: { description: "Não autorizado" },
        },
      },
      get: {
        tags: ["Projects"],
        summary: "Listar projetos",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Lista de projetos" },
          401: { description: "Não autorizado" },
        },
      },
    },
    "/projects/{id}": {
      get: {
        tags: ["Projects"],
        summary: "Detalhar projeto",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Projeto encontrado" },
          404: { description: "Projeto não encontrado" },
        },
      },
      delete: {
        tags: ["Projects"],
        summary: "Deletar projeto",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Projeto deletado" },
          404: { description: "Projeto não encontrado" },
        },
      },
    },
    "/projects/{projectId}/links": {
      post: {
        tags: ["Links"],
        summary: "Criar link",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "projectId",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "baseUrl"],
                properties: {
                  name: { type: "string", example: "Link Facebook" },
                  baseUrl: { type: "string", example: "https://example.com" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Link criado" },
          404: { description: "Projeto não encontrado" },
        },
      },
      get: {
        tags: ["Links"],
        summary: "Listar links do projeto",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "projectId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Lista de links" },
        },
      },
    },
    "/links/{id}": {
      put: {
        tags: ["Links"],
        summary: "Atualizar link",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  baseUrl: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Link atualizado" },
          404: { description: "Link não encontrado" },
        },
      },
      delete: {
        tags: ["Links"],
        summary: "Deletar link",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Link deletado" },
          404: { description: "Link não encontrado" },
        },
      },
    },
    "/links/{id}/generate": {
      get: {
        tags: ["Links"],
        summary: "Gerar link final com parâmetros e redirect",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "URL gerada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    url: {
                      type: "string",
                      example:
                        "https://example.com?utm_source=FB&redirect=https://loja.com",
                    },
                  },
                },
              },
            },
          },
          404: { description: "Link não encontrado" },
        },
      },
    },
    "/parameters": {
      post: {
        tags: ["Parameters"],
        summary: "Criar parâmetro",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["key", "value"],
                properties: {
                  key: { type: "string", example: "utm_source" },
                  value: { type: "string", example: "FB" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Parâmetro criado" },
        },
      },
      get: {
        tags: ["Parameters"],
        summary: "Listar parâmetros",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Lista de parâmetros" },
        },
      },
    },
    "/links/{id}/parameters/{parameterId}": {
      post: {
        tags: ["Parameters"],
        summary: "Vincular parâmetro ao link",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
          {
            in: "path",
            name: "parameterId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          201: { description: "Parâmetro vinculado" },
          404: { description: "Link ou parâmetro não encontrado" },
        },
      },
      delete: {
        tags: ["Parameters"],
        summary: "Desvincular parâmetro do link",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
          {
            in: "path",
            name: "parameterId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Parâmetro desvinculado" },
        },
      },
    },
    "/links/{id}/redirect": {
      post: {
        tags: ["Redirect"],
        summary: "Definir redirect do link",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["destinationUrl"],
                properties: {
                  destinationUrl: {
                    type: "string",
                    example: "https://loja.com/produto",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Redirect definido" },
          404: { description: "Link não encontrado" },
        },
      },
      delete: {
        tags: ["Redirect"],
        summary: "Remover redirect do link",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Redirect removido" },
          404: { description: "Link não possui redirect" },
        },
      },
    },
  },
};

export function setupSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
