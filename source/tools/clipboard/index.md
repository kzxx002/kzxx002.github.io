---
title: 云剪切板
date: 2025-05-10 12:00:00
permalink: /tools/clipboard/
comments: false
top_img: /img/default_bg.jpg
---

<div id="gist-clipboard">
  <div class="clipboard-container">
    <div class="token-section">
      <label for="gh-token">GitHub Token：</label>
      <input type="password" id="gh-token" placeholder="输入 GitHub Personal Access Token" />
      <a href="https://github.com/settings/tokens/new?scopes=gist&description=Gist%20Clipboard" target="_blank" rel="noopener">生成 Token</a>
      <small>（仅需 Gist 权限，保存在浏览器本地）</small>
    </div>

    <div class="create-section">
      <h3>创建新片段</h3>
      <input type="text" id="gist-desc" placeholder="描述（可选）" />
      <input type="text" id="gist-filename" placeholder="文件名（如 snippet.js）" value="snippet.txt" />
      <div class="editor-wrapper">
        <div class="editor-toolbar">
          <button onclick="document.getElementById('gist-content').value = ''" title="清空"><i class="fas fa-trash-alt"></i></button>
          <button onclick="pasteFromClipboard()" title="粘贴"><i class="fas fa-paste"></i></button>
          <select id="gistLang" onchange="updateLangHint()">
            <option value="text">纯文本</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="sql">SQL</option>
            <option value="json">JSON</option>
            <option value="yaml">YAML</option>
            <option value="markdown">Markdown</option>
            <option value="bash">Shell/Bash</option>
            <option value="typescript">TypeScript</option>
            <option value="php">PHP</option>
            <option value="ruby">Ruby</option>
            <option value="swift">Swift</option>
            <option value="kotlin">Kotlin</option>
            <option value="dockerfile">Dockerfile</option>
            <option value="ini">INI/TOML</option>
            <option value="xml">XML</option>
            <option value="lua">Lua</option>
            <option value="r">R</option>
            <option value="scala">Scala</option>
            <option value="perl">Perl</option>
          </select>
        </div>
        <textarea id="gist-content" rows="12" placeholder="在此粘贴或输入代码/文本内容..."></textarea>
      </div>
      <div class="create-actions">
        <label class="public-toggle">
          <input type="checkbox" id="gist-public" checked />
          <span>公开</span>
        </label>
        <button class="btn-create" id="createBtn" onclick="createGist()">
          <i class="fas fa-plus-circle"></i> 创建片段
        </button>
      </div>
    </div>

    <div id="result-section" style="display:none;">
      <div class="result-box">
        <span class="result-label">分享链接：</span>
        <a id="result-link" href="#" target="_blank" rel="noopener"></a>
        <button onclick="copyResultLink()" title="复制链接"><i class="fas fa-copy"></i></button>
        <button onclick="embedGist()" title="嵌入代码"><i class="fas fa-code"></i></button>
      </div>
      <div class="embed-code" id="embed-code" style="display:none;">
        <pre><code id="embed-text"></code></pre>
        <button onclick="copyEmbed()" title="复制"><i class="fas fa-copy"></i></button>
      </div>
    </div>

    <div class="my-gists-section" id="myGistsSection">
      <h3>我的片段</h3>
      <div class="gists-toolbar">
        <input type="text" id="gist-search" placeholder="搜索片段..." oninput="loadGists()" />
        <button onclick="loadGists()"><i class="fas fa-sync-alt"></i></button>
      </div>
      <div class="gists-list" id="gistsList">
        <p class="loading-hint">点击加载查看已有片段</p>
      </div>
    </div>
  </div>
</div>

<style>
  #gist-clipboard {
    max-width: 900px;
    margin: 20px auto;
    padding: 20px;
  }
  .clipboard-container {
    background: var(--card-bg);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  }
  .token-section {
    margin-bottom: 24px;
    padding: 16px;
    background: rgba(255,255,255,0.06);
    border-radius: 8px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }
  .token-section label {
    font-weight: bold;
    white-space: nowrap;
  }
  .token-section input {
    flex: 1;
    min-width: 200px;
    padding: 8px 12px;
    border: 1px solid var(--border-color, #ddd);
    border-radius: 6px;
    background: var(--bg, #fff);
    color: var(--font-color, #333);
    font-size: 14px;
  }
  .token-section a {
    color: #49b1f5;
    text-decoration: none;
    font-size: 13px;
  }
  .token-section small {
    width: 100%;
    color: #999;
    font-size: 12px;
  }
  .create-section h3 {
    margin-bottom: 16px;
  }
  .create-section input[type="text"] {
    width: 100%;
    padding: 8px 12px;
    margin-bottom: 12px;
    border: 1px solid var(--border-color, #ddd);
    border-radius: 6px;
    background: var(--bg, #fff);
    color: var(--font-color, #333);
    font-size: 14px;
    box-sizing: border-box;
  }
  .editor-wrapper {
    border: 1px solid var(--border-color, #ddd);
    border-radius: 8px;
    overflow: hidden;
  }
  .editor-toolbar {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 10px;
    background: rgba(0,0,0,0.03);
    border-bottom: 1px solid var(--border-color, #ddd);
  }
  .editor-toolbar button {
    background: none;
    border: 1px solid transparent;
    color: var(--font-color, #666);
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
  }
  .editor-toolbar button:hover {
    background: rgba(73,177,245,0.1);
    color: #49b1f5;
  }
  .editor-toolbar select {
    margin-left: auto;
    padding: 4px 8px;
    border: 1px solid var(--border-color, #ddd);
    border-radius: 4px;
    background: var(--bg, #fff);
    color: var(--font-color, #333);
    font-size: 13px;
    cursor: pointer;
  }
  #gist-content {
    width: 100%;
    padding: 12px 14px;
    border: none;
    resize: vertical;
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 14px;
    line-height: 1.6;
    background: var(--bg, #fff);
    color: var(--font-color, #333);
    box-sizing: border-box;
    tab-size: 2;
  }
  #gist-content:focus {
    outline: none;
  }
  .create-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
  }
  .public-toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    font-size: 14px;
    color: var(--font-color, #666);
  }
  .public-toggle input {
    width: 16px;
    height: 16px;
  }
  .btn-create {
    padding: 10px 24px;
    background: #49b1f5;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background 0.2s;
  }
  .btn-create:hover {
    background: #ff7242;
  }
  .btn-create:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .result-section, #result-section {
    margin-top: 20px;
    padding: 16px;
    background: rgba(73,177,245,0.06);
    border-radius: 8px;
    animation: fadeIn 0.3s;
  }
  .result-box {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .result-label {
    font-weight: bold;
  }
  .result-box a {
    color: #49b1f5;
    word-break: break-all;
    flex: 1;
  }
  .result-box button {
    background: none;
    border: none;
    color: #49b1f5;
    cursor: pointer;
    font-size: 14px;
    padding: 4px 8px;
  }
  .result-box button:hover {
    color: #ff7242;
  }
  .embed-code {
    margin-top: 12px;
    position: relative;
    background: rgba(0,0,0,0.06);
    border-radius: 6px;
    padding: 12px;
  }
  .embed-code pre {
    margin: 0;
    overflow-x: auto;
  }
  .embed-code code {
    font-family: monospace;
    font-size: 12px;
    white-space: pre-wrap;
    word-break: break-all;
  }
  .embed-code button {
    position: absolute;
    top: 8px;
    right: 8px;
    background: none;
    border: none;
    color: #49b1f5;
    cursor: pointer;
  }
  .my-gists-section {
    margin-top: 32px;
    padding-top: 20px;
    border-top: 1px solid var(--border-color, #eee);
  }
  .my-gists-section h3 {
    margin-bottom: 12px;
  }
  .gists-toolbar {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }
  .gists-toolbar input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid var(--border-color, #ddd);
    border-radius: 6px;
    background: var(--bg, #fff);
    color: var(--font-color, #333);
    font-size: 14px;
  }
  .gists-toolbar button {
    padding: 8px 14px;
    border: 1px solid var(--border-color, #ddd);
    background: var(--card-bg);
    color: var(--font-color, #333);
    border-radius: 6px;
    cursor: pointer;
  }
  .gists-toolbar button:hover {
    background: rgba(73,177,245,0.1);
    border-color: #49b1f5;
    color: #49b1f5;
  }
  .gists-list .loading-hint {
    text-align: center;
    color: #999;
    padding: 20px;
  }
  .gist-card {
    padding: 14px;
    border: 1px solid var(--border-color, #eee);
    border-radius: 8px;
    margin-bottom: 10px;
    transition: box-shadow 0.2s;
    animation: fadeIn 0.3s;
  }
  .gist-card:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .gist-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .gist-card-title {
    font-weight: bold;
    font-size: 15px;
  }
  .gist-card-meta {
    display: flex;
    gap: 12px;
    font-size: 12px;
    color: #999;
    margin-bottom: 8px;
  }
  .gist-card-preview {
    background: rgba(0,0,0,0.04);
    border-radius: 4px;
    padding: 10px;
    font-family: monospace;
    font-size: 13px;
    max-height: 150px;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-all;
    line-height: 1.5;
    color: var(--font-color, #555);
  }
  .gist-card-actions {
    display: flex;
    gap: 8px;
    margin-top: 10px;
  }
  .gist-card-actions a,
  .gist-card-actions button {
    padding: 4px 12px;
    border: 1px solid var(--border-color, #ddd);
    border-radius: 4px;
    background: none;
    color: var(--font-color, #666);
    font-size: 12px;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s;
  }
  .gist-card-actions a:hover,
  .gist-card-actions button:hover {
    border-color: #49b1f5;
    color: #49b1f5;
  }
  .gist-card-actions .btn-delete:hover {
    border-color: #ff7242;
    color: #ff7242;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  [data-theme="dark"] .gist-card-preview,
  [data-theme="dark"] .editor-wrapper,
  [data-theme="dark"] .embed-code {
    background: rgba(255,255,255,0.06);
  }
</style>

<script>
(function() {
  const TOKEN_KEY = 'gh_gist_token';
  const GIST_API = 'https://api.github.com/gists';

  // Auto-load token
  const tokenInput = document.getElementById('gh-token');
  const savedToken = localStorage.getItem(TOKEN_KEY);
  if (savedToken) tokenInput.value = savedToken;
  tokenInput.addEventListener('change', () => {
    localStorage.setItem(TOKEN_KEY, tokenInput.value.trim());
  });

  function getToken() {
    return tokenInput.value.trim() || localStorage.getItem(TOKEN_KEY);
  }

  function getHeaders() {
    return {
      'Authorization': 'Bearer ' + getToken(),
      'Accept': 'application/vnd.github.v3+json'
    };
  }

  // Tab key support in textarea
  const textarea = document.getElementById('gist-content');
  textarea.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.value = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 2;
    }
  });

  // Global functions
  window.pasteFromClipboard = async function() {
    try {
      const text = await navigator.clipboard.readText();
      textarea.value += text;
    } catch {
      showToast('无法读取剪贴板，请手动 Ctrl+V');
    }
  };

  window.updateLangHint = function() {};

  window.createGist = async function() {
    const token = getToken();
    if (!token) {
      tokenInput.focus();
      tokenInput.style.borderColor = '#ff7242';
      setTimeout(() => tokenInput.style.borderColor = '', 2000);
      showToast('请先输入 GitHub Token');
      return;
    }

    const content = textarea.value.trim();
    if (!content) {
      showToast('请输入内容');
      textarea.focus();
      return;
    }

    const lang = document.getElementById('gistLang').value;
    let filename = document.getElementById('gist-filename').value.trim() || 'snippet.txt';

    // Auto-set extension based on language
    const extMap = {
      javascript: 'js', python: 'py', html: 'html', css: 'css', java: 'java',
      c: 'c', cpp: 'cpp', go: 'go', rust: 'rs', sql: 'sql', json: 'json',
      yaml: 'yml', markdown: 'md', bash: 'sh', typescript: 'ts', php: 'php',
      ruby: 'rb', swift: 'swift', kotlin: 'kt', dockerfile: 'Dockerfile',
      ini: 'ini', xml: 'xml', lua: 'lua', r: 'r', scala: 'scala', perl: 'pl'
    };
    if (lang === 'dockerfile') {
      filename = 'Dockerfile';
    } else if (extMap[lang] && !filename.includes('.')) {
      filename += '.' + extMap[lang];
    }

    const desc = document.getElementById('gist-desc').value.trim() || 'Created by Gist Clipboard';
    const isPublic = document.getElementById('gist-public').checked;

    const btn = document.getElementById('createBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 创建中...';

    try {
      const res = await fetch(GIST_API, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          description: desc,
          public: isPublic,
          files: { [filename]: { content: content } }
        })
      });

      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();

      // Show result
      document.getElementById('result-section').style.display = 'block';
      const link = document.getElementById('result-link');
      link.href = data.html_url;
      link.textContent = data.html_url;

      // Store embed info
      window._lastGistId = data.id;
      document.getElementById('embed-code').style.display = 'none';

      showToast('创建成功！');
      textarea.value = '';
      document.getElementById('gist-desc').value = '';
    } catch (err) {
      showToast('创建失败: ' + err.message);
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-plus-circle"></i> 创建片段';
    }
  };

  window.copyResultLink = function() {
    const link = document.getElementById('result-link').href;
    copyToClipboard(link);
  };

  window.embedGist = function() {
    const codeEl = document.getElementById('embed-code');
    const gistId = window._lastGistId;
    if (!gistId) return;
    const embedUrl = `https://gist.github.com/${gistId}.js`;
    document.getElementById('embed-text').textContent =
      `<script src="${embedUrl}"><\/script>`;
    codeEl.style.display = codeEl.style.display === 'none' ? 'block' : 'none';
  };

  window.copyEmbed = function() {
    copyToClipboard(document.getElementById('embed-text').textContent);
  };

  window.loadGists = async function() {
    const token = getToken();
    if (!token) {
      showToast('请先输入 GitHub Token');
      return;
    }

    const listEl = document.getElementById('gistsList');
    listEl.innerHTML = '<p class="loading-hint">加载中...</p>';

    try {
      const search = document.getElementById('gist-search').value.trim();
      let url = GIST_API + '?per_page=30';
      const res = await fetch(url, { headers: getHeaders() });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      let gists = await res.json();

      if (search) {
        const q = search.toLowerCase();
        gists = gists.filter(g =>
          (g.description || '').toLowerCase().includes(q) ||
          Object.keys(g.files).some(f => f.toLowerCase().includes(q))
        );
      }

      if (gists.length === 0) {
        listEl.innerHTML = '<p class="loading-hint">没有找到片段</p>';
        return;
      }

      listEl.innerHTML = gists.map(g => {
        const files = Object.entries(g.files);
        const fileName = files[0]?.[0] || 'unknown';
        const fileData = files[0]?.[1] || {};
        const preview = (fileData.content || '').substring(0, 300);
        const lang = fileData.language || 'text';
        const time = new Date(g.created_at).toLocaleString('zh-CN');
        return `
          <div class="gist-card">
            <div class="gist-card-header">
              <span class="gist-card-title">${escapeHtml(g.description || fileName)}</span>
              <span style="font-size:12px;color:${g.public ? '#49b1f5' : '#ff7242'}">${g.public ? '公开' : '私密'}</span>
            </div>
            <div class="gist-card-meta">
              <span><i class="fas fa-file-code"></i> ${escapeHtml(fileName)}</span>
              <span><i class="fas fa-code"></i> ${lang}</span>
              <span><i class="fas fa-clock"></i> ${time}</span>
            </div>
            ${preview ? `<div class="gist-card-preview">${escapeHtml(preview)}${fileData.content && fileData.content.length > 300 ? '\n...' : ''}</div>` : ''}
            <div class="gist-card-actions">
              <a href="${g.html_url}" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> 打开</a>
              <button onclick="copyToClipboard('${g.html_url}')"><i class="fas fa-link"></i> 复制链接</button>
              <button onclick="loadGistContent('${g.id}','${escapeHtml(fileName)}')"><i class="fas fa-eye"></i> 查看全部</button>
              <button class="btn-delete" onclick="deleteGist('${g.id}')"><i class="fas fa-trash-alt"></i> 删除</button>
            </div>
          </div>
        `;
      }).join('');
    } catch (err) {
      listEl.innerHTML = `<p class="loading-hint" style="color:#ff7242">加载失败: ${err.message}</p>`;
    }
  };

  window.loadGistContent = async function(gistId, fileName) {
    try {
      const res = await fetch(`${GIST_API}/${gistId}`, { headers: getHeaders() });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const gist = await res.json();
      const file = gist.files[fileName] || Object.values(gist.files)[0];
      if (file && file.content) {
        copyToClipboard(file.content);
        showToast('内容已复制到剪贴板');
      }
    } catch (err) {
      showToast('获取失败: ' + err.message);
    }
  };

  window.deleteGist = async function(gistId) {
    if (!confirm('确定要删除这个片段吗？此操作不可撤销。')) return;
    try {
      const res = await fetch(`${GIST_API}/${gistId}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (!res.ok && res.status !== 204) throw new Error('HTTP ' + res.status);
      showToast('已删除');
      window.loadGists();
    } catch (err) {
      showToast('删除失败: ' + err.message);
    }
  };

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

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#49b1f5;color:#fff;padding:8px 20px;border-radius:6px;z-index:9999;font-size:14px;animation:fadeIn 0.3s;';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }
})();
</script>
