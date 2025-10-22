# Quest - 双语问答平台 / Bilingual Q&A Platform

> "所有对星空大海的追问，都是对于自身意义的探寻"
> 
> "Every inquiry into the starry skies and the vast oceans is, in truth, a quest for the meaning of our own existence."

一个美观、现代化的双语（中英文）问答平台，支持文字、图片和视频三种提问方式。

A beautiful, modern bilingual (Chinese-English) Q&A platform supporting text, image, and video questions.

## ✨ 主要功能 / Features

- 🌌 **精美的宇宙主题首页** - Stunning cosmic-themed homepage
- 🌍 **完整双语支持** - Full bilingual support (Chinese/English)
- 💬 **多种提问方式** - Multiple question types (text, image, video)
- 🏷️ **智能分类系统** - Smart categorization system
- 📱 **响应式设计** - Fully responsive design
- ☁️ **云端存储** - Cloud storage for media files

## 🛠️ 技术栈 / Tech Stack

### 前端 / Frontend
- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Vue I18n** - 国际化插件
- **Vue Router** - 官方路由管理器

### 后端 / Backend
- **Node.js** - JavaScript 运行时
- **Express** - Web 应用框架
- **Supabase** - 开源 Firebase 替代品（PostgreSQL）
- **Cloudinary** - 图片和视频云存储

### 部署 / Deployment
- **Vercel** - 前端部署
- **Render/Railway** - 后端部署

## 🚀 快速开始 / Quick Start

### 前置要求 / Prerequisites

- Node.js >= 18.0.0
- npm 或 pnpm

### 安装 / Installation

1. 克隆仓库 / Clone the repository
```bash
git clone https://github.com/yourusername/quest-website.git
cd quest-website
```

2. 安装前端依赖 / Install frontend dependencies
```bash
cd frontend
npm install
```

3. 安装后端依赖 / Install backend dependencies
```bash
cd ../backend
npm install
```

4. 配置环境变量 / Configure environment variables

前端 `.env` 文件 / Frontend `.env`:
```bash
cp .env.example .env
# 编辑 .env 文件，填入后端 API URL
```

后端 `.env` 文件 / Backend `.env`:
```bash
cp .env.example .env
# 编辑 .env 文件，填入 Supabase 和 Cloudinary 凭证
```

5. 启动开发服务器 / Start development servers

前端 / Frontend:
```bash
cd frontend
npm run dev
```

后端 / Backend:
```bash
cd backend
npm run dev
```

前端将运行在 `http://localhost:5173`，后端将运行在 `http://localhost:3000`

## 📁 项目结构 / Project Structure

```
Quest/
├── frontend/                 # Vue 3 前端应用
│   ├── src/
│   │   ├── components/       # 可复用组件
│   │   ├── views/           # 页面组件
│   │   ├── i18n/            # 国际化配置
│   │   ├── api/             # API 调用
│   │   ├── assets/          # 静态资源
│   │   └── router/          # 路由配置
│   └── package.json
├── backend/                  # Node.js 后端应用
│   ├── routes/              # API 路由
│   ├── controllers/         # 业务逻辑
│   ├── config/              # 配置文件
│   └── package.json
├── .gitignore
├── README.md
└── CONTRIBUTING.md
```

## 🌐 在线访问 / Live Demo

- 🌍 **网站**: [https://your-project.vercel.app](https://your-project.vercel.app)
- 📡 **API**: [https://your-api.onrender.com](https://your-api.onrender.com)

## 🤝 贡献 / Contributing

我们欢迎所有形式的贡献！请查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解详情。

We welcome all contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📄 许可证 / License

MIT License - 详见 [LICENSE](./LICENSE) 文件

## 🙏 致谢 / Acknowledgments

感谢所有为这个项目做出贡献的开发者！

Thanks to all developers who contributed to this project!

---

**Made with ❤️ by the Quest Team**

