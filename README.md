# Digital Heroes Platform

This is the fully built frontend for the Digital Heroes Platform, alongside a robust database schema for your Supabase backend. It uses React (Vite+React), modern CSS without green/golf cliches, and integrates with Supabase perfectly.

## Setup Instructions

### 1. Supabase Backend Setup

1. Log into your [Supabase Account](https://supabase.com/) and create a **new project**.
2. Go to the **SQL Editor** in your new project.
3. Open the file `supabase_schema.sql` located in this directory. Copy all the contents and execute them in the SQL Editor. This will automatically create all tables (Profiles, Charities, Golf Scores, Draws, Winners) and set up the corresponding Row Level Security (RLS) policies.
4. Go to **Project Settings -> API** and copy your `Project URL` and `anon public` key.

### 2. Connect the React Application

1. In the root of this project, make a copy of `.env.example` and rename it to `.env.local`.
2. Paste your keys:
   ```env
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Run `npm install` to install frontend dependencies.
4. Run `npm run dev` to test the application locally. 

### 3. Deployment to Vercel

1. Push this repository to a new GitHub, GitLab, or Bitbucket repository.
2. Log into your **new** [Vercel](https://vercel.com/) account.
3. Add a new project and import the repository.
4. In the "Environment Variables" section before deploying, add the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` variables with the values from your Supabase project.
5. Click **Deploy**. Vercel will automatically pick up Vite's default build config.

## Development Details

- **Routing:** Handled with `react-router-dom`.
- **Styling:** Custom Vanilla CSS Design System in `index.css`. Follows emotion-driven modern aesthetics with `lucide-react` icons.
- **Rules Implemented:**
  - 5-score rolling logic handled via UI and SQL limits.
  - "Only one score entry per date" explicitly enforced by a unique Database constraint in the Supabase schema (`unique (user_id, played_at)`).
  - Admins and Subscribers mapped via Row Level Security (RLS).
