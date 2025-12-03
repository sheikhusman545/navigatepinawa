# Vercel Environment Variable Setup

## Quick Fix for 503 "Database not configured" Error

### Step 1: Add DATABASE_URL to Vercel

1. Go to your Vercel project: https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add the following:

   **Name**: `DATABASE_URL`
   
   **Value**: 
   ```
   postgresql://postgres:Zarrar%4020@db.wadskabyntqukrjbbuwe.supabase.co:5432/postgres?sslmode=require
   ```
   
   **Environment**: Select all three:
   - ☑ Production
   - ☑ Preview  
   - ☑ Development

6. Click **Save**

### Step 2: Redeploy

After adding the environment variable, you need to redeploy:

1. Go to **Deployments** tab
2. Click the **⋯** (three dots) on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger a new deployment

### Step 3: Verify

After redeployment, check:
1. Go to **Deployments** → Select your deployment → **Functions** tab
2. Check the logs - you should see: `✅ Prisma Client initialized with DATABASE_URL`
3. Try creating an amenity again

## Alternative: Use Connection Pooling (Recommended)

For better performance with Supabase, use the connection pooler:

**Value**: 
```
postgresql://postgres:Zarrar%4020@db.wadskabyntqukrjbbuwe.supabase.co:6543/postgres?sslmode=require
```

Note: Port `6543` instead of `5432`

## Troubleshooting

### Still getting 503 error?

1. **Check Vercel Logs**:
   - Go to your deployment → Functions tab
   - Look for error messages
   - Should show if DATABASE_URL is set or not

2. **Verify Environment Variable**:
   - Go to Settings → Environment Variables
   - Make sure `DATABASE_URL` is listed
   - Make sure it's enabled for the correct environment

3. **Check Connection String Format**:
   - Should start with `postgresql://`
   - Password should be URL-encoded (`@` → `%40`)
   - Should end with `?sslmode=require` for Supabase

4. **Test Connection**:
   - The error message will now tell you if DATABASE_URL is missing
   - If it's set but still failing, check database accessibility

## Next Steps After Connection Works

Once the connection is working, you need to create the database tables:

1. **Option A: Run locally** (if you can connect):
   ```bash
   npx prisma db push
   ```

2. **Option B: Use Vercel CLI**:
   ```bash
   vercel env pull .env.local
   npx prisma db push
   ```

3. **Option C: Create tables via API** (if needed):
   - We can create a one-time migration script

## Important Notes

- Environment variables are case-sensitive: `DATABASE_URL` (all caps)
- After adding env vars, you MUST redeploy for them to take effect
- Preview deployments use Preview environment variables
- Production deployments use Production environment variables

