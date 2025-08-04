@echo off
echo 🚀 Deploying micro-frontend project to GitHub...
echo.

echo 1️⃣ Initializing Git repository...
git init

echo 2️⃣ Adding remote origin...
git remote add origin https://github.com/EgeUylas/micro-frontend.git

echo 3️⃣ Fetching existing branches...
git fetch origin

echo 4️⃣ Creating new branch...
git checkout -b micro-frontend-ecommerce

echo 5️⃣ Adding all files...
git add .

echo 6️⃣ Committing changes...
git commit -m "🚀 Add micro-frontend e-commerce project

✨ Features:
- Next.js 15 + React 19 + TypeScript
- Mikro-frontend mimarisi (home + cart apps)
- Tailwind CSS responsive design
- Docker containerization ready
- LocalStorage cross-app synchronization
- Türkçe arayüz

🏗️ Architecture:
- apps/home: Ürün listeleme (port 3000)
- apps/cart: Sepet yönetimi (port 3001)  
- packages/ui: Shared components
- pnpm workspace + Turborepo

🐳 Docker:
- Multi-service docker-compose
- Development & production configs
- Standalone Next.js builds

📚 Documentation:
- Comprehensive READMEs
- Setup instructions
- Component usage guides"

echo 7️⃣ Pushing to GitHub...
git push origin micro-frontend-ecommerce

echo.
echo ✅ Successfully deployed to GitHub!
echo 🌐 Branch: micro-frontend-ecommerce
echo 📁 Repository: https://github.com/EgeUylas/micro-frontend
echo.
echo 💡 Next steps:
echo    1. Go to GitHub repository
echo    2. Create Pull Request to merge into master
echo    3. Review changes and merge when ready
echo.
pause