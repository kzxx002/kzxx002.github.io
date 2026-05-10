---
title: 音乐时间：在代码与文字间放一首歌
date: 2025-05-10 22:00:00
updated: 2025-05-10 22:00:00
categories:
  - 生活
tags:
  - 音乐
  - Aplayer
cover: https://picsum.photos/seed/music-time/800/400
---

> 生活不止眼前的代码，还有诗和远方。

写代码累了？读文章倦了？停下来，听首歌吧。

<!-- 以下是一首示例歌曲 -->
{% aplayer "夜的第七章" "周杰伦" "https://music.163.com/song/media/outer/url?id=1901371647" "https://picsum.photos/seed/jay-music/300/300" "autoplay" %}

---

## 关于这个播放器

这个博客集成了 [Aplayer](https://github.com/DIYgod/APlayer) 音乐播放器，支持以下功能：

| 功能 | 说明 |
|------|------|
| 播放/暂停 | 点击播放按钮 |
| 进度条 | 拖动进度条快进/快退 |
| 音量调节 | 右侧音量滑块 |
| 歌词显示 | 支持 LRC 歌词同步滚动 |

## 如何在文章中添加音乐

### 方式一：单首歌曲

在 Markdown 中插入：

```markdown
{% aplayer "歌曲名" "歌手" "音乐URL" "封面图URL" %}
```

### 方式二：播放列表

```markdown
{% aplayerlist %}
{
  "narrow": false,
  "autoplay": false,
  "showlrc": 2,
  "mutex": true,
  "mode": "random",
  "list": [
    {
      "title": "歌曲名",
      "author": "歌手",
      "url": "音乐URL",
      "pic": "封面图URL",
      "lrc": "歌词URL（可选）"
    }
  ]
}
{% endaplayerlist %}
```

## 推荐歌单

以下是一些适合编程时听的音乐类型：

- 🎹 **Lo-Fi Hip Hop** — 节奏舒缓，适合长时间编码
- 🎻 **古典音乐** — 巴赫、肖邦，专注力的好帮手
- 🎸 **轻摇滚** — 适度的节奏感保持活力
- 🌊 **白噪音/自然音** — 雨声、海浪声，营造沉浸氛围

---

*戴上耳机，享受这一刻的宁静吧。*
