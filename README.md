# TOCA Player Portal

A personal training dashboard for TOCA Football players. After signing in with your email, you can view your past training sessions and scores, upcoming appointments, and your player profile — all wrapped in a modern, animated interface.

---

## What the App Does

- **Sign In** — enter your registered email to access your portal
- **Home** — see your next upcoming appointment, past training sessions (with scores), and all scheduled appointments
- **Session Details** — tap any session to see your full stats (goals, speed, streak, etc.)
- **Stats** — view your training analytics: total sessions, average score, personal best, performance trend, consistency rating, and total training hours
- **Profile** — view your personal info and training center
- **About TOCA** — learn about the TOCA Football story and mission

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express, TypeScript |
| Data | Local JSON files |
| Build tool | Vite |

---

## Running the App Locally

The app has two parts that both need to be running at the same time: a **server** (the backend) and a **client** (the frontend). You'll need two terminal windows open.

### Step 1 — Install Node.js

If you don't have Node.js installed, download and install it from:
**https://nodejs.org** — click the "LTS" button and follow the installer.

To check if it's already installed, open a terminal and type:
```
node --version
```
If you see a version number (e.g. `v20.0.0`), you're good to go.

---

### Step 2 — Download the Project

If you haven't already, clone or download this repository to your computer.

---

### Step 3 — Start the Server (Backend)

Open a terminal window, navigate to the `server` folder inside the project, and run:

```bash
cd server
npm install
npm run dev
```

You should see:
```
🚀 Server running at http://localhost:3000
```

**Leave this terminal window open** — the server needs to keep running.

---

### Step 4 — Start the Client (Frontend)

Open a **second** terminal window, navigate to the `client` folder, and run:

```bash
cd client
npm install
npm run dev
```

You should see something like:
```
  VITE ready in 300ms

  ➜  Local:   http://localhost:5173/
```

---

### Step 5 — Open the App

Open your browser and go to:
**http://localhost:5173**

You should see the TOCA Player Portal sign-in page. Enter a registered player email to log in.

---

## Project Structure

```
TOCA Football Project/
├── client/          # React frontend (what you see in the browser)
│   ├── src/
│   │   ├── pages/   # SignIn, Home, About, Profile, Stats, SessionDetails
│   │   ├── components/  # Layout (header + navigation)
│   │   └── types/   # TypeScript type definitions
│   └── public/
│       └── images/  # Background images and logo
├── server/          # Express backend (serves player data)
│   └── src/
│       └── index.ts # API routes
└── data/            # JSON files with player, session, and appointment data
```

---

## Stopping the App

To stop either the server or the client, click on its terminal window and press **Ctrl + C**.
