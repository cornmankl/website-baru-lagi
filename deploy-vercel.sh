#!/bin/bash

# CORNMAN E-commerce - Vercel Deployment Script
# This script helps automate the deployment process to Vercel

set -e  # Exit on any error

echo "🚀 Starting CORNMAN Vercel Deployment..."
echo "========================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
echo "🔍 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel:"
    vercel login
fi

# Build the project
echo "🔨 Building the project..."
npm run build:vercel

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npx prisma generate

# Push database schema
echo "📊 Pushing database schema..."
npx prisma db push

# Ask for deployment type
echo ""
echo "📋 Choose deployment type:"
echo "1) Production deployment"
echo "2) Preview deployment"
read -p "Enter your choice (1 or 2): " deployment_choice

case $deployment_choice in
    1)
        echo "🚀 Deploying to production..."
        vercel --prod
        ;;
    2)
        echo "🔍 Deploying preview..."
        vercel
        ;;
    *)
        echo "❌ Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment process completed!"
echo "📝 Don't forget to:"
echo "   1. Set up environment variables in Vercel dashboard"
echo "   2. Configure your custom domain"
echo "   3. Set up ManyChat webhooks"
echo "   4. Test all features"
echo ""
echo "🎉 Your CORNMAN e-commerce site is now live!"