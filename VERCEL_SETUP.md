# Vercel Deployment Setup Guide

## Database Connection Issues

If you're getting 500 errors when trying to create amenities or categories, follow these steps:

### 1. Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:
   - **Name**: `DATABASE_URL`
   - **Value**: `postgresql://postgres:Zarrar%4020@db.wadskabyntqukrjbbuwe.supabase.co:5432/postgres?sslmode=require`
   - **Environment**: Select all (Production, Preview, Development)

### 2. Alternative: Use Connection Pooling (Recommended for Supabase)

For better performance and connection management, use Supabase's connection pooler:

- **Name**: `DATABASE_URL`
- **Value**: `postgresql://postgres:Zarrar%4020@db.wadskabyntqukrjbbuwe.supabase.co:6543/postgres?sslmode=require`
- **Note**: Port `6543` instead of `5432`

### 3. Create Database Tables

After setting the environment variable, you need to create the database tables. You have two options:

#### Option A: Using Prisma Migrate (Recommended)
```bash
npx prisma migrate deploy
```

#### Option B: Using Prisma DB Push (Development)
```bash
npx prisma db push
```

**Note**: You can run this locally if your local machine can connect to the database, or use Vercel's CLI or a one-time script.

### 4. Verify Database Connection

Check your Vercel function logs to see if the connection is working:
1. Go to your Vercel project
2. Navigate to **Deployments** → Select a deployment → **Functions** tab
3. Check the logs for any database connection errors

### 5. Common Issues

#### Issue: "Can't reach database server"
- **Solution**: Check if your Supabase database is running
- Check Supabase dashboard → Database → Connection Pooling settings
- Verify IP whitelisting (if enabled)

#### Issue: "Table does not exist"
- **Solution**: Run `npx prisma db push` or `npx prisma migrate deploy`
- Make sure Prisma schema is up to date

#### Issue: "Authentication failed"
- **Solution**: Verify your database password is correct
- Check if special characters in password are URL-encoded (`@` → `%40`)

### 6. Testing the Connection

After deployment, test the connection by:
1. Going to `/dashboard/amenities`
2. Try to add a new amenity
3. Check the browser console and Vercel logs for detailed error messages

## Quick Fix Script

If you have access to run commands, you can test the connection:

```bash
# Test connection
node scripts/test-db-connection.js

# Push schema to database
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

## Support

If issues persist:
1. Check Vercel function logs for detailed error messages
2. Verify DATABASE_URL format is correct
3. Ensure database is accessible from Vercel's IP ranges
4. Check Supabase connection settings and IP whitelisting

