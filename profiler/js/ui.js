/**
 * UI helpers: panel toggles, trace list, UTC clock
 */
(function () {
  // Panel toggles
  document.querySelectorAll('.panel-header').forEach(function (el) {
    el.addEventListener('click', function () {
      const body = this.nextElementSibling;
      if (!body) return;
      body.classList.toggle('open');
      const icon = this.querySelector('.toggle');
      if (icon) icon.textContent = body.classList.contains('open') ? '−' : '+';
    });
  });

  // Trace list: ADD row
  const traceList = document.getElementById('trace-list');
  const btnAdd = document.getElementById('btn-add-trace');
  if (traceList && btnAdd) {
    function renumber() {
      traceList.querySelectorAll('.trace-row').forEach(function (row, i) {
        const num = row.querySelector('.num');
        if (num) num.textContent = String(i + 1).padStart(2, '0') + '.';
      });
    }
    function addRow(value) {
      const li = document.createElement('li');
      li.className = 'trace-row';
      const n = traceList.querySelectorAll('.trace-row').length + 1;
      li.innerHTML =
        '<span class="num">' + String(n).padStart(2, '0') + '.</span>' +
        '<input type="text" placeholder="https://..." value="' + (value || '') + '">' +
        '<button type="button" class="btn-del">DEL</button>';
      const btnDel = li.querySelector('.btn-del');
      btnDel.addEventListener('click', function () {
        li.remove();
        renumber();
      });
      traceList.appendChild(li);
      renumber();
    }
    btnAdd.addEventListener('click', function () {
      addRow('');
    });
    // Start with 2 rows
    addRow('');
    addRow('');
  }

  // UTC clock
  function pad(n) {
    return n < 10 ? '0' + n : n;
  }
  function updateClock() {
    const el = document.getElementById('utc-clock');
    if (!el) return;
    const d = new Date();
    el.textContent =
      pad(d.getUTCHours()) + ':' +
      pad(d.getUTCMinutes()) + ':' +
      pad(d.getUTCSeconds()) + ' UTC';
  }
  updateClock();
  setInterval(updateClock, 1000);
})();
