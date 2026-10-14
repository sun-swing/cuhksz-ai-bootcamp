/* =========================================================
   云服务：云端打卡墙 + 作品墙
   依赖 WorkBuddyCloud CDN 全局（在 index.html 中先于本文件加载）
   ========================================================= */
(function () {
  'use strict';

  /* ---- 初始化（publicConfig 由云服务激活时返回，可安全放入前端源码） ---- */
  var ENDPOINT = 'https://cuhksz-ai-bootcamp.app.workbuddy.host';
  var PUBLISHABLE_KEY = 'wbpk_TGQjjlCn0Z2HN2z2lGTIcR_t0dwg021FjyKTKhE7WgCa4ekBR5j1e69';

  var cloud = null;
  function getCloud() {
    if (cloud) return cloud;
    if (typeof WorkBuddyCloud === 'undefined' || !WorkBuddyCloud.createWorkBuddyCloud) return null;
    try {
      cloud = WorkBuddyCloud.createWorkBuddyCloud({
        endpoint: ENDPOINT,        // 必填：数据面地址（publicConfig.endpoint）
        publishableKey: PUBLISHABLE_KEY, // 必填：应用标识（publicConfig.publishableKey）
      });
    } catch (e) {
      cloud = null;
    }
    return cloud;
  }

  var $ = function (s, r) { return (r || document).querySelector(s); };

  /* 用户内容一律转义后再插入 DOM，防注入 */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  var WEEK_LABELS = {
    1: 'W1 · 安装 WorkBuddy',
    2: 'W2 · 搭建知识库',
    3: 'W3 · 第一个 Skill',
    4: 'W4 · 个人网页上线',
  };

  var NICK_KEY = 'bootcamp-nickname';
  function readNick() {
    try { return localStorage.getItem(NICK_KEY) || ''; } catch (e) { return ''; }
  }
  function saveNick(v) {
    try { localStorage.setItem(NICK_KEY, v); } catch (e) { /* 忽略 */ }
  }

  function fmtTime(iso) {
    try {
      var d = new Date(iso);
      if (isNaN(d.getTime())) return '';
      return (d.getMonth() + 1) + '月' + d.getDate() + '日 ' +
        ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
    } catch (e) { return ''; }
  }

  function setMsg(id, text, ok) {
    var el = $(id);
    if (!el) return;
    el.textContent = text;
    el.classList.toggle('is-ok', !!ok);
    el.classList.toggle('is-err', !ok && !!text);
  }

  function friendlyError(err) {
    var code = err && err.code;
    if (code === '42501') return '没有写入权限，请联系管理员检查数据表配置。';
    if (code === '42P01') return '云端数据表还没建好，请联系管理员。';
    return (err && err.message) ? err.message : '网络异常，请稍后再试。';
  }

  /* ================= 打卡墙 ================= */

  function renderCheckins(rows) {
    var box = $('#cwList');
    if (!box) return;
    if (!rows || !rows.length) {
      box.innerHTML = '<p class="cloudwall__empty">还没有人打卡，来做第一个吧 ✨</p>';
      return;
    }
    box.innerHTML = rows.map(function (r) {
      return '<div class="wallitem">' +
        '<div class="wallitem__top"><b>' + esc(r.nickname) + '</b>' +
        '<span class="wallitem__week">' + esc(WEEK_LABELS[r.week] || ('W' + r.week)) + '</span>' +
        '<time>' + esc(fmtTime(r.created_at)) + '</time></div>' +
        '<p class="wallitem__body">' + esc(r.content) + '</p>' +
        '</div>';
    }).join('');
  }

  function loadCheckins() {
    var c = getCloud();
    var box = $('#cwList');
    if (!c || !box) {
      if (box) box.innerHTML = '<p class="cloudwall__empty">云端打卡暂不可用（网络或服务未开通），本地打卡进度不受影响。</p>';
      return;
    }
    c.database.from('checkins')
      .select('id, nickname, week, content, created_at')
      .order('created_at', { ascending: false })
      .limit(30)
      .then(function (res) {
        if (res.error) {
          box.innerHTML = '<p class="cloudwall__empty">打卡墙加载失败：' + esc(friendlyError(res.error)) + '</p>';
          return;
        }
        renderCheckins(res.data);
      });
  }

  function submitCheckin() {
    var nick = ($('#cwNick') || {}).value;
    var weekEl = $('#cwWeek');
    var content = ($('#cwContent') || {}).value;
    nick = (nick || '').trim();
    content = (content || '').trim();
    var week = weekEl ? Number(weekEl.value) : 0;

    if (!nick) return setMsg('#cwMsg', '请先填一个昵称，方便同学认识你。');
    if (!content) return setMsg('#cwMsg', '打卡内容不能为空哦。');
    if (!week || week < 1 || week > 4) return setMsg('#cwMsg', '请选择周次。');

    var c = getCloud();
    if (!c) return setMsg('#cwMsg', '云端服务暂不可用，请稍后再试。');

    saveNick(nick);
    var btn = $('#cwSubmit');
    if (btn) { btn.disabled = true; btn.textContent = '提交中…'; }

    c.database.from('checkins')
      .insert({ nickname: nick, week: week, content: content })
      .then(function (res) {
        if (btn) { btn.disabled = false; btn.textContent = '提交打卡'; }
        if (res.error) return setMsg('#cwMsg', '提交失败：' + friendlyError(res.error));
        setMsg('#cwMsg', '打卡成功！已经上墙啦 🔥', true);
        var ta = $('#cwContent');
        if (ta) ta.value = '';
        loadCheckins();
      });
  }

  /* ================= 作品墙 ================= */

  function renderWorks(rows) {
    var box = $('#wkList');
    if (!box) return;
    if (!rows || !rows.length) {
      box.innerHTML = '<p class="cloudwall__empty">作品墙还空着，提交第一个作品吧 🚀</p>';
      return;
    }
    box.innerHTML = rows.map(function (r) {
      var titleHtml = esc(r.title);
      if (r.url) {
        var safeUrl = /^https?:\/\//i.test(r.url) ? esc(r.url) : '';
        if (safeUrl) titleHtml = '<a href="' + safeUrl + '" target="_blank" rel="noopener noreferrer">' + esc(r.title) + '</a>';
      }
      var desc = r.description ? '<p class="wallitem__body">' + esc(r.description) + '</p>' : '';
      return '<div class="wallitem">' +
        '<div class="wallitem__top"><b>' + titleHtml + '</b>' +
        '<span class="wallitem__week">' + esc(WEEK_LABELS[r.week] || ('W' + r.week)) + '</span>' +
        '<span class="wallitem__nick">' + esc(r.nickname) + '</span>' +
        '<time>' + esc(fmtTime(r.created_at)) + '</time></div>' +
        desc +
        '</div>';
    }).join('');
  }

  function loadWorks() {
    var c = getCloud();
    var box = $('#wkList');
    if (!c || !box) {
      if (box) box.innerHTML = '<p class="cloudwall__empty">作品墙暂不可用（网络或服务未开通）。</p>';
      return;
    }
    c.database.from('works')
      .select('id, nickname, week, title, url, description, created_at')
      .order('created_at', { ascending: false })
      .limit(30)
      .then(function (res) {
        if (res.error) {
          box.innerHTML = '<p class="cloudwall__empty">作品墙加载失败：' + esc(friendlyError(res.error)) + '</p>';
          return;
        }
        renderWorks(res.data);
      });
  }

  function submitWork() {
    var nick = ($('#wkNick') || {}).value;
    var weekEl = $('#wkWeek');
    var title = ($('#wkTitle') || {}).value;
    var urlEl = $('#wkUrl');
    var descEl = $('#wkDesc');
    nick = (nick || '').trim();
    var url = (urlEl && urlEl.value ? urlEl.value : '').trim();
    var description = (descEl && descEl.value ? descEl.value : '').trim();
    title = (title || '').trim();
    var week = weekEl ? Number(weekEl.value) : 0;

    if (!nick) return setMsg('#wkMsg', '请先填一个昵称。');
    if (!title) return setMsg('#wkMsg', '请给作品起个名字。');
    if (!week || week < 1 || week > 4) return setMsg('#wkMsg', '请选择周次。');
    if (url && !/^https?:\/\/.{4,}$/i.test(url)) return setMsg('#wkMsg', '链接要以 https:// 开头，或留空。');

    var c = getCloud();
    if (!c) return setMsg('#wkMsg', '云端服务暂不可用，请稍后再试。');

    saveNick(nick);
    var btn = $('#wkSubmit');
    if (btn) { btn.disabled = true; btn.textContent = '提交中…'; }

    var row = { nickname: nick, week: week, title: title };
    if (url) row.url = url;
    if (description) row.description = description;

    c.database.from('works').insert(row).then(function (res) {
      if (btn) { btn.disabled = false; btn.textContent = '提交作品'; }
      if (res.error) return setMsg('#wkMsg', '提交失败：' + friendlyError(res.error));
      setMsg('#wkMsg', '作品已上墙！快去告诉群里同学 🎉', true);
      if (urlEl) urlEl.value = '';
      if (descEl) descEl.value = '';
      var t = $('#wkTitle'); if (t) t.value = '';
      loadWorks();
    });
  }

  /* ================= 访问计数（只写入，不在前端展示任何数据） ================= */

  var LAST_TRACK = { path: '', at: 0 };

  function deviceType() {
    var ua = navigator.userAgent || '';
    if (/iPad|Tablet/i.test(ua)) return 'tablet';
    if (/Mobi|Android|iPhone/i.test(ua)) return 'mobile';
    return 'desktop';
  }

  function refHost() {
    try {
      var r = document.referrer || '';
      if (!r) return '';
      return r.replace(/^https?:\/\//i, '').split('/')[0].slice(0, 60);
    } catch (e) { return ''; }
  }

  /* 记录一次页面访问：同一路径 1 分钟内不重复计数（避免刷新刷量） */
  function trackPageview() {
    var c = getCloud();
    if (!c) return;
    var path = ((location.hash || '#/').replace(/^#/, '') || '/').slice(0, 120);
    var now = Date.now();
    if (path === LAST_TRACK.path && now - LAST_TRACK.at < 60000) return;
    LAST_TRACK.path = path;
    LAST_TRACK.at = now;

    c.database.from('pageviews')
      .insert({ path: path, referrer: refHost(), device: deviceType() })
      .then(function (res) {
        /* 统计失败不影响任何页面功能，仅在控制台留痕，不打扰访客 */
        if (res && res.error && window.console) console.debug('[pageview] not recorded:', res.error.message || res.error);
      });
  }

  /* ================= 启动 ================= */

  function init() {
    var nick = readNick();
    ['cwNick', 'wkNick'].forEach(function (id) {
      var el = $('#' + id);
      if (el && nick) el.value = nick;
    });

    var cwBtn = $('#cwSubmit');
    if (cwBtn) cwBtn.addEventListener('click', submitCheckin);
    var wkBtn = $('#wkSubmit');
    if (wkBtn) wkBtn.addEventListener('click', submitWork);

    /* 访问计数：首屏记一次，之后每次切换页面各记一次 */
    trackPageview();

    /* 切到对应页面时才加载，避免首屏多余请求 */
    var checkinsLoaded = false, worksLoaded = false;
    function maybeLoad() {
      var h = location.hash || '#/';
      if (h.indexOf('#/checkin') === 0 && !checkinsLoaded) { checkinsLoaded = true; loadCheckins(); }
      if (h.indexOf('#/works') === 0 && !worksLoaded) { worksLoaded = true; loadWorks(); }
    }
    maybeLoad();
    window.addEventListener('hashchange', function () {
      trackPageview();
      maybeLoad();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
