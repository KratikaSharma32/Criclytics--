# 🏏 CricLive AI

> **AI-Powered Real-Time Cricket Live Score, Analytics & SaaS Platform**

CricLive AI is a modern full-stack SaaS platform that combines **real-time live cricket scores, AI-powered insights, advanced analytics, fantasy recommendations, personalized dashboards, and cricket news** into one seamless experience.

Unlike traditional scoreboards, CricLive AI provides intelligent match analysis, AI-driven predictions, player statistics, subscription-based premium features, and an immersive glassmorphism-inspired user interface.

---

# 🚀 Project Overview

Cricket enthusiasts often need to switch between multiple applications to access:

- Live Scores
- Match Statistics
- Player Records
- Team Analysis
- Fantasy Suggestions
- Cricket News
- AI Insights

**CricLive AI** solves this problem by integrating everything into a single intelligent SaaS platform powered by real-time APIs and Artificial Intelligence.

---

# ✨ Key Features

## 🏏 Live Cricket Dashboard

- Real-time Live Scores
- Ball-by-ball Commentary
- Live Match Statistics
- Upcoming Fixtures
- Completed Matches
- Match Summary
- Toss Information
- Venue Details
- Match Timeline
- Scorecards
- Playing XI
- Partnership Statistics
- Current Run Rate
- Required Run Rate
- Match Momentum
- Win Probability
- Match Notifications
- Beautiful "No Live Matches" Interactive Screen

---

## 📊 Cricket Analytics

- Team Performance Dashboard
- Player Statistics
- Tournament Standings
- Batting Analysis
- Bowling Analysis
- Head-to-Head Comparison
- Partnership Analysis
- Performance Graphs
- Historical Match Records
- Venue Statistics

---

## 🤖 AI Cricket Assistant

Powered by **Google Gemini**

Features:

- AI Cricket Chatbot
- Match Analysis
- Match Prediction
- AI Match Summary
- Fantasy Team Suggestions
- AI Player Comparison
- Explain Cricket Rules
- AI Generated Match Insights
- Commentary Summarization

---

## 👤 User Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Encryption
- Forgot Password
- Reset Password
- Profile Management

---

## ❤️ Personalized Experience

- Favorite Teams
- Favorite Players
- Favorite Matches
- Personalized Dashboard
- Notification Preferences
- Saved AI Conversations

---

## 📰 Cricket News

Real-time News

- IPL News
- ICC Updates
- International Cricket
- Domestic Cricket
- Match Reports
- Trending Cricket Stories

---

## 💎 SaaS Features

### Free Plan

- Live Scores
- Match Schedule
- Basic Statistics
- Limited AI Questions

### Pro Plan

- Unlimited AI
- Fantasy Suggestions
- Advanced Analytics
- News Personalization

### Premium Plan

- Everything in Pro
- Premium AI Analysis
- Early Features
- Advanced Predictions
- Exclusive Insights

---

## 💳 Subscription System

- Razorpay Integration
- Subscription Plans
- Payment Verification
- Upgrade/Downgrade Plan
- Billing History

---

## 🔔 Smart Notifications

- Match Start Alerts
- Toss Notifications
- Wicket Alerts
- Innings Break
- Match Finished
- Favorite Team Alerts
- Subscription Notifications

---

## 🎨 Modern UI/UX

- Glassmorphism Design
- Dark Theme
- Gradient Backgrounds
- Smooth Animations
- Interactive Cards
- Premium Dashboard
- Responsive Layout
- Mobile Friendly
- Tablet Optimized
- Modern Typography
- Cricket Inspired Theme

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Framer Motion
- React Icons
- Recharts
- Chart.js
- Swiper.js

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt.js
- Express Validator
- Socket.io
- Axios
- dotenv
- CORS

---

# 🌐 APIs Used

## 🏏 SportsMonks Cricket API

Provides

- Live Matches
- Live Scores
- Fixtures
- Teams
- Players
- Venues
- Scorecards
- Standings
- Seasons
- Match Statistics
- Ball-by-Ball Data

---

## 📰 GNews API

Provides

- Cricket News
- Match Reports
- Latest Articles
- Breaking News
- Trending Cricket Stories

---

## 🤖 Google Gemini API

Provides

- AI Chatbot
- Match Analysis
- Cricket Q&A
- Fantasy Suggestions
- Match Predictions
- AI Generated Summaries

---

## 🍃 MongoDB Atlas

Stores

- User Accounts
- Authentication Data
- Favorites
- Notifications
- AI Chat History
- Subscription Details
- User Preferences

---

## 💳 Razorpay

Provides

- Secure Payments
- Subscription Billing
- Premium Plan Management

---

# 🏗 System Architecture

```
                    SportsMonks API
                           │
                           ▼
                  Express.js Backend
                 (Node.js + Socket.io)
                           │
        ┌──────────────────┼───────────────────┐
        ▼                  ▼                   ▼
  MongoDB Atlas       Gemini AI API      GNews API
        │                  │                   │
        └──────────────────┼───────────────────┘
                           ▼
             React + Tailwind CSS Frontend
                           │
                           ▼
                    CricLive AI Users
```

---

# 📂 Folder Structure

```
CricLive-AI/
│
├── client/
│   ├── public/
│   ├── src/
│   │
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── websocket/
│   ├── utils/
│   └── server.js
│
├── README.md
└── package.json
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/KratikaSharma32/CricLive-AI.git
```

---

## Install Dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd server
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_ATLAS_URI

SPORTMONKS_API_TOKEN=YOUR_SPORTMONKS_API_TOKEN

GNEWS_API_KEY=YOUR_GNEWS_API_KEY

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

JWT_SECRET=YOUR_SECRET_KEY

RAZORPAY_KEY_ID=YOUR_RAZORPAY_KEY_ID

RAZORPAY_KEY_SECRET=YOUR_RAZORPAY_SECRET
```

---

# ▶️ Run Project

### Backend

```bash
npm run server
```

### Frontend

```bash
npm run dev
```

---

# 📈 Future Enhancements

- AI Voice Cricket Assistant
- Fantasy League Builder
- IPL Auction Analytics
- Multi-language Support
- Push Notifications
- Progressive Web App (PWA)
- Admin Dashboard
- Team Comparison Engine
- AI Player Performance Prediction
- Match Highlight Generator
- Live Streaming Integration
- Mobile Application (React Native)
- Social Login (Google/GitHub)
- AI Match Highlights

---

# 📸 Screenshots

Add screenshots of:

- Landing Page
- Live Match Dashboard
- Match Details
- AI Assistant
- Analytics Dashboard
- Team Profile
- Player Profile
- Cricket News
- Subscription Page
- Login Page
- Register Page
- Mobile Responsive UI

---

# 👨‍💻 Developer

**Kratika Sharma**

B.Tech Computer Science Engineering

### GitHub

https://github.com/KratikaSharma32

### LinkedIn

(Add your LinkedIn Profile)

---

# 🌟 Why CricLive AI?

✅ Real-Time Cricket Scores

✅ AI-Powered Cricket Insights

✅ Fantasy Team Recommendations

✅ Live Cricket Analytics

✅ Secure Authentication

✅ Subscription-Based SaaS Platform

✅ Modern Glassmorphism UI

✅ Mobile Responsive Design

✅ Built with MERN Stack

✅ Integrated with Real-World APIs

---

# ⭐ Support

If you found this project useful, please consider giving it a **⭐ Star** on GitHub. It helps support the project and motivates future improvements.
