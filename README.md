# 📝 Awesome-Todos

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A full-stack Todo Application built with the **MERN Stack** (MongoDB, Express, React, Node.js). It features a modern interface, real-time updates, and a robust backend API.

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [Troubleshooting](#-troubleshooting)
- [Deployment](#-deployment)

---

## ✨ Features

- **Create, Read, Update, Delete (CRUD):** Manage your todos efficiently.
- **Real-time Database:** Powered by MongoDB Atlas.
- **Responsive UI:** Built with React ensuring a smooth experience.
- **RESTful API:** Express.js backend handling API requests.

---

## 🛠 Tech Stack

- **Frontend:** React.js, CSS3
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Tools:** Git, npm, Render (for deployment)

---

## 📋 Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [NPM](https://www.npmjs.com/) (usually included with Node.js)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and connection URI.

---

## ⚙️ Installation

To set up the project locally, duplicate the terminal or open two separate terminal windows (one for the **Server** and one for the **Client**).

### 1. Server Setup (Backend)

Navigate to the `server` folder and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add your configuration:

```env
MONGODB_URI=your_mongodb_connection_string_here
PORT=5000
```
> **Note:** Replace `your_mongodb_connection_string_here` with your actual MongoDB connection string.

### 2. Client Setup (Frontend)

Navigate to the `client` folder and install dependencies:

```bash
cd ../client
npm install
```

---

## ▶️ Running the Application

**IMPORTANT:** This application has two parts (Client & Server). **You must run BOTH of them at the same time in separate terminals.**

### Step 1: Start the Backend (Server)
1. Open a **new terminal**.
2. Run the following commands:
   ```bash
   cd server
   npm start
   ```
3. **Wait** until you see: `Connected to MongoDB` and `Server is listening on http://localhost:5000`.
4. **DO NOT CLOSE THIS TERMINAL.**

### Step 2: Start the Frontend (Client)
1. Open a **second, new terminal** (do not use the one where the server is running).
2. Run the following commands:
   ```bash
   cd client
   npm start
   ```
3. Your browser should open automatically at `http://localhost:3000`.

---

## ❓ Troubleshooting

### 🛑 "Encerfused" / `ECONNREFUSED` / Proxy Error

**Error Message:** `Proxy error: Could not proxy request... ECONNREFUSED`

**Cause:** The Frontend (React) is trying to talk to the Backend (Server), but the Server is **switched off**.

**Solution:**
1. Check your terminal windows. Do you have the **Server** running in one of them?
2. If not, follow **Step 1** above to start the server.
3. If the server crashed, restart it.

### 2. DNS / Timeout Issues (`database.js`)
We use `dns.setServers(['8.8.8.8'])` in `server/database.js` to fix DNS resolution issues with MongoDB Atlas on some networks/ISPs. If you experience timeouts, this tweak ensures reliable connectivity using Google's Public DNS.

---

## 🚀 Deployment

The recommended way to deploy this MERN stack app is using **Render**.

### Step 1: Push to GitHub
Initialize a git repository, commit your changes, and push to GitHub.

```bash
git init
git add .
git commit -m "Initial commit"
# Link your repo
git remote add origin https://github.com/YOUR_USERNAME/awesome-todos.git
git push -u origin master
```

### Step 2: Deploy on Render
Since the client and server are separate, we deploy the **Server** and have it serve the built React files.

1.  **Sign up on [Render](https://render.com/)**.
2.  Create a new **Web Service**.
3.  Connect your GitHub repository.
4.  **Settings:**
    -   **Environment:** Node
    -   **Build Command:**
        ```bash
        cd client && npm install && npm run build && mv build ../server/ && cd ../server && npm install
        ```
    -   **Start Command:**
        ```bash
        cd server && node index.js
        ```
5.  **Environment Variables:**
    -   Add `MONGODB_URI` with your connection string.
    -   Add `PORT` with value `5000`.

Render will build both the frontend and backend, then serve the app via the Express server.

---

## 🔧 Recent Improvements & Fixes

### 1. Robust API Error Handling
We have updated `server/routes.js` and `server/index.js` to ensure the server doesn't crash on database errors.
- **Fail-Safe Startup:** The server now checks for a MongoDB connection immediately upon startup (`index.js`). If it cannot connect, it exits with a clear error message instead of hanging.
- **Route Protection:** All API routes (`GET`, `POST`, `PUT`, `DELETE`) are now wrapped in `try-catch` blocks. If an operation fails, the API returns a proper `500` error response to the client instead of crashing the server process.

### 2. Client-Side Resilience
- The React frontend (`App.jsx`) now includes `try-catch` blocks when fetching data.
- If the server is offline or returns an error, the app will still load the UI (without crashing with a white screen) and log the specific error to the console for easier debugging.

### 3. Database Configuration (`.env`)
The `.env` file in the `server` directory contains sensitive configuration like the `MONGODB_URI`.
- **Note:** This file is generally **ignored** by Git for security.
- **However:** If you explicitly want to include it, ensure you do not share your repository publicly if it contains production passwords.
- **Update:** We have explicitly included `.env` in the repository as per request.
- We have added custom DNS settings (`8.8.8.8`) in `database.js` to prevent connection timeouts on certain ISPs.

---

## 📜 Project History & Git Troubleshooting

### Why it wouldn't upload and commit originally

1. **Large Files (`node_modules`)**: The repository contained `node_modules` folders, which have thousands of dependency files. GitHub rejected the push because these files are too large and numerous.
2. **History Conflicts**: Because we had to remove these files and rewrite the history to make it clean, your local git history became different from what GitHub expected.
3. **Missing Upstream Branch**: After resetting the history, Git "forgot" the link between your local `main` branch and the GitHub `main` branch.

### How it was fixed (Start to Finish)

1. **Cleaned the Repository**: Removed `node_modules` from being tracked by Git (added to `.gitignore`).
2. **Rewrote History**: Created a fresh "Initial commit" that only contains your actual project code, without the clutter.
3. **Force Pushed**: Overwrote the messy history on GitHub with your clean local version.
4. **Re-linked Branch**: Ran `git push --set-upstream origin main` to reconnect your local branch to GitHub.