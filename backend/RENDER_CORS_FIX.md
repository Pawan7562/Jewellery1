# Render CORS Configuration Fix

## Problem
The backend is returning `http://localhost:3000` as the Access-Control-Allow-Origin header instead of allowing requests from the Vercel frontend.

## Solution: Set CORS_ORIGIN Environment Variable in Render

### Step 1: Go to Render Dashboard
1. Log in to [Render Dashboard](https://dashboard.render.com/)
2. Navigate to your backend service (jewellery1-21x1)

### Step 2: Add Environment Variable
1. Click on your backend service
2. Go to "Environment" tab
3. Scroll down to "Environment Variables" section
4. Click "Add Environment Variable"
5. Add the following:
   - **Key**: `CORS_ORIGIN`
   - **Value**: `https://jewellery1-weld.vercel.app`

### Step 3: Redeploy Backend
1. After adding the environment variable, click "Manual Deploy" → "Clear build cache & deploy"
2. Wait for the deployment to complete

### Step 4: Verify Fix
1. Once backend is redeployed, try logging in from the Vercel frontend
2. The CORS error should be resolved

## Alternative: Allow All Origins (Not Recommended for Production)

If you want to allow requests from any origin (not recommended for security):

### Step 1: Update Backend Code
In `backend/src/server.ts`, change the CORS configuration:

```typescript
app.use(cors({
  origin: '*', // Allow all origins
  credentials: true
}));
```

### Step 2: Redeploy Backend
Commit and push the changes, then redeploy on Render.

## Current Configuration

The backend server.ts is configured to use:
```typescript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
```

This means:
- If `CORS_ORIGIN` environment variable is set, it uses that value
- If not set, it defaults to `http://localhost:3000`
- Currently, it's using the default because the environment variable is not set in Render

## Required Environment Variables for Render

Make sure these are set in your Render backend service:

```
PORT=5000
NODE_ENV=production
DATABASE_URL=postgresql://neondb_owner:npg_RxTqa0kmg7PC@ep-dark-moon-aqjqr6a9-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
CORS_ORIGIN=https://jewellery1-weld.vercel.app
```

## Test After Fix

Once the environment variable is set and backend is redeployed:

1. Go to your Vercel frontend: https://jewellery1-weld.vercel.app
2. Try to register or login
3. The CORS error should be resolved
4. You should be able to authenticate successfully
