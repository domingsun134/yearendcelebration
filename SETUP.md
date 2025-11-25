# Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the project to be ready (takes ~2 minutes)
4. Go to **Settings** > **API** and copy:
   - Project URL
   - `anon` `public` key (not the service_role key)

### 3. Create Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the entire contents of `supabase-schema.sql`
4. Click **Run** (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned"

**Note:** The schema includes support for multiple-choice questions with options A, B, C, D and correct answers.

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
ADMIN_PASSWORD=choose-a-secure-password
# Optional: ADMIN_COOKIE_NAME=admin-auth
```

Replace the values with your actual Supabase project URL and anon key.

### 5. Seed Questions

**Option A: Using the Admin Dashboard (Recommended)**
1. Start the development server: `npm run dev`
2. Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
3. Sign in with the `ADMIN_PASSWORD`
4. Click the "Seed 20 Christmas Questions" button
5. Wait for the success message

**Option B: Using the Script**
```bash
# Set environment variables first
export NEXT_PUBLIC_SUPABASE_URL=your-url
export NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key

# Run the script
npx tsx scripts/generate-questions.ts
```

> Adjust the `CHRISTMAS_QUESTION_LIMIT` value in `data/christmas-questions.ts` if you need a different number of seeded questions.

### 6. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### For Employees
1. Scan a QR code (displayed in admin dashboard)
2. Enter your email and answer
3. Submit your response

### For Admins
1. Go to `/admin/login` and authenticate with the `ADMIN_PASSWORD`
2. After signing in, access the dashboard at `/admin`
3. View all questions and answers
4. Click "Show QR" on any question to generate its QR code
5. Print or display QR codes for employees to scan
6. View all submitted answers in real-time

## Troubleshooting

### Questions not showing up?
- Make sure you've run the SQL schema in Supabase
- Check that you've seeded the questions (use the admin dashboard button)
- Verify your environment variables are correct

### Can't submit answers?
- Check your Supabase Row Level Security (RLS) policies
- Make sure the `answers` table allows INSERT operations
- Verify your Supabase connection in the browser console

### QR codes not working?
- Make sure your app is accessible at the URL shown in the QR code
- For production, update the base URL in the admin dashboard
- Test the QR code by scanning it with your phone

## Production Deployment

1. Deploy to Vercel, Netlify, or your preferred hosting
2. Set environment variables in your hosting platform
3. Update the base URL if needed (QR codes use `window.location.origin`)
4. Make sure your Supabase project allows connections from your domain

