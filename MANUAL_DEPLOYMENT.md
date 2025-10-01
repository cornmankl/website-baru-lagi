# CORNMAN - Manual Vercel Deployment Guide

## 🚀 Ready to Deploy!

Your CORNMAN e-commerce project is ready for deployment. Due to environment limitations, please follow these manual steps:

## 📋 Prerequisites Completed ✅

- ✅ All code pushed to GitHub: `https://github.com/cornmankl/website-baru-lagi.git`
- ✅ ManyChat API configured: `3003801:e08684d563c15098daeb41a99fd788d3`
- ✅ Vercel configuration files created
- ✅ Build errors fixed (mostly)

## 🎯 Deployment Steps

### Method 1: Vercel Dashboard (Recommended)

#### 1. Import from GitHub
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Select your GitHub repository: `cornmankl/website-baru-lagi`
4. Click "Import"

#### 2. Configure Project
- **Framework Preset**: Next.js (detected automatically)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

#### 3. Add Environment Variables
In your Vercel project settings → "Environment Variables", add:

```bash
# Required Variables
DATABASE_URL=file:./dev.db
MANYCHAT_API_KEY=3003801:e08684d563c15098daeb41a99fd788d3
NEXTAUTH_SECRET=cornman-secret-key-2024
NODE_ENV=production

# Optional Variables (add later if needed)
MANYCHAT_FLOW_THANK_YOUR=
MANYCHAT_FLOW_PAYMENT_RETRY=
MANYCHAT_FLOW_ORDER_SHIPPED=
MANYCHAT_FLOW_ORDER_DELIVERED=
MANYCHAT_FLOW_CUSTOMER_UPDATE=
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

#### 4. Deploy
- Click "Deploy"
- Wait for build to complete (may take 5-10 minutes)

### Method 2: Vercel CLI

#### 1. Install Vercel CLI (if not installed)
```bash
npm install -g vercel
```

#### 2. Login to Vercel
```bash
vercel login
```

#### 3. Deploy from Project Directory
```bash
cd /path/to/your/project
vercel --prod
```

#### 4. Follow the prompts:
- Link to existing project or create new
- Set environment variables when asked
- Confirm deployment

## 🔧 Post-Deployment Setup

### 1. Configure Custom Domain
- Go to project settings → "Domains"
- Add your domain (e.g., `cornman.com`)
- Follow DNS instructions provided by Vercel

### 2. Set Up ManyChat
1. **In ManyChat Dashboard:**
   - Go to Settings → API
   - Set Webhook URL: `https://your-domain.vercel.app/api/webhooks/manychat/receive`
   - Subscribe to events: `subscriber.new`, `subscriber.updated`, `flow.started`, `flow.finished`

2. **Create Required Flows:**
   - Thank You Flow
   - Payment Retry Flow
   - Order Shipped Flow
   - Order Delivered Flow
   - Customer Update Flow

3. **Connect WhatsApp:**
   - Go to Channels → WhatsApp
   - Connect your WhatsApp Business Account
   - Create message templates

### 3. Test the Application
- Visit your deployed URL
- Test all features:
  - Product browsing
  - Add to cart
  - Checkout process
  - Admin panel
  - ManyChat integration

## 🐛 Troubleshooting Common Issues

### Build Failures
If build fails, check:
1. **Node.js Version**: Ensure Vercel is using Node.js 18+
2. **Dependencies**: All packages in `package.json`
3. **TypeScript Errors**: Check build logs for specific errors
4. **Environment Variables**: All required variables are set

### ManyChat Integration Issues
1. **API Key**: Verify `3003801:e08684d563c15098daeb41a99fd788d3` is correct
2. **Webhook URL**: Ensure it's accessible from internet
3. **Flow IDs**: Add flow IDs once you create them in ManyChat

### Database Issues
1. **SQLite**: Works out of the box for testing
2. **Production**: Consider upgrading to PostgreSQL for better performance

## 📊 Deployment Checklist

- [ ] Import repository to Vercel
- [ ] Configure build settings
- [ ] Add environment variables
- [ ] Deploy successfully
- [ ] Set up custom domain
- [ ] Configure ManyChat webhooks
- [ ] Create ManyChat flows
- [ ] Connect WhatsApp Business
- [ ] Test all features
- [ ] Set up analytics (optional)

## 🎉 Success!

Once deployed, your CORNMAN e-commerce site will be live with:
- ✅ Complete shopping experience
- ✅ ManyChat + WhatsApp integration
- ✅ Admin dashboard
- ✅ Malaysian Ringgit currency support
- ✅ Mobile-responsive design

## 📞 Support

If you encounter issues:
1. Check Vercel build logs
2. Verify environment variables
3. Test ManyChat API connection
4. Review deployment documentation

Your CORNMAN e-commerce site is ready to go live! 🚀🇲🇾🌽