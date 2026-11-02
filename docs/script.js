// Add a copy button to every code block.
document.querySelectorAll('pre').forEach(function (pre) {
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'copy-btn';
  btn.textContent = 'کپی';
  btn.setAttribute('aria-label', 'کپی کردن متن');
  btn.addEventListener('click', function () {
    var text = pre.querySelector('code').innerText;
    copyText(text).then(function () {
      btn.textContent = 'کپی شد ✓';
      btn.classList.add('done');
      setTimeout(function () {
        btn.textContent = 'کپی';
        btn.classList.remove('done');
      }, 1800);
    });
  });
  pre.appendChild(btn);
});

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
