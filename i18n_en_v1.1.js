/* 英語辞書 v1.1 — 放送事業者ダッシュボード（broadcaster-segment-cutline-dashboard）v1.58用（v1.0からの変更：日本語の単位訂正に合わせて照合パターンと表見出しのキーを更新）
   用語集：ITV放送スタジオ分離_調査_Claude/用語集_ダッシュボード英語版_v1.0.csv
   金額：円は¥bn、ポンドは£m（表・CSVは原典の百万単位のまま）。年度：FY3/2026、ITVはFY12/2025。 */
(function () {
  if (window.__LANG !== "en") return;
  function n(x) { return parseFloat(String(x).replace(/,/g, "")); }
  function f(x, d) { return Math.abs(x).toLocaleString("en-US", { maximumFractionDigits: d }); }
  // 百万円 → ¥bn（÷1000、丸めなし）
  function m2bn(x) { var v = n(x); return (v < 0 ? "-" : "") + "¥" + f(v / 1000, 3) + "bn"; }
  // 百万ポンド → £m
  function gm(x) { var v = n(x); return (v < 0 ? "-" : "") + "£" + f(v, 1) + "m"; }

  window.I18N_TITLE = "How TV Broadcasters Make Money: Segment Results of ITV and Japan's Five Key Commercial Broadcasters Ver 1.58";

  window.I18N_RULES_PRE = [
    // ツールチップ（値は百万単位。v1.58で日本語の単位表記も百万単位に訂正）
    [/^放送利益: ([\d.\-]+) \/ 全社利益: ([\d.\-]+) \(百万円\)$/, function (m, a, b) { return "Broadcast profit: " + m2bn(a) + " / Total segment profit: " + m2bn(b); }],
    [/^放送利益: ([\d.\-]+) \/ 全社利益: ([\d.\-]+) \(百万ポンド\)$/, function (m, a, b) { return "Broadcast profit: " + gm(a) + " / Total segment profit: " + gm(b); }],
    [/^放送利益: ([\d.\-]+)百万円 \/ セグメント合計: ([\d.\-]+)百万円$/, function (m, a, b) { return "Broadcast profit: " + m2bn(a) + " / Segment total: " + m2bn(b); }],
    [/^放送売上: ([\d.\-]+) \/ 全社売上: ([\d.\-]+) \(百万円\)$/, function (m, a, b) { return "Broadcast revenue: " + m2bn(a) + " / Total revenue: " + m2bn(b); }],
    // ITVは全社売上を出さない（データ上は放送売上と同値のため。v1.58で日本語も同様）
    [/^放送売上: ([\d.\-]+) \(百万ポンド\)$/, function (m, a) { return "Broadcast revenue: " + gm(a); }],
    [/^10年変化幅: (\S+)pt \/ 放送売上: ([\d.\-]+) \(百万円\)$/, function (m, a, b) { return "Change over the period: " + a + "pt / Broadcast revenue: " + m2bn(b); }],
    [/^10年変化幅: (\S+)pt \/ 放送売上: ([\d.\-]+) \(百万ポンド\)$/, function (m, a, b) { return "Change over the period: " + a + "pt / Broadcast revenue: " + gm(b); }],
    // 社名
    [/フジ・メディア・ホールディングス/g, "Fuji Media Holdings"],
    [/フジ・メディアHD/g, "Fuji Media HD"],
    [/日本テレビHD/g, "Nippon TV HD"],
    [/テレビ朝日HD/g, "TV Asahi HD"],
    [/テレビ東京HD/g, "TV Tokyo HD"],
    [/テレビ東京ホールディングス/g, "TV Tokyo Holdings"],
    [/（フジHD）/g, " (Fuji HD)"],
    [/ 旧区分$/, " (former segments)"],
    [/ 新区分$/, " (new segments)"],
    [/ 部門（放送／Studios）区分$/, " (Broadcast / Studios divisions)"],
    // ツールチップの定型句
    [/^原典開示: /, "As disclosed: "],
    [/原典: /g, "Reported: "],
    [/^Studios合計: /, "Studios total: "],
    [/^社内依存比率: /, "Intra-group share: "],
    [/部門再編（M&E新設）/g, "Reorganised (M&E created)"],
    [/★Studiosが放送を逆転/g, "★Studios overtook Broadcast"],
    [/部門間配賦見直し/g, "Inter-divisional allocation revised"],
    [/\(2015-17 純広告\)/g, "(2015–17 NAR)"],
    [/\(2018-25 総広告 \/ 配信広告含む\)/g, "(2018–25 TAR, incl. digital)"],
    [/^★赤字（営業損失） /, "★Loss (operating loss) "],
    [/^★赤字 /, "★Loss "],
    [/^完了時の現金: /, "Cash at completion: "],
    [/^制作会社の譲受: /, "Production company received: "],
    [/^条件付き追加対価: /, "Contingent consideration: "]
  ];

  window.I18N_ADD({
    // ヘッダー・タブ
    "テレビ局は何で稼いでいるか――英ITVと民放キー局5社の事業別損益": "How TV Broadcasters Make Money: Segment Results of ITV and Japan's Five Key Commercial Broadcasters",
    "テレビ局の利益は、放送からどこへ移っているのか。英ITV（2015〜2025年）と日本の民放キー局5社（2014年3月期〜2026年3月期）について、有価証券報告書と決算資料から、事業セグメント別の売上・利益を並べました。タブ1〜4で、ITVの放送とスタジオの逆転、フジの放送と不動産の2本柱、放送の利益が決算書から読み取れるか、売上に占める放送の比率を比べられます。タブ5に、データと方法をまとめています。金額は原典の百万単位を100で割った億ポンド・億円で、為替の換算はしていません。":
      "Where are TV broadcasters' profits moving, away from broadcasting? For the UK's ITV (FY12/2015–FY12/2025) and Japan's five key commercial broadcasters (FY3/2014–FY3/2026), this dashboard lines up revenue and profit by business segment, taken from annual securities reports and results materials. Tabs 1–4 compare how ITV's studios overtook its broadcasting, Fuji's two pillars of media and real estate, whether broadcast profit can be read from the accounts at all, and broadcasting's share of revenue. Tab 5 covers data and methods. Amounts stay in each company's reporting currency (ITV in £m, Japanese broadcasters in ¥bn); no currency conversion is made.",
    "1. ITV：放送とスタジオ": "1. ITV: Broadcasting vs Studios",
    "2. フジHD：２本柱": "2. Fuji HD: Two Pillars",
    "3. 放送利益の可視性": "3. How Visible Is Broadcast Profit?",
    "4. 売上で見た立ち位置": "4. Broadcasting's Share of Revenue",
    "5. データと方法": "5. Data & Methods",

    // 共通
    "【エビデンスの焦点】": "[Key evidence]",
    "表で見る（グラフの元データ）": "View as table (chart data)",
    "CSVダウンロード": "Download CSV",
    "※表とCSVは原典単位（百万ポンド・百万円）。グラフと本文は億ポンド・億円で表示しています。": "* Tables and CSVs use the original reporting units (£m, ¥m). Charts and text show £m and ¥bn.",
    "出典": "Source",
    "出典：": "Source:",
    "注記：": "Note:",
    "年度": "Year",
    "期": "Period",
    "期間": "Period",
    "企業名": "Company",
    "億ポンド": "£m",
    "億円": "¥bn",
    "試算": "Estimate",
    "ダウンロード": "Download",
    "(横スクロール可)": "(scroll horizontally)",
    "旧": "Former",
    "新": "New",

    // タブ1
    "英ITVにおける放送部門（Media & Entertainment）の収益低下と、ITV Studiosの成長・逆転、そして2026年のSkyへの売却条件を検証。":
      "How ITV's broadcasting division (Media & Entertainment) declined, how ITV Studios grew and overtook it, and the terms of the 2026 sale to Sky.",
    "図1-1": "Fig. 1-1",
    "部門別の調整後EBITA（2015〜2025年）": "Adjusted EBITA by division (FY12/2015–FY12/2025)",
    "放送部門（Broadcast & Online → M&E）の利益が長期減少傾向をたどる一方、ITV Studiosが成長を続け、2023年に利益水準が逆転。構造的なスタジオへの重心シフトが鮮明となった。":
      "Profit in the broadcasting division (Broadcast & Online → M&E) has been in long-term decline, while ITV Studios kept growing and overtook it in FY12/2023. The structural shift of gravity towards the studios is clear.",
    "2021年 区分見直し": "2021 change",
    "2024年 区分見直し": "2024 change",
    "ピーク 6.59億": "Peak £659m",
    "2023年 利益逆転": "2023: profit crossover",
    "Studios 2.86億 / 放送 2.05億": "Studios £286m / Broadcast £205m",
    "2.97億": "£297m",
    "2.34億": "£234m",
    "放送 (Broadcast & Online → M&E)": "Broadcast (Broadcast & Online → M&E)",
    "年度 (12月期)": "Year (Dec year-end)",
    "放送 (Broadcast/M&E) [£m]": "Broadcast (Broadcast/M&E) [£m]",
    "逆転・不連続フラグ": "Crossover / discontinuity flag",
    "部門再編（M&E新設）": "Reorganised (M&E created)",
    "★Studiosが放送を逆転": "★Studios overtook Broadcast",
    "部門間配賦見直し": "Inter-divisional allocation revised",
    "ITV plc 各年決算発表資料（Results Release）Segmental information / adjusted EBITA": "ITV plc annual Results Releases, Segmental information / adjusted EBITA",
    "2021年にBroadcast & OnlineからM&Eへ再編。2024年に部門間配賦見直し。2023年にStudios（2.86億ポンド）が放送（2.05億ポンド）を逆転。":
      "Broadcast & Online was reorganised into M&E in 2021, and inter-divisional allocations were revised in 2024. In FY12/2023 Studios (£286m) overtook Broadcast (£205m).",
    "放送 (M&E) 調整後EBITA": "Broadcast (M&E) adjusted EBITA",
    "ITV Studios 調整後EBITA": "ITV Studios adjusted EBITA",

    "図1-2": "Fig. 1-2",
    "ITV Studiosの売上：グループ内と外部（2015〜2025年）": "ITV Studios revenue: intra-group vs external (FY12/2015–FY12/2025)",
    "ITV Studiosは自社の放送局向けだけでなく、配信事業者や海外の放送局など外部向けの売上を拡大し、外部向けが約7割、グループ内は約3割（2015〜2025年で28〜35%）となっている。":
      "ITV Studios sells not only to ITV's own channels but increasingly to external customers such as streamers and overseas broadcasters. External revenue is about 70% and intra-group about 30% (28–35% over 2015–2025).",
    "グループ内売上 (棒上部は社内比率)": "Intra-group revenue (label = intra-group share)",
    "外部顧客売上（外販）": "External revenue",
    "外部顧客売上 [£m]": "External revenue [£m]",
    "グループ内売上 [£m]": "Intra-group revenue [£m]",
    "合計売上 [£m]": "Total revenue [£m]",
    "グループ内比率 (%)": "Intra-group share (%)",
    "ITV plc 各年決算発表資料（Results Release）Segmental information": "ITV plc annual Results Releases, Segmental information",
    "比率は開示値からの算出。グループ内売上には、少なくとも2025年はStudios内部の部門間取引も含まれる（会社開示）。":
      "Ratios are derived from disclosed figures. At least for 2025, intra-group revenue also includes transactions between divisions within Studios (company disclosure).",
    "Studios 外部顧客売上（外販）": "Studios external revenue",
    "Studios グループ内売上": "Studios intra-group revenue",

    "図1-3": "Fig. 1-3",
    "放送部門の売上と広告収入（2015〜2025年）": "Broadcasting division revenue and advertising revenue (FY12/2015–FY12/2025)",
    "放送部門の売上・広告収入は横ばいから漸減基調。2018年に広告収入の集計定義がNARからTARへと移行した前後で不連続が生じており、数値を一本の線でつながず区別して記録。":
      "Broadcasting revenue and advertising revenue have been flat to gently declining. The advertising measure changed from NAR to TAR in 2018, creating a discontinuity, so the two series are kept separate rather than joined in one line.",
    "定義切替 (NAR→TAR)": "Definition change (NAR→TAR)",
    "放送部門売上": "Broadcasting division revenue",
    "2015-17: NAR (純広告)": "2015–17: NAR (net advertising)",
    "2018-25: TAR (総広告)": "2018–25: TAR (total advertising)",
    "放送部門売上 [£m]": "Broadcasting division revenue [£m]",
    "広告収入区分": "Advertising measure",
    "広告収入 [£m]": "Advertising revenue [£m]",
    "NAR (純広告収入)": "NAR (net advertising revenue)",
    "TAR (総広告収入)": "TAR (total advertising revenue)",
    "純広告収入 (NAR)": "Net advertising revenue (NAR)",
    "総広告収入 (TAR)": "Total advertising revenue (TAR)",
    "2015〜2017年はITV Family NAR（純広告収入）、2018〜2025年は総広告収入（TAR）。定義変更のため2017年と2018年の間で線を切断。":
      "2015–2017: ITV Family NAR (net advertising revenue); 2018–2025: total advertising revenue (TAR). The line is broken between 2017 and 2018 because of the definition change.",

    "図1-4": "Fig. 1-4",
    "売却の条件――Sky（Comcast）へのM&E売却合意": "Terms of the sale: agreement to sell M&E to Sky (Comcast)",
    "Skyへの放送部門売却は、確定14億ポンド（最大16億ポンド）、EV/EBITDA倍率5.6〜6.4倍で合意。さらに5年間で約21億ポンドの番組供給契約を締結し、スタジオ側の長期販路を確保した。":
      "The broadcasting division was sold to Sky for a fixed £1,400m (up to £1,600m), at 5.6–6.4x EV/EBITDA. A content supply agreement worth about £2,100m over five years also secures a long-term outlet for the studios.",
    "対価の構造（最大16億ポンドの内訳）": "Structure of the consideration (breakdown of up to £1,600m)",
    "基本対価 14億ポンド ＋ 条件付きの追加対価 最大2億ポンド": "Base consideration £1,400m + contingent consideration of up to £200m",
    "対価上限：最大 16億ポンド": "Maximum consideration: up to £1,600m",
    "基本対価：14億ポンド": "Base consideration: £1,400m",
    "基本対価": "Base consideration",
    "完了時": "At completion",
    "現金 12億ポンド ＋ 制作会社持分 2億ポンド": "Cash £1,200m + production company stake £200m",
    "完了時の現金": "Cash at completion",
    "キャッシュ": "Cash",
    "取引完了時に受け取る現金": "Cash received when the deal completes",
    "制作会社の譲受": "Production company received",
    "事業で受取": "Received as a business",
    "Sky傘下の制作会社Love Productions（評価額2億ポンド）": "Sky-owned producer Love Productions (valued at £200m)",
    "条件付追加対価": "Contingent consideration",
    "条件付き": "Contingent",
    "2027年度の総広告収入が17億ポンドを超えた場合。超過1ポンドにつき2ポンド、上限2億ポンド（2028年後半に支払い）":
      "Payable if total advertising revenue in 2027 exceeds £1,700m: £2 for every £1 above it, capped at £200m (paid in the second half of 2028)",
    "企業価値の評価倍率（バリュエーション）": "Valuation multiple",
    "会社開示：同業の過去の取引と同水準（5.6〜6.4倍）": "Company disclosure: in line with past peer transactions (5.6–6.4x)",
    "EV/EBITDA倍率": "EV/EBITDA multiple",
    "マルチプル": "Multiple",
    "5.6倍 〜 6.4倍": "5.6x – 6.4x",
    "下限5.6倍（確定基準）〜 上限6.4倍（最大対価基準）": "Low 5.6x (fixed consideration) – high 6.4x (maximum consideration)",
    "企業価値 (EV)": "Enterprise value (EV)",
    "全体評価": "Overall value",
    "14億 〜 16億ポンド": "£1,400m – £1,600m",
    "放送部門（M&E）の企業価値。2025年のEBITDA 2.49億ポンドに対する倍率": "Enterprise value of the broadcasting division (M&E), as a multiple of 2025 EBITDA of £249m",
    "算定基礎EBITDA": "EBITDA used for the multiple",
    "収益力": "Earnings base",
    "2.49億ポンド": "£249m",
    "調整後EBITA 2.34億ポンド ＋ 減価償却 1,500万ポンド": "Adjusted EBITA £234m + depreciation £15m",
    "売却後もつながる取引": "Ties that continue after the sale",
    "売却の完了時に、ITV Studiosと売却後の放送事業・Skyが番組供給契約を結ぶ（会社開示）": "On completion, ITV Studios signs a content supply agreement with the sold broadcasting business and Sky (company disclosure)",
    "番組供給契約（CSA）": "Content supply agreement (CSA)",
    "最低 約21億ポンド（2028〜2032年）": "At least approx. £2,100m (2028–2032)",
    "年平均で約4.2億ポンド。2025年のグループ内売上（スタジオ内部取引を除く約5.2億ポンド）の約8割に相当。放送市場の縮小も織り込んだ最低水準":
      "About £420m a year on average, roughly 80% of 2025 intra-group revenue (about £520m excluding transactions within Studios). A floor that already allows for a shrinking broadcast market.",
    "制作会社Love Productionsの獲得": "Acquiring the producer Love Productions",
    "IP強化": "Stronger IP",
    "評価額 2億ポンド": "Valued at £200m",
    "『The Great British Bake Off』などのIPを持つ制作会社をSkyから譲り受ける。2025年のEBITDAは約2,400万ポンド（評価倍率は約8倍）":
      "A producer owning IP such as The Great British Bake Off, transferred from Sky. 2025 EBITDA of about £24m (valued at about 8x).",
    "売却後のITV Studios（試算）": "ITV Studios after the sale (estimate)",
    "売上 約21億ポンド／EBITDA 約3.3億ポンド": "Revenue approx. £2,100m / EBITDA approx. £330m",
    "EBITDAマージン約16%（Love Productionsの取込み、残る共通費、グループ内取引の消去などを反映した2025年ベースの試算。予想ではない）。会社の中期目標は調整後EBITAマージン13〜15%":
      "EBITDA margin about 16% (a 2025-based estimate reflecting the addition of Love Productions, remaining central costs and elimination of intra-group transactions; not a forecast). The company's medium-term target is an adjusted EBITA margin of 13–15%.",
    "指標ID": "Metric ID",
    "項目名": "Item",
    "数値": "Value",
    "単位": "Unit",
    "開示基準": "Disclosure basis",
    "範囲・注記": "Scope / notes",
    "原典引用": "Source quote",
    "出典：ITV plc 2026年7月6日発表（RNS 0606L）、同日の投資家向け説明資料、2025年決算発表": "Source: ITV plc announcement of Jul 6, 2026 (RNS 0606L), the investor presentation of the same day, and FY2025 results",
    "注記：表の『GUIDANCE』は会社の見通し・試算で、確定した実績ではない。": "Note: \"GUIDANCE\" in the table marks company outlooks and estimates, not confirmed results.",

    "図1-5": "Fig. 1-5",
    "部門定義の変更履歴（全15件）": "History of division definition changes (15 in total)",
    "ITVは2015〜2025年の11年間で15回にわたり部門定義や会計基準（IFRS15/16）、買収・改編を行っており、時系列比較には不連続への配慮が不可欠である。":
      "Over the 11 years 2015–2025, ITV changed its division definitions, accounting standards (IFRS 15/16) or structure through acquisitions and reorganisations 15 times, so time-series comparisons must allow for discontinuities.",
    "変更前セグメント": "Segment before",
    "変更後セグメント": "Segment after",
    "変更内容": "What changed",
    "遡及修正": "Restated",
    "継続性に関する注記": "Continuity note",
    "原典抜粋": "Source excerpt",
    "出典：ITV plc 各年決算発表資料": "Source: ITV plc annual Results Releases",
    "各年度の決算報告書における部門区分変更および会計方針変更の全記録。": "Full record of division changes and accounting policy changes in each year's results.",

    // タブ2
    "2. フジ・メディアHD：２本柱": "2. Fuji Media HD: Two Pillars",
    "2018年の「メディア・コンテンツ」と「都市開発・観光」への区分再編から、2026年の都市開発・観光への外部資本導入検討への軌跡。":
      "From the 2018 resegmentation into \"Media & Content\" and \"Urban Development, Hotels & Resorts\" to the 2026 review of bringing outside capital into Urban Development, Hotels & Resorts.",
    "図2-1": "Fig. 2-1",
    "２本柱のセグメント利益（2018〜2026年3月期）": "Segment profit of the two pillars (FY3/2018–FY3/2026)",
    "2018年に「メディア・コンテンツ」と「都市開発・観光」を2本柱とする区分再編を実施。セグメント利益で、都市開発・観光がメディア・コンテンツを上回った年度は2018年3月期、2019年3月期、2024年3月期、2025年3月期、2026年3月期（全9期中5期）。メディア・コンテンツ事業は2025年3月期（-40.9億円）、2026年3月期（-308.4億円）と赤字が拡大している。":
      "In 2018 Fuji resegmented into two pillars, \"Media & Content\" and \"Urban Development, Hotels & Resorts\". Urban Development, Hotels & Resorts earned more segment profit than Media & Content in FY3/2018, FY3/2019, FY3/2024, FY3/2025 and FY3/2026 (5 of 9 years). Media & Content's loss widened from FY3/2025 (-¥4.09bn) to FY3/2026 (-¥30.84bn).",
    "2018年 区分変更（2本柱化）": "2018 segment change (two pillars)",
    "2026年2月 外部資本導入の検討を公表": "Feb 2026: review of outside capital announced",
    "メディア・コンテンツ事業（フジ基本カラー：赤）": "Media & Content (Fuji colour: red)",
    "都市開発・観光事業（※赤字時は白抜き）": "Urban Development, Hotels & Resorts (hollow = loss)",
    "メディア・コンテンツ利益 [百万円]": "Media & Content profit [¥m]",
    "都市開発・観光利益 [百万円]": "Urban Development, Hotels & Resorts profit [¥m]",
    "合計利益 [百万円]": "Total profit [¥m]",
    "都市開発比率 (%)": "Urban development share (%)",
    "出典：フジ・メディア・ホールディングス 有価証券報告書（セグメント情報）": "Source: Fuji Media Holdings, Annual Securities Reports (segment information)",
    "赤色（#FF0000）はメディア・コンテンツ事業。2021年3月期（コロナ禍）の都市開発・観光は37.3億円の黒字で、メディア・コンテンツ（137.2億円）が利益の中心。2026年3月期は最新開示値。":
      "Red (#FF0000) is Media & Content. In FY3/2021 (the pandemic year), Urban Development, Hotels & Resorts made a profit of ¥3.73bn, and Media & Content (¥13.72bn) was the main source of profit. FY3/2026 is the latest disclosed figure.",
    "都市開発・観光事業 営業利益": "Urban Development, Hotels & Resorts: segment profit",
    "メディア・コンテンツ事業 営業利益": "Media & Content: segment profit",
    "図2-2": "Fig. 2-2",
    "状況の時系列――2本柱化から外部資本導入検討へ": "Timeline: from two pillars to a review of outside capital",
    "2018年に設定された「2本柱」という切断線が、8年後の2026年における不動産事業への外部資本導入（カーブアウト）検討へと直接つながっている。":
      "The \"two pillars\" line drawn in 2018 leads directly to the 2026 review of bringing outside capital into (carving out) the real estate business, eight years later.",
    "セグメント区分変更の決議（2本柱の明記）": "Resolution to change segments (two pillars made explicit)",
    "「メディア及びコンテンツに関連する事業を同一セグメントに集約し収益力強化を進めるとともに、都市開発・観光事業をグループの２本柱の１つと位置づけ」（有価証券報告書 2019年3月期 p.93）":
      "\"Consolidating media- and content-related businesses into a single segment to strengthen earnings, while positioning the urban development and tourism business as one of the Group's two pillars\" (Annual Securities Report FY3/2019, p.93; translated)",
    "株主提案への取締役会意見（適時開示）": "Board opinion on shareholder proposals (timely disclosure)",
    "ダルトン・インベストメンツ系のファンド（Nippon Active Value Fund）が、取締役選任の株主提案の理由の一つに「不動産事業を直ちに税制適格スピンオフすること」を挙げた。取締役会は反対し、都市開発・観光事業は「単に収益不動産への投資を行う不動産事業ではなく」と説明。":
      "A Dalton Investments-affiliated fund (Nippon Active Value Fund) cited \"an immediate tax-qualified spin-off of the real estate business\" as one reason for its shareholder proposal on director appointments. The board opposed it, explaining that the urban development and tourism business is \"not simply a real estate business investing in income property\" (translated).",
    "定時株主総会で株主提案を否決（臨時報告書）": "Shareholder proposals rejected at the AGM (Extraordinary Report)",
    "株主提案の取締役候補12名は全員否決（賛成率10.43〜27.00%）。": "All 12 director candidates proposed by shareholders were rejected (10.43–27.00% in favour).",
    "都市開発・観光事業への外部資本の検討開始（適時開示）": "Review of outside capital for Urban Development, Hotels & Resorts begins (timely disclosure)",
    "サンケイビルを中心とする都市開発・観光事業の成長及びグループシナジー最大化に向け、戦略的パートナーからの外部資本の検討開始を発表。":
      "Fuji announced it would consider capital from strategic partners to grow the Urban Development, Hotels & Resorts business centred on Sankei Building and to maximise group synergies.",
    "「同事業の完全な売却も排除するものではない」と明記。同日、大株主（村上世彰氏ら）と自己株式取得に関する契約を結び、総額2,350億円の自己株式取得枠を設定（2026年2月4日 臨時報告書）。":
      "It stated that \"a complete sale of the business is not ruled out\" (translated). On the same day it signed share buyback agreements with major shareholders (including Yoshiaki Murakami) and set a buyback limit of ¥235bn in total (Extraordinary Report, Feb 4, 2026).",
    "最終応札の報道（ロイター）": "Final bids reported (Reuters)",
    "サンケイビルの全株売却または一部売却に向けた最終入札が実施された旨が報道される。": "Final bids for the sale of all or part of Sankei Building were reported to have been held.",
    "※2026年10月22日時点。最新状況を要確認。": "* As of Oct 22, 2026. Check for the latest status.",
    "フジ・メディア・ホールディングス 有価証券報告書、適時開示資料、各種報道、フジ・メディア・ホールディングス 2025年5月16日 適時開示、2025年6月26日 臨時報告書、2026年2月4日 臨時報告書":
      "Fuji Media Holdings Annual Securities Reports, timely disclosures and press reports; Fuji Media Holdings timely disclosure of May 16, 2025; Extraordinary Reports of Jun 26, 2025 and Feb 4, 2026",

    // タブ3
    "3. 放送の利益は、どこまで見えるか": "3. How much of broadcast profit can you see?",
    "日本の民放キー局各社において、「放送単独の利益」は、どこまで見えて、どこから見えなくなったか。": "For each of Japan's key commercial broadcasters: how far can \"broadcasting-only profit\" be seen, and where does it disappear from view?",
    "図3-1": "Fig. 3-1",
    "セグメント利益に占める放送の比率（2014〜2026年）": "Broadcasting's share of segment profit (2014–2026)",
    "フジ（2018年）とTBS（2019年）は区分再編により放送単独の利益開示を終了。テレ朝・テレ東は継続しているものの、局ごとに「放送」として開示される利益の範囲が大きく異なる。":
      "Fuji (2018) and TBS (2019) stopped disclosing broadcasting-only profit when they resegmented. TV Asahi and TV Tokyo still disclose it, but what counts as \"broadcasting\" profit differs widely between broadcasters.",
    "局切り替え:": "Broadcaster:",
    "全表示": "All",
    "フジ": "Fuji",
    "テレ朝": "TV Asahi",
    "テレ東": "TV Tokyo",
    "ITV (英参考)": "ITV (UK, reference)",
    "※日本: 3月期 / ITV: 12月期": "* Japan: March year-end / ITV: December year-end",
    "以後、放送単独の利益非開示": "Broadcasting-only profit not disclosed after this",
    "実線＝旧区分": "Solid = former segments",
    "破線＝新区分": "Dashed = new segments",
    "日テレ：放送単独の利益は一度も開示されていない（線なし）": "Nippon TV: broadcast-only profit never disclosed",
    "区分構造": "Segment structure",
    "放送利益 [百万円/£m]": "Broadcast profit [¥m/£m]",
    "全セグメント利益 [百万円/£m]": "Total segment profit [¥m/£m]",
    "放送利益比率 (%)": "Broadcast profit share (%)",
    "放送区分名": "Broadcasting segment name",
    "放送事業": "Broadcasting",
    "テレビ放送事業": "TV Broadcasting",
    "放送": "Broadcasting",
    "地上波・ＢＳ放送事業": "Terrestrial and BS broadcasting",
    "地上波放送事業/ＢＳ放送事業": "Terrestrial broadcasting business / BS Broadcasting business",
    "部門（放送／Studios）": "Divisions (Broadcast / Studios)",
    "出典：各社有価証券報告書（セグメント情報）、ITV plc 各年決算発表資料": "Source: each company's Annual Securities Reports (segment information); ITV plc annual Results Releases",
    "各局の線色は共通ナレッジ管理の「民放キー局 基本カラー規定」に準拠（フジ：赤 #FF0000、テレ朝：ピンク #FF66FF、TBS：濃紺/インディゴ #4B82F6、テレ東：水色 #00B0F0）。実線＝旧区分、破線＝新区分。区分変更の前後で線をつながない。日本テレビHD（黄 #FFC000）は放送単独利益が一度も開示されていないため線なし。横軸注記：日本＝3月期／ITV＝12月期。比率は開示値からの算出。テレ朝・テレ東の「放送」の利益には、番組制作の利益も含まれる（テレ朝「テレビ放送事業」＝テレビ番組の制作及び放送、テレ東「地上波・BS放送事業」＝番組制作や放送運営等の放送補完事業を含む。各社有価証券報告書）。":
      "Line colours follow the broadcaster colour guideline (Fuji: red #FF0000, TV Asahi: pink #FF66FF, TBS: navy/indigo #4B82F6, TV Tokyo: light blue #00B0F0). Solid = former segments, dashed = new segments; lines are not joined across a segment change. Nippon TV HD (yellow #FFC000) has no line because it has never disclosed broadcasting-only profit. Horizontal axis: Japan = March year-end / ITV = December year-end. Ratios are derived from disclosed figures. TV Asahi's and TV Tokyo's \"broadcasting\" profit also includes programme production profit (TV Asahi's \"TV Broadcasting\" covers producing and broadcasting TV programmes; TV Tokyo's \"Terrestrial and BS broadcasting\" includes broadcast support businesses such as programme production and broadcast operations; per each company's Annual Securities Report).",
    "図3-2": "Fig. 3-2",
    "テレ東：同じ年度、二つの線の引き方（2023年3月期）": "TV Tokyo: one year, two ways to draw the line (FY3/2023)",
    "同じ年度の事業を二通りの線で切り分けると、放送の比率が32ポイント変わる。": "Splitting the same year's businesses in two different ways moves broadcasting's share by 32 points.",
    "旧区分（地上波放送事業＋BS放送事業）": "Former segments (Terrestrial broadcasting + BS Broadcasting)",
    "新区分（地上波・BS放送事業）": "New segments (Terrestrial and BS broadcasting)",
    "対象年度": "Fiscal year",
    "放送セグメント利益 [百万円]": "Broadcasting segment profit [¥m]",
    "全社セグメント利益 [百万円]": "Total segment profit [¥m]",
    "放送に含まれる範囲": "What broadcasting includes",
    "テレビ東京ホールディングス 2023年3月期 有価証券報告書（旧区分開示値および翌期比較用新区分開示値）": "TV Tokyo Holdings Annual Securities Report FY3/2023 (figures under the former segments and the new-segment comparatives disclosed the following year)",
    "比率は開示値からの算出。比率の分母は、各区分のセグメント利益（調整前）の合計。区分の組み替えで分母も変わる。テレ東カラー（シアン #00B0F0）を基調に表示。同一企業の同一年度における開示区分の切り替えによる見え方の違いを示す。":
      "Ratios are derived from disclosed figures. The denominator is the sum of segment profit (before adjustments) under each segmentation, so it also changes when segments are regrouped. Shown in TV Tokyo's colour (cyan #00B0F0). The chart shows how the same company in the same year looks different depending on the segmentation disclosed.",

    // タブ4
    "利益単独では追跡できない放送の影響力を、売上比率のスロープ図および利益開示との対比で俯瞰する。": "Broadcasting's weight cannot be tracked from profit alone, so this tab looks at it through a revenue-share slope chart and a comparison with profit disclosure.",
    "図4-1": "Fig. 4-1",
    "売上に占める放送の比率（2015年3月期 → 2026年3月期）": "Broadcasting's share of revenue (FY3/2015 → FY3/2026)",
    "全社共通して売上に占める放送の比率が低下。特にフジ・メディアHD（41.2%→20.2%）や英ITV（57.8%→33.7%）で急激な放送依存度低下が進んでいる。":
      "Broadcasting's share of revenue fell at every company, most sharply at Fuji Media HD (41.2%→20.2%) and the UK's ITV (57.8%→33.7%).",
    "2026年3月期（ITVは2025年12月期）": "FY3/2026 (ITV: FY12/2025)",
    "放送売上 [百万円/£m]": "Broadcast revenue [¥m/£m]",
    "コンテンツ・IP売上 [百万円]": "Content & IP revenue [¥m]",
    "放送外売上 [百万円]": "Non-broadcast revenue [¥m]",
    "放送売上比率 (%)": "Broadcast revenue share (%)",
    "出典：各社有価証券報告書、ITV plc 各年決算発表資料": "Source: each company's Annual Securities Reports; ITV plc annual Results Releases",
    "各社の基本カラー規定に準拠（日テレ：黄、テレ朝：ピンク、TBS：青、テレ東：水色、フジ：赤）。比率は開示値からの算出。ITVは2015年→2025年12月期。ITVは放送収入の定義が国内5社と異なる。":
      "Colours follow each broadcaster's guideline colour (Nippon TV: yellow, TV Asahi: pink, TBS: blue, TV Tokyo: light blue, Fuji: red). Ratios are derived from disclosed figures. ITV is FY12/2015 → FY12/2025, and its definition of broadcasting revenue differs from the five Japanese broadcasters.",
    "売上に占める放送の比率": "Broadcasting share of revenue",
    "図4-2": "Fig. 4-2",
    "利益と売上の比較（最新期）": "Profit vs revenue (latest year)",
    "売上では全社で放送比率を追跡できる一方、利益面では放送単独の数値を把握できる企業が限られており、開示構造の非対称性が際立っている。":
      "Broadcasting's share of revenue can be tracked for every company, but only a few disclose broadcasting-only profit. The asymmetry in disclosure is striking.",
    "売上に占める放送の比率 (%)": "Broadcasting share of revenue (%)",
    "セグメント利益に占める放送の比率 (%)": "Broadcasting share of segment profit (%)",
    "開示状況の注記": "Disclosure note",
    "—（開示上、放送単独の利益なし）": "— (no broadcasting-only profit disclosed)",
    "放送・コンテンツ一体管理のため放送単独利益は非開示": "Broadcasting-only profit not disclosed; broadcasting and content are managed as one",
    "新区分（テレビ放送事業）": "New segments (TV Broadcasting)",
    "2019年3月期（旧区分 74.0%）を最後に放送単独利益の開示終了": "Broadcasting-only profit last disclosed for FY3/2019 (former segments, 74.0%)",
    "2018年3月期（旧区分 39.8%）を最後に放送単独利益の開示終了": "Broadcasting-only profit last disclosed for FY3/2018 (former segments, 39.8%)",
    "ITV plc (英国)": "ITV plc (UK)",
    "調整後EBITAベース。2026年に放送事業（M&E）をSkyへ売却合意": "Adjusted EBITA basis. Agreed in 2026 to sell its broadcasting business (M&E) to Sky",
    "開示上、放送単独の利益が区分されていない場合は「—（開示上、放送単独の利益なし）」と表記。推計で補間しない。テレ朝・テレ東の「放送」の利益には、番組制作の利益も含まれる。":
      "Where broadcasting-only profit is not separated in the disclosure, it is shown as \"— (no broadcasting-only profit disclosed)\" and not filled in with estimates. TV Asahi's and TV Tokyo's \"broadcasting\" profit also includes programme production profit.",

    // タブ5
    "本ダッシュボードのデータセット、定義、期間の前提、不連続の扱い、および全CSVのダウンロード。": "The datasets behind this dashboard, definitions, period assumptions, treatment of discontinuities, and downloads of every CSV.",
    "データダウンロード（全CSVファイル）": "Data downloads (all CSV files)",
    "ファイル名": "File name",
    "内容": "Contents",
    "レコード数": "Records",
    "操作": "Action",
    "ITVの部門別売上・調整後EBITA・広告収入・Studiosのグループ内／外部売上（2015〜2025年、当年資料の値、原文行つき）": "ITV divisional revenue, adjusted EBITA, advertising revenue and Studios intra-group / external revenue (2015–2025; as first reported each year, with source lines)",
    "放送とStudiosの調整後EBITA（2015〜2025年）": "Adjusted EBITA of Broadcast and Studios (2015–2025)",
    "2026年Skyへの売却条件（対価、企業価値、倍率、Love Productions、供給契約、売却後の会社指標）": "Terms of the 2026 sale to Sky (consideration, enterprise value, multiples, Love Productions, supply agreement, post-sale metrics)",
    "ITVの部門定義変更15件の履歴（不連続の注記）": "History of ITV's 15 division definition changes (discontinuity notes)",
    "フジのメディア・コンテンツと都市開発・観光のセグメント利益（2018〜2026年3月期）": "Fuji's segment profit for Media & Content and Urban Development, Hotels & Resorts (FY3/2018–FY3/2026)",
    "放送の利益比率（日本4局の旧区分／新区分、ITV）と元の開示値": "Broadcast profit share (four Japanese broadcasters under former / new segments, and ITV) with the disclosed figures",
    "日本の区分変更の決議日・適用年度・会社の公式原文・PDFページ": "Japanese segment changes: resolution date, first year applied, the company's official wording and PDF page",
    "売上に占める放送の比率（2015年・2026年実績値）": "Broadcasting's share of revenue (actuals for 2015 and 2026)",
    "方法論と前提条件": "Methodology and assumptions",
    "1. 指標の定義：": "1. Metric definitions:",
    "日本の民放キー局は有価証券報告書に記載された「報告セグメント利益」（営業利益ベース）を用いています。英国ITV plcは、同社が決算報告で最重要指標として用いる「調整後EBITA（adjusted EBITA）」に基づいています。比率などの算出値にはデータ上で":
      "For Japan's key commercial broadcasters we use \"reportable segment profit\" (operating profit basis) from the Annual Securities Reports. For the UK's ITV plc we use adjusted EBITA, the key measure in its results. Ratios and other calculated values are tagged in the data as",
    "開示値からの算出": "derived from disclosed figures",
    "を付与しています。": ".",
    "2. 期間の前提：": "2. Periods:",
    "日本各社は3月期（前年4月〜当年3月）、英国ITVは12月期（暦年：1月〜12月）です。両者には約9か月の重なりがありますが、開示元の確定値を厳密に尊重するため、無理な期間変換・推計による調整は行わず、各社の正式開示年度のまま対比しています。":
      "Japanese companies have March year-ends (April to March); ITV has a December year-end (calendar year). The two overlap by about nine months, but to stay faithful to the reported figures we do not convert periods or adjust with estimates, and compare each company's official fiscal years as reported.",
    "3. 不連続と非開示の扱い：": "3. Discontinuities and non-disclosure:",
    "セグメント区分が変更された前後の数値は、一本の連続した折れ線で接続することを厳禁とし、区切りを明示しています。また、開示上放送単独の数値が存在しない年度・項目（例：日本テレビの放送利益、フジ・TBSの区分変更後など）について、推計値で補間せず「非開示（—）」として扱っています。":
      "Figures before and after a segment change are never joined in one continuous line; the break is shown explicitly. Where no broadcasting-only figure exists in the disclosure (e.g. Nippon TV's broadcast profit, or Fuji and TBS after their segment changes), we do not fill in estimates and show it as \"not disclosed (—)\".",
    "4. カラー規定の準拠：": "4. Colours:",
    "各局の表示カラーは、共通ナレッジ管理（": "Each broadcaster's colour follows the shared colour guideline (",
    "01_Knowledge\\MEDIA\\民放キー局_基本カラー規定_v1.0.md": "01_Knowledge\\MEDIA\\ broadcaster colour guideline v1.0",
    "）で定めた基本カラーパレット（日本テレビ：#FFC000、テレビ朝日：#FF66FF、TBS：#002060/視認性調整色、テレビ東京：#00B0F0、フジテレビ：#FF0000）に統一準拠しています。":
      "): Nippon TV #FFC000, TV Asahi #FF66FF, TBS #002060 (adjusted for visibility), TV Tokyo #00B0F0, Fuji TV #FF0000.",
    "企画・分析・データ設計：Naohisa Hashimoto（Media Architect）": "Concept, analysis and data design: Naohisa Hashimoto (Media Architect)",
    "数値の出典：ITV plc 各年決算発表資料、日本の民放各社 有価証券報告書および適時開示資料": "Data sources: ITV plc annual Results Releases; Japanese broadcasters' Annual Securities Reports and timely disclosures"
  });
})();
