# 部署指南 / Deployment Guide

本指南将帮助您将 Quest 项目部署到生产环境。

This guide will help you deploy the Quest project to production.

## 📋 部署前准备 / Pre-deployment Checklist

### 1. 注册所需服务 / Register Required Services

#### Supabase (数据库)
1. 访问 [supabase.com](https://supabase.com)
2. 创建免费账号
3. 创建新项目
4. 记录以下信息：
   - Project URL (项目 URL)
   - Anon/Public Key (公开密钥)

#### Cloudinary (文件存储)
1. 访问 [cloudinary.com](https://cloudinary.com)
2. 创建免费账号（25GB 存储空间）
3. 在 Dashboard 获取：
   - Cloud Name
   - API Key
   - API Secret

#### Vercel (前端部署)
1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 无需其他配置，稍后连接仓库

#### Render/Railway (后端部署)
选择其一：
- **Render**: [render.com](https://render.com) - 推荐，界面友好
- **Railway**: [railway.app](https://railway.app) - 配置简单

## 🗄️ 数据库设置 / Database Setup

### 在 Supabase 中创建表

1. 登录 Supabase Dashboard
2. 进入你的项目
3. 点击左侧 "SQL Editor"
4. 点击 "New Query"
5. 复制 `backend/database/schema.sql` 的内容
6. 粘贴到编辑器
7. 点击 "Run" 执行

✅ 完成后，你应该能在 "Table Editor" 中看到三个表：
- `questions`
- `answers`
- `categories`

## 🚀 后端部署 / Backend Deployment

### 使用 Render

1. **创建新的 Web Service**
   - 访问 [render.com/dashboard](https://dashboard.render.com)
   - 点击 "New +" → "Web Service"
   - 连接你的 GitHub 仓库
   - 选择 `quest-website` 仓库

2. **配置服务**
   - **Name**: `quest-backend`
   - **Region**: 选择离你最近的区域
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

3. **添加环境变量**
   
   在 "Environment" 标签页添加：
   ```
   SUPABASE_URL=你的_supabase_url
   SUPABASE_KEY=你的_supabase_key
   CLOUDINARY_CLOUD_NAME=你的_cloud_name
   CLOUDINARY_API_KEY=你的_api_key
   CLOUDINARY_API_SECRET=你的_api_secret
   PORT=3000
   ```

4. **部署**
   - 点击 "Create Web Service"
   - 等待部署完成（约 2-5 分钟）
   - 记录你的后端 URL，例如：`https://quest-backend.onrender.com`

### 使用 Railway（备选）

1. 登录 [railway.app](https://railway.app)
2. 点击 "New Project" → "Deploy from GitHub repo"
3. 选择你的仓库
4. 点击 "Add variables"，添加所有环境变量
5. 在 Settings 中设置：
   - Root Directory: `backend`
   - Start Command: `npm start`
6. 点击 "Deploy"

## 🌐 前端部署 / Frontend Deployment

### 使用 Vercel

1. **导入项目**
   - 访问 [vercel.com/new](https://vercel.com/new)
   - 点击 "Import Git Repository"
   - 选择你的 `quest-website` 仓库
   - 点击 "Import"

2. **配置项目**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **添加环境变量**
   
   在 "Environment Variables" 部分添加：
   ```
   VITE_API_URL=你的后端URL (例如: https://quest-backend.onrender.com)
   ```

4. **部署**
   - 点击 "Deploy"
   - 等待部署完成（约 1-3 分钟）
   - 你会得到一个 URL，例如：`https://quest-website.vercel.app`

5. **自定义域名（可选）**
   - 在项目设置中点击 "Domains"
   - 添加你的自定义域名
   - 按照指示配置 DNS

## ✅ 验证部署 / Verify Deployment

### 测试后端
访问：`https://your-backend-url.onrender.com/health`

应该返回：
```json
{
  "status": "ok",
  "message": "Quest API is running"
}
```

### 测试前端
1. 访问你的前端 URL
2. 测试语言切换
3. 尝试浏览页面
4. 尝试提交一个问题（文字）
5. 查看问题详情
6. 添加回答

## 🔄 自动部署 / Automatic Deployment

配置完成后，每次你推送代码到 GitHub 的 `main` 分支：
- ✅ Vercel 会自动重新部署前端
- ✅ Render/Railway 会自动重新部署后端

无需手动操作！

## 🐛 常见问题 / Troubleshooting

### 后端无法连接到 Supabase
- 检查环境变量是否正确设置
- 确保 Supabase URL 以 `https://` 开头
- 验证 API Key 是否为 "anon/public" key

### 前端无法调用后端 API
- 检查 `VITE_API_URL` 是否正确
- 确保后端 URL 没有尾随斜杠 `/`
- 查看浏览器控制台的错误信息

### 文件上传失败
- 验证 Cloudinary 凭证
- 检查文件大小限制（最大 50MB）
- 确保 Cloudinary 账号有足够的配额

### Render 服务休眠
免费版 Render 会在 15 分钟无活动后休眠。首次访问可能需要 30-60 秒唤醒。
解决方案：
- 升级到付费计划
- 使用定时 ping 服务保持活跃
- 接受首次加载较慢

## 📊 监控和维护 / Monitoring

### Vercel Dashboard
- 查看访问统计
- 监控构建日志
- 设置告警

### Render Dashboard
- 查看服务器日志
- 监控 CPU/内存使用
- 设置健康检查

### Supabase Dashboard
- 查看数据库使用情况
- 监控 API 请求
- 备份数据

## 🎉 完成！/ Done!

恭喜！你的 Quest 网站现在已经在线运行了！

Congratulations! Your Quest website is now live!

分享你的网站链接给朋友们吧！🚀

Share your website link with friends! 🚀

