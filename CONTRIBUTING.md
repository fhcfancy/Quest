# 贡献指南 / Contributing Guide

感谢您考虑为 Quest 项目做出贡献！

Thank you for considering contributing to the Quest project!

## 🌟 如何贡献 / How to Contribute

### 报告问题 / Reporting Issues

如果您发现了 bug 或有功能建议：

If you find a bug or have a feature suggestion:

1. 检查 [Issues](https://github.com/yourusername/quest-website/issues) 确保问题未被报告
2. 使用清晰的标题和详细的描述创建新 issue
3. 如果可能，提供复现步骤和截图

### 提交代码 / Submitting Code

1. **Fork 本仓库**
   ```bash
   # 在 GitHub 上点击 Fork 按钮
   ```

2. **克隆您的 fork**
   ```bash
   git clone https://github.com/your-username/quest-website.git
   cd quest-website
   ```

3. **创建特性分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

4. **进行更改**
   - 编写清晰的代码
   - 遵循项目的代码风格
   - 添加必要的注释

5. **提交更改**
   ```bash
   git add .
   git commit -m "描述您的更改"
   ```

6. **推送到您的 fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **创建 Pull Request**
   - 在 GitHub 上打开 Pull Request
   - 提供清晰的标题和描述
   - 引用相关的 issue（如果有）

## 📝 代码规范 / Code Standards

### JavaScript/Vue 代码风格

- 使用 2 空格缩进
- 使用单引号（除非需要模板字符串）
- 组件名使用 PascalCase
- 变量和函数名使用 camelCase
- 常量使用 UPPER_SNAKE_CASE

### 提交信息规范 / Commit Message Guidelines

使用清晰、描述性的提交信息：

```
<type>: <subject>

<body>
```

**类型 / Types:**
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `test`: 添加测试
- `chore`: 构建过程或辅助工具的变动

**示例 / Examples:**
```
feat: 添加视频上传功能
fix: 修复分类筛选器的显示问题
docs: 更新 README 中的安装说明
```

## 🧪 测试 / Testing

在提交 PR 前：

Before submitting a PR:

1. 确保前端可以正常运行：`cd frontend && npm run dev`
2. 确保后端可以正常运行：`cd backend && npm run dev`
3. 测试您的更改在两种语言（中英文）下都能正常工作
4. 检查响应式设计在不同屏幕尺寸下的表现

## 🌍 国际化 / Internationalization

当添加新的 UI 文本时：

When adding new UI text:

1. 不要在组件中硬编码文字
2. 在 `frontend/src/i18n/zh-CN.json` 添加中文
3. 在 `frontend/src/i18n/en-US.json` 添加对应的英文
4. 在组件中使用 `$t('key')` 引用

## 🎨 设计原则 / Design Principles

- **美观性**: 保持界面干净、现代化
- **易用性**: 确保功能直观易懂
- **性能**: 优化加载时间和交互响应
- **可访问性**: 考虑不同用户的需求

## 📞 联系方式 / Contact

如有疑问，请：

If you have questions:

- 创建一个 issue
- 在 Pull Request 中评论

## 🙏 感谢 / Thank You

感谢您的贡献！每一个 PR 都让这个项目变得更好。

Thank you for your contribution! Every PR makes this project better.

