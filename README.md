# 💳 DodoPayments Dashboard & Queue System

> A modern, production-grade financial dashboard with intelligent API queue management

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://dodo.nirajjha.xyz/)
[![GitHub](https://img.shields.io/badge/github-repository-blue)](https://github.com/jha-niraj/DodoPayments-Dashboard)

[View Live Demo →](https://dodo.nirajjha.xyz/) | [Queue Management →](https://dodo.nirajjha.xyz/queuedemo)

---

## Overview

This project is a modern, high-performance financial dashboard application built with Next.js and Tailwind CSS. It demonstrates a sophisticated implementation of frontend-backend interaction, featuring a responsive UI that replicates professional design standards and a robust API request queuing system.

Beyond a simple UI demo, this application showcases how to handle high-concurrency API interactions gracefully. It implements a custom queue management system on the frontend to interface with a rate-limited backend, ensuring data integrity and user feedback even under heavy load.

## Key Features

### 🎨 Modern Financial Dashboard
- **Pixel-Perfect Implementation**: Faithful replication of high-fidelity Figma designs.
- **Responsive Layout**: Adaptive grid system that works seamlessly across desktop, tablet, and mobile devices.
- **Interactive Components**:
  - **Spending Summary**: Visual breakdown of expenses.
  - **Recent Transactions**: Detailed list of financial movements.
  - **Credit Score & Exchange Cards**: Informative widgets for quick financial health checks.
- **Animations**: Smooth entry and interaction animations using Framer Motion.

### ⚡ Smart API Queue System
- **Rate-Limit Handling**: Intelligent queue consumer that detects HTTP 429 responses and automatically pauses/retries.
- **Visual Queue Management**: Real-time dashboard to monitor pending, processing, completed, and failed jobs.
- **Batch Processing**: Tools to simulate high-load scenarios by generating batch requests.
- **Concurrency Control**: Ensures requests are processed sequentially to respect server constraints.

### 🛡️ Robust Backend API
- **Simulated Latency**: Artificial delay (2s) to mimic real-world transaction processing.
- **Rate Limiting**: Strict enforcement of request limits (5 requests/minute) to demonstrate edge case handling.
- **Secure Headers**: Proper handling of `X-Forwarded-For` for client identification.

## Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **HTTP Client**: [Axios](https://axios-http.com/)

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 22.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jha-niraj/DodoPayments-Dashboard
   cd dodopaymentdashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Dashboard: [http://localhost:3000](http://localhost:3000)
   - Queue Demo: [http://localhost:3000/queuedemo](http://localhost:3000/queuedemo)

## Project Structure

```
├── app/
│   ├── api/movemoney/    # Backend API endpoint
│   ├── queuedemo/        # Queue system visualization page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main dashboard page
├── components/           # Reusable UI components
│   ├── ui/               # Base UI elements (buttons, cards, etc.)
│   └── ...               # Feature-specific components
├── lib/
│   ├── rateLimitter.ts   # Rate limiting logic
│   ├── useCountAnimation.ts   # Money Flow animation
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## API Documentation

### Move Money Endpoint

**URL**: `/api/movemoney`
**Method**: `POST`

**Request Body**:
```json
{
  "message": "Transaction description or ID"
}
```

**Response (Success - 200 OK)**:
```json
{
  "status": "ok",
  "echo": "Transaction description or ID"
}
```

**Response (Rate Limit Exceeded - 429 Too Many Requests)**:
```json
{
  "status": "error",
  "echo": "Rate limit exceeded. Please try again later."
}
```

**Headers**:
- `X-RateLimit-Remaining`: Number of requests remaining in the current window.


## Architecture & Design Decisions

### Dashboard Implementation

**Pixel-Perfect Figma Replication**: Implemented responsive grid system using Tailwind CSS with mobile-first approach. All components (cards, charts, transactions) match the design specifications while remaining fully functional across devices (mobile/tablet/desktop breakpoints at 768px and 1024px).

**Enhanced Features Beyond Requirements**: 
- Added dark/light theme toggle (not in original design) following modern finance app trends
- Implemented micro-animations: number count-ups, chart loading transitions, credit score bar animations
- All animations use CSS transitions and Framer Motion for smooth, performant rendering

**Component Architecture**: Built with reusable shadcn/ui components ensuring consistency, accessibility, and maintainability throughout the application.

---

### API Queue System

**Global Queue Pattern**: Implemented singleton `APIQueue` class outside React components to ensure single source of truth for all requests. Uses observer pattern with listener subscriptions for reactive UI updates without tight coupling.

**Why This Approach?**
- Prevents race conditions from concurrent requests
- Maintains state even if components unmount
- Enables centralized rate limit tracking
- Provides FIFO processing guarantees

**Automatic Retry Logic**: When HTTP 429 is received, jobs automatically return to 'pending' state and retry after 3-second pause. This eliminates manual retry burden and mimics production queue systems (AWS SQS, RabbitMQ).

**Real-time Status Tracking**: Each job maintains status ('pending' | 'processing' | 'success' | 'error') that drives UI rendering, providing instant user feedback and queue transparency.

**Rate Limit Visualization** *(New Feature)*: Added comprehensive rate limit indicator with:
- Color-coded states (blue → yellow → red)
- Progress bar showing remaining requests
- Countdown timer for reset window
- Makes rate limiting behavior transparent to users

---

### Backend API Implementation

**Rate Limiting Strategy**: Rolling window approach using `Map<string, number[]>` to store request timestamps per client. Filters timestamps to only count requests within the last 60 seconds.
```typescript
const recentRequests = requests.filter(time => current - time < window);
if (recentRequests.length >= limit) return false;
```

**Why Rolling Window?**  
More accurate than fixed windows - prevents burst traffic at window boundaries. Simple, zero-dependency solution perfect for demonstration.

**Client Identification**: Uses `X-Forwarded-For` header for client tracking, which works correctly behind reverse proxies (Vercel, Cloudflare). Falls back to "anonymous" for local development.

**Simulated Processing**: 2-second delay (`setTimeout(2000)`) mimics real payment processing latency and makes queue behavior clearly observable during evaluation.

---

### Key Technical Decisions

**TypeScript Throughout**: Full type safety ensures maintainability and catches errors at compile time.

**Error Handling**: Try-catch blocks around all async operations with proper HTTP status codes (400, 429) and descriptive error messages.

**Performance**: Auto-scroll on new jobs (not every update), conditional rendering for empty states, memoized badge components to avoid unnecessary re-renders.

**Testing Tools**: Batch generator (1-50 tasks) allows easy evaluation of rate limiting without manual clicking.

---

## Testing the System

**Scenario 1 - Normal Operation:**
1. Add 3 tasks individually → All complete successfully
2. Rate limit shows 2/5 remaining

**Scenario 2 - Rate Limit Test:**
1. Run batch with 10 tasks
2. First 5 complete immediately
3. Rate limit indicator turns red (0/5)
4. Timer counts down from 60s
5. Remaining 5 jobs process automatically after cooldown

**Scenario 3 - Mobile Responsiveness:**
1. Test on iPhone/Android viewport
2. All elements accessible, no horizontal scroll

---

## Known Limitations

**In-Memory Rate Limiter**: Works perfectly in development and single-instance deployments. In serverless environments (Vercel), requests may hit different function instances causing inconsistent tracking. Production solution: Redis-based distributed rate limiting.

**Timer Display**: When processing queued requests, the countdown timer may reset visually as new API responses update the reset time. This is cosmetic only - actual rate limiting and request queuing work correctly with proper 60-second delays.

---

## Usage Guide

### Using the Queue Demo

1. Navigate to `/queuedemo`.
2. **Add Single Task**: Type a task name and click the "+" button.
3. **Run Batch**: Set a number (e.g., 10) and click "Run Batch" to flood the queue.
4. **Observe**: Watch as the worker processes jobs. If the rate limit is hit (after 5 requests), the worker will pause and retry automatically.

---

Built with ❤️ for the DodoPayments Assignment.