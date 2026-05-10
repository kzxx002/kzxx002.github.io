/**
 * Hitokoto 一言组件
 * 将博客副标题替换为一言API返回的内容
 */
(function () {
  'use strict';

  var SUBTITLE_EL = document.getElementById('subtitle');
  if (!SUBTITLE_EL) return;

  /* 先清空打字机残留内容 */
  SUBTITLE_EL.innerHTML = '';

  /* 从一言API获取一句话，支持多种类型 */
  fetch('https://v1.hitokoto.cn/?c=a&c=b&c=d&c=i&c=k')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (!data || !data.hitokoto) return;

      var text = data.hitokoto;
      var from = data.from ? (' —— ' + data.from) : '';

      /* 使用 Butterfly 内置的 Typed.js 打字机效果 */
      if (typeof Typed !== 'undefined' && SUBTITLE_EL) {
        new Typed('#subtitle', {
          strings: [text + from],
          startDelay: 300,
          typeSpeed: 80,
          loop: false,
          cursorChar: '_'
        });
      } else {
        SUBTITLE_EL.textContent = text + from;
      }
    })
    .catch(function () {
      SUBTITLE_EL.textContent = '生活不止眼前的代码';
    });
})();
