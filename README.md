# 头像生成器

生成 500×500 PNG 头像，支持自定义文字、字体、颜色和背景图片。

## 功能

- **9 种 Google Fonts** — 无衬线、衬线、手写、等宽风格，全部预加载
- **文字控制** — 内容、字体、字重（100-900）、字号（自动/手动）
- **纯色背景** — 预设配色 + 自定义颜色，对比度不足时自动警告
- **图片背景** — 上传图片，手动拖拽+缩放裁剪，文字叠加半透明圆角背景
- **拖拽定位** — 图片模式下可拖拽调整文字位置
- **导出 PNG** — 一键下载 500×500 头像
- **本地持久化** — 配置自动保存到 localStorage

## 快速开始

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:5173`

## 技术栈

- React 18 + TypeScript
- Vite
- Tailwind CSS 3
- Canvas API

## 命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 开发服务器 |
| `npm run build` | 类型检查 + 生产构建 |
| `npm run preview` | 预览生产构建 |

## License

MIT
