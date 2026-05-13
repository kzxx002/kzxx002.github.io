/**
 * Canvas-nest 暗色模式自适应
 * 暗色模式下将粒子连线/点反转为白色，亮色模式恢复正常
 */
(function () {
  'use strict';

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function patchCanvas() {
    /* canvas-nest 创建的 canvas id 为 c_nest，通过 script#canvas_nest 加载 */
    var canvas = document.getElementById('c_nest');
    if (!canvas) {
      /* 兜底：查找 z-index 为 -1 的 canvas（canvas_nest 配置的 zIndex） */
      var all = document.querySelectorAll('canvas');
      for (var i = 0; i < all.length; i++) {
        if (all[i].style.zIndex === '-1' || all[i].style.position === 'fixed') {
          canvas = all[i];
          break;
        }
      }
    }
    if (!canvas) return;

    if (isDark()) {
      canvas.style.filter = 'brightness(0) invert(1) opacity(0.6)';
    } else {
      canvas.style.filter = 'none';
    }
  }

  /* 监听主题切换 */
  var themeObserver = new MutationObserver(function () {
    patchCanvas();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  /* 监听 canvas 元素插入 DOM */
  var canvasObserver = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var added = mutations[i].addedNodes;
      for (var j = 0; j < added.length; j++) {
        if (added[j].id === 'c_nest' || added[j].nodeName === 'CANVAS') {
          /* canvas 刚插入时可能还没设置样式，延迟一下 */
          setTimeout(patchCanvas, 100);
          return;
        }
      }
    }
  });
  canvasObserver.observe(document.body, { childList: true, subtree: true });

  /* Pjax 导航后重新 patch（Butterfly 的 Pjax 会触发 pjax:complete） */
  document.addEventListener('pjax:complete', function () {
    setTimeout(patchCanvas, 300);
  });

  /* 兜底 */
  setTimeout(patchCanvas, 1000);
  setTimeout(patchCanvas, 2500);
})();
