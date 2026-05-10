/**
 * Hitokoto 一言组件
 * 将博客副标题替换为一言API返回的内容
 * 通过禁用 Butterfly 内置 subtitle 打字机，接管 #subtitle 元素
 */
(function () {
  'use strict';

  function initHitokoto() {
    var el = document.getElementById('subtitle');
    if (!el) return;

    /* 销毁已有的 Typed 实例（Butterfly 内置的），避免冲突 */
    if (el._typed) {
      try { el._typed.destroy(); } catch (e) {}
      el._typed = null;
    }
    if (typeof Typed !== 'undefined' && window.typed) {
      try { window.typed.destroy(); } catch (e) {}
      window.typed = null;
    }

    /* 清空内容，显示加载占位 */
    el.textContent = '';
    el.style.opacity = '0';

    fetch('https://v1.hitokoto.cn/?c=a&c=b&c=d&c=i&c=k')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data || !data.hitokoto) {
          el.textContent = '生活不止眼前的代码';
          el.style.opacity = '1';
          return;
        }

        var text = data.hitokoto;
        var from = data.from ? (' —— ' + data.from) : '';
        var full = text + from;

        el.style.opacity = '1';

        /* 使用 Typed.js 打字机效果 */
        if (typeof Typed !== 'undefined') {
          el.textContent = '';
          var typed = new Typed('#subtitle', {
            strings: [full],
            startDelay: 200,
            typeSpeed: 70,
            showCursor: true,
            cursorChar: '|',
            loop: false,
            onComplete: function () {
              /* 打字完成后移除光标闪烁 */
              var cursor = el.querySelector('.typed-cursor');
              if (cursor) cursor.style.display = 'none';
            }
          });
          window.typed = typed;
        } else {
          el.textContent = full;
        }
      })
      .catch(function () {
        el.textContent = '生活不止眼前的代码';
        el.style.opacity = '1';
      });
  }

  /* 等待页面 DOM 就绪后执行（确保 Butterfly 的 subtitle 脚本已运行） */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(initHitokoto, 50);
    });
  } else {
    setTimeout(initHitokoto, 50);
  }
})();
