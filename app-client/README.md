# Community Hero

**Community Hero - Hyperlocal Problem Solver**

Community Hero is a modern, mobile-first web application designed to empower citizens to report, verify, and track hyperlocal community issues (potholes, broken streetlights, sanitation issues) seamlessly.

## 🚀 Features
* **AI Image Categorization**: Powered by the Google Gemini API, users can simply upload a photo of a community issue, and the AI automatically detects the category, severity, and provides a description.
* **Geo-Mapping**: Built with `react-leaflet`, issues are automatically tagged with GPS coordinates and visualized on an interactive community map.
* **Impact Dashboard**: Real-time transparency using `recharts` to visualize issue resolutions, category distributions, and community impact.
* **Gamification & Leaderboards**: Users earn reputation scores, unlock achievement badges (e.g., "Verified Reporter", "Quick Responder"), and climb the community leaderboard.

## 🛠️ Tech Stack
* **Frontend Framework**: Next.js (App Router)
* **Styling**: Tailwind CSS v4
* **Mapping**: Leaflet / React-Leaflet
* **Charts**: Recharts
* **Icons**: Lucide React
* **AI Integration**: Google Generative AI SDK (`@google/generative-ai`)

## 💻 Setup Instructions

1. **Clone the repository and install dependencies:**
   ```bash
   cd app-client
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env.local` file in the root of the `app-client` directory and add your Google AI Studio API key:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(You can get an API key from [Google AI Studio](https://aistudio.google.com/app/apikey))*

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.
