# Quest 项目实施计划 / Project Implementation Plan

**双语问答平台 - 追问星空大海**

A Bilingual Q&A Platform - Inquiry into the Cosmos

---

## 🎯 项目概述 / Project Overview

Quest 是一个美观、现代化的双语（中英文）问答平台，专注于探讨人生、哲学、科学等深刻问题。用户可以通过文字、图片或视频三种方式提问和分享见解。

Quest is a beautiful, modern bilingual (Chinese-English) Q&A platform focused on exploring profound questions about life, philosophy, and science. Users can ask questions and share insights through text, images, or videos.

### 核心理念 / Core Philosophy

> **"所有对星空大海的追问，都是对于自身意义的探寻"**
> 
> **"Every inquiry into the starry skies and the vast oceans is, in truth, a quest for the meaning of our own existence."**

---

## 🏗️ 技术架构 / Technical Architecture

### 前端 / Frontend
- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **样式**: Tailwind CSS (自定义宇宙主题)
- **路由**: Vue Router 4
- **国际化**: Vue I18n
- **HTTP 客户端**: Axios

### 后端 / Backend
- **运行时**: Node.js 18+
- **框架**: Express
- **数据库**: Supabase (PostgreSQL)
- **文件存储**: Cloudinary
- **文件上传**: Multer

### 部署 / Deployment
- **前端**: Vercel (免费，自动部署)
- **后端**: Render/Railway (免费)
- **数据库**: Supabase (免费 500MB)
- **存储**: Cloudinary (免费 25GB)

---

## 📁 项目结构 / Project Structure

```
Quest/
├── frontend/                    # Vue 3 前端应用
│   ├── src/
│   │   ├── views/              # 页面组件
│   │   │   ├── HomePage.vue    # 主页 - 宇宙背景 + 漂浮问题
│   │   │   ├── BrowsePage.vue  # 浏览页 - 问题列表 + 筛选
│   │   │   ├── AskPage.vue     # 提问页 - 三种提问方式
│   │   │   └── QuestionDetail.vue # 详情页 - 问答展示
│   │   ├── components/
│   │   │   ├── Navigation.vue  # 导航栏
│   │   │   └── LanguageSwitch.vue # 语言切换
│   │   ├── i18n/
│   │   │   ├── zh-CN.json     # 中文翻译
│   │   │   └── en-US.json     # 英文翻译
│   │   ├── api/
│   │   │   └── index.js       # API 封装
│   │   ├── router/
│   │   │   └── index.js       # 路由配置
│   │   └── assets/
│   │       └── main.css       # 全局样式
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                     # Node.js 后端应用
│   ├── routes/
│   │   ├── questions.js        # 问题路由
│   │   ├── categories.js       # 分类路由
│   │   └── upload.js           # 上传路由
│   ├── controllers/
│   │   ├── questionsController.js
│   │   ├── categoriesController.js
│   │   └── uploadController.js
│   ├── config/
│   │   ├── supabase.js         # Supabase 配置
│   │   └── cloudinary.js       # Cloudinary 配置
│   ├── database/
│   │   └── schema.sql          # 数据库 Schema
│   ├── server.js               # 服务器入口
│   └── package.json
│
├── .gitignore                   # Git 忽略文件
├── README.md                    # 项目说明
├── CONTRIBUTING.md              # 贡献指南
├── DEPLOYMENT.md                # 部署指南
├── SETUP.md                     # 本地开发设置
└── PROJECT_PLAN.md             # 本文件
```

---

## 🎨 核心功能 / Core Features

### 1. 主页 (HomePage)
- ✨ 全屏宇宙背景（渐变 + 星空粒子动画）
- 💫 双语标语居中展示
- 🎈 8 个漂浮的哲学问题（双语，随机位置，浮动动画）
- 🌐 语言切换按钮（右上角）
- 🧭 导航按钮（浏览问答、我要提问）

### 2. 浏览页 (BrowsePage)
- 🏷️ 分类筛选：全部 | 哲学 | 科学 | 人生 | 存在 | 自定义
- 📋 类型筛选：全部 | 文字 | 图片 | 视频
- 🔍 搜索功能
- 📱 响应式卡片布局
- 🕐 显示问题摘要、分类、类型、时间、回答数

### 3. 提问页 (AskPage)
- 📝 三个选项卡：文字 | 图片 | 视频
- 📤 文件上传（拖拽或点击）
- 🏷️ 分类选择（预设 + 自定义）
- ✅ 表单验证
- 🎉 提交成功提示

### 4. 问答详情页 (QuestionDetail)
- 📖 问题完整展示（含图片/视频）
- 💬 回答列表
- ✍️ 添加回答功能
- 🏷️ 显示分类和时间
- 🔙 返回按钮

### 5. 国际化
- 🌍 完整双语支持（中文 / English）
- 💾 语言偏好保存到 localStorage
- 🔄 实时切换，无需刷新

---

## 🗄️ 数据库设计 / Database Schema

### Questions 表
```sql
- id (UUID, PK)
- title (VARCHAR, 可选)
- content (TEXT, 必填)
- type (ENUM: text/image/video)
- media_url (TEXT, 可选)
- category (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Answers 表
```sql
- id (UUID, PK)
- question_id (UUID, FK → questions.id)
- content (TEXT, 必填)
- created_at (TIMESTAMP)
```

### Categories 表
```sql
- id (UUID, PK)
- name_cn (VARCHAR)
- name_en (VARCHAR)
```

**预设分类**: 哲学、科学、人生、存在

---

## 🌐 API 端点 / API Endpoints

```
GET    /api/questions          获取问题列表（支持筛选）
GET    /api/questions/:id      获取单个问题详情
POST   /api/questions          创建新问题
POST   /api/questions/:id/answers  添加回答
GET    /api/categories         获取分类列表
POST   /api/upload            上传文件到 Cloudinary
GET    /health                健康检查
```

---

## 🚀 快速开始 / Quick Start

### 本地开发
查看 [SETUP.md](./SETUP.md) 了解详细的本地开发设置。

### 部署上线
查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 了解完整的部署流程。

### 基本步骤：

1. **克隆项目**
```bash
git clone https://github.com/yourusername/quest-website.git
cd quest-website
```

2. **安装依赖**
```bash
# 前端
cd frontend && npm install

# 后端
cd ../backend && npm install
```

3. **配置环境变量**
   - 注册 Supabase 和 Cloudinary
   - 创建 `.env` 文件
   - 填入凭证

4. **启动开发服务器**
```bash
# 后端 (终端 1)
cd backend && npm run dev

# 前端 (终端 2)
cd frontend && npm run dev
```

5. **访问**
   - 前端: http://localhost:5173
   - 后端: http://localhost:3000

---

## 🎨 设计特色 / Design Highlights

### 宇宙主题色彩
```javascript
cosmic: {
  dark: '#0a0e27',      // 深空背景
  purple: '#1a1333',    // 紫色星云
  blue: '#0f2847',      // 深蓝宇宙
  accent: '#4a5fff',    // 明亮强调色
  glow: '#7c3aed'       // 发光效果
}
```

### 动画效果
- `float`: 漂浮动画 (6s)
- `twinkle`: 星星闪烁 (3s)
- `drift`: 缓慢漂移 (20s)

### 响应式设计
- 移动端优先
- 断点：sm (640px), md (768px), lg (1024px)
- 所有页面完全响应式

---

## 🤝 贡献 / Contributing

我们欢迎所有形式的贡献！

We welcome all contributions!

### 贡献方式
1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

详见 [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 📝 待办事项 / Todo List

- [x] 初始化项目结构
- [x] 创建数据库 Schema
- [x] 实现后端 API
- [x] 实现前端页面
- [x] 配置国际化
- [x] 设计宇宙主题
- [x] 创建项目文档
- [ ] 部署到生产环境
- [ ] 添加用户认证（可选）
- [ ] 添加点赞/收藏功能（可选）
- [ ] SEO 优化
- [ ] 性能优化

---

## 📊 项目指标 / Project Metrics

### 技术指标
- **前端包大小**: ~500KB (gzipped)
- **首次加载时间**: < 2s
- **Lighthouse 分数**: 目标 90+
- **浏览器支持**: Chrome, Firefox, Safari, Edge (最新两个版本)

### 免费额度
- **Vercel**: 无限带宽 (个人项目)
- **Render**: 750 小时/月 (Free tier)
- **Supabase**: 500MB 数据库 + 1GB 文件存储
- **Cloudinary**: 25GB 存储 + 25GB 带宽/月

---

## 🔒 安全考虑 / Security

- ✅ 所有 API 请求使用 HTTPS
- ✅ 环境变量不提交到 Git
- ✅ Supabase Row Level Security (RLS) 已启用
- ✅ 文件上传大小限制 (50MB)
- ✅ CORS 配置
- ⚠️ 当前无用户认证（匿名访问）

---

## 📞 支持 / Support

遇到问题？

Having issues?

- 📖 查看文档：README.md, SETUP.md, DEPLOYMENT.md
- 🐛 提交 Issue：GitHub Issues
- 💬 讨论：GitHub Discussions

---

## 📄 许可证 / License

MIT License - 详见 [LICENSE](./LICENSE)

---

## 🌟 致谢 / Acknowledgments

感谢以下开源项目：

Thanks to these open source projects:

- Vue.js
- Vite
- Tailwind CSS
- Express
- Supabase
- Cloudinary

---

**Made with ❤️ for everyone questioning the cosmos**

**为所有追问宇宙的人用心制作**

