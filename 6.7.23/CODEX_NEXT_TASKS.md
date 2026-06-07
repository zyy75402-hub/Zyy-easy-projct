# Codex 后续任务清单

## P0：保持本地版可运行

- 不引入复杂框架
- 不需要登录
- 不需要数据库
- 保持 `index.html` 可直接本地打开
- 所有数据暂时保存在 `app.js` 中，后续再拆成 JSON

## P1：拆分数据结构

把 `app.js` 中的数据拆成以下文件：

```text
/data/mbti_mapping.json
/data/current_calibration_questions.json
/data/growth_environment_questions.json
/data/environment_impact_matrix.json
/data/growth_scripts.json
/data/result_templates.json
```

注意：如果直接用 `fetch()` 读取 JSON，file:// 本地打开可能遇到浏览器限制。可选方案：

1. 保持本地 server 运行方式
2. 用 Vite/React 等开发环境
3. 或继续把数据打包进 JS，等小范围测试版再拆分

## P2：增加结果页截图

实现一个按钮：

```text
保存我的结果图
```

可以考虑使用 html2canvas，但需要注意本地离线运行依赖问题。

## P3：增加测试记录导出

增加：

```text
导出本次测试 JSON
```

导出内容包括：

- MBTI 输入
- 当前表现校准题答案
- 成长环境题答案
- 选择的剧本
- 各阶段向量
- 最终结果文本

## P4：增加权重调试工具

做一个开发者面板：

- 可以直接调整现实环境剥离系数
- 可以直接调整新剧本塑形系数
- 可以显示某个维度为什么上升或下降
- 可以显示每道题对最终结果的贡献

## P5：准备小范围测试版

新增简单反馈：

```text
这个结果像我吗？
- 很像
- 有点像
- 不像

这个结果好笑吗？
- 好笑
- 一般
- 不好笑

你愿意截图分享吗？
- 愿意
- 不愿意

有没有冒犯或不舒服？
- 没有
- 有一点
- 有明显问题
```

本地可先保存到浏览器 localStorage，后续再接后端或表单工具。
