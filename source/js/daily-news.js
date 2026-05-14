/**
 * Daily News Widget - API 版本
 * 调用 whyta.cn tx-news API（国内+国际+科技），渲染到主页顶部
 * API Key: 6d997a997fbf
 */
(function () {
  'use strict';

  /* 只在首页显示新闻 */
  if (location.pathname !== '/' && location.pathname !== '/index.html') return;

  var API_KEY = '6d997a997fbf';
  var API_BASE = 'https://apis.whyta.cn/api/tx';
  var CATEGORIES = [
    { id: 'guonei', label: '国内', color: '#4facfe' },
    { id: 'world',  label: '国际', color: '#43e97b' },
    { id: 'keji',   label: '科技', color: '#667eea' }
  ];
  var NUM_PER_CATEGORY = 3; /* 每类 3 条，共 9 条 */

  /* ---- 样式注入 ---- */
  var style = document.createElement('style');
  style.textContent = '\
    #daily-news-widget {\
      width: 100%;\
      margin: 0 0 24px;\
      padding: 0;\
      animation: dn-fadeIn .6s ease-out;\
      display: block !important;\
      position: static !important;\
      overflow: visible !important;\
      height: auto !important;\
      flex-direction: row !important;\
      flex-wrap: wrap !important;\
      align-items: stretch !important;\
      background: none !important;\
      box-shadow: none !important;\
      border: none !important;\
      border-radius: 0 !important;\
      max-height: none !important;\
      min-height: 0 !important;\
    }\
    @keyframes dn-fadeIn {\
      from { opacity: 0; transform: translateY(16px); }\
      to   { opacity: 1; transform: translateY(0); }\
    }\
    .dn-header {\
      display: flex;\
      align-items: center;\
      gap: 10px;\
      margin-bottom: 16px;\
    }\
    .dn-header-icon {\
      font-size: 22px;\
    }\
    .dn-header-title {\
      font-size: 20px;\
      font-weight: 700;\
      letter-spacing: .5px;\
    }\
    .dn-header-disclaimer {\
      font-size: 12px;\
      opacity: .45;\
      margin-left: 2px;\
      font-weight: 400;\
    }\
    .dn-header-date {\
      margin-left: auto;\
      font-size: 13px;\
      opacity: .6;\
    }\
    .dn-loading {\
      text-align: center;\
      padding: 20px;\
      opacity: .5;\
      font-size: 14px;\
    }\
    .dn-error {\
      text-align: center;\
      padding: 16px;\
      opacity: .6;\
      font-size: 13px;\
      display: none;\
    }\
    .dn-scroll {\
      display: flex;\
      gap: 16px;\
      overflow-x: auto;\
      scroll-snap-type: x mandatory;\
      -webkit-overflow-scrolling: touch;\
      padding-bottom: 8px;\
      scrollbar-width: thin;\
    }\
    .dn-scroll::-webkit-scrollbar {\
      height: 4px;\
    }\
    .dn-scroll::-webkit-scrollbar-thumb {\
      background: var(--dn-accent, #4facfe);\
      border-radius: 2px;\
    }\
    .dn-card {\
      flex: 0 0 260px;\
      scroll-snap-align: start;\
      border-radius: 12px;\
      overflow: hidden;\
      background: var(--card-bg, #fff);\
      box-shadow: 0 2px 12px rgba(0,0,0,.08);\
      transition: transform .25s, box-shadow .25s;\
      cursor: pointer;\
      text-decoration: none;\
      color: inherit;\
      display: block;\
    }\
    .dn-card:hover {\
      transform: translateY(-4px);\
      box-shadow: 0 8px 24px rgba(0,0,0,.15);\
    }\
    .dn-card-img {\
      width: 100%;\
      height: 140px;\
      object-fit: cover;\
      display: block;\
    }\
    .dn-card-body {\
      padding: 12px 14px 14px;\
    }\
    .dn-card-category {\
      display: inline-block;\
      font-size: 11px;\
      font-weight: 600;\
      padding: 2px 8px;\
      border-radius: 10px;\
      color: #fff;\
      margin-bottom: 6px;\
    }\
    .dn-card-title {\
      font-size: 14px;\
      font-weight: 600;\
      line-height: 1.45;\
      margin-bottom: 6px;\
      display: -webkit-box;\
      -webkit-line-clamp: 2;\
      -webkit-box-orient: vertical;\
      overflow: hidden;\
    }\
    .dn-card-summary {\
      font-size: 12px;\
      line-height: 1.55;\
      opacity: .65;\
      display: -webkit-box;\
      -webkit-line-clamp: 2;\
      -webkit-box-orient: vertical;\
      overflow: hidden;\
    }\
    [data-theme="dark"] .dn-card {\
      background: var(--card-bg, #222244);\
      box-shadow: 0 2px 12px rgba(0,0,0,.3);\
    }\
    [data-theme="dark"] .dn-card:hover {\
      box-shadow: 0 8px 24px rgba(79,172,254,.15);\
    }\
    [data-theme="dark"] .dn-header-title,\
    [data-theme="dark"] .dn-card-title {\
      color: var(--font-color, #e0e0f0);\
    }\
    @media (max-width: 768px) {\
      .dn-card { flex: 0 0 220px; }\
      .dn-card-img { height: 120px; }\
    }\
  ';
  document.head.appendChild(style);

  /* ---- 渲染函数 ---- */
  function render(allNews) {
    if (!allNews.length) {
      showMsg('暂无新闻数据');
      return;
    }

    var today = new Date();
    var dateLabel = today.getFullYear() + '/' +
      String(today.getMonth() + 1).padStart(2, '0') + '/' +
      String(today.getDate()).padStart(2, '0');

    var container = document.createElement('div');
    container.id = 'daily-news-widget';

    var cardsHTML = '';
    allNews.forEach(function (item) {
      var link = item.url || '#';
      var color = item._color || '#4facfe';
      var category = item._category || '新闻';
      var title = item.title || item.name || '';
      var img = item.picUrl || '';
      var desc = item.description || '';
      /* 截断摘要 */
      if (desc.length > 60) desc = desc.slice(0, 60) + '...';

      cardsHTML += '\
        <a class="dn-card" href="' + link + '" target="_blank" rel="noopener noreferrer">\
          <img class="dn-card-img" src="' + img + '" alt="' + title + '" loading="lazy" onerror="this.style.display=\'none\'" />\
          <div class="dn-card-body">\
            <span class="dn-card-category" style="background:' + color + '">' + category + '</span>\
            <div class="dn-card-title">' + title + '</div>\
            ' + (desc ? '<div class="dn-card-summary">' + desc + '</div>' : '') + '\
          </div>\
        </a>';
    });

    container.innerHTML = '\
      <div class="dn-header">\
        <span class="dn-header-icon">&#x1F4F0;</span>\
        <span class="dn-header-title">每日新闻</span>\
        <span class="dn-header-disclaimer">内容由 AI 生成，请核实重要信息。</span>\
        <span class="dn-header-date">' + dateLabel + '</span>\
      </div>\
      <div class="dn-scroll">' + cardsHTML + '</div>\
    ';

    var posts = document.getElementById('recent-posts');
    if (posts) {
      var items = posts.querySelector('.recent-post-items');
      if (items) {
        posts.insertBefore(container, items);
      } else {
        posts.prepend(container);
      }
    } else {
      var main = document.querySelector('main') || document.body;
      main.prepend(container);
    }
  }

  function showMsg(text) {
    var el = document.getElementById('daily-news-widget');
    if (el) el.querySelector('.dn-loading').textContent = text;
  }

  /* ---- 加载占位 ---- */
  var placeholder = document.createElement('div');
  placeholder.id = 'daily-news-widget';
  placeholder.innerHTML = '<div class="dn-loading">加载新闻中...</div>';
  var postsEl = document.getElementById('recent-posts');
  if (postsEl) {
    var itemsEl = postsEl.querySelector('.recent-post-items');
    if (itemsEl) {
      postsEl.insertBefore(placeholder, itemsEl);
    } else {
      postsEl.prepend(placeholder);
    }
  }

  /* ---- 并发请求三个分类 ---- */
  var promises = CATEGORIES.map(function (cat) {
    var url = API_BASE + '/' + cat.id + '?key=' + API_KEY + '&num=' + NUM_PER_CATEGORY;
    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        var list = data.newslist || data.data || data.news || [];
        if (!Array.isArray(list)) list = [];
        /* 给每条打上分类标签和颜色 */
        return list.slice(0, NUM_PER_CATEGORY).map(function (item) {
          item._category = cat.label;
          item._color = cat.color;
          return item;
        });
      })
      .catch(function (err) {
        console.warn('[DailyNews] ' + cat.label + ' 加载失败:', err.message);
        return [];
      });
  });

  Promise.all(promises).then(function (results) {
    var allNews = [].concat.apply([], results);
    if (allNews.length) {
      var ph = document.getElementById('daily-news-widget');
      if (ph) ph.remove();
      render(allNews);
    } else {
      showMsg('新闻加载失败，请稍后刷新');
    }
  });
})();
