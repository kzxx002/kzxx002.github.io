/**
 * Daily News Widget - 每日新闻组件
 * 自动加载 /daily-news.json 并渲染到主页顶部
 */
(function () {
  'use strict';

  /* 只在首页显示新闻 */
  if (location.pathname !== '/' && location.pathname !== '/index.html') return;

  const CONTAINER_ID = 'daily-news-widget';
  const DATA_URL = '/daily-news.json';

  /* ---- 样式注入 ---- */
  const style = document.createElement('style');
  style.textContent = `
    /* 新闻容器 */
    #${CONTAINER_ID} {
      max-width: 900px;
      margin: 0 auto 30px;
      padding: 0 16px;
      animation: dn-fadeIn .6s ease-out;
    }
    @keyframes dn-fadeIn {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* 标题栏 */
    .dn-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
    }
    .dn-header-icon {
      font-size: 22px;
    }
    .dn-header-title {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: .5px;
    }
    .dn-header-date {
      margin-left: auto;
      font-size: 13px;
      opacity: .6;
    }

    /* 新闻滚动区域 */
    .dn-scroll {
      display: flex;
      gap: 16px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 8px;
      scrollbar-width: thin;
    }
    .dn-scroll::-webkit-scrollbar {
      height: 4px;
    }
    .dn-scroll::-webkit-scrollbar-thumb {
      background: var(--dn-accent, #4facfe);
      border-radius: 2px;
    }

    /* 单条新闻卡片 */
    .dn-card {
      flex: 0 0 260px;
      scroll-snap-align: start;
      border-radius: 12px;
      overflow: hidden;
      background: var(--card-bg, #fff);
      box-shadow: 0 2px 12px rgba(0,0,0,.08);
      transition: transform .25s, box-shadow .25s;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      display: block;
    }
    .dn-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0,0,0,.15);
    }

    .dn-card-img {
      width: 100%;
      height: 140px;
      object-fit: cover;
      display: block;
    }

    .dn-card-body {
      padding: 12px 14px 14px;
    }

    .dn-card-category {
      display: inline-block;
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 10px;
      color: #fff;
      margin-bottom: 6px;
    }

    .dn-card-title {
      font-size: 14px;
      font-weight: 600;
      line-height: 1.45;
      margin-bottom: 6px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .dn-card-summary {
      font-size: 12px;
      line-height: 1.55;
      opacity: .65;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* 暗色模式适配 */
    [data-theme="dark"] .dn-card {
      background: var(--card-bg, #222244);
      box-shadow: 0 2px 12px rgba(0,0,0,.3);
    }
    [data-theme="dark"] .dn-card:hover {
      box-shadow: 0 8px 24px rgba(79,172,254,.15);
    }
    [data-theme="dark"] .dn-header-title,
    [data-theme="dark"] .dn-card-title {
      color: var(--font-color, #e0e0f0);
    }

    /* 响应式 */
    @media (max-width: 768px) {
      .dn-card { flex: 0 0 220px; }
      .dn-card-img { height: 120px; }
    }
  `;
  document.head.appendChild(style);

  /* ---- 渲染函数 ---- */
  function render(data) {
    const container = document.createElement('div');
    container.id = CONTAINER_ID;

    const dateStr = data.updateDate || new Date().toISOString().slice(0, 10);
    const dateLabel = dateStr.replace(/-/g, '/');

    let cardsHTML = '';
    data.news.forEach(function (item) {
      cardsHTML += `
        <a class="dn-card" href="${item.link}" target="_blank" rel="noopener noreferrer">
          <img class="dn-card-img" src="${item.image}" alt="${item.title}" loading="lazy" />
          <div class="dn-card-body">
            <span class="dn-card-category" style="background:${item.categoryColor}">${item.category}</span>
            <div class="dn-card-title">${item.title}</div>
            <div class="dn-card-summary">${item.summary}</div>
          </div>
        </a>`;
    });

    container.innerHTML = `
      <div class="dn-header">
        <span class="dn-header-icon">&#x1F4F0;</span>
        <span class="dn-header-title">每日新闻</span>
        <span class="dn-header-date">${dateLabel}</span>
      </div>
      <div class="dn-scroll">${cardsHTML}</div>
    `;

    /* 插入到 #recent-posts 之前 */
    var target = document.getElementById('recent-posts');
    if (target && target.parentNode) {
      target.parentNode.insertBefore(container, target);
    } else {
      /* 兜底：插入到 main 内容区顶部 */
      var main = document.querySelector('#page') || document.querySelector('main') || document.body;
      main.prepend(container);
    }
  }

  /* ---- 数据加载 ---- */
  fetch(DATA_URL)
    .then(function (res) { return res.json(); })
    .then(render)
    .catch(function (err) {
      console.warn('[DailyNews] 加载失败:', err.message);
    });
})();
