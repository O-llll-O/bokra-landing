# 🚀 Automatic Deployment Guide

This project is configured for **automatic deployment** to Firebase Hosting. Every time you push changes to GitHub, the site will automatically deploy.

## ✅ Quick Setup (5 minutes)

### Step 1: Get Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **bokra-44bc4**
3. Click the gear icon ⚙️ → **Project Settings**
4. Go to **Service Accounts** tab
5. Click **Generate New Private Key**
6. Click **Generate Key** in the popup
7. Save the downloaded JSON file (don't commit it to Git!)

### Step 2: Add Secret to GitHub

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `FIREBASE_SERVICE_ACCOUNT`
5. Value: Open the JSON file you downloaded and copy **ALL** its content
6. Paste it in the Value field
7. Click **Add secret**

### Step 3: Push Your Code

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

That's it! 🎉 

The GitHub Action will automatically:
- ✅ Detect your push
- ✅ Build and deploy to Firebase Hosting
- ✅ Make your site live at: **https://bokra-44bc4.web.app**

## 📝 How It Works

1. **You make changes** to files in the `public/` folder
2. **You commit and push** to GitHub
3. **GitHub Actions** automatically runs the deployment workflow
4. **Firebase Hosting** receives the new files
5. **Your site is live** within 1-2 minutes!

## 🔍 Check Deployment Status

1. Go to your GitHub repository
2. Click the **Actions** tab
3. You'll see the deployment workflow running
4. Click on it to see detailed logs

## 🐛 Troubleshooting

### Deployment Fails?

1. **Check GitHub Secrets:**
   - Go to Settings → Secrets → Actions
   - Make sure `FIREBASE_SERVICE_ACCOUNT` exists
   - Verify the JSON content is correct (no extra spaces)

2. **Check Firebase Project ID:**
   - Open `.github/workflows/firebase-deploy.yml`
   - Verify `projectId: bokra-44bc4` matches your Firebase project

3. **Check File Paths:**
   - Make sure your files are in the `public/` folder
   - Verify `firebase.json` points to `"public": "public"`

### Manual Deployment (Fallback)

If automatic deployment isn't working, you can deploy manually:

```bash
firebase deploy --only hosting
```

## 📚 More Information

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

