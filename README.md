# テレビ局は何で稼いでいるか――英ITVと民放キー局5社の事業別損益 (broadcaster-segment-cutline-dashboard)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Content: CC BY 4.0](https://img.shields.io/badge/Content-CC%20BY%204.0-lightgrey.svg)](LICENSE-CONTENT.md)
[![Vanilla JS](https://img.shields.io/badge/Code-Vanilla%20JS%20%2F%20Inline%20SVG-orange.svg)](#)
[![Single Page App](https://img.shields.io/badge/Deployment-GitHub%20Pages-success.svg)](#)

![Dashboard Preview](social-preview.png)

テレビ局の利益は、放送からどこへ移っているのか。英ITV（2015〜2025年）と日本の民放キー局5社（2014年3月期〜2026年3月期）について、有価証券報告書と決算資料から、事業セグメント別の売上・利益を並べました。タブ1〜4で、ITVの放送とスタジオの逆転、フジの放送と不動産の2本柱、放送の利益が決算書から読み取れるか、売上に占める放送の比率を比べられます。タブ5に、データと方法をまとめています。金額は原典の百万単位を100で割った億ポンド・億円で、為替の換算はしていません（**Ver 1.56**）。

note連載『どこで切るか』の図の出典となるダッシュボードです。

一次開示データベースに基づき、英ITV（2015〜2025年の放送 vs スタジオ財務時系列、2026年Sky売却条件）および日本の民放キー局5社（フジ・メディアHD、TBS HD、テレビ朝日HD、テレビ東京HD、日本テレビHD）のセグメント開示実績値を直接グラフ化・可視化しています。

---

## 🌐 公開URL（Live Dashboard）

* **公開URL（予定）**: [https://naohisastry.github.io/broadcaster-segment-cutline-dashboard/](https://naohisastry.github.io/broadcaster-segment-cutline-dashboard/)
  *(ユーザー承認後に GitHub へプッシュ・公開予定)*

### 🔗 関連リンク
* **フジ・メディアHD 事業別の収益とキャッシュフロー**: [https://naohisastry.github.io/broadcaster-financials-fuji-media-hd/](https://naohisastry.github.io/broadcaster-financials-fuji-media-hd/)

---

## 📊 ダッシュボードの構成（全5タブ）

本ダッシュボードは、データベースの定量的可視化（グラフ・時系列・比較）に特化しています（※切断線マップや各社原文引用などのデザイン中心のインフォグラフィックは記事等で展開）。

| タブ | アンカーID | 主な可視化内容 | エビデンスの焦点 |
|---|---|---|---|
| **1. ITV：放送とスタジオ** | `#fig-1-1`<br>`#fig-1-2`<br>`#fig-1-3`<br>`#fig-1-4`<br>`#fig-1-5` | ・調整後EBITA推移（2015-25）<br>・Studios売上の内外比率<br>・放送売上と広告収入（定義切替切断）<br>・Skyへの売却条件スコアカード群<br>・部門定義変更履歴（全15件） | 放送利益が長期低迷する一方、ITV Studiosが伸長し2023年に利益逆転。Skyへ最大£1.6bnで放送売却合意し、5年約21億ポンドの番組供給契約を締結。 |
| **2. フジHD：２本柱** | `#fig-2-1`<br>`#fig-2-2` | ・２本柱セグメント利益（2018-26）<br>・区分変更から外部資本検討への時系列年表 | 2018年に「メディア・コンテンツ」と「都市開発・観光」へ区分再編。都市開発が利益の過半を稼ぐ年度が常態化し、2026年に外部資本導入検討を開始。 |
| **3. 放送利益の可視性** | `#fig-3-1`<br>`#fig-3-2` | ・放送利益比率推移（旧区分実線／新区分破線／終了×印）<br>・テレ東2023年の旧区分（77.5%）vs新区分（45.4%）横棒比較 | フジ（2018年）とTBS（2019年）は区分変更で放送単独利益の開示終了。テレ東は同一年度でも区分の引き方で放送比率が32ポイント変動。 |
| **4. 売上で見た立ち位置** | `#fig-4-1`<br>`#fig-4-2` | ・売上に占める放送比率スロープ図（2015→2026）<br>・利益と売上の開示状況対比表 | 売上では全社で放送依存度低下が追跡できるが、利益面では放送単独を開示する企業が限定される非対称性を可視化。 |
| **5. データと方法** | ― | ・全CSVダウンロード<br>・方法論・前提条件・不連続性の扱い | 手入力・推計を排除し、一次開示データと算出値を完全透明化。 |

---

## 🛠 技術スタック・設計方針

- **外部ライブラリ非依存（Zero Dependencies）**: 単一の静的HTML＋Vanilla JavaScript＋インラインSVGのみで構築。CDN等の外部通信を排除し、完全オフラインでも高速かつ堅牢に動作。
- **配色トークン**: TV-Shift 2035 v2 と共通の配色仕様（`--bg:#0a0e1a; --panel:#111726; --card-bg:#141c2e; --accent:#9cc2f0; --warn:#ffb35c;`）。強調色は `--warn` の1色に限定。
- **レスポンシブ**: スマートフォン幅（390px等）でも横スクロールが発生せず、全チャート・テーブル・カードが快適に閲覧可能。

---

## 📁 フォルダ構成

```
broadcaster-segment-cutline-dashboard/
├── broadcaster-segment-cutline-dashboard-v1.56.html  # ダッシュボード本体（Ver 1.56 正本）
├── index.html                                        # GitHub Pages / サーバー用ルートエイリアス（Ver 1.56同期）
├── data_v1.1.js                                      # 構造化データセット（最新版データ）
├── social-preview.png                                # OGP標準画像（1200×630px）
├── README.md                                         # 本文書
├── DATA_SOURCES.md                                   # データソース・原典一覧
├── METHODOLOGY.md                                    # 分析方針・不連続性の扱い・前提
├── CHANGELOG.md                                      # 更新履歴
├── LICENSE                                           # MITライセンス（コード）
├── LICENSE-CONTENT.md                                # CC BY 4.0ライセンス（文章・データ・図表）
└── .gitignore                                        # Git除外設定
```

---

## 📜 ライセンス

- **コード**: [MIT License](LICENSE)
- **コンテンツ・データ**: [Creative Commons Attribution 4.0 International License (CC BY 4.0)](LICENSE-CONTENT.md)
  - 企画・分析・データ設計：Naohisa Hashimoto (Media Architect)
