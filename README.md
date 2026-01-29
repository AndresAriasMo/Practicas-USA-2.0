# Practicas 360

Plataforma full-stack para la gestión integral de prácticas profesionales.

## Stack

- Next.js 14 (App Router) + TypeScript
- TailwindCSS + shadcn/ui
- Prisma + PostgreSQL
- Auth.js / NextAuth (credentials)
- MinIO (S3 compatible) + Nodemailer (SMTP)

## Configuración local

1. Copia las variables de entorno:

```bash
cp .env.example .env
```

2. Levanta la infraestructura local:

```bash
docker-compose up -d
```

3. Instala dependencias y ejecuta migraciones:

```bash
npm install
npx prisma migrate deploy
npx prisma db seed
```

4. Inicia la app:

```bash
npm run dev
```

## Tests mínimos

```bash
npm run test
```

## Endpoints base

- `POST /auth/login`
- `GET /cases`
- `POST /cases/:id/stages/:stage/check`
- `POST /cases/:id/documents/upload`
- `POST /documents/:id/review`
- `POST /companies/:id/compliance-review`
- `POST /vacancies/:id/apply`
- `POST /cases/:id/evaluations/:num/fill`
- `POST /cases/:id/grades/recalculate`
- `GET /tickets`
- `GET /announcements`
