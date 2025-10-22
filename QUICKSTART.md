# 🚀 快速开始 / Quick Start Guide

最快速度启动 Quest 项目！

Get Quest up and running in no time!

---

## ⚡ 超快速启动 (5 分钟)

### 1️⃣ 克隆并安装

```bash
# 克隆仓库
git clone https://github.com/yourusername/quest-website.git
cd quest-website

# 安装所有依赖
cd frontend && npm install && cd ../backend && npm install && cd ..
```

### 2️⃣ 获取免费服务凭证

#### Supabase (数据库)
1. 访问 https://supabase.com → Sign up
2. Create new project
3. 在 Settings → API 复制：
   - Project URL
   - anon public key
4. 在 SQL Editor 执行 `backend/database/schema.sql`

#### Cloudinary (文件存储)
1. 访问 https://cloudinary.com → Sign up
2. Dashboard 复制：
   - Cloud Name
   - API Key
   - API Secret

### 3️⃣ 配置环境变量

**前端 `frontend/.env`:**
```env
VITE_API_URL=http://localhost:3000
```

**后端 `backend/.env`:**
```env
SUPABASE_URL=你的_supabase_url
SUPABASE_KEY=你的_supabase_key
CLOUDINARY_CLOUD_NAME=你的_cloud_name
CLOUDINARY_API_KEY=你的_api_key
CLOUDINARY_API_SECRET=你的_api_secret
PORT=3000
```

### 4️⃣ 启动！

**终端 1 - 后端:**
```bash
cd backend
npm run dev
```

**终端 2 - 前端:**
```bash
cd frontend
npm run dev
```

### 5️⃣ 访问

打开浏览器访问：http://localhost:5173

🎉 完成！开始探索宇宙吧！

---

## 📱 测试功能

### ✅ 必试功能清单

- [ ] 切换语言（右上角按钮）
- [ ] 查看首页动画和漂浮问题
- [ ] 浏览所有问题
- [ ] 使用筛选器（分类、类型）
- [ ] 提交文字问题
- [ ] 查看问题详情
- [ ] 添加回答

### 🖼️ 测试图片上传
1. 进入"我要提问"
2. 选择"图片提问"
3. 上传一张图片 (< 50MB)
4. 填写描述并提交
5. 在浏览页面查看

### 🎥 测试视频上传
同图片上传，选择"视频提问"

---

## 🌐 部署到线上

准备好分享给全世界了？

### 快速部署步骤

1. **推送到 GitHub**
```bash
git init
git add .
git commit -m "Initial commit: Quest Q&A Platform"
git remote add origin https://github.com/yourusername/quest-website.git
git push -u origin main
```

2. **部署前端到 Vercel**
   - 访问 https://vercel.com
   - Import GitHub repo
   - Root Directory: `frontend`
   - 添加环境变量: `VITE_API_URL=你的后端URL`
   - Deploy

3. **部署后端到 Render**
   - 访问 https://render.com
   - New Web Service
   - 连接 GitHub repo
   - Root Directory: `backend`
   - 添加所有环境变量
   - Deploy

4. **更新前端 API URL**
   - 在 Vercel 设置中更新 `VITE_API_URL` 为 Render URL
   - Redeploy

✅ 完成！你的网站现在在线了！

详细部署指南请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🐛 遇到问题？

### 后端无法启动
- 检查 `.env` 文件是否存在
- 验证 Supabase 凭证是否正确
- 确保端口 3000 未被占用

### 前端无法连接后端
- 确保后端正在运行
- 检查 `VITE_API_URL` 配置
- 查看浏览器控制台错误

### 数据库错误
- 确保已在 Supabase 中执行 `schema.sql`
- 验证使用的是 anon key（不是 service_role key）
- 检查 RLS 策略是否已启用

### 上传失败
- 验证 Cloudinary 凭证
- 检查文件大小 (< 50MB)
- 确认网络连接

---

## 📚 更多资源

- 📖 [完整 README](./README.md)
- 🛠️ [详细设置指南](./SETUP.md)
- 🚀 [部署指南](./DEPLOYMENT.md)
- 🤝 [贡献指南](./CONTRIBUTING.md)
- 📋 [项目计划](./PROJECT_PLAN.md)

---

## 💡 开发技巧

### 热重载
代码修改会自动刷新，无需手动重启！

### 查看数据
访问 Supabase Dashboard → Table Editor

### 调试
- 前端：浏览器 DevTools (F12)
- 后端：终端日志输出

### 自定义主题
编辑 `frontend/tailwind.config.js` 中的颜色

---

## 🎨 项目特色

- 🌌 **美丽的宇宙主题**
- 🌍 **完整双语支持**
- 📱 **100% 响应式**
- ⚡ **快速加载**
- 🆓 **完全免费部署**

---

**开始你的宇宙探索之旅吧！**

**Start your cosmic exploration journey!**

🌟✨🚀

