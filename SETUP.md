# 本地开发设置指南 / Local Development Setup

快速开始本地开发环境。

Quick start guide for local development.

## 📦 前置要求 / Prerequisites

确保你的系统已安装：

Make sure you have installed:

- **Node.js** >= 18.0.0 ([下载 Download](https://nodejs.org/))
- **npm** 或 **pnpm** (npm 随 Node.js 一起安装)
- **Git** ([下载 Download](https://git-scm.com/))

验证安装 / Verify installation:
```bash
node --version   # 应该显示 v18.0.0 或更高
npm --version    # 应该显示 8.0.0 或更高
```

## 🚀 快速开始 / Quick Start

### 1. 克隆仓库 / Clone Repository

```bash
git clone https://github.com/yourusername/quest-website.git
cd quest-website
```

### 2. 安装依赖 / Install Dependencies

**前端 Frontend:**
```bash
cd frontend
npm install
```

**后端 Backend:**
```bash
cd ../backend
npm install
```

### 3. 配置环境变量 / Configure Environment Variables

#### 前端配置 / Frontend Configuration

创建 `frontend/.env` 文件：
```bash
cd frontend
touch .env
```

添加以下内容：
```env
VITE_API_URL=http://localhost:3000
```

#### 后端配置 / Backend Configuration

创建 `backend/.env` 文件：
```bash
cd ../backend
touch .env
```

添加以下内容：
```env
# Supabase 配置（需要先在 supabase.com 创建项目）
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_anon_key_here

# Cloudinary 配置（需要先在 cloudinary.com 注册）
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# 服务器端口
PORT=3000
```

⚠️ **重要**: 需要先注册以下服务并获取凭证：

1. **Supabase** (免费): https://supabase.com
   - 创建项目后在 Settings → API 获取 URL 和 Key
   - 运行 `backend/database/schema.sql` 创建表

2. **Cloudinary** (免费 25GB): https://cloudinary.com
   - 在 Dashboard 获取凭证

### 4. 设置数据库 / Setup Database

1. 登录你的 Supabase 项目
2. 进入 SQL Editor
3. 复制 `backend/database/schema.sql` 的内容
4. 粘贴并执行

### 5. 启动开发服务器 / Start Development Servers

**方式一：分别启动 (推荐)**

在第一个终端窗口启动后端：
```bash
cd backend
npm run dev
```

在第二个终端窗口启动前端：
```bash
cd frontend
npm run dev
```

**方式二：后台运行**
```bash
# 后端
cd backend
npm run dev &

# 前端
cd frontend
npm run dev
```

### 6. 访问应用 / Access Application

- 🌐 **前端**: http://localhost:5173
- 🔌 **后端 API**: http://localhost:3000
- ✅ **健康检查**: http://localhost:3000/health

## 🧪 测试功能 / Testing Features

### 测试语言切换 / Test Language Switch
1. 访问首页
2. 点击右上角的语言切换按钮
3. 验证所有文本都正确切换

### 测试提问功能 / Test Question Submission
1. 点击 "我要提问" / "Ask"
2. 选择问题类型（文字/图片/视频）
3. 填写表单并提交
4. 在浏览页面查看新问题

### 测试回答功能 / Test Answer Feature
1. 进入任意问题详情页
2. 在底部添加回答
3. 提交后查看回答列表

## 📁 项目结构 / Project Structure

```
Quest/
├── frontend/               # Vue 3 前端
│   ├── src/
│   │   ├── views/         # 页面组件
│   │   ├── components/    # 可复用组件
│   │   ├── i18n/          # 国际化配置
│   │   ├── api/           # API 调用
│   │   └── router/        # 路由配置
│   └── package.json
│
├── backend/               # Node.js 后端
│   ├── routes/           # API 路由
│   ├── controllers/      # 业务逻辑
│   ├── config/           # 配置文件
│   └── database/         # 数据库 schema
│
├── README.md
├── DEPLOYMENT.md         # 部署指南
└── CONTRIBUTING.md       # 贡献指南
```

## 🔧 常用命令 / Common Commands

### 前端 Frontend
```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run preview  # 预览生产构建
```

### 后端 Backend
```bash
npm run dev      # 启动开发服务器 (带热重载)
npm start        # 启动生产服务器
```

## 🐛 常见问题 / Troubleshooting

### 端口已被占用
如果 3000 或 5173 端口被占用：

**macOS/Linux:**
```bash
# 查找占用端口的进程
lsof -i :3000
lsof -i :5173

# 终止进程
kill -9 <PID>
```

**Windows:**
```cmd
# 查找占用端口的进程
netstat -ano | findstr :3000

# 终止进程
taskkill /PID <PID> /F
```

或者修改端口：
- 前端：在 `frontend/vite.config.js` 中修改 `server.port`
- 后端：在 `backend/.env` 中修改 `PORT`

### 依赖安装失败
尝试清理缓存后重新安装：
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Supabase 连接失败
1. 检查 `.env` 文件中的凭证
2. 确保 URL 格式正确：`https://xxxxx.supabase.co`
3. 验证使用的是 "anon/public" key 而非 "service_role" key

### Cloudinary 上传失败
1. 验证所有三个凭证都已正确设置
2. 检查文件大小（最大 50MB）
3. 确认 Cloudinary 账号状态正常

## 💡 开发技巧 / Development Tips

### 热重载 / Hot Reload
- 前端修改会自动刷新浏览器
- 后端使用 `--watch` 模式自动重启

### 调试 / Debugging
- 前端：使用浏览器 DevTools (F12)
- 后端：查看终端输出的日志

### 数据库查看 / View Database
访问 Supabase Dashboard → Table Editor 查看和编辑数据

## 🎨 自定义 / Customization

### 修改主题颜色
编辑 `frontend/tailwind.config.js` 中的 `cosmic` 颜色配置

### 添加新的翻译
在 `frontend/src/i18n/` 中的 JSON 文件添加新的键值对

### 修改数据库结构
1. 在 Supabase SQL Editor 执行 ALTER 语句
2. 更新对应的控制器代码

## 📚 学习资源 / Learning Resources

- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [Express 文档](https://expressjs.com/)
- [Supabase 文档](https://supabase.com/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/)

## 🤝 需要帮助？ / Need Help?

- 查看 [CONTRIBUTING.md](./CONTRIBUTING.md)
- 创建 GitHub Issue
- 查看项目 Wiki

---

开始编码吧！Happy coding! 🚀

