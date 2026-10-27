/* =========================================================
   AI 学习训练营 · 交互脚本
   • 所有内容都集中在下面的数据区里，改内容只用改数据区
   • ★ 时间锁已关闭：四周内容全部开放，同学可自由访问任意一周
   ========================================================= */

/* =========================================================
   〇、按周解锁配置（★ 已停用 ★）
   ---------------------------------------------------------
   时间锁功能已关闭：四周内容现在全部开放，同学可自由访问任意一周，
   不再按"每周一 08:00"逐周解锁。

   下面的 UNLOCK 对象被保留为参考，但 computeUnlocked() 已不再读取它
   （见"三、解锁逻辑"）。如需恢复时间锁，把 computeUnlocked() 改回
   原来的判定逻辑即可。
   ========================================================= */

/*
   训练营采用「营内天数」计时，与真实日历无关：
     W1 = Day 1–7 ｜ W2 = Day 8–14 ｜ W3 = Day 15–21 ｜ W4 = Day 22–28
   合计 28 天。页面只显示营内天数，不显示具体年月日。
   下表仅作为「时间锁」的内部时间轴参考（如需恢复逐周解锁时才用得上），
   当前 computeUnlocked() 不读取它。
*/
const UNLOCK = {
  mode: 'schedule',              // 'schedule' 按时间自动解锁 ｜ 'manual' 只认 forceUnlocked

  schedule: {
    1: '2026-10-19T00:00',       // 内部时间轴：第 1 天
    2: '2026-10-26T00:00',       // 内部时间轴：第 8 天
    3: '2026-11-02T00:00',       // 内部时间轴：第 15 天
    4: '2026-11-09T00:00',       // 内部时间轴：第 22 天
  },

  forceUnlocked: [],             // 例：要提前放行第 2 周，写成 [2]

  neverRelock: true,             // 解锁过就永久可见（学生点进来过一次，之后永远能回看）
};

/* 营内天数区间：W1 = Day 1–7，W2 = Day 8–14，W3 = Day 15–21，W4 = Day 22–28 */
function dayRangeOf(id) {
  const start = (id - 1) * 7 + 1;
  return { start, end: start + 6 };
}

/** 一个周次的营内天数文案，如「Day 1–7」 */
function fmtDayRange(id) {
  const r = dayRangeOf(id);
  return `Day ${r.start}–${r.end}`;
}

/* =========================================================
   一、数据区（改这里就行）
   ========================================================= */

const WEEKS = [
  /* ------------------------------ Week 1 ------------------------------ */
  {
    id: 1,
    label: 'Week 1',
    tab: '装 WorkBuddy',
    icon: 'assets/icons/week1.svg',
    title: '把 WorkBuddy 装进你的电脑',
    subtitle: '装一个能真的动手干活的 AI 同事',
    duration: '约 25 分钟',
    prereq: '无，零门槛',
    output: '一个能跑通任务的 WorkBuddy',
    file: 'assets/teaching/week1-workbuddy.md',
    fileLabel: '第1周-把WorkBuddy装进你的电脑.md',
    goal:
      '很多同学不是不会用 AI，是打开对话框之后不知道说什么。这一周的目标很简单：<b>把工具装好、让它认识你、现场跑通一个任务</b>。装完这一步，你就跨过了最难的那个门槛。',
    steps: [
      '<b>下载安装</b>：打开官网 <a href="https://www.workbuddy.cn/" target="_blank" rel="noopener noreferrer">workbuddy.cn</a>，往下拉到页面最底部的「<b>立即下载</b>」。Windows 只有一个包直接下；<b>Mac 有两个包，选错会闪退</b>——点苹果菜单 → 关于本机 → 看「芯片」：Apple M 系列选 <code>Mac ARM64</code>，Intel Core 选 <code>Mac x64</code>。Win 弹蓝色警告点「更多信息 → 仍要运行」；Mac 提示开发者不明就去「系统设置 → 隐私与安全性」点「仍要打开」。',
      '<b>微信扫码登录</b>：新用户有限时免费的体验版额度，这几周的练习量完全够用，先不用考虑付费。',
      '<b>选一个模型</b>：在输入框下方找「模型选择」，不知道选哪个就问它「当前推荐哪个模型做内容生成」。',
      '<b>建工作空间（别跳过）</b>：自己动手建一个文件夹当它的"工位"（Win：<code>D:\\AI工作区</code>；Mac：<code>~/Documents/AI工作区</code>），里面再建 <code>01-原始资料</code> / <code>02-我的项目</code> / <code>03-产出</code>。然后在输入框左下角点「<b>选择工作空间</b>」选中它。不选的话，它生成的文件会散落在默认目录，你下次根本找不到。',
      '<b>验证工作空间</b>：问它"你现在的工作空间是哪个目录？把这个目录下的文件列给我看"，报出的路径要和你建的文件夹<b>对得上</b>。对不上就是没选上。',
      '<b>五步初始化</b>：让它认识你（专业/年级/在忙什么）→ 挑一个语气 → 装 1 个技能 → 连上你的数据线。全都是"对着它说一句话"，不用点设置菜单。',
      '<b>跑通第一个任务</b>：让它整理你的乱文件夹、做一份期末复习计划，或者建一个每天早上自动推送信息的任务。',
      '<b>记住一件事</b>：WorkBuddy 是跑在<strong>你电脑上</strong>的本地应用，电脑关机 = 定时任务不执行。',
    ],
    check: [
      '能正常打开 WorkBuddy，微信扫码登录成功',
      '选好了模型（不是默认的 Auto 状态）',
      '自己建了 AI工作区 文件夹，并设成了工作空间',
      '让它报过一次工作空间路径，和你文件夹的实际路径对得上',
      '告诉过它你的专业、年级、正在忙的事',
      '至少装上了 1 个技能',
      '跑通了一个任务，右侧结果区拿到了真实文件',
      '知道「电脑关机定时任务不跑」这件事',
    ],
    meta: [
      ['预计用时', '约 25 分钟'],
      ['前置要求', '无'],
      ['本周产出', '1 个可用的 WorkBuddy'],
      ['难度', '★☆☆☆☆'],
    ],
    /* 官方站点直链（在侧栏渲染成按钮） */
    links: [
      { label: '打开 WorkBuddy 官网下载', url: 'https://www.workbuddy.cn/' },
    ],
    plays: ['AI 工具使用画像投票', '接龙：今天 AI 帮我完成了____', '效率挑战：省下多少分钟'],
    playCopy:
      '⚡ 本周效率挑战：\n用 AI 做一件"以前至少要花 1 小时"的事。\n可以是：整理课堂笔记 / 做 PPT 大纲 / 改简历 / 总结论文 / 安排复习计划\n做完来群里说一句：我用 AI 省下了____分钟。\n看看谁是这一周真正的效率王。',
    more: [
      '课表截图转日历（整学期一次搞定）',
      '论文格式检查（1 小时 → 5 分钟）',
      '按 JD 定制简历措辞',
      '社团活动方案 + 物料清单一次生成',
    ],
    faq: [
      ['Win 装的时候弹蓝色警告窗？', '这是系统对新软件的正常拦截。点「更多信息」→「仍要运行」就行。'],
      ['它只给文字，不给我文件？', '多半是没说清要什么格式。补一句：「输出成 Markdown / Word 文件，存到我的工作空间」'],
      ['它会不会编造信息？', '会。直接说「不确定的地方标出来，给出真实来源，找不到就说找不到」，比你自己事后检查快很多。'],
    ],
    /* 锁定状态下展示的预告（只说会教什么，不泄露怎么做） */
    teaser: {
      hook: '第一周先解决"工具有没有"——把 AI 从"聊天框"变成能真正替你干活的同事。',
      willLearn: [
        '怎么把它稳稳装好，Windows / macOS 两套写法都会给到',
        '一套初始化流程，让它记住你是谁、在学什么、手上该有什么工具',
        '怎么选对模型，让输出质量直接上一个档',
        '现场跑通你的第一个任务，拿到一个真实文件',
        '一件必须提前知道的事：为什么它有时候"到点了却没动静"',
      ],
      deliver: '一个能真的动手干活的 AI 同事',
    },
  },

  /* ------------------------------ Week 2 ------------------------------ */
  /* ⚠️ 本周含两个部分：① ima 知识库（RAG 式）② LLM Wiki（用 WorkBuddy 搭建的编译式知识库）
     · title / subtitle / goal / teaser / output 已覆盖两部分
     · steps / check / file 目前仍只有 ima 部分，等 Wiki 教学文件写好后一起补
     · 若决定分两天推，把 duration 和 steps 拆成两段即可 */
  {
    id: 2,
    label: 'Week 2',
    tab: '搭你的知识库',
    icon: 'assets/icons/week2.svg',
    title: '搭一个真正属于你的知识库',
    subtitle: '检索式 + 编译式，两套都跑在 ima 里',
    duration: '约 30 + 40 分钟',
    prereq: '第 1 周的 WorkBuddy 已装好',
    output: '一个能查的知识库 + 一个能自己长大的知识网络',
    file: 'assets/teaching/week2-ima.md',
    fileLabel: '第2周-搭一个真正属于你的知识库.md',
    goal:
      '上周的 WorkBuddy 帮你<b>干活</b>，这周搭的知识库帮你<b>记事</b>。但"知识库"其实有两种，大多数人只知道第一种：<br><br>① <b>检索式</b>（ima 原生问答）——你问一句，它临时去资料里翻一遍，答完就没了。上手快，适合"我现在想知道"。<br>② <b>编译式</b>——让 AI 把你的资料<b>编译</b>成结构化、互相引用的知识页。丢一份新资料进去，它会更新相关的多个页面，还会标出新旧结论矛盾的地方。适合"我要长期沉淀"。<br><br>本周两件都做，而且<b>都跑在 ima 里</b>——ima 当知识库容器，WorkBuddy 当替你读书和整理的那个人。<b>整套工具链全是腾讯云 AI 产品。</b><br><br>范围不限定：不是"某一门课的知识库"，而是<b>你自己的</b>知识库。所以也说清楚一件事——<b>知识库是养出来的，一周建不成</b>。本周目标是"把骨架搭好 + 跑通一次完整流程"。',
    steps: [
      '<b>【第一部分】装 ima</b>：去官网 <a href="https://ima.qq.com/" target="_blank" rel="noopener noreferrer">ima.qq.com</a> 下载客户端。四个入口数据自动同步，建议「电脑客户端 + 微信小程序」两个就够——小程序负责随手收，客户端负责整理。',
      '<b>建知识库 + 定结构</b>：改个好名字，然后<b>手动建 3 个文件夹</b>：<code>01-原始素材</code> / <code>02-知识页</code> / <code>03-我的产出</code>。这 3 个对应「存储 / 处理 / 思考」，<b>别建超过 3 个</b>。',
      '<b>让 WorkBuddy 帮你"备菜"</b>：先扫描你本地那堆乱文件，去重、合并、给命名建议，生成一份《导入清单》——你再照着清单往 ima 里拖。',
      '<b>投喂</b>：六种收集方式——本地文件拖拽 / 微信群文件 / 公众号文章一键存 / 网页链接 / 图片（能认字）/ 录音（自动转文字）。<b>别一次投 200 个，先投 5 份。</b>',
      '<b>学会用 @ 提问</b>：提问时带上 <code>@你的知识库名</code>，它才会只从你存的资料里找答案。',
      '<b>【第二部分】打通 WorkBuddy × ima</b>：这是本周<b>唯一的硬门槛</b>。在连接器管理里找到 ima 点「信任」授权；要 Key 就去 <a href="https://ima.qq.com/agent-interface" target="_blank" rel="noopener noreferrer">ima.qq.com/agent-interface</a> 拿。连通后发「列出我的所有知识库」验证。',
      '<b>让 AI 采访你</b>：冷启动最爽的一步——你不需要写任何东西，它一次问一个问题，把你的私人知识"问"出来。通常 15–20 个问题。',
      '<b>让它设计并搭建骨架</b>：基于采访结果规划知识页、子分类、<b>命名规则</b>、以及「总索引」和「操作日志」两个特殊页。<b>先看方案再执行。</b>',
      '<b>跑第一次「摄入」</b>：说一句「检查有哪些没处理过的素材，执行一次摄入」，看它通读、建摘要页、更新相关页面、标注矛盾、建立引用、更新索引、追加日志——<b>一份素材牵动多个页面</b>。',
      '<b>同一个问题问两边</b>：先去 ima 原生问答问，再让 WorkBuddy 读知识页答。<b>对比两边的回答，你就亲眼看到了"检索"和"编译"的区别。</b>',
    ],
    check: [
      'ima 装好并登录成功',
      '建好了自己的知识库，并手动建好 3 个文件夹',
      '用 WorkBuddy 做过一次「导入前整理」，拿到了清单',
      '01-原始素材 里至少 5 份资料，用到 3 种以上收集方式',
      '成功用 @知识库名 提过问，答案引用了你的资料',
      '★ WorkBuddy 能列出你的知识库（连通成功）',
      '完成了 AI 采访，它对你有了相当完整的了解',
      '02-知识页 里有知识页，「总索引」和「操作日志」都建好了',
      '★ 跑通过至少一次「摄入」，看到过一份素材牵动多个页面',
      '做过"同一个问题问两边"的对比，有自己的感受',
      '知道三条习惯：只追加不覆盖 / 想清楚再动手 / 写错就追加更正',
    ],
    meta: [
      ['预计用时', '约 30 分钟（第一部分）+ 约 40 分钟（第二部分）'],
      ['前置要求', 'WorkBuddy 已装好'],
      ['本周产出', '一个能查的知识库 + 一个能长的知识网络'],
      ['难度', '★★☆☆☆ ～ ★★★☆☆'],
    ],
    links: [
      { label: '打开 ima 官网（下载）', url: 'https://ima.qq.com/' },
      { label: '获取 ima API Key', url: 'https://ima.qq.com/agent-interface' },
    ],
    plays: ['资料越存越乱？该建知识库了', '知识库搭建：第一批放什么', '两种知识库，你更想要哪种', '效率工具矩阵共建'],
    playCopy:
      '🗂️ 想问问大家：如果给你大学四年的资料建一个 AI 知识库，你第一批会放什么？\n\n① 课程 PPT\n② 论文资料\n③ 考研资料\n④ 面经 / 八股\n⑤ Prompt 收藏\n\n我最近觉得 ima 这种知识库工具很适合资料多的人，\n关键是先别贪多，先从一个场景开始。\n\n我先来：我第一批放的是这学期所有专业课课件。',
    more: [
      '一门课一门知识库：一学期下来你有一份自己的课程 Wiki',
      '读一本书边读边归档：为人物、主题、线索建页面，读完有一份配套 Wiki',
      '求职准备：投 20 篇面经 + 项目复盘，让它按高频问题排序并指出你答不好的点',
      '文献综述：投 20 篇论文，让它找分歧点、做对比表（它最擅长的场景）',
      '社团沉淀：往届方案和复盘都放进去，换届时新一届直接继承',
      '★ 第 4 周兑现：让 AI 读知识库，生成你的个人网页内容',
      '长期节奏：每天投 1 份，每周问 1 次——三个月后你有一个别人抄不走的东西',
    ],
    faq: [
      ['拖文件进去没反应？', '多半是格式不支持或文件太大。换成 PDF/Word/PPT/Excel/图片，超大文件先压缩拆分。'],
      ['提问答得很虚，像在瞎编？', '没用 @知识库名，它在搜全网。提问时一定带上 @你的知识库名。'],
      ['要不要一次把资料全导进去？', '不要。先投一个场景的量（5 份左右），用起来再加。知识库的价值在"你问了多少次"，不在"存了多少"。'],
      ['★ WorkBuddy 说找不到 ima / 列不出知识库？', '连接器没启用或没授权。去连接器管理里找 ima 点「信任」，按提示授权（多数是一键授权，少数要填 Client ID 和 API Key）。仍不行就把屏幕截图发群里。'],
      ['★ 摄入时只建了摘要页，没更新别的页面？', '两种可能：① 这是你第一份素材，还没有"已有页面"可以更新——正常，投到第 3 份再看；② 提示词没说清，直接说「重新检查有没有已有页面需要补充或修正」。'],
      ['想改知识页中间的内容，改不了？', '对，ima 的接口只支持新建和末尾追加，不支持改写。所以约定「只追加不覆盖」，最新结论在页面最下面。这也是我们的三条习惯之一。'],
      ['知识页越来越长读不完？', '追加式设计的副作用。让它「读一下这篇，告诉我截至目前的最终结论」，或者定期生成一份「综合·XXX·日期」页。'],
    ],
    teaser: {
      hook: '第二周解决"你自己的知识到底存在哪"——而且教你搭两种知识库，大多数人只知道第一种。',
      willLearn: [
        '为什么 AI 什么都知道，你却还是需要一个自己的知识库',
        'ima 的四个入口怎么选，以及知识库里为什么只需要建三个文件夹',
        '六种资料收集方式——微信、相册、下载夹里的东西都能收进来',
        '★ 一个必学的提问技巧：加不加那几个字符，答案质量完全是两个档次',
        '★ 怎么让你手里的 AI 直接读写 ima 里的知识库（本周唯一的硬门槛，会重点讲）',
        '★ 一种"不用你写一个字"的冷启动方法：让 AI 一次问一个问题，把你自己都没觉察的私人知识挖出来',
        '为什么"每次都从零找"和"越用越厚"是两种完全不同的知识库',
        '★ 怎么让 AI 替你读书：一份资料牵动多个页面，还会标出新旧结论矛盾的地方',
        '★ 一周里最有价值的一分钟：同一个问题问两边，自己看出区别',
        '三条必须养成的习惯，包括"为什么这套系统里只追加、不覆盖"',
        '一条最重要的提醒：知识库是为了让知识有用，不是为了画一张好看的知识图谱',
      ],
      deliver: '① 一个能查的知识库　② 一个能自己长大的知识网络',
    },
  },

  /* ------------------------------ Week 3 ------------------------------ */
  {
    id: 3,
    label: 'Week 3',
    tab: '做第一个 Skill',
    icon: 'assets/icons/week3.svg',
    title: '做出你的第一个 Skill',
    subtitle: '把你反复做的麻烦事，固化成一份作业手册交给 AI',
    duration: '约 40 分钟',
    prereq: 'WorkBuddy 已装好并能正常对话',
    output: '1 个可复用、可分享的 Skill',
    file: 'assets/teaching/week3-skill.md',
    fileLabel: '第3周-做出你的第一个Skill.md',
    goal:
      'Skill = 给 AI 的一本<b>专项作业手册</b>。你不在场的时候，它照着这本手册就能把这件事做到和你亲手做一样的水准。这一周是从「会用 AI」到「会造 AI 工具」的分界线，也是你这三周里最值钱的一个产出。',
    steps: [
      '<b>先筛选，别急着动手</b>：用三个标准过一遍——会重复（做过 ≥3 次）、有套路（每次步骤差不多）、有明确输出（会产出具体东西）。三条全中才值得做。',
      '<b>口述流程</b>：不用学怎么写 Skill，你只要会"说"。像带新人一样把步骤讲出来，重点是<b>「你最在意的三条规矩」</b>这一栏千万别空——它是防止 AI 偷懒编造的护栏。',
      '<b>生成 Skill</b>：确认它复述的理解无误后，让它生成 Skill 文件、写入你的规矩、告诉你安装路径、给你 3 个调用示例。',
      '<b>立刻试跑</b>：用真实素材跑一次，并让它自己交代「哪一步是猜的」。第一次不完美很正常。',
      '<b>迭代改 3 轮</b>：不改代码，只改说法。每次改完用同一个输入重跑对比。改 2–3 次基本就稳了。',
      '<b>导出分享</b>：Skill 是可以导出成文件夹发给同学的——这是你第一个能"传下去"的 AI 资产。',
    ],
    check: [
      '能用自己的话说清 Skill 是什么',
      '用三个标准筛出了要做的那件事',
      '把流程完整口述给了 WorkBuddy，并确认了它的复述',
      '给出了至少 3 条"最在意的规矩"',
      'Skill 生成成功，知道它装在哪',
      '用真实素材试跑过至少 1 次',
      '迭代修改过至少 1 轮，并对比了前后差别',
      '导出了 Skill 文件夹，准备分享',
    ],
    meta: [
      ['预计用时', '约 40 分钟'],
      ['前置要求', 'WorkBuddy 可用'],
      ['本周产出', '1 个专属 Skill'],
      ['难度', '★★★☆☆'],
    ],
    plays: ['Prompt 擂台：同一任务不同写法', 'AI 拆解局：拆一个工作流', '作品墙：晒你的 Skill'],
    playCopy:
      '🎯 Prompt 擂台开打！\n\n今天的任务：用一句话让 AI 写出"最土但最真诚的情书"。\n\n规则很简单：\n1. 每人发一句 Prompt\n2. 可以晒 AI 生成结果\n3. 大家投票选"土味天花板"\n\n不要怕离谱，越像大学生整活越好😂\n（做完这个你就知道，为什么有些 Prompt 一次就中，有些怎么改都不行）',
    more: [
      '组合成工作流：资料整理 → 初稿撰写 → 质量审核',
      '给社团做 SOP Skill，换届时直接继承',
      '做「作业格式检查」Skill，导出发到班群一次帮 50 人',
      '写进简历："独立设计并落地 X 个 AI 自动化技能"',
    ],
    faq: [
      ['想不出做什么 Skill？', '从小事开始：改一段话、检查一个格式、整理一次笔记。越小越容易成功。'],
      ['流程我自己都说不清？', '说明这件事你还没形成套路，换一件事；或者上传 3 份历史成果让它反推。'],
      ['装了但好像没生效？', '调用时没带上名字。明确说「用 ___ Skill 处理这个」。'],
      ['改了好多次还是不理想？', '可能这件事本身不适合做成 Skill。用三个标准重新筛一遍。'],
    ],
    teaser: {
      hook: '第三周是分界线——前两周你会用 AI，这一周之后你会造 AI 工具。',
      willLearn: [
        'Skill 到底是什么（一个比喻就能讲明白，不需要学任何代码）',
        '怎么判断哪件事值得做成 Skill：有个简单的三问筛子，过不了就别做',
        '怎么像带新人一样，把你的做法"说"给它听',
        '★ 最容易被跳过、但决定成败的一栏——少了它，AI 会偷懒，还会一本正经地编',
        '生成之后怎么试跑，怎么让它自己交代"哪一步是猜的"',
        '迭代方法：不用改任何代码，只改你的说法',
        '怎么把做好的 Skill 导出，分享给同学（这是你能"传下去"的第一个作品）',
      ],
      deliver: '一个可以复用、可以分享给同学的专属技能',
    },
  },

  /* ------------------------------ Week 4 ------------------------------ */
  {
    id: 4,
    label: 'Week 4',
    tab: '做个人网页',
    icon: 'assets/icons/week4.svg',
    title: '做出你的个人网页并上线',
    subtitle: '把前三周的成果装进橱窗，拿到一个能发出去的链接',
    duration: '约 60 分钟',
    prereq: 'WorkBuddy 已装好，手边有 3–5 个作品',
    output: '一个公网可访问的个人主页',
    file: 'assets/teaching/week4-webpage.md',
    fileLabel: '第4周-做出你的个人网页并上线.md',
    goal:
      '前三周你在<b>攒东西</b>，这一周把它装进橱窗。做完你会拿到一个 <code>https://</code> 开头的链接——它能写进简历、能在面试时打开给 HR 看、能发给同学。而且你上周和这周学到的文件结构，本身就是以后做任何网页的基础。',
    steps: [
      '<b>★ 先让 AI 读你的知识库</b>：第 2 周那 40 分钟在这里兑现。4 个模块的内容（我是谁 / 我会什么 / 我做过什么 / 怎么找我）<b>全是私人知识</b>——别自己硬憋，让 WorkBuddy 读你的知识页，从你自己的经历和偏好里起草。<b>没做知识库的话，就用"让 AI 当面试官反问你"这个替代方案。</b>',
      '<b>先定内容，别一上来就让 AI 做</b>：这是最常见的失败方式。先拿到「网页内容清单」，确认 4 个模块都有内容，再动手。',
      '<b>用标准四文件结构生成</b>：<code>index.html</code>（内容）+ <code>style.css</code>（样式）+ <code>script.js</code>（交互）+ <code>assets/</code>（图片图标）。要求它只用<b>相对路径</b>，所有资源双击就能打开。',
      '<b>本地打开看，改到满意</b>：双击 index.html 就能看。改配色、改字号、改布局，全程只用嘴说。想看手机效果按 F12 切手机预览。',
      '<b>让它一次给 2 个风格版本</b>：深色科技风 vs 浅色简约风，放两个文件夹对比，选一个。',
      '<b>部署上线</b>：最简单是直接让它一键部署给你公网链接；想练手可以选 GitHub Pages。',
      '<b>换设备验证</b>：把链接发给一个同学，让他在自己手机上打开——路径问题只有换设备才会暴露。',
    ],
    check: [
      '有「网页内容清单」，4 个模块都有内容',
      '（做了知识库的同学）内容是 AI 读你的知识页生成的，不是你硬憋的',
      '目录结构是 index.html + style.css + script.js + assets/',
      '所有资源引用都是相对路径，没有 C:\\ 或 /Users/ 开头的',
      '本地双击 index.html 能正常打开，样式和图片都在',
      '手机上打开也正常（响应式生效）',
      '至少改过 1 轮，对比了不同风格',
      '拿到公网链接，并且在别人的手机上打开验证过',
      '没放手机号、身份证等隐私信息',
      '已经把链接写进简历或个人介绍里',
    ],
    meta: [
      ['预计用时', '约 60 分钟（含读知识库生成内容）'],
      ['前置要求', '有 3–5 个作品素材（有知识库更好）'],
      ['本周产出', '1 个上线的主页'],
      ['难度', '★★★☆☆'],
    ],
    plays: ['作品墙：个人主页巡礼', '晒一个你用 AI 做出的结果', 'AI 作品征集：校园主题'],
    playCopy:
      '🏆 本周 AI 作品墙开放选题：个人主页巡礼。\n\n这周大家陆续做出了自己的个人主页，\n欢迎把链接发到群里，格式：\n\n名字 + 主页链接 + 一句话说明你放了什么\n\n互相看看、互相提建议。\n做得好的会进群精华，也会作为社群优秀案例推荐出去。\n（提醒：主页上别放手机号、身份证这些隐私信息）',
    more: [
      '变成作品集：每做完一个作品加一张卡片',
      '简历写一行「详细项目见：链接」',
      '给社团做招新页，直接发链接',
      '加一个学习数据看板（打卡天数、Skill 数量）',
    ],
    faq: [
      ['双击打开是空白页？', 'HTML 有语法错误。跟它说「index.html 打开是白屏，帮我检查语法错误并修好」。'],
      ['本机能开，别人打不开？', '用了绝对路径，或者部署时漏传了 assets。让它全局排查并改成相对路径后重新部署。'],
      ['改了没生效？', '浏览器缓存。按 Ctrl + F5（Mac 是 Cmd + Shift + R）强制刷新。'],
      ['不会部署怎么办？', '直接用最省事的方案：让它一键部署，你只要拿到链接就行。'],
    ],
    teaser: {
      hook: '最后一周，把前三周攒的东西装进橱窗，拿到一个能发出去的链接。而且第 2 周那 40 分钟，在这里兑现。',
      willLearn: [
        '★ 第 2 周的知识库在这里派上大用场：让 AI 读你的知识页，生成"只有你能写出来"的自我介绍和作品描述',
        '★ 最容易踩的坑：为什么"帮我做个个人网页"这句话大概率会失败，该先做什么',
        '一个够用的个人主页，其实只要四个模块（不是你以为的那种）',
        '素材不够怎么办：有个方法能让 AI 反过来问你，把你没想到的素材挖出来',
        '★ 一套标准的"四文件"目录结构，以及为什么要这么分',
        '为什么路径写法会决定你的网页"自己看得到、别人打不开"',
        '三种上线方案，从最省事到最练手，怎么选',
        '上线后必做的验证：为什么要换一台设备再打开一次',
        '隐私红线：哪些东西绝对不能放在公开网页上',
      ],
      deliver: '一个公网可访问的个人主页链接，能写进简历',
    },
  },
];

/* 群内互动玩法（取自腾讯云官方《社群运营内容库》） */
const PLAYS = [
  {
    tag: '产品体验',
    title: '今天你用 AI 做了哪件小事',
    desc: '降低参与门槛，让"用过一次"也值得说出口。',
    text:
      '【今天你用 AI 做了哪件小事？】\n\n不是非要做大项目。\n改一句话、总结一页资料、查一个概念、排一个计划，都算。\n\n如果没用，也说说为什么：不知道用在哪？还是懒得打开？\n\n我先来：今天 AI 帮我把待办重新排了优先级。',
  },
  {
    tag: '软广种草',
    title: '场景接龙：我最想用 AI 解决____',
    desc: '开放填空，零压力种草，适合第 1 周破冰。',
    text:
      '来个真实场景接龙：\n\n我最想用 AI 解决______。\n\n可以很具体，比如\n"帮我把老师发的 20 页 PPT 整理成复习重点"\n"帮我把简历写得像真的做过项目"\n"帮社团少开两次会"\n\n我先来：我最想用 AI 解决 ddl 太多时不知道先做哪个。',
  },
  {
    tag: '学习提效',
    title: '效率挑战：你省下了多少分钟',
    desc: '每周固定栏目，最能带出真实使用案例。',
    text:
      '⚡ 本周效率挑战：\n用 AI 做一件"以前至少要花 1 小时"的事。\n\n可以是：\n📄 整理课堂笔记\n📊 做 PPT 大纲\n📝 改简历\n📚 总结论文\n📌 安排复习计划\n\n做完来群里说一句：我用 AI 省下了____分钟。\n看看谁是真正的效率王。',
  },
  {
    tag: 'Prompt 教学',
    title: '把烂 Prompt 改成好 Prompt',
    desc: '第 3 周做 Skill 前一天发效果最好。',
    text:
      '【把烂 Prompt 改成好 Prompt】\n\n烂版：帮我写论文。\n\n好版要补：角色、主题、字数、结构、资料、语气、输出格式。\n\n公式记一下：\n角色 + 任务 + 背景 + 输出要求\n\n你会怎么改？评论区交作业，优秀版本我整理成模板发群里。',
  },
  {
    tag: 'Prompt 分享',
    title: '万能学习 Prompt，建议收藏',
    desc: '一条模板解决"概念听不懂"的高频痛点。',
    text:
      '【万能学习 Prompt，建议收藏】\n\n你是一名会讲大白话的助教。请解释这个概念，要求：\n1. 先用一句话说清楚\n2. 举一个大学生能懂的例子\n3. 列 3 道自测题\n\n你想拿哪个概念试试？\n（把"这个概念"换成你卡住的任何一个词）',
  },
  {
    tag: '产品体验',
    title: '资料太多？ima 适合这些人',
    desc: '第 2 周主推话题，直接引出知识库场景。',
    text:
      '【资料太多？ima 适合这些人】\n\n考研党：放专业课资料\n论文党：放文献和笔记\n求职党：放面经和项目复盘\n社团人：放活动方案和 SOP\n\n你如果建知识库，第一类资料会放什么？\n\n（我第一批放的是这学期的全部专业课课件）',
  },
  {
    tag: 'AI 共创',
    title: 'Bug 吐槽局：最让你难受的是啥',
    desc: '收集真实反馈，也是产品共建的素材。',
    text:
      '🧯 AI 工具吐槽局。\n\n用的时候最让你难受的是啥？\n① 答案太虚\n② 格式很乱\n③ 文件读不准\n④ 不懂学生场景\n⑤ 反应慢\n⑥ 其他\n\n可以直接吐槽，越具体越有用。\n我们会把高频问题整理反馈上去。',
  },
  {
    tag: '软广种草',
    title: '作品墙：本周优秀作品上墙',
    desc: '周度复盘用，增强荣誉感。',
    text:
      '🏆 本周 AI 作品墙更新！\n\n这周看到几位同学用 AI 做出了很实用的东西：\n📌 复习思维导图\n📌 社团招新文案\n📌 简历优化版本\n📌 课程汇报 PPT 大纲\n\n欢迎继续投稿，优秀作品下周上墙。\n重点不是炫技，是让大家看到 AI 真的能帮上忙。',
  },
  {
    tag: '游戏互动',
    title: 'AI 猜专业小游戏',
    desc: '轻量整活，最适合活跃气氛。',
    text:
      '【AI 猜专业小游戏】\n\n发一句你专业里最典型的话，让 AI 猜你的专业。\n\n例：今天又在画受力分析 / 又在背传播学 / 又在调 bug / 又在做培养皿\n\n看看它能不能猜中，\n也看看哪个专业最有辨识度👀',
  },
  {
    tag: 'AI 角色扮演',
    title: '面试模拟间开放',
    desc: '求职季高互动玩法，能带出长对话。',
    text:
      '🎤 面试模拟间开放。\n\n想练的同学可以发：专业 + 目标岗位 + 最怕的问题\n\nAI 先当面试官问一轮，大家再一起帮你改回答。\n\n别等真面试才发现自己说不清项目经历。\n社恐同学可以先围观。',
  },
  {
    tag: '留存共创',
    title: 'AI 功能许愿池',
    desc: '收集学生真实需求，直接反哺产品反馈。',
    text:
      '🪄 开一个 AI 功能许愿池。\n\n如果 AI 真的要为大学生做一个功能，你最想要什么？\n比如：\n一键整理课堂录音\n论文格式检查\n简历项目挖掘\n期末复习排期\n社团活动方案生成\n\n不用考虑能不能实现，先说你最想要的。',
  },
  {
    tag: '激活讨论',
    title: 'AI 新闻真假怎么判断',
    desc: '结合早报热点发起，带一点信息素养教育。',
    text:
      '【AI 新闻真假怎么判断？】\n\n看到离谱消息，别急着转发。我一般三步：\n查来源：是不是官方/权威媒体\n问 AI：让它列证据和反证\n再判断：有没有夸大标题党\n\n你遇到过最离谱的 AI 新闻是什么？',
  },
];

/* 常见问题 */
const FAQ = [
  [
    '四周内容都是开放的吗？',
    '是的，四周所有内容现在全部开放，你可以随时进入任意一周查看完整的目标、分步指引、验收清单和打卡格式，不需要等到某一周。',
  ],
  [
    '我完全不会编程，真的能做出来吗？',
    '四周所有任务都不需要写代码。你需要做的只有两件事：把教学文件拖进 WorkBuddy，然后跟它说「照这份文件带我做完」。剩下的它来做。<strong>唯一需要你动手的是第 1 步——先把 WorkBuddy 装进电脑</strong>，因为软件没法自己装自己。',
  ],
  [
    '每周要花多少时间？',
    '第 1 周约 25 分钟；第 2 周约 30 分钟（把资料收进来）+ 约 40 分钟（让 AI 把资料编译成知识）；第 3 周约 40 分钟；第 4 周约 60 分钟。<strong>建议一次做完，中间别断</strong>，分两次反而容易卡在半路。',
  ],
  [
    '我错过了某一周怎么办？',
    '补上就行。<strong>已开放的内容不会收回</strong>，你想什么时候回看都可以。<br><br>每周的产出是独立的：装 WorkBuddy 不依赖别人，装 ima 只依赖 WorkBuddy，做 Skill 只依赖 WorkBuddy。<strong>唯一有先后的是第 1 周</strong>——它是一切的前提，一定要先做。',
  ],
  [
    '一定要用 Windows / Mac 吗？',
    '两个系统都可以，教学文件里两种系统的步骤都给了。手机也能用 ima（App 或微信小程序），但第 1 周的 WorkBuddy 需要电脑。',
  ],
  [
    '要花钱吗？',
    'WorkBuddy 有免费的体验版额度（官网写着"限时免费"），四周的练习量完全够用；ima 也有免费额度。<strong>这四周不需要额外付费。</strong>后续用量大了再看官方有没有校园活动。',
  ],
  [
    '我的资料有隐私，导进 ima 安全吗？',
    '不要上传身份证照片、未脱敏的简历、完整的私人聊天记录、账号密码。<strong>这条对任何 AI 工具都成立。</strong>打卡发截图前也记得先打码。',
  ],
  [
    '做出来的东西能写进简历吗？',
    '能，而且这是这四周最被低估的收获。一句「独立设计并落地 4 个 AI 自动化技能，其中 X 个已分享给班级同学使用」，比「熟悉办公软件」有说服力得多。第 4 周的个人主页链接也可以直接放在简历抬头。',
  ],
  [
    '卡住了该问谁？',
    '先按这个格式发到群里，别只发「我不会」：<br><br><code>【求助】专业-年级-名字<br>我做到第__步<br>我看到的报错/现象：（截图或原文）<br>我已经试过：（写你试过什么）</code><br><br>这样别人一看就知道怎么帮你，回得也快。',
  ],
  [
    '我做完之后还能继续玩什么？',
    '把你的四周成果做成一份案例文档，格式参考群文件里的《腾讯云AI校园早报_Agent全流程说》。做得好的会被作为社群标杆案例推荐出去。另外，第 3 周学的 Skill 是可以一直叠加的——一年后你会有十几个越用越好用的专属技能。',
  ],
];

/* 打卡条目（对应 WEEKS） */
const CHECK_ITEMS = [
  ['Week 1 · 装好 WorkBuddy 并跑通第一个任务', '装完 + 跑通一个真实任务'],
  ['Week 2 · 建好知识库并跑通一次「摄入」', '3 个文件夹 + AI 采访 + 跑通编译流程'],
  ['Week 3 · 做出并试跑第一个 Skill', '生成 + 试跑 + 至少改 1 轮'],
  ['Week 4 · 个人网页上线并拿到公网链接', '上线 + 在别人手机上验证过'],
];

/* =========================================================
   二、工具函数
   ========================================================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function esc(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** 允许数据区里写 <b> <code> <br> 这类行内标签 */
function rich(str) {
  return String(str);
}

function pad(n) {
  return String(n).padStart(2, '0');
}

/** Date → 本地时间 ISO 串（YYYY-MM-DDTHH:mm），供 new Date() 直接解析 */
function fmtISO(d) {
  return (
    d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
    'T' + pad(d.getHours()) + ':' + pad(d.getMinutes())
  );
}

/** 格式化成「9月30日 20:00」 */
function fmtDate(d) {
  if (!(d instanceof Date) || isNaN(d)) return '待定';
  return `${d.getMonth() + 1}月${d.getDate()}日 ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Date → 周区间文案，如「10月19日 – 10月25日」 */
function fmtWeekRange(d) {
  if (!(d instanceof Date) || isNaN(d)) return '待定';
  const end = new Date(d.getTime() + 6 * 24 * 60 * 60 * 1000);
  return `${d.getMonth() + 1}月${d.getDate()}日 – ${end.getMonth() + 1}月${end.getDate()}日`;
}

/** 倒计时文本 */
function fmtCountdown(ms) {
  if (!isFinite(ms)) return '';
  if (ms <= 0) return '即将解锁';
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (d > 0) return `${d} 天 ${pad(h)}:${pad(m)}:${pad(sec)}`;
  return `${pad(h)}:${pad(m)}:${pad(sec)}`;
}

const toastEl = $('#toast');
let toastTimer = null;
function toast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('is-show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('is-show'), 2200);
}

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;top:-9999px;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    return true;
  } catch (e) {
    return false;
  }
}

/* =========================================================
   三、解锁逻辑
   ========================================================= */

const SEEN_KEY = 'aiweek.unlocked.v1';

function readSeen() {
  try {
    const v = JSON.parse(localStorage.getItem(SEEN_KEY) || '[]');
    return Array.isArray(v) ? v : [];
  } catch (e) {
    return [];
  }
}
function writeSeen(arr) {
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify(arr));
  } catch (e) { /* 隐私模式忽略 */ }
}

/** 某个周次的配置解锁时间（Date 或 null） */
function unlockTimeOf(id) {
  const t = UNLOCK.schedule ? UNLOCK.schedule[id] : null;
  if (!t) return null;
  const d = new Date(t);
  return isNaN(d) ? null : d;
}

/** 计算当前已开放的周次 id 数组 —— 时间锁已关闭，全部开放 */
function computeUnlocked() {
  // 时间锁已关闭：不读取 UNLOCK 配置，所有周次默认开放，同学可自由访问任意一周。
  return WEEKS.map((w) => w.id);
}

/** 下一个待解锁的周次（没有则返回 null） */
function nextLockedWeek(openIds) {
  const locked = WEEKS.filter((w) => !openIds.includes(w.id));
  if (!locked.length) return null;
  // 优先选有明确解锁时间的最近一个
  const withTime = locked
    .map((w) => ({ w, t: unlockTimeOf(w.id) }))
    .filter((x) => x.t)
    .sort((a, b) => a.t - b.t);
  return withTime.length ? withTime[0].w : locked[0];
}

function lockInfoHTML(id) {
  const t = unlockTimeOf(id);
  if (!t) return '<span class="lockbadge">🔒 待解锁</span>';
  return `<span class="lockbadge">🔒 ${fmtDayRange(id)} 开放</span>`;
}

/* =========================================================
   四、渲染：周次 Tab + 面板
   ========================================================= */

function renderWeekTabs(openIds) {
  const box = $('#weekTabs');
  if (!box) return;
  box.innerHTML = WEEKS
    .map((w) => {
      const open = openIds.includes(w.id);
      return `
      <button class="tab${open ? '' : ' is-locked'}"
              type="button" role="tab" data-tab="${w.id}" aria-selected="false">
        <span class="tab__n">W${w.id}</span>${esc(w.tab)}
        ${open ? '' : '<span class="tab__lock">🔒</span>'}
      </button>`;
    })
    .join('');
}

/** 锁定态：只放预告，不放出任何操作步骤 */
function lockedPanelHTML(w) {
  const t = unlockTimeOf(w.id);
  const learn = w.teaser.willLearn.map((x) => `<li>${rich(x)}</li>`).join('');
  const countdown = `<div class="countdown">
         <span class="countdown__label">本周在营内</span>
         <b class="countdown__num">${fmtDayRange(w.id)}</b>
       </div>`;

  return `
  <div class="panel__grid panel__grid--locked">
    <div class="panel__main">
      <div class="pcard locked">
        <div class="locked__top">
          <img src="${w.icon}" alt="" width="46" height="46">
          <div class="locked__heading">
            <div class="locked__week">WEEK ${w.id}</div>
            <h3>${esc(w.title)}</h3>
            <span>${esc(w.subtitle)}</span>
          </div>
          <div class="locked__seal">🔒</div>
        </div>

        <p class="locked__hook">${rich(w.teaser.hook)}</p>

        ${countdown}

        <h4>这一周会教你什么</h4>
        <ul class="learnlist">${learn}</ul>

        <div class="locked__deliver">
          <span>做完你会拿到</span>
          <b>${esc(w.teaser.deliver)}</b>
        </div>

        <p class="locked__note">
          📌 内容将在 <b>${fmtDayRange(w.id)}</b> 开放（营内第 ${dayRangeOf(w.id).start} 天起）。
          开放后会一直保留在这里，随时可以回来反复看。
        </p>
      </div>
    </div>

    <aside class="panel__side">
      <div class="pcard">
        <h4>本周信息</h4>
        <div class="meta">
          <div class="meta__row"><span>预计用时</span><b>${esc(w.duration)}</b></div>
          <div class="meta__row"><span>前置要求</span><b>${esc(w.prereq)}</b></div>
          <div class="meta__row"><span>本周产出</span><b>${esc(w.output)}</b></div>
          <div class="meta__row"><span>难度</span><b>${esc(w.meta[3][1])}</b></div>
          <div class="meta__row"><span>状态</span><b>🔒 未开放</b></div>
        </div>
        <button class="btn btn--ghost btn--full is-disabled" type="button" data-locked-tip>🔒 教学文件未开放</button>
        ${linksHTML(w)}
      </div>

      <div class="pcard card--tip">
        <h4>为什么按周解锁？</h4>
        <p style="font-size:13.5px;color:var(--muted);line-height:1.9">
          四周的内容一次性给你，你大概率会收藏然后永远不看。<br><br>
          <b style="color:var(--text)">一周只给你一件事，做完就有一个能用的东西。</b><br><br>
          而且已经解锁的内容不会收回——你想什么时候回看都可以。
        </p>
      </div>

      <div class="pcard">
        <h4>各周状态</h4>
        <ul class="unlocklist">${renderUnlockList(openIdsOf(), w.id)}</ul>
      </div>

      <div class="pcard">
        <h4>解锁前你可以先做</h4>
        <ol class="tips">
          <li>把前几周解锁的内容做掉（比追进度重要）</li>
          <li>在群里说说你最想让它帮你做什么</li>
          <li>把这周的预告截图存一下，准备好时间</li>
        </ol>
      </div>
    </aside>
  </div>`;
}

/** 解锁态：完整内容 */
/** 官方站点直链（渲染成按钮，新标签页打开） */
function linksHTML(w) {
  if (!w.links || !w.links.length) return '';
  return `<div class="extlinks">${
    w.links
      .map(
        (l) =>
          `<a class="btn btn--ghost btn--full extlink" href="${l.url}" target="_blank" rel="noopener noreferrer">` +
          `${esc(l.label)}<span class="extlink__arrow">↗</span></a>`
      )
      .join('')
  }</div>`;
}

function unlockedPanelHTML(w) {
  const steps = w.steps.map((s) => `<li>${rich(s)}</li>`).join('');
  /* 验收清单：可点击勾选，状态存本地 */
  const check = w.check
    .map((c, i) => `<li class="deliver__item" data-deliver="${w.id}-${i}" role="checkbox" aria-checked="false" tabindex="0"><span class="deliver__box"></span><span class="deliver__text">${esc(c)}</span></li>`)
    .join('');
  const meta = w.meta
    .map(([k, v]) => `<div class="meta__row"><span>${esc(k)}</span><b>${esc(v)}</b></div>`)
    .join('');
  const plays = w.plays.map((p) => `<span class="chip chip--cyan">${esc(p)}</span>`).join('');
  const more = w.more.map((m) => `<li>${esc(m)}</li>`).join('');
  const faq = w.faq
    .map(
      ([q, a], i) => `
      <div class="qa" data-qa="${w.id}-${i}">
        <button class="qa__q" type="button" aria-expanded="false">
          <span>${esc(q)}</span><i>+</i>
        </button>
        <div class="qa__a"><div>${rich(a)}</div></div>
      </div>`
    )
    .join('');

  const checkinTpl = `【Week${w.id} 打卡】专业-年级-名字\n✅ 我完成了：${w.output}\n💡 最有收获的一点：______\n🆘 卡住的地方（没有就写"无"）：______`;

  return `
  <div class="panel__grid">
    <div class="panel__main">
      <div class="pcard">
        <div class="pcard__top">
          <img src="${w.icon}" alt="" width="46" height="46">
          <div>
            <div style="font-family:var(--mono);font-size:12px;color:var(--blue);letter-spacing:1px">WEEK ${w.id} · 已开放</div>
            <h3>${esc(w.title)}</h3>
            <span>${esc(w.subtitle)}</span>
          </div>
        </div>
        <p style="font-size:14.5px;color:var(--text-2);margin-bottom:24px">${rich(w.goal)}</p>
        <h4>分步指引</h4>
        <ul class="steps">${steps}</ul>
      </div>

      <div class="pcard">
        <h4>
          验收清单 · 全勾上就通关
          <span class="deliver__count" data-deliver-count="${w.id}"></span>
        </h4>
        <ul class="deliver" data-deliver-list="${w.id}">${check}</ul>
        <button class="linkbtn linkbtn--danger" type="button" data-deliver-reset="${w.id}">清空本周清单</button>
      </div>

      <div class="pcard">
        <h4>本周打卡格式（复制到群里）</h4>
        <pre class="code" id="tpl-${w.id}">${esc(checkinTpl)}</pre>
        <button class="btn btn--primary btn--full" type="button" data-copy="#tpl-${w.id}">复制打卡格式</button>
      </div>
    </div>

    <aside class="panel__side">
      <div class="pcard">
        <h4>本周信息</h4>
        <div class="meta">
          ${meta}
          <div class="meta__row"><span>状态</span><b style="color:var(--cyan)">已开放</b></div>
        </div>
        <a class="btn btn--ghost btn--full" style="margin-top:20px"
           href="${w.file}" download="${esc(w.fileLabel)}">下载本周教学文件（.md）</a>
        ${linksHTML(w)}
      </div>

      <div class="pcard">
        <h4>群内互动玩法</h4>
        <div class="chips" style="margin-bottom:18px">${plays}</div>
        <pre class="code" id="play-${w.id}">${esc(w.playCopy)}</pre>
        <button class="btn btn--ghost btn--full" type="button" data-copy="#play-${w.id}">复制话题文案</button>
      </div>

      <div class="pcard">
        <h4>做完了还能怎么用</h4>
        <ul class="plainlist">${more}</ul>
      </div>

      <div class="pcard">
        <h4>常见卡点</h4>
        <div class="faq">${faq}</div>
      </div>

      <div class="pcard">
        <h4>各周状态</h4>
        <ul class="unlocklist">${renderUnlockList(openIdsOf(), w.id)}</ul>
      </div>
    </aside>
  </div>`;
}

function renderWeekPanels(openIds) {
  const box = $('#weekPanels');
  if (!box) return;
  box.innerHTML = WEEKS
    .map((w) => {
      const open = openIds.includes(w.id);
      return `<div class="panel" role="tabpanel" id="panel-${w.id}">
        ${open ? unlockedPanelHTML(w) : lockedPanelHTML(w)}
      </div>`;
    })
    .join('');

  // 周详情里「常见卡点」问答的折叠交互（与 FAQ 页共用同一套结构和样式）
  if (!renderWeekPanels._accBound) {
    box.addEventListener('click', (e) => {
      const head = e.target.closest('.qa__q');
      if (!head) return;
      const faqBox = head.closest('.faq');
      toggleQa(faqBox, head);
    });
    renderWeekPanels._accBound = true;
  }
}

/** 解锁节奏列表（可复用） */
function openIdsOf() {
  return computeUnlocked();
}

function renderUnlockList(openIds, currentId) {
  return WEEKS
    .map((w) => {
      const open = openIds.includes(w.id);
      const t = unlockTimeOf(w.id);
      const isCur = w.id === currentId;
      const state = open
        ? '<b style="color:var(--cyan)">已开放</b>'
        : `<b style="color:var(--amber)">${fmtDayRange(w.id)}</b>`;
      return `<li class="${isCur ? 'is-current' : ''}${open ? '' : ' is-locked'}">
        <span>W${w.id} · ${esc(w.tab)}</span>${state}
      </li>`;
    })
    .join('');
}

/* =========================================================
   五、渲染：路线图卡片上的锁 + 解锁横幅
   ========================================================= */

function decorateRoadCards(openIds) {
  $$('.road__card').forEach((card) => {
    const id = Number(card.dataset.week);
    const open = openIds.includes(id);
    const w = WEEKS.find((x) => x.id === id);
    card.classList.toggle('is-locked', !open);

    // 头部徽标
    const head = $('.road__head', card);
    if (head && !$('.road__lockind', head)) {
      const ind = document.createElement('span');
      ind.className = 'road__lockind';
      ind.innerHTML = open ? '● 已开放' : '🔒 未开放';
      head.appendChild(ind);
    }

    // 底部：加解锁时间 + 改按钮文案
    const foot = $('.road__foot', card);
    if (foot) {
      let unlockEl = $('.road__unlock', foot);
      if (!unlockEl) {
        unlockEl = document.createElement('span');
        unlockEl.className = 'road__unlock';
        foot.insertBefore(unlockEl, $('.linkbtn', foot));
      }
      const t = unlockTimeOf(id);
      unlockEl.innerHTML = open
        ? '<span class="road__ok">✓ 可以做了</span>'
        : `<span>${fmtDayRange(id)} 开放</span>`;

      const btn = $('.linkbtn', foot);
      if (btn) btn.textContent = open ? '看详情 →' : '看预告 →';
    }

    if (!open) card.title = '该周尚未开放，点击查看会教什么';
  });
}

function renderUnlockBanner(openIds) {
  const box = $('#unlockBanner');
  if (!box) return;

  const lockedCount = WEEKS.length - openIds.length;
  if (lockedCount === 0) {
    box.className = 'unlock-banner unlock-banner--all';
    box.innerHTML = `
      <div class="unlock-banner__icon">🎉</div>
      <div class="unlock-banner__body">
        <strong>四周内容全部开放</strong>
        <span>任意一周都可以随时点开看，之前的每周也都还在。</span>
      </div>`;
    return;
  }

  const nw = nextLockedWeek(openIds);
  const t = nw ? unlockTimeOf(nw.id) : null;

  box.className = 'unlock-banner';
  box.innerHTML = `
    <div class="unlock-banner__icon">🔒</div>
    <div class="unlock-banner__body">
      <strong>已开放 ${openIds.length} / 4 周　｜　下一周《${esc(nw ? nw.title : '')}》${
    nw ? fmtDayRange(nw.id) : ''
  } 开放</strong>
      <span>开放前只放出"这一周会教你什么"，开放后内容永久保留，随时可以回看。</span>
    </div>
    ${
      nw
        ? `<div class="countdown countdown--inline">
             <span class="countdown__label">开放于</span>
             <b class="countdown__num">${fmtDayRange(nw.id)}</b>
           </div>`
        : ''
    }`;
}

/* =========================================================
   六、渲染：教学文件下载区
   ========================================================= */

function renderResources(openIds) {
  const box = $('#resList');
  if (!box) return;

  box.innerHTML = WEEKS.map((w) => {
    const open = openIds.includes(w.id);
    const t = unlockTimeOf(w.id);
    return `
    <article class="res__item${open ? '' : ' is-locked'}">
      <img src="${w.icon}" alt="" width="40" height="40">
      <div class="res__meta">
        <h4>第 ${w.id} 周 · ${esc(w.title)}</h4>
        <p>${open ? esc(w.subtitle) : '🔒 ' + fmtDayRange(w.id) + ' 开放 · 开放后可下载'}</p>
      </div>
      ${
        open
          ? `<a class="btn btn--ghost" href="${w.file}" download="${esc(w.fileLabel)}">下载 .md</a>`
          : `<button class="btn btn--ghost is-disabled" type="button" data-locked-tip>🔒 未开放</button>`
      }
    </article>`;
  }).join('');
}

/* =========================================================
   七、渲染：互动玩法
   ========================================================= */

function renderPlays() {
  const box = $('#playsGrid');
  if (!box) return;
  box.innerHTML = PLAYS.map(
    (p, i) => `
    <button class="play" type="button" data-play="${i}">
      <span class="play__tag">${esc(p.tag)}</span>
      <h4>${esc(p.title)}</h4>
      <p>${esc(p.desc)}</p>
      <span class="play__copy">点击复制话题文案 →</span>
      <span class="play__text">${esc(p.text)}</span>
    </button>`
  ).join('');

  box.addEventListener('click', async (e) => {
    const btn = e.target.closest('.play');
    if (!btn) return;
    const p = PLAYS[Number(btn.dataset.play)];
    if (!p) return;
    const ok = await copyText(p.text);
    toast(ok ? `已复制：「${p.title}」` : '复制失败，请手动长按选择');
  });
}

/* =========================================================
   八、渲染：FAQ
   ========================================================= */

/** 问答卡片折叠：box 为包含多个 .qa 的容器（.faq），head 为被点的 .qa__q */
function toggleQa(box, head) {
  const item = head.parentElement;
  const body = $('.qa__a', item);
  const isOpen = item.classList.contains('is-open');

  $$('.qa', box).forEach((o) => {
    o.classList.remove('is-open');
    const ob = $('.qa__a', o);
    if (ob) ob.style.maxHeight = null;
    const oh = $('.qa__q', o);
    if (oh) oh.setAttribute('aria-expanded', 'false');
  });

  if (!isOpen) {
    item.classList.add('is-open');
    body.style.maxHeight = body.scrollHeight + 'px';
    head.setAttribute('aria-expanded', 'true');
  }
}

function renderFaq() {
  const box = $('#faqList');
  if (!box) return;
  box.innerHTML = FAQ.map(
    ([q, a], i) => `
    <div class="qa" data-qa="${i}">
      <button class="qa__q" type="button" aria-expanded="false">
        <span>${esc(q)}</span><i>+</i>
      </button>
      <div class="qa__a"><div>${rich(a)}</div></div>
    </div>`
  ).join('');

  box.addEventListener('click', (e) => {
    const head = e.target.closest('.qa__q');
    if (!head) return;
    toggleQa(box, head);
  });
}

/* =========================================================
   九、打卡进度（localStorage + 受解锁状态约束）
   ========================================================= */

const STORE_KEY = 'aiweek.checkin.v1';

function readProgress() {
  try {
    const v = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
    return Array.isArray(v) ? v : [];
  } catch (e) {
    return [];
  }
}
function writeProgress(arr) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(arr));
  } catch (e) { /* 隐私模式忽略 */ }
}

function renderChecklist(openIds) {
  const box = $('#checklist');
  if (!box) return;
  const done = readProgress();

  box.innerHTML = CHECK_ITEMS.map(
    ([title, sub], i) => {
      const step = i + 1;
      const open = openIds.includes(step);
      const isDone = done.includes(step);
      return `
      <button class="checkitem${isDone ? ' is-done' : ''}${open ? '' : ' is-locked'}"
              type="button" data-step="${step}" ${open ? '' : 'data-locked-tip'}>
        <span class="checkitem__box"></span>
        <span class="checkitem__body">
          <strong>${esc(title)}</strong>
          <span>${open ? esc(sub) : '🔒 该周尚未开放'}</span>
        </span>
        ${open ? '' : '<span class="checkitem__lock">🔒</span>'}
      </button>`;
    }
  ).join('');

  updateProgressUI(openIds);
}

function updateProgressUI(openIds) {
  const ids = openIds || computeUnlocked();
  const done = readProgress().filter((s) => ids.includes(s));
  const n = done.length;
  const total = 4;
  const pct = (n / total) * 100;

  const dc = $('#doneCount');
  const bar = $('#progressBar');
  const msg = $('#progressMsg');
  if (dc) dc.textContent = n;
  if (bar) bar.style.width = pct + '%';

  if (msg) {
    const lockedLeft = total - ids.length;
    let text;
    if (n === total) text = '🎉 四周全过！你手里已经有一套完整的 AI 工作流了。';
    else if (n === 0) text = '从第 1 周开始吧，先把它装进电脑。';
    else text = ['', '第一步最难，你已经跨过去了。', '两个工具装齐了，这周把你的专属技能做出来。', '快到终点了。做出来，然后上线。'][n] || '继续。';
    if (lockedLeft > 0) text += `　（还有 ${lockedLeft} 周没解锁，按周来）`;
    msg.textContent = text;
  }
}

function initChecklist(openIds) {
  const box = $('#checklist');
  if (!box) return;

  box.addEventListener('click', (e) => {
    const item = e.target.closest('.checkitem');
    if (!item) return;
    const step = Number(item.dataset.step);

    if (!computeUnlocked().includes(step)) {
      const t = unlockTimeOf(step);
      toast(`第 ${step} 周还没开放，${fmtDayRange(step)} 开放`);
      return;
    }

    let done = readProgress();
    if (done.includes(step)) done = done.filter((s) => s !== step);
    else done = [...done, step].sort();

    writeProgress(done);
    item.classList.toggle('is-done', done.includes(step));
    updateProgressUI();

    if (done.length === 4) toast('四周全过！记得在群里发一次总结打卡 🎉');
  });

  const reset = $('#resetProgress');
  if (reset) {
    reset.addEventListener('click', () => {
      if (!window.confirm('确定要清空打卡记录吗？这个操作不可撤销。')) return;
      writeProgress([]);
      $$('.checkitem', box).forEach((el) => el.classList.remove('is-done'));
      updateProgressUI();
      toast('已清空打卡记录');
    });
  }
}

/* =========================================================
   九点五、每周验收清单（可点击勾选，localStorage）
   ---------------------------------------------------------
   存在 { "2": ["2-0","2-3"], "4": ["4-1"] } 这样的结构里
   ========================================================= */

const DELIVER_KEY = 'aiweek.deliver.v1';

function readDeliver() {
  try {
    const v = JSON.parse(localStorage.getItem(DELIVER_KEY) || '{}');
    return v && typeof v === 'object' && !Array.isArray(v) ? v : {};
  } catch (e) {
    return {};
  }
}
function writeDeliver(obj) {
  try {
    localStorage.setItem(DELIVER_KEY, JSON.stringify(obj));
  } catch (e) { /* 隐私模式忽略 */ }
}

/** 把存储状态同步到 DOM（每次重渲染后都要调一次） */
function syncDeliverUI() {
  const all = readDeliver();

  $$('[data-deliver-list]').forEach((list) => {
    const week = list.dataset.deliverList;
    const done = Array.isArray(all[week]) ? all[week] : [];
    let n = 0;

    $$('.deliver__item', list).forEach((item) => {
      const on = done.includes(item.dataset.deliver);
      item.classList.toggle('is-done', on);
      item.setAttribute('aria-checked', on ? 'true' : 'false');
      if (on) n++;
    });

    const badge = $(`[data-deliver-count="${week}"]`);
    const total = $$('.deliver__item', list).length;
    if (badge) {
      badge.textContent = `已勾 ${n} / ${total}`;
      badge.classList.toggle('is-all', n === total && total > 0);
    }

    const btn = $(`[data-deliver-reset="${week}"]`);
    if (btn) btn.style.display = n > 0 ? '' : 'none';
  });
}

function toggleDeliver(item) {
  const key = item.dataset.deliver;
  if (!key) return;
  const week = key.split('-')[0];
  const all = readDeliver();
  const done = Array.isArray(all[week]) ? all[week].slice() : [];

  const i = done.indexOf(key);
  if (i >= 0) done.splice(i, 1);
  else done.push(key);

  if (done.length) all[week] = done;
  else delete all[week];

  writeDeliver(all);
  syncDeliverUI();

  // 全部勾完给个正反馈
  const list = item.closest('[data-deliver-list]');
  if (list) {
    const total = $$('.deliver__item', list).length;
    const now = $$('.deliver__item.is-done', list).length;
    if (total > 0 && now === total) toast('本周验收清单全部勾完，可以去打卡了 🎉');
  }
}

function initDeliver() {
  // 面板会被 refresh() 重渲染，所以用事件委托
  document.addEventListener('click', (e) => {
    const item = e.target.closest('.deliver__item');
    if (item) {
      toggleDeliver(item);
      return;
    }
    const btn = e.target.closest('[data-deliver-reset]');
    if (btn) {
      const week = btn.dataset.deliverReset;
      const all = readDeliver();
      delete all[week];
      writeDeliver(all);
      syncDeliverUI();
      toast(`已清空第 ${week} 周的验收清单`);
    }
  });

  // 键盘可达（Enter / 空格）
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const item = e.target.closest && e.target.closest('.deliver__item');
    if (!item) return;
    e.preventDefault();
    toggleDeliver(item);
  });
}

/* =========================================================
   十、倒计时
   ========================================================= */

function tickCountdowns() {
  const now = Date.now();
  $$('[data-countdown]').forEach((el) => {
    const at = Number(el.dataset.countdown);
    const num = $('[data-countdown-num]', el);
    if (num && at) num.textContent = fmtCountdown(at - now);
  });

  $$('[data-unlock-at]').forEach((el) => {
    const at = Number(el.dataset.unlockAt);
    if (at && now >= at) refresh();
  });
}

/* =========================================================
   十一、视图路由（跳转式，不整页滚动）
   ========================================================= */

const ROUTE_NAMES = ['/', '/calendar', '/week', '/docs', '/checkin', '/plays', '/works', '/faq', '/join'];
let activeTabId = 1;

/** 解析 location.hash → { name, week } */
function currentRoute() {
  const raw = (location.hash || '#/').replace(/^#/, '');
  const m = raw.match(/^\/week(?:\/([1-4]))?\/?$/);
  if (m) return { name: '/week', week: m[1] ? Number(m[1]) : 1 };
  return { name: ROUTE_NAMES.indexOf(raw) >= 0 ? raw : '/' };
}

/** 切视图：只切换可见性，不重新渲染 */
function showRoute(opts) {
  const o = opts || {};
  const r = currentRoute();
  if (r.name === '/week') activeTabId = r.week;

  $$('.view').forEach((v) => {
    const on = v.dataset.view === r.name;
    v.classList.toggle('is-active', on);
    if (!on) $$('.reveal', v).forEach((el) => el.classList.remove('is-in'));
  });

  $$('#navLinks a').forEach((a) => {
    a.classList.toggle('is-active', a.dataset.route === r.name);
  });

  document.body.classList.toggle('is-home', r.name === '/');
  markSideActive(r);

  if (r.name === '/week') {
    applyActiveTab();
  } else {
    // 离开「每周详情」时清掉标签和面板的高亮，
    // 否则回到这一页会看到上一个标签还亮着、和左栏高亮对不上。
    clearActiveTab();
  }

  if (!o.keepScroll) window.scrollTo(0, 0);

  const active = $('.view.is-active');
  if (active) {
    // 重新触发入场动画
    active.classList.remove('is-enter');
    void active.offsetWidth;
    active.classList.add('is-enter');
  }
}

/* =========================================================
   十二、侧边导航
   ========================================================= */

function navGroups(openIds) {
  return [
    {
      title: '开始',
      items: [
        { route: '/', label: '主页' },
        { route: '/calendar', label: '28天排期' },
      ],
    },
    {
      title: '四周',
      items: WEEKS.map((w) => ({
        route: '/week/' + w.id,
        label: 'W' + w.id + ' · ' + w.tab,
        locked: openIds.indexOf(w.id) < 0,
      })),
    },
    {
      title: '资源',
      items: [
        { route: '/docs', label: '教学文件' },
        { route: '/plays', label: '互动玩法' },
      ],
    },
    {
      title: '其他',
      items: [
        { route: '/checkin', label: '打卡进度' },
        { route: '/works', label: '作品墙' },
        { route: '/faq', label: '常见问题' },
        { route: '/join', label: '加入社群' },
      ],
    },
  ];
}

function renderSideNav(openIds) {
  const box = $('#sideNav');
  if (!box) return;
  box.innerHTML = navGroups(openIds)
    .map(
      (g) => `
    <div class="side__group">
      <p class="side__title">${esc(g.title)}</p>
      <ul class="side__list">
        ${g.items
          .map(
            (it) => `<li><a class="side__link" href="#${it.route}" data-side="${it.route}">
              <span>${esc(it.label)}</span>${it.locked ? '<i class="side__lock">🔒</i>' : ''}
            </a></li>`
          )
          .join('')}
      </ul>
    </div>`
    )
    .join('');
  markSideActive(currentRoute());
}

function markSideActive(r) {
  const want = r.name === '/week' ? '/week/' + r.week : r.name;
  $$('#sideNav .side__link').forEach((a) => {
    a.classList.toggle('is-active', a.dataset.side === want);
  });
}

/* =========================================================
   十三、主页各区块
   ========================================================= */

/** 当前该做的那一周 = 已开放里最新的那一周 */
function currentFocusWeek(openIds) {
  const last = openIds.length ? openIds[openIds.length - 1] : 1;
  return WEEKS.find((w) => w.id === last) || WEEKS[0];
}

function statusChip(open) {
  return open
    ? '<span class="chip chip--ok">已开放</span>'
    : '<span class="chip chip--wait">未开放</span>';
}

/** 主页顶部状态条带 */
function renderHomeStatus(openIds) {
  const box = $('#homeStatus');
  if (!box) return;
  const nw = nextLockedWeek(openIds);
  const t = nw ? unlockTimeOf(nw.id) : null;
  const done = readProgress().filter((s) => openIds.indexOf(s) >= 0).length;
  const cur = currentFocusWeek(openIds);

  box.innerHTML = `
  <div class="statusbar">
    <div class="statusbar__cell">
      <span>已开放</span>
      <b>${openIds.length} / ${WEEKS.length} 周</b>
    </div>
    <div class="statusbar__cell statusbar__cell--wide">
      <span>${nw ? '下一周' : '全部开放'}</span>
      <b>${nw ? '《' + esc(nw.title) + '》' : '🎉 四周内容已全开'}</b>
    </div>
    ${
      nw
        ? `<div class="countdown countdown--inline">
             <span class="countdown__label">开放于</span>
             <b class="countdown__num">${fmtDayRange(nw.id)}</b>
           </div>`
        : ''
    }
    <div class="statusbar__cell">
      <span>我的打卡</span>
      <b>${done} / ${WEEKS.length} 周</b>
    </div>
    <div class="statusbar__act">
      <a class="btn btn--primary btn--sm" href="#/week/${cur.id}">进入第 ${cur.id} 周</a>
      <a class="btn btn--ghost btn--sm" href="#/checkin">去打卡</a>
    </div>
  </div>`;
}

/** 课程日历 */
function calendarHTML(openIds) {
  return WEEKS.map((w) => {
    const open = openIds.indexOf(w.id) >= 0;
    const t = unlockTimeOf(w.id);
    return `
    <article class="calrow${open ? ' is-open' : ' is-locked'}">
      <div class="calrow__no"><b>W${w.id}</b></div>
      <div class="calrow__main">
        <h4>${esc(w.title)}</h4>
        <p>${esc(w.subtitle)}</p>
      </div>
      <div class="calrow__meta">
        <span class="calrow__when">营内 ${fmtDayRange(w.id)}</span>
        <span class="calrow__dur">⏱ ${esc(w.duration)}</span>
      </div>
      <div class="calrow__act">
        ${statusChip(open)}
        <a class="linkbtn" href="#/week/${w.id}">${open ? '进入 →' : '看预告 →'}</a>
      </div>
    </article>`;
  }).join('');
}

function renderCalendar(openIds) {
  const a = $('#calendarList');
  if (a) a.innerHTML = calendarHTML(openIds);
  const b = $('#calendarFull');
  if (b) b.innerHTML = calendarHTML(openIds);
}

/** 四周路线卡（主页） */
function renderRoad(openIds) {
  const box = $('#roadGrid');
  if (!box) return;
  box.innerHTML = WEEKS.map((w) => {
    const open = openIds.indexOf(w.id) >= 0;
    const t = unlockTimeOf(w.id);
    return `
    <article class="road__card${open ? '' : ' is-locked'}">
      <div class="road__head">
        <span class="road__num">Week ${w.id}</span>
        <span class="road__lockind">${open ? '● 已开放' : '🔒 未开放'}</span>
      </div>
      <img class="road__icon" src="${w.icon}" alt="" width="46" height="46">
      <h3>${esc(w.title)}</h3>
      <p class="road__desc">${esc(w.subtitle)}</p>
      <ul class="road__list">${w.check
        .slice(0, 3)
        .map((c) => `<li>${esc(c)}</li>`)
        .join('')}</ul>
      <div class="road__foot">
        <span class="road__time">⏱ ${esc(w.duration)}</span>
        ${
          open
            ? '<span class="road__ok">✓ 可以做了</span>'
            : `<span class="road__unlock">${fmtDayRange(w.id)} 开放</span>`
        }
      </div>
      <a class="road__link" href="#/week/${w.id}" aria-label="进入第 ${w.id} 周"></a>
    </article>`;
  }).join('');
}

/** 主页：教学文件（紧凑行） */
function renderHomeDocs(openIds) {
  const box = $('#homeDocs');
  if (!box) return;
  box.innerHTML = WEEKS.map((w) => {
    const open = openIds.indexOf(w.id) >= 0;
    const t = unlockTimeOf(w.id);
    return `
    <article class="docrow${open ? '' : ' is-locked'}">
      <img src="${w.icon}" alt="" width="36" height="36">
      <div class="docrow__meta">
        <h4>第 ${w.id} 周 · ${esc(w.title)}</h4>
        <p>${open ? esc(w.duration) + ' · 可下载' : '🔒 ' + fmtDayRange(w.id) + ' 开放'}</p>
      </div>
      ${
        open
          ? `<a class="btn btn--ghost btn--sm" href="${w.file}" download="${esc(w.fileLabel)}">下载 .md</a>`
          : '<button class="btn btn--ghost btn--sm is-disabled" type="button" data-locked-tip>🔒 未开放</button>'
      }
    </article>`;
  }).join('');
}

/** 本周主推 */
function focusCheckin(w) {
  return `【Week${w.id} 打卡】专业-年级-名字\n✅ 我完成了：${w.output}\n💡 最有收获的一点：______\n🆘 卡住的地方（没有就写"无"）：______`;
}

function renderFocus(openIds) {
  const box = $('#homeFocus');
  if (!box) return;
  const w = currentFocusWeek(openIds);
  const open = openIds.indexOf(w.id) >= 0;
  box.innerHTML = `
  <div class="focus${open ? '' : ' is-locked'}">
    <div class="focus__main">
      <div class="focus__head">
        <span class="focus__no">Week ${w.id}</span>
        ${statusChip(open)}
      </div>
      <h3>${esc(w.title)}</h3>
      <p class="focus__sub">${esc(w.subtitle)}</p>
      <div class="focus__meta">
        <div><span>预计用时</span><b>${esc(w.duration)}</b></div>
        <div><span>本周产出</span><b>${esc(w.output)}</b></div>
        <div><span>前置要求</span><b>${esc(w.prereq)}</b></div>
      </div>
      <p class="focus__goal">${rich(w.goal)}</p>
    </div>
    <div class="focus__side">
      <a class="btn btn--primary btn--full" href="#/week/${w.id}">${
        open ? '进入第 ' + w.id + ' 周 →' : '先看这一周的预告 →'
      }</a>
      ${
        open
          ? `<a class="btn btn--ghost btn--full" href="${w.file}" download="${esc(w.fileLabel)}">下载教学文件 .md</a>`
          : ''
      }
      <pre class="code code--sm" id="focusTpl">${esc(focusCheckin(w))}</pre>
      <button class="btn btn--ghost btn--full" type="button" data-copy="#focusTpl">复制打卡格式</button>
    </div>
  </div>`;
}

/** 主页：折叠区（次要内容） */
function renderFolds() {
  const box = $('#homeFolds');
  if (!box) return;
  box.innerHTML = `
  <details class="fold">
    <summary>三条打卡小规矩</summary>
    <ol class="tips">
      <li>截图记得<strong>打码隐私</strong>，手机号、身份证、学号别露</li>
      <li>卡住的时候<strong>先发求助格式</strong>再等人回，别只发"我不会"</li>
      <li>做完了顺手帮后面卡住的同学，<strong>帮人也算活跃</strong></li>
    </ol>
  </details>

  <details class="fold">
    <summary>群内互动玩法精选（全部 ${PLAYS.length} 条）</summary>
    <div class="fold__plays">
      ${PLAYS.slice(0, 3)
        .map(
          (p) => `<div class="playmini">
            <span class="play__tag">${esc(p.tag)}</span>
            <h5>${esc(p.title)}</h5>
            <p>${esc(p.desc)}</p>
          </div>`
        )
        .join('')}
    </div>
    <p class="hintline">完整玩法在 <a href="#/plays">互动玩法页</a>，点卡片可直接复制文案发群。</p>
  </details>

  <details class="fold">
    <summary>怎么让 WorkBuddy 带着我做完</summary>
    <p class="fold__text">
      把教学文件整个拖进 WorkBuddy 对话框，再发一句「照这份文件带我做完」，
      它就会一步一步教你。<strong>可复制的启动指令</strong>在
      <a href="#/docs">教学文件页</a>底部。
    </p>
  </details>`;
}

/** 打卡页：打卡小规矩 */
function renderRewardRule() {
  const b = $('#ruleCard');
  if (b) {
    b.innerHTML = `
      <h4>三条打卡小规矩</h4>
      <ol class="tips">
        <li>截图记得<strong>打码隐私</strong>，手机号、身份证、学号别露</li>
        <li>卡住的时候<strong>先发求助格式</strong>再等人回，别只发"我不会"</li>
        <li>做完了顺手帮后面卡住的同学，<strong>帮人也算活跃</strong></li>
      </ol>`;
  }
}

/** 页脚链接 */
function renderFoot() {
  const box = $('#footLinks');
  if (!box) return;
  box.innerHTML = [
    ['#/', '主页'],
    ['#/calendar', '28天排期'],
    ['#/week/1', '每周详情'],
    ['#/docs', '教学文件'],
    ['#/plays', '互动玩法'],
    ['#/checkin', '打卡进度'],
    ['#/faq', '常见问题'],
    ['#/join', '加入社群'],
  ]
    .map((pair) => `<a href="${pair[0]}">${pair[1]}</a>`)
    .join('');
}

/* =========================================================
   十四、统一刷新（解锁状态变化 / 倒计时归零）
   ========================================================= */

let lastRefresh = 0;
function refresh(force) {
  const now = Date.now();
  if (!force && now - lastRefresh < 3000) return;
  lastRefresh = now;

  const openIds = computeUnlocked();
  renderSideNav(openIds);
  renderHomeStatus(openIds);
  renderCalendar(openIds);
  renderRoad(openIds);
  renderHomeDocs(openIds);
  renderFocus(openIds);
  renderWeekTabs(openIds);
  renderWeekPanels(openIds);
  renderResources(openIds);
  renderChecklist(openIds);
  syncDeliverUI();
  initWeekTabs();
  if (currentRoute().name === '/week') applyActiveTab();
  markSideActive(currentRoute());
}

/* Tab 切换（用事件委托，避免每次重渲染后重复绑定 / 丢失） */
function applyActiveTab() {
  $$('.tab').forEach((t) => {
    const on = t.dataset.tab === String(activeTabId);
    t.classList.toggle('is-active', on);
    t.setAttribute('aria-selected', on);
  });
  $$('.panel').forEach((p) => p.classList.toggle('is-active', p.id === 'panel-' + activeTabId));
}

function clearActiveTab() {
  $$('.tab').forEach((t) => {
    t.classList.remove('is-active');
    t.setAttribute('aria-selected', 'false');
  });
  $$('.panel').forEach((p) => p.classList.remove('is-active'));
}

function initWeekTabs() {
  const box = $('#weekTabs');
  if (box && !box.dataset.bound) {
    box.addEventListener('click', (e) => {
      const t = e.target.closest('.tab');
      if (!t || !box.contains(t)) return;
      const id = Number(t.dataset.tab);
      if (!id) return;
      // 点击标签 = 切到那周的地址，走统一的 hashchange → showRoute 流程，
      // 这样顶部标签、左侧栏高亮、右侧面板三处永远同源、不会各行其是。
      const target = '#/week/' + id;
      if (location.hash === target) {
        activeTabId = id;
        applyActiveTab();
      } else {
        location.hash = target;
      }
    });
    box.dataset.bound = '1';
  }

  const vol = $('#weekPanelBox') || null;
  if (vol && !vol.dataset.boundOpen) {
    vol.dataset.boundOpen = '1';
  }

  $$('[data-open-week]').forEach((btn) => {
    if (btn.dataset.boundOpen) return;
    btn.dataset.boundOpen = '1';
    btn.onclick = () => {
      const id = Number(btn.dataset.openWeek);
      if (!computeUnlocked().includes(id)) {
        const w = WEEKS.find((x) => x.id === id);
        toast(`第 ${id} 周还没开放：${fmtDayRange(id)} 开放，先看看《${w.title}》会教什么`);
      }
      location.hash = '#/week/' + id;
    };
  });
}

/* =========================================================
   十五、复制按钮 / 交互 / 动效
   ========================================================= */

function initCopyButtons() {
  document.addEventListener('click', async (e) => {
    const locked = e.target.closest('[data-locked-tip]');
    if (locked) {
      const t = nextLockedWeek(computeUnlocked());
      toast(`${t ? '🔒 该内容将在 ' + fmtDayRange(t.id) + ' 开放' : '🔒 该内容尚未开放'}`);
      return;
    }

    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    const target = $(btn.dataset.copy);
    if (!target) return;
    const ok = await copyText(target.textContent);
    toast(ok ? '已复制到剪贴板' : '复制失败，请手动长按选择');
  });
}

function initNav() {
  const nav = $('#nav');
  const burger = $('#navBurger');
  const links = $('#navLinks');

  const onScroll = () => {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 8);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const bar = $('#readProgress');
    if (bar) bar.style.width = (h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0) + '%';
    const top = $('#toTop');
    if (top) top.classList.toggle('is-show', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
    });
    links.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        links.classList.remove('is-open');
        burger.classList.remove('is-open');
        document.body.classList.remove('nav-open');
      }
    });
  }

  const top = $('#toTop');
  if (top) top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* =========================================================
   十六、入场动画 / 鼠标拖尾
   ========================================================= */

/** 特性检测：matchMedia 可能不存在，不能让它把启动流程带崩 */
function mediaMatches(query) {
  return !!(window.matchMedia && window.matchMedia(query).matches);
}

function prefersReduce() {
  return mediaMatches('(prefers-reduced-motion: reduce)');
}

/**
 * 入场动画：渐变铺底 + 三角碎片 + 呼吸标记，1.1–1.5 秒后淡出。
 *
 * ⚠️ 曾经踩过的坑：只有「提前返回」那条分支清了 body.is-loading，
 * 而 body.is-loading{overflow:hidden} 会让**首次访问永远滚不动**，
 * 刷新一次反而正常（因为第二次走的是提前返回分支）——症状极具误导性。
 * 现在所有出口都统一走 release()，并加了兜底计时器，任何情况下都不许把滚动锁住。
 */
function initSplash(onEnter) {
  const el = $('#splash');
  let seen = false;
  try {
    seen = sessionStorage.getItem('aiweek.splash') === '1';
  } catch (e) {}

  let finished = false;

  /** 解除一切滚动锁（唯一出口，保证不会被漏掉） */
  function release() {
    document.documentElement.style.overflow = '';
    document.body.classList.remove('is-loading');
    window.removeEventListener('wheel', onIntent);
    window.removeEventListener('touchstart', onIntent);
    window.removeEventListener('keydown', onIntent);
    window.removeEventListener('pointerdown', onIntent);
  }

  function finish(instant) {
    if (finished) return;
    finished = true;
    release();

    if (el) {
      if (instant) {
        el.style.display = 'none';
      } else {
        el.classList.add('is-out');
        setTimeout(() => {
          el.style.display = 'none';
        }, 620);
      }
    }

    try {
      sessionStorage.setItem('aiweek.splash', '1');
    } catch (e) {}

    onEnter();
  }

  /** 用户一有动作就立刻让开，避免"第一次进来滚不动"的体感 */
  function onIntent() {
    finish(false);
  }

  if (!el || prefersReduce() || seen) {
    finish(true);
    return;
  }

  // 用 overflow 锁滚动即可，不需要 preventDefault，那样会吃掉用户的第一次滚轮
  document.documentElement.style.overflow = 'hidden';
  window.addEventListener('wheel', onIntent, { passive: true });
  window.addEventListener('touchstart', onIntent, { passive: true });
  window.addEventListener('keydown', onIntent);
  window.addEventListener('pointerdown', onIntent);

  const wait = 1150 + Math.random() * 350;
  setTimeout(() => finish(false), wait);
  // 兜底：不管发生什么，4 秒后必须放行
  setTimeout(() => finish(false), 4000);
}

/** 鼠标滑动拖尾（canvas，触屏与减弱动效下不启用） */
function initTrail() {
  const cv = $('#trail');
  if (!cv || !cv.getContext) return;
  if (prefersReduce() || !mediaMatches('(pointer: fine)')) {
    cv.remove();
    return;
  }

  const ctx = cv.getContext('2d');
  if (!ctx) {
    cv.remove();
    return;
  }
  let W = 0;
  let H = 0;
  let dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.width = Math.floor(window.innerWidth * dpr);
    H = cv.height = Math.floor(window.innerHeight * dpr);
    cv.style.width = window.innerWidth + 'px';
    cv.style.height = window.innerHeight + 'px';
  }
  resize();
  window.addEventListener('resize', resize);

  const pts = [];
  const MAX = 30;
  let mx = 0;
  let my = 0;
  let px = 0;
  let py = 0;
  let started = false;

  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType === 'touch') return;
      mx = e.clientX * dpr;
      my = e.clientY * dpr;
      if (!started) {
        started = true;
        px = mx;
        py = my;
        cv.classList.add('is-on');
      }
    },
    { passive: true }
  );

  function frame() {
    ctx.clearRect(0, 0, W, H);
    if (started) {
      const dx = mx - px;
      const dy = my - py;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.min(3, Math.max(1, Math.floor(dist / 16)));
      for (let i = 1; i <= steps; i++) {
        pts.push({ x: px + (dx * i) / steps, y: py + (dy * i) / steps, t: 1 });
      }
      px = mx;
      py = my;
      if (pts.length > MAX) pts.splice(0, pts.length - MAX);
    }

    for (let i = pts.length - 1; i >= 0; i--) {
      const p = pts[i];
      p.t -= 0.026;
      if (p.t <= 0) {
        pts.splice(i, 1);
        continue;
      }
      const r = (10 + 26 * (1 - p.t)) * dpr * 0.5;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
      g.addColorStop(0, 'rgba(109,47,128,' + 0.30 * p.t + ')');
      g.addColorStop(0.45, 'rgba(190,130,225,' + 0.16 * p.t + ')');
      g.addColorStop(1, 'rgba(109,47,128,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* =========================================================
   十七、启动
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  renderFoot();
  renderFolds();
  renderRewardRule();
  renderPlays();
  renderFaq();
  refresh(true);

  initChecklist();
  initDeliver();
  initCopyButtons();
  initNav();
  initTrail();

  window.addEventListener('hashchange', () => showRoute());

  initSplash(() => {
    showRoute();
  });

  tickCountdowns();
  setInterval(tickCountdowns, 1000);
});
