# 📁 项目文件清单 / Project File List

Quest 双语问答平台 - 完整文件列表

---

## 📋 根目录文件 / Root Files

| 文件 | 说明 | Purpose |
|------|------|---------|
| `.gitignore` | Git 忽略配置 | Git ignore configuration |
| `README.md` | 项目说明（主文档） | Project overview (main doc) |
| `CONTRIBUTING.md` | 贡献指南 | Contributing guidelines |
| `DEPLOYMENT.md` | 部署指南 | Deployment guide |
| `SETUP.md` | 本地开发设置 | Local development setup |
| `QUICKSTART.md` | 快速开始指南 | Quick start guide |
| `PROJECT_PLAN.md` | 项目实施计划 | Project implementation plan |
| `FILES.md` | 本文件 - 文件清单 | This file - file list |
| `LICENSE` | MIT 开源许可证 | MIT License |

---

## 🎨 前端文件 / Frontend Files

### 配置文件 / Configuration Files
```
frontend/
├── package.json          # 依赖和脚本配置
├── vite.config.js        # Vite 构建配置
├── tailwind.config.js    # Tailwind CSS 配置
├── postcss.config.js     # PostCSS 配置
├── index.html            # HTML 入口文件
└── .env.example          # 环境变量示例（需手动创建）
```

### 源代码 / Source Code
```
frontend/src/
├── main.js              # 应用入口
├── App.vue              # 根组件
│
├── views/               # 页面组件
│   ├── HomePage.vue     # 主页（宇宙背景 + 漂浮问题）
│   ├── BrowsePage.vue   # 浏览页（问题列表 + 筛选）
│   ├── AskPage.vue      # 提问页（三种提问方式）
│   └── QuestionDetail.vue # 详情页（问答展示）
│
├── components/          # 可复用组件
│   ├── Navigation.vue   # 导航栏
│   └── LanguageSwitch.vue # 语言切换按钮
│
├── router/              # 路由配置
│   └── index.js         # Vue Router 配置
│
├── i18n/                # 国际化
│   ├── index.js         # Vue I18n 配置
│   ├── zh-CN.json       # 中文翻译
│   └── en-US.json       # 英文翻译
│
├── api/                 # API 封装
│   └── index.js         # Axios API 客户端
│
└── assets/              # 静态资源
    └── main.css         # 全局样式（Tailwind）
```

**前端文件总数**: 15 个核心文件

---

## ⚙️ 后端文件 / Backend Files

### 配置文件 / Configuration Files
```
backend/
├── package.json         # 依赖和脚本配置
├── server.js            # 服务器入口文件
└── .env.example         # 环境变量示例（需手动创建）
```

### 源代码 / Source Code
```
backend/
├── config/              # 配置模块
│   ├── supabase.js      # Supabase 数据库配置
│   └── cloudinary.js    # Cloudinary 云存储配置
│
├── routes/              # API 路由
│   ├── questions.js     # 问题相关路由
│   ├── categories.js    # 分类相关路由
│   └── upload.js        # 文件上传路由
│
├── controllers/         # 业务逻辑控制器
│   ├── questionsController.js   # 问题 CRUD 逻辑
│   ├── categoriesController.js  # 分类查询逻辑
│   └── uploadController.js      # 文件上传逻辑
│
└── database/            # 数据库
    └── schema.sql       # PostgreSQL 数据库 Schema
```

**后端文件总数**: 11 个核心文件

---

## 📊 文件统计 / File Statistics

| 类型 | 数量 | Type | Count |
|------|------|------|-------|
| 前端组件 | 6 个 | Frontend Components | 6 |
| 后端 API | 3 个路由 + 3 个控制器 | Backend API | 3 routes + 3 controllers |
| 配置文件 | 8 个 | Config Files | 8 |
| 文档文件 | 9 个 | Documentation | 9 |
| 国际化 | 2 种语言 | i18n | 2 languages |

**总计**: 约 30+ 个核心文件

---

## 🔑 需要手动创建的文件 / Files to Create Manually

这些文件包含敏感信息，不包含在 Git 仓库中：

These files contain sensitive information and are not in Git:

### 1. `frontend/.env`
```env
VITE_API_URL=http://localhost:3000
```

### 2. `backend/.env`
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=3000
```

参考 `.env.example` 文件获取更多信息。

Refer to `.env.example` files for more information.

---

## 📦 依赖包 / Dependencies

### 前端依赖 / Frontend Dependencies
- **核心**: vue, vue-router, vue-i18n
- **HTTP**: axios
- **样式**: tailwindcss, postcss, autoprefixer
- **构建**: vite, @vitejs/plugin-vue

### 后端依赖 / Backend Dependencies
- **核心**: express, cors, dotenv
- **数据库**: @supabase/supabase-js
- **文件处理**: cloudinary, multer

---

## 🚀 下一步 / Next Steps

1. ✅ **所有代码已创建** - All code is created
2. ⚠️ **需要配置环境变量** - Need to configure .env files
3. ⚠️ **需要安装依赖** - Need to install dependencies
4. ⚠️ **需要注册外部服务** - Need to register external services
5. 🚀 **准备运行和部署** - Ready to run and deploy

查看 `QUICKSTART.md` 快速开始！

See `QUICKSTART.md` to get started quickly!

---

## 📂 文件夹结构可视化 / Visual Structure

```
Quest/
│
├── 📄 根目录文档 (9 个 MD 文件 + LICENSE)
│   ├── README.md
│   ├── QUICKSTART.md
│   ├── SETUP.md
│   ├── DEPLOYMENT.md
│   ├── CONTRIBUTING.md
│   ├── PROJECT_PLAN.md
│   ├── FILES.md
│   ├── LICENSE
│   └── .gitignore
│
├── 🎨 frontend/ (前端应用)
│   ├── 📋 配置 (5 个文件)
│   └── 📁 src/
│       ├── views/ (4 个页面)
│       ├── components/ (2 个组件)
│       ├── router/ (路由配置)
│       ├── i18n/ (双语配置)
│       ├── api/ (API 客户端)
│       └── assets/ (样式)
│
└── ⚙️ backend/ (后端 API)
    ├── 📋 配置 (2 个文件)
    ├── config/ (2 个配置)
    ├── routes/ (3 个路由)
    ├── controllers/ (3 个控制器)
    └── database/ (SQL Schema)
```

---

**项目已完全搭建！Ready to launch! 🚀**

