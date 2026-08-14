# NewLuck.store — Minimal B2C E-Commerce

> 极简纯白高级风 · 纯静态外贸B2C电商网站
> 适配域名：**newluck.store**

---

## 项目概述

100% 纯静态 HTML5 + CSS3 + JavaScript 外贸独立站，无需后端、无需数据库、无需任何框架，上传服务器即可直接运行。

- **经营类目**：Clothing（服饰）、Accessories（配饰）、Home Goods（家居百货）
- **视觉风格**：极简纯白高级风、大量留白、柔和轻阴影、扁平化欧美简约UI
- **适配设备**：电脑、平板、手机全响应式

---

## 目录结构

```
newluck/
├── index.html          # 首页
├── list.html           # 产品列表页
├── detail.html         # 产品详情页
├── cart.html           # 购物车页面
├── shipping.html       # 物流政策
├── return.html         # 退换货政策
├── faq.html            # 常见问题
├── contact.html        # 联系我们
├── css/
│   └── style.css       # 全站样式表
├── js/
│   └── main.js         # 全站交互逻辑
├── images/             # 图片目录（预留占位）
└── README.md           # 本文件
```

---

## 本地预览

### 方式一：直接打开浏览器

双击 `index.html` 即可在浏览器中预览。

### 方式二：使用 Python 本地服务器（推荐）

```bash
cd newluck
python -m http.server 8080
```

然后访问 http://localhost:8080

### 方式三：使用 Node.js 本地服务器

```bash
npx serve .
```

### 方式四：使用 VS Code Live Server

1. 安装 VS Code 扩展 "Live Server"
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

---

## 部署上线

### 1. 上传到服务器

将整个 `newluck` 文件夹内容上传到服务器网站根目录：

```bash
# 使用 scp
scp -r newluck/* user@your-server:/var/www/newluck.store/

# 使用 rsync
rsync -avz newluck/ user@your-server:/var/www/newluck.store/
```

### 2. Nginx 配置示例

```nginx
server {
    listen 80;
    server_name newluck.store www.newluck.store;
    root /var/www/newluck.store;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # 静态资源缓存
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|webp)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
}
```

### 3. 部署到 GitHub Pages

```bash
cd newluck
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/newluck.git
git push -u origin main
```

然后在 GitHub 仓库 Settings → Pages 中启用。

### 4. 部署到 Netlify / Vercel

直接将 `newluck` 文件夹拖拽到 Netlify 或 Vercel 的部署页面即可。

### 5. 部署到 Cloudflare Pages

```bash
# 推送到 Git 仓库后，在 Cloudflare Pages 中连接仓库
# Build 设置：无需构建命令
# Output directory: /（根目录）
```

---

## SSL / HTTPS 配置

建议使用 Let's Encrypt 免费证书：

```bash
# 安装 certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d newluck.store -d www.newluck.store

# 自动续期
sudo certbot renew --dry-run
```

---

## 图片替换指南

当前所有图片为占位状态。替换时请遵循以下规范：

| 图片类型 | 尺寸 | 文件名示例 |
|---------|------|-----------|
| Banner 轮播 | 1920×650 | banner-1.jpg, banner-2.jpg, banner-3.jpg |
| 分类图 | 800×800 | cat-clothing.jpg, cat-accessories.jpg, cat-home.jpg |
| 商品图 | 600×600 | product-1.jpg ~ product-18.jpg |

**推荐无版权图片来源：**
- [Pexels](https://www.pexels.com)
- [Pixabay](https://pixabay.com)
- [Burst by Shopify](https://burst.shopify.com)
- [Unsplash](https://unsplash.com)

---

## 商品数据管理

商品数据存储在 `js/main.js` 文件中的 `PRODUCTS` 数组中。添加新商品：

```javascript
{
  id: 19,                          // 唯一ID
  name: "Product Name",            // 商品名称
  category: "clothing",            // 分类：clothing / accessories / home
  price: 49.00,                    // 售价
  originalPrice: 69.00,            // 原价（可选，用于显示划线价）
  image: "images/product-19.jpg",  // 图片路径
  badge: "new",                    // 标签：new / sale / 留空
  sizes: ["S","M","L"],            // 尺码选项
  colors: ["Black","White"],       // 颜色选项
  desc: "Product description..."   // 英文产品描述
}
```

---

## 功能清单

- [x] 全站统一导航 + 分类下拉菜单
- [x] 首页全屏自动轮播 Banner
- [x] 三大类目图片分类入口
- [x] New Arrivals / Hot Sale 滚动展示
- [x] 商品卡片 hover Add To Cart
- [x] Free Shipping 促销横幅
- [x] 产品列表页：分类筛选 + 价格排序
- [x] 产品详情页：图片预览 + 尺码颜色选择
- [x] 购物车：增减数量 + 删除 + 自动计算
- [x] 全站响应式适配
- [x] 右下角返回顶部按钮
- [x] 四大合规页面（物流/退换货/FAQ/联系我们）
- [x] 社媒图标 + 支付图标
- [x] 全站 SEO 优化配置
- [x] 本地存储购物车数据

---

## SEO 配置

每页已配置独立的：
- `<title>` — 页面标题
- `<meta name="description">` — 搜索描述
- `<meta name="keywords">` — 关键词
- `<link rel="canonical">` — 规范链接
- `<meta name="robots">` — 爬虫指令

建议补充：
- Google Search Console 提交 sitemap
- 添加 `sitemap.xml` 和 `robots.txt`
- 配置 Google Analytics 统计代码

---

## 公司信息

全站已配置以下公司信息（位于所有页面页脚及联系页面）：

| 项目 | 内容 |
|------|------|
| 公司名称 | HK NEWLUCK LIMITED |
| 联系人 | KAIHUI FAN |
| 邮箱 | info@newluck.store |
| 电话 | 53235764 |
| 地址 | Rm 1406C, The Belgian Bank Building, 721-725 Nathan Road, Mong Kok, Hong Kong |

如需修改，搜索以上内容进行全局替换即可。

---

## License

This project is provided as-is for commercial use. All rights reserved.
