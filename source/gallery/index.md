---
title: 相册
date: 2025-05-10 12:00:00
permalink: /gallery/
comments: false
top_img: /img/default_bg.jpg
---

<div class="gallery-container">
  <div class="gallery-desc">用镜头记录生活的美好瞬间。</div>

  <div class="gallery-group">
    {% note success %}
    ### 📷 生活随手拍
    {% endnote %}
    <div class="gallery-group-content">
      <!-- 示例图片，使用网络占位图 -->
      <div class="gallery-item">
        <a href="https://picsum.photos/1920/1080?random=1" data-fancybox="gallery" data-caption="风景 1">
          <img src="https://picsum.photos/400/300?random=1" alt="风景 1" loading="lazy" />
        </a>
      </div>
      <div class="gallery-item">
        <a href="https://picsum.photos/1920/1080?random=2" data-fancybox="gallery" data-caption="风景 2">
          <img src="https://picsum.photos/400/300?random=2" alt="风景 2" loading="lazy" />
        </a>
      </div>
      <div class="gallery-item">
        <a href="https://picsum.photos/1920/1080?random=3" data-fancybox="gallery" data-caption="风景 3">
          <img src="https://picsum.photos/400/300?random=3" alt="风景 3" loading="lazy" />
        </a>
      </div>
    </div>
  </div>

  <div class="gallery-group">
    {% note primary %}
    ### 🌆 城市掠影
    {% endnote %}
    <div class="gallery-group-content">
      <div class="gallery-item">
        <a href="https://picsum.photos/1920/1080?random=4" data-fancybox="city" data-caption="城市 1">
          <img src="https://picsum.photos/400/300?random=4" alt="城市 1" loading="lazy" />
        </a>
      </div>
      <div class="gallery-item">
        <a href="https://picsum.photos/1920/1080?random=5" data-fancybox="city" data-caption="城市 2">
          <img src="https://picsum.photos/400/300?random=5" alt="城市 2" loading="lazy" />
        </a>
      </div>
      <div class="gallery-item">
        <a href="https://picsum.photos/1920/1080?random=6" data-fancybox="city" data-caption="城市 3">
          <img src="https://picsum.photos/400/300?random=6" alt="城市 3" loading="lazy" />
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .gallery-container {
    max-width: 900px;
    margin: 20px auto;
    padding: 20px;
  }
  .gallery-desc {
    text-align: center;
    font-size: 16px;
    color: var(--font-color, #666);
    margin-bottom: 30px;
  }
  .gallery-group {
    margin-bottom: 30px;
  }
  .gallery-group-content {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 12px;
  }
  .gallery-item {
    flex: 1 1 calc(33.333% - 12px);
    min-width: 200px;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .gallery-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  }
  .gallery-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
    border-radius: 8px;
  }
  @media (max-width: 768px) {
    .gallery-item {
      flex: 1 1 calc(50% - 8px);
    }
  }
</style>
