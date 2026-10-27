# AI 学习训练营 · 香港中文大学（深圳）

香港中文大学（深圳）× 腾讯云 AI 交流圈校园活动官网。四周 AI 实操训练营：不讲课、不讲概念，每周只做一件事、每周边做一个成果，零代码门槛。

**线上地址**：<https://cuhksz-ai-bootcamp.app.workbuddy.host/>

## 活动信息

- **周期**：训练营自成 28 天时钟，与真实日历无关 —— W1 = Day 1–7 ｜ W2 = Day 8–14 ｜ W3 = Day 15–21 ｜ W4 = Day 22–28
- **形式**：纯实操 · 每周一个成果 · 无需代码基础
- **四周路线**：
  | 周次 | 主题 | 时长 |
  |---|---|---|
  | W1 | 安装 WorkBuddy，搭好个人 AI 工作台 | 25 min |
  | W2 | 基于 ima 搭建个人知识库 | 30+40 min |
  | W3 | 做第一个属于你的 Skill | 40 min |
  | W4 | 做个人网页并上线 | 60 min |

## 网站功能

- 📅 **课程日历**：四周排期总览，卡片点击进入每周详情
- 📄 **教学文件下载**：4 份 Markdown 教学文件（`assets/teaching/`），拖进 WorkBuddy 对话框即可跟着做
- 🎯 **互动玩法**：群接龙话题卡，一键复制文案
- ✅ **打卡系统**：本地进度记录 + 打卡格式模板
- ❓ **FAQ**：常见问题手风琴折叠

## 项目结构

```
site/
├── index.html          # 单页应用入口（hash 路由：#/week/1-4、#/docs、#/plays 等）
├── style.css           # 全站样式（紫色主题，CSS 变量驱动）
├── script.js           # 交互逻辑（路由、打卡、鼠标拖尾等）
└── assets/
    ├── teaching/       # W1-W4 教学文件（Markdown）
    ├── icons/          # 每周图标
    ├── cuhk-badge.png  # 港中深校徽
    ├── campus-gate.png # 校门线稿（页脚装饰）
    ├── campus-map.jpg  # 开屏校园导览图
    └── qr-group.png    # 入群二维码
```

## 本地运行

纯静态站，无需构建。任选其一：

```bash
# 方式一：Python
python -m http.server 8899

# 方式二：VS Code Live Server / 直接双击 index.html
```

打开 <http://127.0.0.1:8899/> 即可预览。

## 自定义

- **换学校/主题**：主题色集中在 `style.css` 顶部的 CSS 变量区，改一处即可全局生效
- **换二维码**：替换 `assets/qr-group.png`（建议 400×400 正方形）
- **改课程内容**：编辑 `index.html` 内对应周次区块与 `assets/teaching/` 下的教学文件

## 致谢

- 活动模式与初始模板参考腾讯云 AI 校园大使社群运营规范
- 原站由武昌理工学院校园大使搭建，本版本为港中大（深圳）校园大使定制
- 校徽、校门线稿素材来自 [港中大（深圳）官网](https://www.cuhk.edu.cn/zh-hans)

---

由港中大（深圳）腾讯云校园大使维护 · 2026 年 9 月
