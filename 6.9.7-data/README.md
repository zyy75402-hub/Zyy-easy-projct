# 返老还童 / 我们都一样 6.9.7-data

匿名数据保存与管理员统计版。此版本基于 `6.9.6`，保留原静态前端和核心算法，只增加 Netlify Functions、Netlify Blobs 和一个简单管理员统计页。

## 项目结构

- `index.html`：主测试页面
- `styles.css`：主站和管理员页样式
- `app.js`：前端测试、结果展示、分享图、匿名提交逻辑
- `admin.html`：管理员统计页面
- `admin.js`：管理员统计页交互
- `netlify/functions/submit-result.mts`：匿名结果提交接口
- `netlify/functions/admin-stats.mts`：管理员统计接口
- `assets/objects/stickers/`：线上运行需要的物件贴纸图
- `package.json`：Netlify Functions 依赖
- `netlify.toml`：Netlify 发布和函数目录配置

## 本地运行

静态页面可以直接打开 `index.html` 试玩，但 Netlify Functions 和 Blobs 需要通过 Netlify 本地环境运行：

```bash
npm install
npm run dev
```

如果本机没有 Netlify CLI，可以安装：

```bash
npm install -D netlify-cli
```

## Netlify Functions

接口路径：

- `/.netlify/functions/submit-result`
- `/.netlify/functions/admin-stats`

`submit-result` 只接受 `POST`，保存匿名摘要。保存失败不会影响用户查看结果页。

`admin-stats` 只接受 `POST`，需要通过请求 header 传入管理员密钥：

```text
x-admin-secret: 管理员密钥
```

## Netlify Blobs

匿名提交保存到 Netlify Blobs：

```text
personality-submissions
```

每次提交保存为独立对象：

```text
submissions/{createdAtSafe}_{randomId}.json
```

不会把所有提交写进同一个 JSON 文件。

## 环境变量

请在 Netlify 后台设置：

```text
ADMIN_SECRET=请在 Netlify 后台设置
```

不要把真实密钥写进代码、README 或 GitHub。

## 管理员页面

部署后访问：

```text
/admin.html
```

页面会要求输入管理员密钥。密钥只保存在当前页面内存中，不写入 `localStorage`，刷新后需要重新输入。

管理员页展示：

- 总提交数
- MBTI 结果分布
- 物件结果分布
- 每日提交数量
- 最近匿名提交摘要

管理员页不展示完整答案、debugResult、IP、定位、姓名、手机号、微信号、学校或地址。

## 隐私说明

此版本会保存匿名结果摘要用于内测统计。

保存：

- 输入 MBTI
- 当前 MBTI
- 初始化 MBTI
- 物件结果
- 删除清单标题
- 保留清单标题
- 置信度
- 题目 id 到 1-7 数字答案的映射
- 设备类型 `mobile` / `desktop`
- 浏览器语言

不保存：

- `debugResult`
- `currentAxis`
- `initAxis`
- `envDelta`
- `traitScores`
- `matchScore`
- 答题用时
- 完整 userAgent
- IP
- 定位
- 姓名、手机号、微信号、学校、地址、身份证
- 题目完整文本
- 开放式个人经历

## 部署

Netlify 使用当前目录作为发布目录：

```toml
[build]
  publish = "."
  functions = "netlify/functions"
```

部署前确保 Netlify 已设置 `ADMIN_SECRET`。

## 验收步骤

1. 打开首页，确认主测试流程正常。
2. 完成答题，确认结果页正常显示。
3. 确认分享图生成和下载仍可用。
4. 打开 `?debug=1`，确认 debug 面板仍可用。
5. 进入结果页后检查 `submit-result` 只提交一次。
6. 切换温柔版 / 嘴毒版，确认不会重复提交。
7. 点击生成分享图，确认不会重复提交。
8. 在 Netlify Blobs 中确认出现独立提交对象。
9. 访问 `/admin.html`。
10. 输入错误密钥，确认返回无权限。
11. 输入正确密钥，确认能看到匿名统计。
12. 搜索前端代码，确认没有真实 `ADMIN_SECRET`。
