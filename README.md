# CivicLens-AI (Community Hero)

**CivicLens-AI** (formerly Community Hero) is a hyperlocal problem-solving platform that empowers citizens to report, track, and resolve community issues seamlessly. Built for the Vibe2Ship Hackathon.

## 🚀 Features

*   **AI Image Categorization**: Automatically categorizes reported issues using Google's Gemini AI SDK based on user-uploaded photos.
*   **Geo-mapping**: Embedded interactive maps using Leaflet to pinpoint exact locations of community issues.
*   **Impact Dashboard**: Real-time statistics and charts built with Recharts to visualize community engagement and resolution rates.
*   **Gamification**: Leaderboards, verified reporters, and impact scores to reward active citizens.

## 🛠️ Tech Stack

*   **Framework**: Next.js (App Router)
*   **Styling**: Tailwind CSS
*   **Maps**: Leaflet & React-Leaflet
*   **Charts**: Recharts
*   **AI**: Google Gemini API (`@google/generative-ai`)
*   **Icons**: Lucide React

## 📦 Setup Instructions

1.  Navigate to the client directory:
    ```bash
    cd app-client
    ```
2.  Install all required dependencies:
    ```bash
    npm install
    ```
3.  Set up your environment variables by creating a `.env.local` file inside `app-client`:
    ```env
    NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) in your browser to view the app!
