# Nesha Backend

API em Java/Spring Boot que implementa o contrato descrito em [`../docs/API.md`](../docs/API.md) para o app Expo/React Native.

## Stack

- Java 21, Spring Boot
- Spring Web, Spring Security (JWT), Spring Data JPA
- H2 em memória (dev) / PostgreSQL (prod)

## Rodando localmente

```bash
./mvnw spring-boot:run
```

Sobe em `http://0.0.0.0:8080`, com banco H2 em memória (perfil `dev`, ativo por padrão). Console do H2 em `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:nesha`, usuário `sa`, sem senha).

Para o app Expo apontar para este backend, veja a seção 7 de [`../docs/API.md`](../docs/API.md) (use o IP da máquina na rede, não `localhost`, ao testar em um celular físico).

## Variáveis de ambiente

| Variável | Uso | Padrão (dev) |
|---|---|---|
| `SPRING_PROFILES_ACTIVE` | `dev` (H2) ou `prod` (Postgres) | `dev` |
| `NESHA_JWT_SECRET` | Segredo HMAC para assinar os tokens JWT | valor de desenvolvimento, **trocar em produção** |
| `NESHA_JWT_EXPIRACAO_SEGUNDOS` | Validade do `accessToken`, em segundos | `3600` |
| `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` | Conexão Postgres (somente perfil `prod`) | — |

## Estrutura

```
src/main/java/com/nesha/backend/
├── config/        # CORS e outras configs do Spring MVC
├── controller/     # Endpoints REST (/api/v1/...)
├── dto/            # Records de request/response
├── entity/         # Entidades JPA (Usuario, Endereco, Perfil)
├── exception/      # ApiException + handler global de erros
├── repository/     # Spring Data JPA
├── security/       # JWT (geração/validação), filtro e SecurityConfig
├── service/        # Regras de negócio (AuthService, ClienteService)
└── validation/      # Validadores customizados (CPF, telefone, UF)
```

## Endpoints implementados

- `POST /api/v1/auth/login`
- `POST /api/v1/clientes` (cadastro)
- `GET /api/v1/usuarios/me` (requer `Authorization: Bearer <token>`)

Erros seguem o formato padrão `{ codigo, mensagem, campos? }` descrito na seção 4 do contrato.

## Pendências (ver seção 8 do contrato)

- `POST /auth/forgot-password` e `POST /auth/refresh` — ainda não implementados (não usados pelo app hoje).
- Cadastro/login de `PRESTADOR` — hoje `/clientes` sempre cria usuários com `perfil=CLIENTE`.
