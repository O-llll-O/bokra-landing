# BOKRA Landing Page - Quick Start Guide

## 🚀 Running the Project Locally

### Option 1: Node.js Server (Recommended)
Using the built-in Node.js server:

```bash
npm start
```

Or:

```bash
node server.js
```

Then open: `http://localhost:8000`

### Option 2: Simple - Open in Browser (Quickest)
1. Navigate to the project folder
2. Double-click `index.html` to open it in your default browser
3. **Note:** Some features (like smooth scrolling) work best with a local server

### Option 3: Alternative Node.js Server
If you prefer using http-server package:

```bash
# Install http-server globally (one-time)
npm install -g http-server

# Run the server
http-server -p 8000
```

Then open: `http://localhost:8000`

### Option 4: VS Code Live Server
If you use Visual Studio Code:
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 5: Firebase Local Server
If you have Firebase CLI installed:

```bash
# Install Firebase CLI (one-time)
npm install -g firebase-tools

# Login to Firebase (one-time)
firebase login

# Serve locally
firebase serve
```

Then open: `http://localhost:5000`

---

## 📦 Prerequisites

- **Node.js** (v14 or higher) - [Download from nodejs.org](https://nodejs.org/)
- A modern web browser (Chrome, Firefox, Edge, Safari)

---

## 🌐 Deploying to Firebase Hosting

### Automatic Deployment (Recommended)

The project is configured for **automatic deployment** using GitHub Actions. Every time you push changes to the `main` or `master` branch, the site will automatically deploy to Firebase Hosting.

#### Setup Instructions:

1. **Get Firebase Service Account Key:**
   ```bash
   # Login to Firebase
   firebase login
   
   # Generate service account key
   firebase projects:list
   firebase init hosting
   ```

2. **Get Service Account from Firebase Console:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project: `bokra-44bc4`
   - Go to Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file

3. **Add Secret to GitHub:**
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Value: Paste the entire content of the JSON file you downloaded
   - Click "Add secret"

4. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Update landing page"
   git push origin main
   ```
   
   The site will automatically deploy to: **https://bokra-44bc4.web.app**

### Manual Deployment

If you prefer to deploy manually:

```bash
# Initialize Firebase (if not done)
firebase init hosting

# Deploy
firebase deploy --only hosting
```

---

## 🔧 Troubleshooting

- **Styles not loading?** Make sure you're using a local server (not just opening the file)
- **Fonts not loading?** Check your internet connection (fonts load from Google Fonts)
- **Mobile menu not working?** Ensure JavaScript is enabled in your browser

