import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

// Convierte una fecha (objeto o texto) en sus partes, sin cambios de zona horaria.
function partes(v) {
  if (!v) return null;
  if (v instanceof Date) {
    return { a: v.getUTCFullYear(), m: v.getUTCMonth() + 1, d: v.getUTCDate(), h: v.getUTCHours(), min: v.getUTCMinutes() };
  }
  const r = String(v).match(/(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/);
  return r ? { a: +r[1], m: +r[2], d: +r[3], h: +(r[4] || 0), min: +(r[5] || 0) } : null;
}
const dos = (n) => String(n).padStart(2, "0");

export default function (cfg) {
  cfg.addPlugin(EleventyHtmlBasePlugin);
  cfg.addPassthroughCopy({ "src/assets": "assets" });
  cfg.addPassthroughCopy({ "src/admin": "admin" });
  cfg.ignores.add("src/admin/**");

  cfg.addFilter("fecha", (v) => { const p = partes(v); return p ? `${dos(p.d)}/${dos(p.m)}/${p.a}` : ""; });
  cfg.addFilter("fechaHora", (v) => { const p = partes(v); return p ? `${dos(p.d)}/${dos(p.m)}/${p.a} a las ${dos(p.h)}:${dos(p.min)}` : ""; });
  cfg.addFilter("iso", (v) => { const p = partes(v); return p ? `${p.a}-${dos(p.m)}-${dos(p.d)}T${dos(p.h)}:${dos(p.min)}:00` : ""; });
  const ESTADOS = { proximamente: "Próximamente", abierto: "Abierto", cerrado: "Cerrado", finalizado: "Finalizado", en_produccion: "En producción", enviado: "Enviado", archivado: "Archivado" };
  cfg.addFilter("estadoTxt", (v) => ESTADOS[v] || v || "");
  cfg.addFilter("limite", (lista, n) => (lista || []).slice(0, n));
  cfg.addFilter("donde", (lista, campo, valor) => (lista || []).filter((i) => i.data[campo] === valor));
  cfg.addFilter("euros", (n) => (n === undefined || n === null || n === "" ? "[PRECIO]" : Number(n).toFixed(2).replace(".", ",") + " €"));
  cfg.addFilter("suma", (a, b) => (a === undefined || b === undefined || a === null || b === null ? null : Number(a) + Number(b)));

  const recientes = (a, b) => b.date - a.date;
  const carpeta = (api, glob) => api.getFilteredByGlob(glob);
  cfg.addCollection("novedades", (api) => carpeta(api, "src/novedades/*.md").sort(recientes));
  cfg.addCollection("eventos", (api) => carpeta(api, "src/directo/eventos/*.md").sort(recientes));
  cfg.addCollection("descargas", (api) => carpeta(api, "src/directo/descargas/*.md").sort((a, b) => (a.data.orden || 99) - (b.data.orden || 99)));
  cfg.addCollection("proyectos", (api) => carpeta(api, "src/directo/proyectos/*.md").sort((a, b) => (a.data.orden || 99) - (b.data.orden || 99)));
  cfg.addCollection("merch", (api) => carpeta(api, "src/merch/*.md").sort(recientes));
  cfg.addCollection("capitulos", (api) => carpeta(api, "src/historias/*/leer/*.md").sort((a, b) => (a.data.orden || 0) - (b.data.orden || 0)));
  cfg.addCollection("wiki", (api) => carpeta(api, "src/historias/*/wiki/*.md").sort((a, b) => a.data.title.localeCompare(b.data.title, "es")));
  cfg.addCollection("universos", (api) => carpeta(api, "src/historias/*/index.md").sort((a, b) => (a.data.orden || 99) - (b.data.orden || 99)));
  // Portada: lo último de todas las secciones, salvo lo marcado como "no mostrar en novedades".
  cfg.addCollection("feed", (api) =>
    api.getFilteredByGlob(["src/novedades/*.md", "src/directo/eventos/*.md", "src/directo/descargas/*.md", "src/merch/*.md", "src/historias/*/leer/*.md"])
      .filter((i) => i.data.en_novedades !== false)
      .sort(recientes)
  );

  return {
    dir: { input: "src", output: "_site" },
    pathPrefix: process.env.PATH_PREFIX || "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
