# CORNMAN E-commerce - Vercel Deployment Guide

This guide will help you deploy the CORNMAN e-commerce website to Vercel from your GitHub repository.

## 🚀 Prerequisites

Before deploying, ensure you have:

1. **GitHub Repository**: Your code is pushed to `https://github.com/cornmankl/website-baru-lagi.git`
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Environment Variables**: All required environment variables ready
4. **Database Setup**: Production database configured

## 📋 Environment Variables

Add these environment variables in your Vercel project settings:

### Required Variables
```bash
# Database
DATABASE_URL="file:./dev.db"  # For SQLite, or your production database URL

# ManyChat Integration
MANYCHAT_API_KEY="your_manychat_api_key"
MANYCHAT_FLOW_THANK_YOU="your_thank_you_flow_id"
MANYCHAT_FLOW_PAYMENT_RETRY="your_payment_retry_flow_id"
MANYCHAT_FLOW_ORDER_SHIPPED="your_order_shipped_flow_id"
MANYCHAT_FLOW_ORDER_DELIVERED="your_order_delivered_flow_id"
MANYCHAT_FLOW_CUSTOMER_UPDATE="your_customer_update_flow_id"

# NextAuth
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your_nextauth_secret"

# Application
NODE_ENV="production"
```

### Optional Variables
```bash
# Analytics and Monitoring
GOOGLE_ANALYTICS_ID="your_ga_id"
SENTRY_DSN="your_sentry_dsn"

# Email Service (if implemented)
RESEND_API_KEY="your_resend_api_key"
EMAIL_FROM="noreply@cornman.com"
```

## 🛠️ Deployment Methods

### Method 1: Vercel Dashboard (Recommended)

1. **Connect to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   ```

2. **Import Project**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Select your GitHub repository `cornmankl/website-baru-lagi`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   - Go to project settings → "Environment Variables"
   - Add all required variables from the list above
   - Click "Save"

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Method 2: Vercel CLI

1. **Deploy from Terminal**
   ```bash
   # Navigate to project directory
   cd /path/to/your/project
   
   # Deploy to Vercel
   vercel --prod
   
   # Follow the prompts to:
   # - Link to existing project or create new
   # - Set environment variables
   # - Confirm deployment
   ```

### Method 3: GitHub Integration (Auto-deploy)

1. **Set up GitHub Integration**
   - In Vercel dashboard, go to "Settings" → "GitHub"
   - Install Vercel GitHub app
   - Select your repository

2. **Configure Auto-deploy**
   - Go to project settings → "Git"
   - Set deployment branch to `main`
   - Enable "Auto-deploy on push"

3. **Push Changes**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

## 🗄️ Database Setup

### SQLite (Default)
The project uses SQLite by default. For production:

1. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

2. **Push Database Schema**
   ```bash
   npx prisma db push
   ```

### External Database (Recommended for Production)
For better performance, use an external database:

1. **Update DATABASE_URL**
   ```bash
   # PostgreSQL example
   DATABASE_URL="postgresql://username:password@host:port/database"
   
   # MySQL example
   DATABASE_URL="mysql://username:password@host:port/database"
   ```

2. **Run Migrations**
   ```bash
   npx prisma migrate deploy
   ```

## 🔧 Post-Deployment Setup

### 1. Domain Configuration
- Go to project settings → "Domains"
- Add your custom domain (e.g., `cornman.com`)
- Follow DNS instructions provided by Vercel

### 2. SSL Certificate
- Vercel automatically provides SSL certificates
- Wait for certificate issuance (usually takes a few minutes)

### 3. ManyChat Webhook Setup
1. **Set Webhook URL in ManyChat**
   ```
   https://your-domain.vercel.app/api/webhooks/manychat/receive
   ```

2. **Test Webhook**
   ```bash
   curl -X POST https://your-domain.vercel.app/api/health
   ```

### 4. Test the Application
- Visit your deployed URL
- Test all features:
  - Product browsing
  - Add to cart
  - Checkout process
  - Admin panel
  - ManyChat integration

## 📊 Monitoring and Analytics

### Vercel Analytics
- Enable in project settings → "Analytics"
- Monitor performance and usage

### Error Tracking
Consider adding error tracking:
```bash
# Install Sentry
npm install @sentry/nextjs
```

## 🔄 Continuous Deployment

### Automatic Deployments
With GitHub integration, every push to `main` branch will automatically deploy.

### Deployment Hooks
Set up deployment hooks for notifications:
```bash
# Add to vercel.json
{
  "github": {
    "silent": true
  }
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build logs in Vercel dashboard
   # Ensure all dependencies are in package.json
   # Check TypeScript errors
   ```

2. **Environment Variables**
   ```bash
   # Verify all required variables are set
   # Check for typos in variable names
   # Ensure no sensitive data in logs
   ```

3. **Database Connection**
   ```bash
   # Verify DATABASE_URL is correct
   # Check database permissions
   # Run database migrations
   ```

4. **ManyChat Integration**
   ```bash
   # Verify webhook URLs
   # Check API keys
   # Test webhook endpoints
   ```

### Debug Commands
```bash
# Local build test
npm run build

# Production test locally
npm run build:vercel && npm run start:vercel

# Database test
npx prisma db push
```

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [ManyChat API Documentation](https://manychat.github.io/manychat-api/)

## 🎉 Success!

Your CORNMAN e-commerce website is now deployed to Vercel! 

**Next Steps:**
1. Set up custom domain
2. Configure payment gateways
3. Test ManyChat integration
4. Monitor performance and analytics
5. Set up backup and monitoring

For support, check the Vercel dashboard logs or contact your development team.