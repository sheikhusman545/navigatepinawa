# Database Setup Guide

## Quick Setup Options

### Option 1: PlanetScale (MySQL - Recommended)
1. Go to https://planetscale.com
2. Sign up for a free account
3. Create a new database
4. Copy the connection string
5. Add to `.env` file:
   ```
   DATABASE_URL="mysql://username:password@host.planetscale.com:3306/database?sslaccept=strict"
   ```

### Option 2: Supabase (PostgreSQL)
1. Go to https://supabase.com
2. Sign up for a free account
3. Create a new project
4. Go to Settings > Database
5. Copy the connection string
6. Update `prisma/schema.prisma` to use `postgresql` instead of `mysql`
7. Add to `.env` file:
   ```
   DATABASE_URL="postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres"
   ```

### Option 3: Railway (MySQL/PostgreSQL)
1. Go to https://railway.app
2. Sign up for a free account
3. Create a new project
4. Add a MySQL or PostgreSQL database
5. Copy the connection string
6. Add to `.env` file

### Option 4: Local MySQL
1. Install MySQL locally
2. Create a database
3. Add to `.env` file:
   ```
   DATABASE_URL="mysql://root:password@localhost:3306/navigatepinawa"
   ```

## After Setting Up Database

1. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

2. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

3. (Optional) Open Prisma Studio to view data:
   ```bash
   npx prisma studio
   ```

## Environment Variables

Create a `.env` file in the root directory with:
```
DATABASE_URL="your_database_connection_string"
```

**Important:** Never commit the `.env` file to git. It's already in `.gitignore`.

