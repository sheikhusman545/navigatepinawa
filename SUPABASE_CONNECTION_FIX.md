# Supabase Connection Fix Guide

## Current Issue
The database connection is failing with: "Can't reach database server"

## Solutions to Try

### 1. Check Supabase Dashboard Settings

Go to your Supabase project dashboard and check:

#### A. Database Status
- Go to **Settings** → **Database**
- Make sure the database is **Active** (not paused)
- If paused, click "Resume" to activate it

#### B. Connection Pooling
- Go to **Settings** → **Database** → **Connection Pooling**
- Make sure **Connection Pooling** is enabled
- Use the **Connection String** from the "Connection Pooling" section (port 6543)

#### C. IP Whitelisting
- Go to **Settings** → **Database** → **Network Restrictions**
- Check if IP whitelisting is enabled
- If enabled, you need to add your IP address
- Or disable IP whitelisting for development

### 2. Try Different Connection Strings

#### Option A: Direct Connection (Port 5432)
```env
DATABASE_URL="postgresql://postgres:Zarrar%4020@db.wadskabyntqukrjbbuwe.supabase.co:5432/postgres?sslmode=require"
```

#### Option B: Connection Pooling (Port 6543) - Recommended
```env
DATABASE_URL="postgresql://postgres:Zarrar%4020@db.wadskabyntqukrjbbuwe.supabase.co:6543/postgres?sslmode=require&pgbouncer=true"
```

#### Option C: Use Supabase Connection String
1. Go to Supabase Dashboard → **Settings** → **Database**
2. Copy the **Connection String** from the "Connection Pooling" section
3. Replace the password part with your actual password (URL-encoded)

### 3. Verify Connection String Format

The connection string should be:
```
postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?sslmode=require
```

Important:
- Password must be URL-encoded (`@` → `%40`, `#` → `%23`, etc.)
- Use `sslmode=require` for Supabase
- Port 5432 = Direct connection
- Port 6543 = Connection pooling (recommended)

### 4. Test Connection Locally

Run the test script:
```bash
node scripts/test-db-connection.js
```

### 5. Check Network/Firewall

- Make sure your network allows outbound connections to ports 5432 and 6543
- Check if you're behind a corporate firewall
- Try from a different network (mobile hotspot) to test

### 6. Supabase Project Status

- Make sure your Supabase project is not paused
- Check if you've exceeded any usage limits
- Verify the project is in the correct region

## Quick Fix Steps

1. **Get the correct connection string from Supabase**:
   - Dashboard → Settings → Database → Connection Pooling
   - Copy the connection string
   - Replace `[YOUR-PASSWORD]` with your actual password (URL-encoded)

2. **Update your .env file**:
   ```bash
   DATABASE_URL="[paste connection string here]"
   ```

3. **Restart your dev server**:
   ```bash
   npm run dev
   ```

4. **Test the connection**:
   ```bash
   node scripts/test-db-connection.js
   ```

## If Still Not Working

1. Check Supabase project status in dashboard
2. Verify database is not paused
3. Check Supabase status page: https://status.supabase.com
4. Try creating a new Supabase project and use that connection string
5. Contact Supabase support if the issue persists

## For Vercel Deployment

Make sure to add the same `DATABASE_URL` to:
- Vercel → Settings → Environment Variables
- Enable for Production, Preview, and Development
- Redeploy after adding

