# Deploying to Render.com

This guide will walk you through deploying your Year End Celebration Next.js application to Render.com.

## Prerequisites

- A GitHub account with your code pushed to a repository
- A Render.com account (sign up at https://render.com)
- Your Supabase project URL and anon key

## Step 1: Prepare Your Repository

1. **Ensure your code is pushed to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Create a `.env.example` file** (optional, for reference)
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Step 2: Create a Render.com Account

1. Go to https://render.com
2. Sign up or log in (you can use your GitHub account for easy integration)
3. Verify your email if required

## Step 3: Create a New Web Service

1. **Navigate to Dashboard**
   - Click on "New +" in the top right
   - Select "Web Service"

2. **Connect Your Repository**
   - If not already connected, click "Connect account" to link your GitHub account
   - Select your repository: `YearEndCelebration`
   - Click "Connect"

3. **Configure Your Service**
   - **Name**: `year-end-celebration` (or any name you prefer)
   - **Region**: Choose the closest region to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (or specify if your Next.js app is in a subdirectory)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: 
     - Free tier: Free (with limitations)
     - Paid tier: Starter ($7/month) or higher for better performance

4. **Environment Variables**
   Click "Add Environment Variable" and add:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon/public key
   
   **Important**: Make sure these are set as `NEXT_PUBLIC_*` variables so they're available in the browser.

5. **Advanced Settings** (Optional)
   - **Auto-Deploy**: Enable to automatically deploy on every push to main
   - **Health Check Path**: `/` (or your home page path)

## Step 4: Deploy

1. Click "Create Web Service"
2. Render will start building your application
3. You can watch the build logs in real-time
4. Once the build completes, your app will be live at: `https://your-app-name.onrender.com`

## Step 5: Configure Custom Domain (Optional)

1. Go to your service settings
2. Click on "Custom Domains"
3. Add your domain name
4. Follow the DNS configuration instructions provided by Render

## Step 6: Update Supabase Settings

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Add your Render.com URL to **Allowed Redirect URLs**:
   - `https://your-app-name.onrender.com`
   - `https://your-app-name.onrender.com/**`
4. If you have a custom domain, add that as well

## Environment Variables Reference

Make sure these are set in Render.com:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

## Troubleshooting

### Build Fails

1. **Check build logs** in Render dashboard
2. **Common issues**:
   - Missing environment variables
   - TypeScript errors (run `npm run build` locally first)
   - Missing dependencies (check `package.json`)

### App Crashes After Deployment

1. **Check runtime logs** in Render dashboard
2. **Verify environment variables** are set correctly
3. **Ensure Supabase URL is accessible** from Render's servers

### Environment Variables Not Working

- Make sure variables start with `NEXT_PUBLIC_` for client-side access
- Restart the service after adding new environment variables
- Clear browser cache if variables changed

### Free Tier Limitations

- **Spins down after 15 minutes** of inactivity (first request will be slow)
- **Limited build time** (may need to upgrade for complex builds)
- **Bandwidth limits** apply

## Updating Your Deployment

### Automatic Deployments
- If auto-deploy is enabled, just push to your main branch
- Render will automatically build and deploy

### Manual Deployments
1. Go to your service in Render dashboard
2. Click "Manual Deploy"
3. Select the branch and commit

## Monitoring

1. **View Logs**: Click on "Logs" tab in your service dashboard
2. **Metrics**: Monitor CPU, memory, and response times
3. **Alerts**: Set up email notifications for deployment status

## Cost Considerations

- **Free Tier**: 
  - Spins down after inactivity
  - Limited resources
  - Good for testing and low-traffic apps
  
- **Starter Plan ($7/month)**:
  - Always on
  - Better performance
  - Recommended for production

## Additional Resources

- [Render.com Documentation](https://render.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Supabase Documentation](https://supabase.com/docs)

## Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Render.com account created
- [ ] Web service created and configured
- [ ] Environment variables set
- [ ] Build command: `npm install && npm run build`
- [ ] Start command: `npm start`
- [ ] Supabase redirect URLs updated
- [ ] First deployment successful
- [ ] Custom domain configured (if needed)

---

**Note**: The first deployment may take 5-10 minutes. Subsequent deployments are usually faster.

