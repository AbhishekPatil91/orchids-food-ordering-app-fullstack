# 🍅 Tomato — Food Ordering App

A full-stack food ordering and table reservation web app built with **Next.js 15**, **React 19**, **Supabase**, and **Tailwind CSS**.

## Features

- 🛒 Browse a full food menu with category filters
- ➕ Add items to a persistent cart (localStorage)
- 🔐 Sign up / sign in with Supabase Auth
- 📦 Place delivery orders saved to Supabase
- 🗓️ Reserve a table online
- 📱 Fully responsive design

---

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Framework  | Next.js 15 (App Router)                 |
| UI         | React 19, Tailwind CSS v4, Radix UI     |
| Auth & DB  | Supabase (PostgreSQL + Auth)            |
| Fonts      | Geist (self-hosted via `geist` package) |
| Deploy     | Vercel (recommended) or Docker          |

---

## Local Development

### 1. Clone & install

```bash
git clone https://github.com/AbhishekPatil91/orchids-food-ordering-app-fullstack.git
cd orchids-food-ordering-app-fullstack
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard and run the contents of [`supabase-schema.sql`](./supabase-schema.sql).
3. Copy your project credentials from **Settings → API**.

### 3. Configure environment variables

```bash
cp .env.example .env.local
# Edit .env.local and fill in your Supabase URL and anon key
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

### Option A: Vercel (recommended)

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo.
3. Add environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**.

CI/CD is handled automatically — every push to `main` runs lint + build and deploys to Vercel via `.github/workflows/deploy.yml`.

> **Required GitHub secrets** for the workflow:
> `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Option B: Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=<your-url> \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-key> \
  -t tomato-app .

docker run -p 3000:3000 tomato-app
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable                        | Description                         |
|---------------------------------|-------------------------------------|
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase project URL           |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous (public) key     |
| `SUPABASE_SERVICE_ROLE_KEY`     | Service role key (server-side only) |

See [`.env.example`](./.env.example) for a template.

---

## Project Structure

```
src/
├── app/               # Next.js App Router pages
│   ├── cart/          # Shopping cart page
│   ├── checkout/      # Order checkout page
│   ├── contact/       # Contact form
│   ├── order-confirmation/  # Post-order confirmation
│   ├── orders/        # Order history
│   ├── reserve/       # Table reservation
│   ├── layout.tsx     # Root layout (Navbar + Footer + providers)
│   └── page.tsx       # Home page
├── components/        # Shared React components
│   ├── AuthModal.tsx  # Login / Sign-up modal
│   ├── FoodCard.tsx   # Menu item card
│   ├── Footer.tsx
│   ├── HomePage.tsx   # Hero + menu grid
│   └── Navbar.tsx
├── context/
│   ├── AuthContext.tsx  # Supabase auth state
│   └── CartContext.tsx  # Cart state with localStorage
└── lib/
    ├── food-data.ts   # Static menu data
    ├── supabase.ts    # Supabase browser client
    └── utils.ts       # Tailwind merge utility
```
