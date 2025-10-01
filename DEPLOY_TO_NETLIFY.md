# Deploy CORNMAN to Netlify

## 🚀 Quick Netlify Deployment

### Method 1: Drag & Drop (Easiest)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Compress the build folder:**
   ```bash
   cd .next
   zip -r ../netlify-deploy.zip .
   cd ..
   ```

3. **Deploy to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Drag and drop `netlify-deploy.zip` to the drop zone
   - Wait for deployment (2-3 minutes)

### Method 2: Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod --dir=.next
   ```

### Method 3: Connect to GitHub

1. **Push code to GitHub** (already done)
2. **Go to Netlify dashboard**
3. **"New site from Git"**
4. **Connect your GitHub repository**
5. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

## 🔧 Environment Variables for Netlify

In Netlify dashboard → Site settings → Build & deploy → Environment:

```bash
DATABASE_URL=file:./dev.db
MANYCHAT_API_KEY=3003801:e08684d563c15098daeb41a99fd788d3
NEXTAUTH_SECRET=cornman-secret-key-2024
NODE_ENV=production
```

## 📱 Post-Deployment

1. **Set up custom domain** in Netlify settings
2. **Configure ManyChat webhook:** `https://your-site.netlify.app/api/webhooks/manychat/receive`
3. **Test all features**

## ✅ Benefits of Netlify

- Free tier available
- Automatic HTTPS
- Global CDN
- Continuous deployment
- Form handling
- Serverless functions

Deploy now! 🚀