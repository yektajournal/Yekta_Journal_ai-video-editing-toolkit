// Copy buttons for every code block (also called again by gallery.js after it renders cards).
function addCopyButtons(root) {
  root.querySelectorAll('pre:not([data-copy])').forEach(function (pre) {
    pre.setAttribute('data-copy', '');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.textContent = 'کپی';
    btn.setAttribute('aria-label', 'کپی کردن متن');
    btn.addEventListener('click', function () {
      copyText(pre.querySelector('code').innerText).then(function () { flash(btn, 'کپی شد ✓', 'کپی'); });
    });
    pre.appendChild(btn);
  });
}

function flash(btn, on, off) {
  btn.textContent = on;
  btn.classList.add('done');
  setTimeout(function () { btn.textContent = off; btn.classList.remove('done'); }, 1800);
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).catch(function () { return fallbackCopy(text); });
  }
  return fallbackCopy(text);
}

// For pages opened without HTTPS (e.g. file:// or local IPs).
function fallbackCopy(text) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } finally { document.body.removeChild(ta); }
  return Promise.resolve();
}

addCopyButtons(document);
