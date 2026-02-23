/**
 * Custom crosshair cursor with green dot
 */
(function () {
  const dot = document.getElementById('cursor-dot');
  const crosshair = document.getElementById('cursor-crosshair');
  if (!dot || !crosshair) return;

  const svgNS = 'http://www.w3.org/2000/svg';
  const size = 24;
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  const g = document.createElementNS(svgNS, 'g');
  const stroke = 'rgba(0, 200, 255, 0.6)';
  const line = (x1, y1, x2, y2) => {
    const l = document.createElementNS(svgNS, 'line');
    l.setAttribute('x1', x1);
    l.setAttribute('y1', y1);
    l.setAttribute('x2', x2);
    l.setAttribute('y2', y2);
    l.setAttribute('stroke', stroke);
    l.setAttribute('stroke-width', '1');
    return l;
  };
  g.appendChild(line(size / 2, 0, size / 2, size));
  g.appendChild(line(0, size / 2, size, size / 2));
  svg.appendChild(g);
  crosshair.appendChild(svg);

  let x = 0, y = 0;
  let visible = true;

  function move(e) {
    x = e.clientX;
    y = e.clientY;
    if (visible) {
      dot.style.left = x + 'px';
      dot.style.top = y + 'px';
      crosshair.style.left = x + 'px';
      crosshair.style.top = y + 'px';
    }
  }

  function leave() {
    visible = false;
    dot.style.opacity = '0';
    crosshair.style.opacity = '0';
  }

  function enter() {
    visible = true;
    dot.style.opacity = '1';
    crosshair.style.opacity = '1';
  }

  document.addEventListener('mousemove', move);
  document.addEventListener('mouseenter', enter);
  document.addEventListener('mouseleave', leave);

  document.addEventListener('mousedown', function () {
    dot.style.transform = 'translate(-50%, -50%) scale(0.85)';
  });
  document.addEventListener('mouseup', function () {
    dot.style.transform = 'translate(-50%, -50%) scale(1)';
  });
})();
