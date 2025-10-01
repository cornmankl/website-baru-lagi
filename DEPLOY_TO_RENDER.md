# Deploy CORNMAN to Render

## 🚀 Easy Render Deployment

### Method 1: One-Click GitHub Import

1. **Go to [Render](https://render.com)**
2. **Click "New +" → "Web Service"**
3. **"Build and deploy from a Git repository"**
4. **Connect your GitHub account**
5. **Select your repository:** `cornmankl/website-baru-lagi`
6. **Configure:**
   - **Name:** `cornman-ecommerce`
   - **Runtime:** `Node`
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free` (to start)

7. **Add Environment Variables:**
   ```bash
   NODE_ENV=production
   DATABASE_URL=file:./dev.db
   MANYCHAT_API_KEY=3003801:e08684d563c15098daeb41a99fd788d3
   NEXTAUTH_SECRET=cornman-secret-key-2024
   ```

8. **Click "Create Web Service"**

### Method 2: Render Blueprint (Auto-deploy)

1. **Render will auto-detect** `render.yaml` file
2. **Connect your GitHub repo**
3. **Render will automatically configure everything**

### Method 3: Manual Deploy

1. **Sign up at [Render](https://render.com)**
2. **Create new web service**
3. **Upload your code or connect GitHub**
4. **Configure build settings manually**
5. **Add environment variables**

## 🔧 Render Configuration

Render automatically:
- ✅ Detects Node.js applications
- ✅ Handles Next.js builds
- ✅ Provides free SSL certificates
- ✅ Sets up environment variables
- ✅ Handles scaling
- ✅ Provides private networks

## 📱 Post-Deployment

1. **Your site will be live** at `https://cornman-ecommerce.onrender.com`
2. **Set up custom domain** in Render settings
3. **Configure ManyChat webhook:** `https://cornman-ecommerce.onrender.com/api/webhooks/manychat/receive`
4. **Test all features**

## ✅ Benefits of Render

- **Free tier available** (with credit card)
- **Very generous free plan**
- **Great for Next.js applications**
- **Easy to use dashboard**
- **Automatic HTTPS**
- **Private networks available**
- **Good performance globally**

## 🎯 Why Render is Great for CORNMAN

- Perfect for e-commerce applications
- Handles server-side rendering well
- Easy database integration options
- Good for Malaysian users
- Simple scaling when needed
- Great customer support

## 🚨 Important Notes

- **Free tier** has some limitations but great for starting
- **Credit card required** for free tier (but no charges unless you upgrade)
- **Auto-sleeps** after 15 minutes of inactivity on free tier
- **Wakes up** automatically when accessed

Deploy to Render now! 🚀🇲🇾