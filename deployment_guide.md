# Project Deployment Guide

Follow these steps to deploy your JWT Authentication System to the cloud.

## Step 1: Prepare Backend for Render
1.  **Create Render Account**: Sign up at [render.com](https://render.com/).
2.  **Create Web Service**:
    *   Connect your GitHub repository.
    *   Select your repository.
    *   **Build Command**: `pip install -r requirements.txt` (Note: Navigate to `backend` folder).
    *   **Start Command**: `python main.py` or `gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app`.
3.  **Environment Variables**: In Render Dashboard, add:
    *   `SECRET_KEY`: (A random long string)
    *   `MAIL_USERNAME`: (Your Gmail)
    *   `MAIL_PASSWORD`: (Your App Password)
    *   `MAIL_FROM`: (Your Gmail)
    *   `MAIL_PORT`: `587`
    *   `MAIL_SERVER`: `smtp.gmail.com`
    *   `DATABASE_URL`: `sqlite:///./users.db` (For SQLite)

## Step 2: Prepare Frontend for Vercel
1.  **Create Vercel Account**: Sign up at [vercel.com](https://vercel.com/).
2.  **Import Project**:
    *   Connect GitHub and select your repository.
    *   **Root Directory**: Select `frontend`.
    *   **Framework Preset**: `Vite`.
3.  **Environment Variables**: In Vercel Dashboard, add:
    *   `VITE_GOOGLE_CLIENT_ID`: (Your Google Client ID)
    *   `VITE_API_BASE_URL`: (The URL of your Render backend, e.g., `https://your-backend.onrender.com`)

## Step 3: Update Google Cloud Console
1.  Go to [Google Cloud Console](https://console.cloud.google.com/).
2.  Update **Authorized JavaScript origins** to include your Vercel URL (e.g., `https://your-frontend.vercel.app`).
3.  Update **Authorized redirect URIs** similarly.

## Step 4: Final Verification
*   Visit your Vercel URL.
*   Try registering and logging in.
*   Check if emails are being sent from the live site.
