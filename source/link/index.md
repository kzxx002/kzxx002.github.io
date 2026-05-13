---
title: 友情链接
date: 2025-05-10 12:00:00
permalink: /link/
comments: false
top_img: /img/default_bg.jpg
---

<style>
  /* ===== 友链美化 ===== */
  .flink-desc {
    text-align: center;
    font-size: 15px;
    opacity: 0.7;
    margin: 0 0 30px;
  }
  .flink-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin: 0 0 40px;
  }
  .flink-list-item {
    background: var(--card-bg);
    border-radius: 16px;
    border: 1px solid var(--border-color, rgba(0,0,0,0.06));
    overflow: hidden;
    transition: transform 0.35s cubic-bezier(.25,.8,.25,1), box-shadow 0.35s cubic-bezier(.25,.8,.25,1), border-color 0.3s;
    position: relative;
  }
  .flink-list-item:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.12);
    border-color: var(--btn-color, #49b1f5);
  }
  [data-theme="dark"] .flink-list-item {
    border-color: var(--border-color, rgba(255,255,255,0.06));
  }
  [data-theme="dark"] .flink-list-item:hover {
    box-shadow: 0 12px 32px rgba(73,177,245,0.15);
  }
  .flink-list-item a {
    display: flex;
    align-items: center;
    padding: 20px;
    text-decoration: none !important;
    color: var(--font-color, #333) !important;
    gap: 16px;
  }
  .flink-item-icon {
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid rgba(0,0,0,0.05);
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    transition: transform 0.3s;
  }
  .flink-list-item:hover .flink-item-icon {
    transform: scale(1.08) rotate(3deg);
  }
  [data-theme="dark"] .flink-item-icon {
    border-color: rgba(255,255,255,0.08);
  }
  .flink-item-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  .flink-item-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
    flex: 1;
  }
  .flink-item-name {
    font-size: 16px;
    font-weight: 700;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .flink-item-desc {
    font-size: 13px;
    opacity: 0.6;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* 访问图标箭头 */
  .flink-list-item a::after {
    content: '\2192';
    flex-shrink: 0;
    font-size: 18px;
    opacity: 0;
    transform: translateX(-8px);
    transition: opacity 0.3s, transform 0.3s;
    color: var(--btn-color, #49b1f5);
  }
  .flink-list-item:hover a::after {
    opacity: 0.7;
    transform: translateX(0);
  }
  /* 响应式 */
  @media (max-width: 768px) {
    .flink-list {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 14px;
    }
    .flink-list-item a {
      padding: 16px;
    }
    .flink-item-icon {
      width: 46px;
      height: 46px;
    }
    .flink-item-name { font-size: 15px; }
    .flink-item-desc { font-size: 12px; }
  }
</style>

{% note success %}
欢迎交换友链！请在评论区留言或通过 GitHub 联系我。
{% endnote %}

<div class="flink-desc">这里是收藏的友情链接，欢迎大家互相交流学习。</div>

<div class="flink-list">
  <div class="flink-list-item">
    <a href="https://nyac.cl" title="雨落" target="_blank" rel="noopener">
      <div class="flink-item-icon">
        <img class="no-lightbox" src="/images/links/nyac.jpg" alt="雨落">
      </div>
      <div class="flink-item-info">
        <div class="flink-item-name">雨落</div>
        <div class="flink-item-desc">雨落的博客</div>
      </div>
    </a>
  </div>
</div>

{% note info %}
### 友链格式
- **名称**：你的站点名称
- **链接**：你的站点地址
- **头像**：你的站点图标链接
- **描述**：一句话描述
{% endnote %}
