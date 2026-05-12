/**
 * Canvas-nest 暗色模式自适应
 * 监听主题切换，暗色模式下将粒子连线改为白色
 */
(function () {
  'use strict';

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function patchCanvas() {
    var canvas = document.getElementById('canvas_nest');
    if (!canvas) return;
    if (isDark()) {
      canvas.style.filter = 'brightness(0) invert(1) opacity(0.5)';
    } else {
      canvas.style.filter = 'none';
    }
  }

  /* 初始化：等 canvas 出现后立即处理 */
  var observer = new MutationObserver(function () {
    patchCanvas();
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  /* canvas 可能稍晚加载，用 MutationObserver 监听其插入 */
  var bodyObserver = new MutationObserver(function () {
    if (document.getElementById('canvas_nest')) {
      patchCanvas();
      bodyObserver.disconnect();
    }
  });
  bodyObserver.observe(document.body || document.documentElement, { childList: true, subtree: true });

  /* 兜底：延迟执行 */
  setTimeout(patchCanvas, 1500);
})();
