/**
 * Hitokoto 一言组件
 * 将博客副标题替换为一言API返回的内容
 * 定时轮换：每次显示 10 秒后自动请求下一句
 */
(function () {
  'use strict';

  var INTERVAL = 10000; /* 每句显示时长（毫秒） */
  var el, currentTimer = null;

  function destroyTyped() {
    if (el && el._typed) {
      try { el._typed.destroy(); } catch (e) {}
      el._typed = null;
    }
    if (typeof Typed !== 'undefined' && window.typed) {
      try { window.typed.destroy(); } catch (e) {}
      window.typed = null;
    }
  }

  function showText(text, from) {
    var full = text + (from ? (' —— ' + from) : '');

    /* 淡出 → 切换内容 → 淡入 */
    el.style.transition = 'opacity .4s';
    el.style.opacity = '0';

    setTimeout(function () {
      destroyTyped();
      el.textContent = '';

      el.style.opacity = '1';

      if (typeof Typed !== 'undefined') {
        var typed = new Typed('#subtitle', {
          strings: [full],
          startDelay: 100,
          typeSpeed: 60,
          showCursor: true,
          cursorChar: '|',
          loop: false,
          onComplete: function () {
            var cursor = el.querySelector('.typed-cursor');
            if (cursor) cursor.style.display = 'none';
          }
        });
        el._typed = typed;
        window.typed = typed;
      } else {
        el.textContent = full;
      }
    }, 400);
  }

  function fetchHitokoto() {
    fetch('https://v1.hitokoto.cn/?c=a&c=b&c=d&c=i&c=k')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data || !data.hitokoto) {
          showText('生活不止眼前的代码', '');
        } else {
          showText(data.hitokoto, data.from);
        }
      })
      .catch(function () {
        showText('生活不止眼前的代码', '');
      });
  }

  function startLoop() {
    fetchHitokoto();
    currentTimer = setInterval(fetchHitokoto, INTERVAL);
  }

  function init() {
    el = document.getElementById('subtitle');
    if (!el) return;

    destroyTyped();
    el.textContent = '';
    el.style.opacity = '0';

    startLoop();
  }

  /* 等待 DOM 就绪（确保 Butterfly 的 subtitle 脚本已运行） */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(init, 50);
    });
  } else {
    setTimeout(init, 50);
  }
})();
