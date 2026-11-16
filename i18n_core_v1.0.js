/* i18n core v1.0 — 日英切り替え（日本語は既存表示をそのまま使い、英語のときだけ描画後に置換する）
   - 言語の決定: ?lang=en|ja > localStorage("dash_lang") > ja
   - 切り替え: URLの ?lang を付け替えて再読み込み（#ハッシュは保持）
   - 英語化: 完全一致の辞書 → 規則（年度・金額・単位）→ 辞書（再照合）
*/
(function () {
  var KEY = "dash_lang";
  var qs = new URLSearchParams(location.search);
  var lang = qs.get("lang");
  if (lang !== "en" && lang !== "ja") {
    lang = null;
    try { lang = localStorage.getItem(KEY); } catch (e) {}
  }
  lang = lang === "en" ? "en" : "ja";
  window.__LANG = lang;
  document.documentElement.setAttribute("lang", lang);

  window.setLang = function (l) {
    try { localStorage.setItem(KEY, l); } catch (e) {}
    var u = new URL(location.href);
    if (l === "en") u.searchParams.set("lang", "en"); else u.searchParams.delete("lang");
    location.replace(u.toString());
  };

  var JP = /[぀-ヿ一-鿿！-～　-〿]/;
  var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function num(s) { return parseFloat(String(s).replace(/,/g, "")); }
  function decs(s) { var m = String(s).match(/\.(\d+)/); return m ? m[1].length : 0; }
  function fmt(n, d) {
    var s = n.toFixed(d);
    if (s.indexOf(".") >= 0) s = s.replace(/0+$/, "").replace(/\.$/, "");
    var parts = s.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  function sign(n, body) { return (n < 0 ? "-" : "") + body; }
  // 億ポンド → £m（×100）
  function gbp(s) { var n = num(s); return sign(n, "£" + fmt(Math.abs(n) * 100, Math.max(0, decs(s) - 2)) + "m"); }
  // 億円 → ¥bn（÷10）
  function jpy(s) { var n = num(s); return sign(n, "¥" + fmt(Math.abs(n) / 10, decs(s) + 1) + "bn"); }

  var RULES = [
    [/(\d{4})年(\d{1,2})月期/g, function (m, y, mo) { return "FY" + mo + "/" + y; }],
    [/(\d{4})年度（(\d{4})年3月期）/g, function (m, y, y2) { return "FY3/" + y2; }],
    [/(\d{4})年(\d{1,2})月(\d{1,2})日/g, function (m, y, mo, d) { return MON[mo - 1] + " " + d + ", " + y; }],
    [/(\d{4})\/(\d{1,2})\/(\d{1,2})/g, function (m, y, mo, d) { return MON[mo - 1] + " " + d + ", " + y; }],
    [/(\d{4})年(\d{1,2})月/g, function (m, y, mo) { return MON[mo - 1] + " " + y; }],
    [/(\d{4})\s*[〜～\-]\s*(\d{4})年/g, "$1–$2"],
    [/最大\s*(-?[\d,]+(?:\.\d+)?)億ポンド/g, function (m, a) { return "up to " + gbp(a); }],
    [/約\s*(-?[\d,]+(?:\.\d+)?)億ポンド/g, function (m, a) { return "approx. " + gbp(a); }],
    [/(-?[\d,]+(?:\.\d+)?)億ポンド/g, function (m, a) { return gbp(a); }],
    [/約\s*(-?[\d,]+(?:\.\d+)?)億円/g, function (m, a) { return "approx. " + jpy(a); }],
    [/(-?[\d,]+(?:\.\d+)?)億円/g, function (m, a) { return jpy(a); }],
    [/(-?[\d,]+(?:\.\d+)?)百万円/g, function (m, a) { return sign(num(a), "¥" + a.replace("-", "") + "m"); }],
    [/(-?[\d,]+(?:\.\d+)?)万ポンド/g, function (m, a) { return sign(num(a), "£" + fmt(Math.abs(num(a)) / 100, 2) + "m"); }],
    [/(\d+(?:\.\d+)?)倍/g, "$1x"],
    [/(\d+)行$/g, "$1 rows"],
    [/(\d{4})年/g, "$1"],
    [/（/g, " ("], [/）/g, ")"], [/：/g, ": "], [/、/g, ", "], [/。/g, ". "], [/〜/g, "–"], [/／/g, " / "]
  ];

  var DICT = {};
  window.I18N_ADD = function (obj) { for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) DICT[k] = obj[k]; };
  window.I18N_RULES_PRE = []; // 文書固有の正規表現（辞書より先に適用）

  function tr(s) {
    if (!s || !JP.test(s)) return s;
    var lead = s.match(/^\s*/)[0], tail = s.match(/\s*$/)[0];
    var core = s.trim();
    if (Object.prototype.hasOwnProperty.call(DICT, core)) return lead + DICT[core] + tail;
    var t = core, i;
    for (i = 0; i < window.I18N_RULES_PRE.length; i++) t = t.replace(window.I18N_RULES_PRE[i][0], window.I18N_RULES_PRE[i][1]);
    if (Object.prototype.hasOwnProperty.call(DICT, t)) return lead + DICT[t] + tail;
    for (i = 0; i < RULES.length; i++) {
      t = t.replace(RULES[i][0], RULES[i][1]);
      if (Object.prototype.hasOwnProperty.call(DICT, t.trim())) return lead + DICT[t.trim()] + tail;
    }
    return lead + t.replace(/\s+\)/g, ")").replace(/\s{2,}/g, " ").trim() + tail;
  }
  window.I18N_TR = tr;

  var ATTRS = ["data-tt-title", "data-tt-label", "data-tt-val", "data-tt-note", "title", "aria-label", "placeholder", "alt"];
  function translateTree(root) {
    if (!root) return;
    if (root.nodeType === 3) { var v = tr(root.nodeValue); if (v !== root.nodeValue) root.nodeValue = v; return; }
    if (root.nodeType !== 1) return;
    if (root.closest && root.closest("script,style,[data-i18n-skip]")) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    var n = root;
    do {
      if (n.nodeType === 3) {
        var p = n.parentElement;
        if (p && !p.closest("script,style,[data-i18n-skip]")) { var v2 = tr(n.nodeValue); if (v2 !== n.nodeValue) n.nodeValue = v2; }
      } else if (n.nodeType === 1) {
        for (var i = 0; i < ATTRS.length; i++) {
          var a = n.getAttribute(ATTRS[i]);
          if (a && JP.test(a)) { var ta = tr(a); if (ta !== a) n.setAttribute(ATTRS[i], ta); }
        }
      }
    } while ((n = w.nextNode()));
  }
  window.I18N_TRANSLATE = translateTree;

  var busy = false;
  function run() {
    if (window.__LANG !== "en") return;
    busy = true;
    translateTree(document.body);
    if (window.I18N_TITLE) document.title = window.I18N_TITLE;
    busy = false;
    new MutationObserver(function (muts) {
      if (busy) return;
      busy = true;
      muts.forEach(function (m) {
        if (m.type === "childList") m.addedNodes.forEach(translateTree);
        else if (m.type === "characterData") translateTree(m.target);
        else if (m.type === "attributes") translateTree(m.target);
      });
      busy = false;
    }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }
  window.I18N_RUN = run;

  // 切り替えボタン（右上）
  window.I18N_MOUNT_SWITCH = function (container) {
    if (!container) return;
    var box = document.createElement("div");
    box.className = "lang-switch";
    box.setAttribute("data-i18n-skip", "");
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "Language");
    [["ja", "日本語"], ["en", "English"]].forEach(function (p) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = p[1];
      b.setAttribute("aria-pressed", window.__LANG === p[0] ? "true" : "false");
      if (window.__LANG === p[0]) b.className = "active";
      b.addEventListener("click", function () { if (window.__LANG !== p[0]) window.setLang(p[0]); });
      box.appendChild(b);
    });
    container.appendChild(box);
  };
})();
