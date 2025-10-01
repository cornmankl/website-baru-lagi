# Deploy CORNMAN to Railway

## 🚀 Super Easy Railway Deployment

### Method 1: One-Click Deployment

1. **Go to [Railway](https://railway.app)**
2. **Click "New Project"**
3. **"Deploy from GitHub repo"**
4. **Select your repository:** `cornmankl/website-baru-lagi`
5. **Railway will auto-detect Next.js**
6. **Add environment variables:**
   ```bash
   DATABASE_URL=file:./dev.db
   MANYCHAT_API_KEY=3003801:e08684d563c15098daeb41a99fd788d3
   NEXTAUTH_SECRET=cornman-secret-key-2024
   NODE_ENV=production
   ```
7. **Click "Deploy"**

### Method 2: Railway CLI

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login:**
   ```bash
   railway login
   ```

3. **Initialize project:**
   ```bash
   railway init
   ```

4. **Deploy:**
   ```bash
   railway up
   ```

### Method 3: Connect GitHub (Auto-deploy)

1. **Install Railway GitHub app**
2. **Connect your repository**
3. **Railway will auto-deploy on every push**

## 🔧 Configuration

Railway automatically:
- ✅ Detects Next.js framework
- ✅ Sets up Node.js environment
- ✅ Handles build process
- ✅ Provides database (if needed)
- ✅ Sets up environment variables
- ✅ Provides HTTPS and custom domains

## 📱 Post-Deployment

1. **Your site will be live** at `https://your-project-name.railway.app`
2. **Set up custom domain** in Railway settings
3. **Configure ManyChat webhook:** `https://your-project-name.railway.app/api/webhooks/manychat/receive`
4. **Test all features**

## ✅ Benefits of Railway

- **Free tier available** ($5/month credit)
- **Very easy to use**
- **Auto-detects frameworks**
- **Built-in database options**
- **Automatic HTTPS**
- **GitHub integration**
- **Great for Next.js apps**

## 🎯 Why Railway is Great for CORNMAN

- Perfect for e-commerce sites
- Handles server-side rendering well
- Easy environment variable management
- Good performance in Malaysia/Singapore region
- Simple scaling options

Deploy to Railway now! 🚀🇲🇾