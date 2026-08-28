/* LLM 评测体系 Demo：导航高亮 + 数字滚动动画 */
(function () {
  var path = location.pathname.split("/").pop() || "index.html";
  var links = document.querySelectorAll(".nav a");
  links.forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });

  var anims = document.querySelectorAll("[data-count]");
  if (!anims.length || !("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var decimals = (el.getAttribute("data-decimals") | 0);
      var start = null;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 900, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  anims.forEach(function (el) { io.observe(el); });
})();
