#!/bin/bash

echo "🚀 Deploying CORNMAN to Vercel..."
echo "================================"

# Set environment variables for deployment
export MANYCHAT_API_KEY="3003801:e08684d563c15098daeb41a99fd788d3"
export DATABASE_URL="file:./dev.db"
export NEXTAUTH_SECRET="cornman-secret-key-2024"
export NODE_ENV="production"

# Try to deploy
echo "📦 Building and deploying..."
npx vercel --prod --yes

echo "✅ Deployment process completed!"
echo "📝 Don't forget to configure:"
echo "   1. Custom domain in Vercel dashboard"
echo "   2. ManyChat flows and webhooks"
echo "   3. Environment variables in Vercel settings"