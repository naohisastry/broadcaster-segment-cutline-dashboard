# データソース一覧 (DATA_SOURCES.md)

本ダッシュボード（`broadcaster-segment-cutline-dashboard`）で使用されているすべての数値データは、各社が公表した一次資料（有価証券報告書、決算短信、決算説明会資料、プレスリリース）に基づき構造化されています。推計や補間による手入力は一切行っていません。

---

## 1. 入力データセット（CSVファイル）

すべてのデータセットは `fig_Claude/` フォルダのCSVファイルから `build_data_v1.0.py` によって機械的に読み込まれ、`data_v1.0.js` としてビルドされています。

| ファイル名 | レコード数 | 主な内容 | 主な引用元 |
|---|---|---|---|
| `itv_segments_timeseries_v1.0.csv` | 125行 | ITVの部門別売上・調整後EBITA・広告収入・Studiosグループ内／外部売上（2015〜2025年） | ITV plc Results Release（各年決算発表資料） |
| `fig3_itv_ebita_v1.0.csv` | 22行 | 放送（Broadcast & Online → M&E）とITV Studiosの調整後EBITA | 同上（Segmental information / adjusted EBITA） |
| `itv_deal_terms_v1.0.csv` | 48行 | 2026年7月 Sky（Comcast）へのM&E売却条件（対価、EV、マルチプル、Love Productions持分、番組供給契約、売却後の会社指標） | ITV plc 2026年7月 売却公表資料、2025年通期決算資料 |
| `itv_segment_definition_log_v1.0.csv` | 15行 | ITVの部門定義変更・買収・会計基準移行（IFRS15/16等）全15件の履歴 | ITV plc 各年年次報告書・決算短信 |
| `fig2_fuji_two_pillars_v1.0.csv` | 18行 | フジ・メディアHD「メディア・コンテンツ」と「都市開発・観光」のセグメント利益（2018〜2026年3月期） | フジ・メディア・ホールディングス 有価証券報告書（セグメント情報） |
| `fig4_broadcast_profit_share_v1.0.csv` | 50行 | 放送の利益比率（日本民放4局の旧区分／新区分、ITV）と元の開示値 | 各社有価証券報告書（セグメント情報）、ITV決算資料 |
| `jp_segment_change_quotes_v1.0.csv` | 6行 | 日本の区分変更決議日・適用年度・会社の公式原文・PDF頁番号 | 各社有価証券報告書（報告セグメントの変更に関する注記） |
| `fig6_broadcast_revenue_share_v1.0.csv` | 12行 | 売上に占める放送の比率（2015年・2026年実績値、ITVは2015・2025年） | TV-Shift 2035 v2 DATA（series_role=MAIN）、ITV決算資料 |

---

## 2. 参照した一次開示資料一覧

### 英国（ITV plc）
- **ITV plc Results Release (Full Year 2015 - 2025)**: 各年度の決算短信およびプレゼンテーション資料
- **ITV plc Proposed Sale of Media & Entertainment to Sky (July 2026)**: 公式売却合意発表資料（対価上限£1.6bn、確定対価£1.4bn、EV/EBITDA倍率、Carve-out財務諸表、CSA番組供給契約等）

### 日本（民放キー局5社）
- **株式会社フジ・メディア・ホールディングス**: 有価証券報告書（2015年3月期〜2026年3月期）、適時開示資料（2026年2月3日「都市開発・観光事業への外部資本導入等の検討開始に関するお知らせ」）
- **株式会社TBSホールディングス**: 有価証券報告書（2015年3月期〜2026年3月期）
- **株式会社テレビ朝日ホールディングス**: 有価証券報告書（2015年3月期〜2026年3月期）
- **株式会社テレビ東京ホールディングス**: 有価証券報告書（2015年3月期〜2026年3月期）
- **日本テレビホールディングス株式会社**: 有価証券報告書（2015年3月期〜2026年3月期）
