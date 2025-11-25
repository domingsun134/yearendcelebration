# Year End Celebration - Christmas Quiz App

A modern web application for collecting employee answers to Christmas questions via QR codes.

## Features

- 🎄 20 Christmas-related multiple-choice questions (A, B, C, D)
- 📱 QR code generation for each question
- 💾 Supabase database integration
- 🎨 Modern, festive UI design
- 📊 Admin dashboard to view all responses with correct answers
- 📝 Easy multiple-choice answer submission interface

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the SQL from `supabase-schema.sql`
3. Copy your project URL and anon key from Settings > API

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ADMIN_PASSWORD=choose_a_secure_admin_password
# Optional: ADMIN_COOKIE_NAME=admin-auth
```

### 4. Seed Questions

To populate the database with 20 Christmas questions, you can either:

**Option A: Use the script (requires tsx)**
```bash
npm install -g tsx
npx tsx scripts/generate-questions.ts
```

**Option B: Insert manually via Supabase dashboard**
- Go to Table Editor > questions
- Insert the questions from `scripts/generate-questions.ts`

> Need more or fewer questions later? Update the `CHRISTMAS_QUESTION_LIMIT` constant in `data/christmas-questions.ts` before seeding.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### For Employees
1. Scan a QR code (generated in admin dashboard)
2. Enter your email and answer
3. Submit your response

### For Admins
1. Go to `/admin/login` and sign in with the password set in `ADMIN_PASSWORD`
2. After signing in, you'll be redirected to `/admin`
3. View all questions and answers
4. Click "Show QR" on any question to generate its QR code
5. Print or display QR codes for employees to scan

## Project Structure

```
├── app/
│   ├── admin/          # Admin dashboard
│   ├── question/[id]/  # Individual question pages
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── lib/
│   └── supabase.ts     # Supabase client configuration
├── scripts/
│   └── generate-questions.ts  # Question seeding script
└── supabase-schema.sql        # Database schema
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Database and backend
- **qrcode.react** - QR code generation

## Deployment

For detailed instructions on deploying to Render.com, see [DEPLOY.md](./DEPLOY.md).

## License

MIT

