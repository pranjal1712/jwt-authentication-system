# JWT Authentication System

A premium user authentication system built with **FastAPI** (Python) and **React** (Vite). It features JWT-based security, Google Login integration, and a full "Forgot Password" flow with real email support.

## ✨ Features
- **Modern UI**: Glassmorphism design with smooth animations and Outfit typography.
- **JWT Auth**: Secure token-based authentication with expiration.
- **Google Login**: Direct social login using Google OAuth2.
- **Full Auth Flow**: Register, Login, Protected Profile, and Forget/Reset Password.
- **Email Support**: Real email sending for password reset links via SMTP.
- **Database**: SQLite with SQLAlchemy ORM for user data storage.

## 🛠️ Tech Stack
- **Backend**: FastAPI, SQLAlchemy, Passlib (PBKDF2), Python-Jose, FastAPI-Mail.
- **Frontend**: React, Vite, Axios, Tailwind-like Glassmorphism, Lucide Icons.

---

## 🚀 Getting Started

### 1. Prerequisites
- Python 3.10+
- Node.js & npm
- Google Cloud Console Project (for Google Login)

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install fastapi uvicorn sqlalchemy passlib[bcrypt] python-jose[cryptography] python-multipart python-dotenv fastapi-mail
   ```
4. Configure `.env`: Create a `.env` file in the `backend/` directory:
   ```env
   MAIL_USERNAME=your_email@gmail.com
   MAIL_PASSWORD=your_app_password
   MAIL_FROM=your_email@gmail.com
   MAIL_PORT=587
   MAIL_SERVER=smtp.gmail.com
   MAIL_FROM_NAME=AuthSystem
   ```
5. Run the server:
   ```bash
   python main.py
   ```

### 3. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure `.env`: Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

---

## 🔑 Google Login Configuration
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project and setup **OAuth 2.0 Client IDs**.
3. Add `http://localhost:5173` to **Authorized JavaScript origins**.
4. Add `http://localhost:5173` to **Authorized redirect URIs**.
5. Copy the Client ID to your frontend `.env`.

---

## 📧 Forgot Password (SMTP)
To enable real email sending:
1. Enable **2-Step Verification** on your Google Account.
2. Generate an **App Password** (Search "App passwords" in Google Account settings).
3. Use this 16-character code as `MAIL_PASSWORD` in `backend/.env`.

---

## 📁 Project Structure
```
jwt-authentication-system/
├── backend/
│   ├── main.py            # FastAPI App & Endpoints
│   ├── models.py          # SQLAlchemy User Model
│   ├── schemas.py         # Pydantic Schemas
│   ├── auth_utils.py      # JWT & Hashing Logic
│   └── database.py        # Database Connection
├── frontend/
│   ├── src/
│   │   ├── pages/         # Login, Register, Profile, etc.
│   │   ├── App.jsx        # Routing & Main Entry
│   │   └── index.css      # Custom UI Styles
│   └── vite.config.js     # Proxy configuration
└── .gitignore             # Excluded files
```

## 📜 License
MIT
