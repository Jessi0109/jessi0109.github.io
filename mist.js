// Generative "Frozen Mist" atmosphere — Canvas 2D, no dependencies.
(function () {
  var c = document.getElementById('mist');
  if (!c) return;
  var x = c.getContext('2d');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2);
  var blobs = [];
  var mouse = { x: -9999, y: -9999, on: false };
  var cols = [[124, 125, 117], [173, 172, 167], [217, 218, 223], [252, 248, 216]];
  var running = true;

  function size() {
    W = window.innerWidth; H = window.innerHeight;
    c.width = W * DPR; c.height = H * DPR;
    x.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function makeBlobs() {
    var count = W < 700 ? 22 : 42;
    blobs = [];
    for (var i = 0; i < count; i++) {
      blobs.push({
        x: Math.random(), y: Math.random(),
        r: 60 + Math.random() * 130,
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.04,
        a: 0.05 + Math.random() * 0.10,
        col: cols[i % cols.length]
      });
    }
  }

  function paintStatic() {
    // reduced-motion fallback: one soft static gradient
    x.clearRect(0, 0, W, H);
    var g = x.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, '#FCFBF4'); g.addColorStop(0.5, '#EDEDE7'); g.addColorStop(1, '#F3EFDF');
    x.fillStyle = g; x.fillRect(0, 0, W, H);
  }

  function frame() {
    if (!running) return;
    x.clearRect(0, 0, W, H);
    x.fillStyle = '#FCFBF4'; x.fillRect(0, 0, W, H);
    x.globalCompositeOperation = 'multiply';
    for (var i = 0; i < blobs.length; i++) {
      var b = blobs[i];
      b.x += b.vx / 100; b.y += b.vy / 100;
      if (b.x < -0.2) b.x = 1.2; if (b.x > 1.2) b.x = -0.2;
      if (b.y < -0.2) b.y = 1.2; if (b.y > 1.2) b.y = -0.2;
      var px = b.x * W, py = b.y * H, r = b.r, a = b.a;
      if (mouse.on) {
        var dx = px - mouse.x, dy = py - mouse.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 170) { var push = (170 - d) / 170; px += dx / (d || 1) * push * 46; py += dy / (d || 1) * push * 46; a *= (0.25 + 0.75 * (d / 170)); }
      }
      var g = x.createRadialGradient(px, py, 0, px, py, r);
      g.addColorStop(0, 'rgba(' + b.col[0] + ',' + b.col[1] + ',' + b.col[2] + ',' + a + ')');
      g.addColorStop(1, 'rgba(' + b.col[0] + ',' + b.col[1] + ',' + b.col[2] + ',0)');
      x.fillStyle = g; x.beginPath(); x.arc(px, py, r, 0, 7); x.fill();
    }
    if (mouse.on) {
      x.globalCompositeOperation = 'lighter';
      var gg = x.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 140);
      gg.addColorStop(0, 'rgba(221,112,11,0.28)');
      gg.addColorStop(0.5, 'rgba(221,112,11,0.09)');
      gg.addColorStop(1, 'rgba(221,112,11,0)');
      x.fillStyle = gg; x.beginPath(); x.arc(mouse.x, mouse.y, 140, 0, 7); x.fill();
    }
    x.globalCompositeOperation = 'source-over';
    requestAnimationFrame(frame);
  }

  function onMove(e) {
    var t = e.touches ? e.touches[0] : e;
    mouse.x = t.clientX; mouse.y = t.clientY; mouse.on = true;
  }

  size();
  if (reduce) { paintStatic(); return; }
  makeBlobs();
  window.addEventListener('resize', function () { size(); makeBlobs(); });
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('mouseout', function () { mouse.on = false; });
  document.addEventListener('visibilitychange', function () {
    running = !document.hidden;
    if (running) requestAnimationFrame(frame);
  });
  requestAnimationFrame(frame);
})();
