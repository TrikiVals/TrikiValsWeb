// Cuentas atrás: cualquier elemento con data-cierre="AAAA-MM-DDTHH:MM:SS"
(function () {
  var cuentas = document.querySelectorAll(".cuenta[data-cierre]");
  if (!cuentas.length) return;
  function dos(n) { return String(n).padStart(2, "0"); }
  function pintar() {
    var ahora = Date.now();
    cuentas.forEach(function (c) {
      var resta = new Date(c.dataset.cierre).getTime() - ahora;
      if (isNaN(resta)) return;
      if (resta <= 0) { c.classList.add("terminada"); c.textContent = c.dataset.fin || "Plazo cerrado"; return; }
      var s = Math.floor(resta / 1000);
      var v = { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
      Object.keys(v).forEach(function (k) {
        var el = c.querySelector('[data-u="' + k + '"]');
        if (el) el.textContent = k === "d" ? v[k] : dos(v[k]);
      });
      c.classList.toggle("urgente", resta < 86400000);
    });
  }
  pintar();
  setInterval(pintar, 1000);
})();
