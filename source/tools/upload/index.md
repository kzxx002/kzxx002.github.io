---
title: 图床工具
date: 2025-05-10 12:00:00
permalink: /tools/upload/
comments: false
top_img: /img/default_bg.jpg
---

<div id="imgbb-uploader">
  <div class="upload-container">
    <div class="api-key-section">
      <label for="imgbb-api-key">imgBB API Key：</label>
      <input type="password" id="imgbb-api-key" placeholder="输入你的 imgBB API Key" />
      <a href="https://api.imgbb.com/" target="_blank" rel="noopener">获取 API Key</a>
      <small>（仅需输入一次，保存在浏览器本地）</small>
    </div>

    <div class="drop-zone" id="dropZone">
      <div class="drop-icon">
        <i class="fas fa-cloud-upload-alt"></i>
      </div>
      <p>拖拽图片到此处上传</p>
      <p>或点击选择文件（支持 Ctrl+V 粘贴）</p>
      <input type="file" id="fileInput" accept="image/*" multiple hidden />
    </div>

    <div class="upload-list" id="uploadList"></div>

    <div class="history-section" id="historySection" style="display:none;">
      <h3>上传历史</h3>
      <div class="history-list" id="historyList"></div>
      <button class="btn-clear" id="clearHistory">清除历史</button>
    </div>
  </div>
</div>

<style>
  #imgbb-uploader {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
  }
  .upload-container {
    background: var(--card-bg);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  }
  .api-key-section {
    margin-bottom: 24px;
    padding: 16px;
    background: rgba(255,255,255,0.06);
    border-radius: 8px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }
  .api-key-section label {
    font-weight: bold;
    white-space: nowrap;
  }
  .api-key-section input {
    flex: 1;
    min-width: 200px;
    padding: 8px 12px;
    border: 1px solid var(--border-color, #ddd);
    border-radius: 6px;
    background: var(--bg, #fff);
    color: var(--font-color, #333);
    font-size: 14px;
  }
  .api-key-section a {
    color: #49b1f5;
    text-decoration: none;
    font-size: 13px;
  }
  .api-key-section small {
    width: 100%;
    color: #999;
    font-size: 12px;
  }
  .drop-zone {
    border: 2px dashed var(--border-color, #ccc);
    border-radius: 12px;
    padding: 48px 24px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    background: rgba(255,255,255,0.03);
  }
  .drop-zone:hover,
  .drop-zone.drag-over {
    border-color: #49b1f5;
    background: rgba(73, 177, 245, 0.08);
  }
  .drop-icon {
    font-size: 48px;
    color: #49b1f5;
    margin-bottom: 12px;
  }
  .drop-zone p {
    margin: 4px 0;
    color: var(--font-color, #666);
  }
  .drop-zone p:last-child {
    font-size: 13px;
    color: #999;
  }
  .upload-list {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .upload-item {
    background: rgba(255,255,255,0.04);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    gap: 16px;
    animation: fadeIn 0.3s;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .upload-item img {
    width: 120px;
    height: 90px;
    object-fit: cover;
    border-radius: 6px;
    flex-shrink: 0;
  }
  .upload-info {
    flex: 1;
    min-width: 0;
  }
  .upload-info .filename {
    font-weight: bold;
    margin-bottom: 8px;
    word-break: break-all;
  }
  .upload-info .progress-bar {
    width: 100%;
    height: 4px;
    background: rgba(0,0,0,0.1);
    border-radius: 2px;
    margin: 8px 0;
    overflow: hidden;
  }
  .upload-info .progress-fill {
    height: 100%;
    background: #49b1f5;
    border-radius: 2px;
    transition: width 0.3s;
    width: 0%;
  }
  .upload-info .result-links {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 8px;
  }
  .result-link {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    background: rgba(0,0,0,0.04);
    padding: 6px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .result-link:hover {
    background: rgba(73,177,245,0.12);
  }
  .result-link .link-label {
    font-weight: bold;
    white-space: nowrap;
    color: var(--font-color, #333);
  }
  .result-link .link-value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #49b1f5;
    flex: 1;
  }
  .result-link .copy-btn {
    background: none;
    border: none;
    color: #49b1f5;
    cursor: pointer;
    font-size: 14px;
    padding: 0 4px;
    flex-shrink: 0;
  }
  .result-link .copy-btn:hover {
    color: #ff7242;
  }
  .upload-status {
    font-size: 12px;
    margin-top: 4px;
  }
  .upload-status.success { color: #49b1f5; }
  .upload-status.error { color: #ff7242; }
  .history-section {
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid var(--border-color, #eee);
  }
  .history-section h3 {
    margin-bottom: 12px;
  }
  .history-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px;
    border-radius: 6px;
    margin-bottom: 6px;
    background: rgba(255,255,255,0.03);
  }
  .history-item img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 4px;
  }
  .history-item .hist-info {
    flex: 1;
    min-width: 0;
  }
  .history-item .hist-name {
    font-size: 13px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .history-item .hist-time {
    font-size: 11px;
    color: #999;
  }
  .btn-clear {
    margin-top: 8px;
    padding: 6px 16px;
    border: 1px solid #ff7242;
    color: #ff7242;
    background: transparent;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
  }
  .btn-clear:hover {
    background: rgba(255,114,66,0.08);
  }
  [data-theme="dark"] .drop-zone,
  [data-theme="dark"] .upload-item,
  [data-theme="dark"] .result-link {
    background: rgba(255,255,255,0.06);
  }
</style>

<script>
(function() {
  const API_KEY_STORAGE = 'imgbb_api_key';
  const HISTORY_STORAGE = 'imgbb_history';
  const IMGBB_API = 'https://api.imgbb.com/1/upload';

  const apiKeyInput = document.getElementById('imgbb-api-key');
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');
  const uploadList = document.getElementById('uploadList');
  const historySection = document.getElementById('historySection');
  const historyList = document.getElementById('historyList');
  const clearHistoryBtn = document.getElementById('clearHistory');

  // Load saved API key
  const savedKey = localStorage.getItem(API_KEY_STORAGE);
  if (savedKey) apiKeyInput.value = savedKey;

  apiKeyInput.addEventListener('change', () => {
    localStorage.setItem(API_KEY_STORAGE, apiKeyInput.value.trim());
  });

  // Drag & Drop
  dropZone.addEventListener('click', () => fileInput.click());
  dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });
  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
  });
  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    handleFiles(e.dataTransfer.files);
  });
  fileInput.addEventListener('change', () => {
    handleFiles(fileInput.files);
    fileInput.value = '';
  });

  // Paste support
  document.addEventListener('paste', e => {
    const items = e.clipboardData && e.clipboardData.items;
    if (!items) return;
    const imageFiles = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        imageFiles.push(items[i].getAsFile());
      }
    }
    if (imageFiles.length > 0) {
      handleFiles(imageFiles);
    }
  });

  async function handleFiles(files) {
    const apiKey = apiKeyInput.value.trim();
    if (!apiKey) {
      apiKeyInput.focus();
      apiKeyInput.style.borderColor = '#ff7242';
      setTimeout(() => apiKeyInput.style.borderColor = '', 2000);
      return;
    }

    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;
      await uploadImage(file, apiKey);
    }
  }

  async function uploadImage(file, apiKey) {
    const itemId = 'upload-' + Date.now() + Math.random().toString(36).substr(2, 5);
    const item = document.createElement('div');
    item.className = 'upload-item';
    item.id = itemId;
    item.innerHTML = `
      <img src="${URL.createObjectURL(file)}" alt="${file.name}" />
      <div class="upload-info">
        <div class="filename">${escapeHtml(file.name)} (${formatSize(file.size)})</div>
        <div class="progress-bar"><div class="progress-fill"></div></div>
        <div class="upload-status">上传中...</div>
        <div class="result-links"></div>
      </div>
    `;
    uploadList.prepend(item);

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('key', apiKey);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', IMGBB_API);

      xhr.upload.onprogress = e => {
        if (e.lengthComputable) {
          const pct = Math.round(e.loaded / e.total * 100);
          item.querySelector('.progress-fill').style.width = pct + '%';
        }
      };

      const result = await new Promise((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status === 200) resolve(JSON.parse(xhr.responseText));
          else reject(new Error('HTTP ' + xhr.status));
        };
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.send(formData);
      });

      if (result.success) {
        const data = result.data;
        item.querySelector('.progress-fill').style.width = '100%';
        item.querySelector('.progress-bar').style.display = 'none';
        item.querySelector('.upload-status').className = 'upload-status success';
        item.querySelector('.upload-status').textContent = '上传成功';

        const links = [
          { label: 'URL', value: data.url },
          { label: 'Markdown', value: `![${file.name}](${data.thumb?.url || data.url})` },
          { label: 'HTML', value: `<img src="${data.thumb?.url || data.url}" alt="${escapeHtml(file.name)}" />` },
          { label: 'BBCode', value: `[img]${data.thumb?.url || data.url}[/img]` },
          { label: '缩略图', value: data.thumb?.url || data.display_url }
        ];

        const linksContainer = item.querySelector('.result-links');
        links.forEach(link => {
          const div = document.createElement('div');
          div.className = 'result-link';
          div.innerHTML = `
            <span class="link-label">${link.label}:</span>
            <span class="link-value" title="${escapeHtml(link.value)}">${escapeHtml(link.value)}</span>
            <button class="copy-btn" title="复制"><i class="fas fa-copy"></i></button>
          `;
          div.querySelector('.copy-btn').addEventListener('click', e => {
            e.stopPropagation();
            copyToClipboard(link.value);
          });
          div.querySelector('.link-value').addEventListener('click', () => {
            copyToClipboard(link.value);
          });
          linksContainer.appendChild(div);
        });

        // Save to history
        saveHistory({ name: file.name, url: data.url, thumb: data.thumb?.url || data.url, time: Date.now() });
      } else {
        throw new Error(result.error?.message || 'Upload failed');
      }
    } catch (err) {
      item.querySelector('.progress-fill').style.width = '100%';
      item.querySelector('.progress-fill').style.background = '#ff7242';
      item.querySelector('.progress-bar').style.display = 'none';
      item.querySelector('.upload-status').className = 'upload-status error';
      item.querySelector('.upload-status').textContent = '上传失败: ' + err.message;
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('已复制到剪贴板');
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('已复制到剪贴板');
    });
  }

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#49b1f5;color:#fff;padding:8px 20px;border-radius:6px;z-index:9999;font-size:14px;animation:fadeIn 0.3s;';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }

  function saveHistory(item) {
    const history = JSON.parse(localStorage.getItem(HISTORY_STORAGE) || '[]');
    history.unshift(item);
    if (history.length > 50) history.pop();
    localStorage.setItem(HISTORY_STORAGE, JSON.stringify(history));
    renderHistory();
  }

  function renderHistory() {
    const history = JSON.parse(localStorage.getItem(HISTORY_STORAGE) || '[]');
    if (history.length === 0) {
      historySection.style.display = 'none';
      return;
    }
    historySection.style.display = 'block';
    historyList.innerHTML = history.map(h => `
      <div class="history-item">
        <img src="${h.thumb}" alt="" loading="lazy" />
        <div class="hist-info">
          <div class="hist-name" title="${escapeHtml(h.name)}">${escapeHtml(h.name)}</div>
          <div class="hist-time">${new Date(h.time).toLocaleString('zh-CN')}</div>
        </div>
        <button class="copy-btn" title="复制链接" onclick="navigator.clipboard.writeText('${h.url}')"><i class="fas fa-link"></i></button>
      </div>
    `).join('');
  }

  clearHistoryBtn.addEventListener('click', () => {
    localStorage.removeItem(HISTORY_STORAGE);
    renderHistory();
  });

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  renderHistory();
})();
</script>
