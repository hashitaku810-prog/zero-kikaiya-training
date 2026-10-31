# CP PICTURE DROP — 開発・公開引継書

更新: 2026-10-31
公開版: Ver.1.0 / CP ARCADE 第5ゲーム
公開URL: https://hashitaku810-prog.github.io/zero-kikaiya-training/cp-arcade/cp_picture_drop.html

## ソースと公開
- 本体: `cp-arcade/cp_picture_drop.html`
- TOP入口: `cp-arcade/index.html`
- 旧ゲーム: `cp-arcade/cp_picture_puzzle.html`（変更していない）
- GitHub Pagesの `main` 更新。公開ワークフロー（pages build and deployment）は成功を確認

## Ver.0.3から維持した仕様
- 6×6マス全面配置。ピース同士の交換、連結部分の枠消去、連結グループの同時移動
- 2×2の4枚完成で消去、完成部分の真上の6列ストックから補充、ストックの残数・組数表示
- 山札枯渇後は空きマスが増える
- タップ・ドラッグ、ヒント、取り消し、リセット、9/12/16/24/30作品モード

## 公開版で追加した画像連携
- 旧ゲームに埋め込まれた `<script id="puzzleCatalog" type="application/json">` を同一オリジンから読み込む
- `recommended===true` かつ `rights_ok===true` の60件のみ利用（名画・絶景・動物・料理・建物）
- 画像本体はGitHubに保存せず、元リストと同じWikimedia Commons API/The Met Open Access/Pexelsの配信元を利用
- MetはAPIの `isPublicDomain=true` を要求。Commonsは `extmetadata` でライセンス・作者を検査。Pexelsは採用済み写真ページを利用
- 画像が読めない場合は候補を除外して別作品を試す。採用画像9件未満なら、警告表示のうえSVG見本画像へ切り替える
- 画面に画像出典・作者・ライセンスリンクと中央トリミングの注記を表示
- 画像は縦横比を使ったCSS背景の中央トリミング。写真切り替えボタン・端末内画像アップロードあり
- 採用画像表示にはネット接続が必要。見本SVGはHTML同梱でオフライン可

## 検証状況
- Ver.0.3の6列落下ロジックで12作品すべての完成消去・残ストック12→0・空きマス増加を自動テストで確認済み
- Ver.1.0のJavaScript構文チェックPASS、GitHub readback PASS、TOPの5ゲーム表示／リンクを静的確認
- GitHub Pages `pages build and deployment` 成功（2026-10-31）
- Ver.1.0の画像60件全件の実配信検証、Android Chromeでの画像表示・プレイの実機検証は未完。正式COMPLETE宣言は留保

## 注意事項
- 旧ゲームの画像リスト構造変更で同期処理が壊れる可能性がある。今後共通JSON化を検討する
- 利用条件・配信状態は外部配布元に依存する。作品単位の権利・出典メタデータ確認は必須
- プレイ中の画像切り替えはゲームを最初からやり直す。ユーザー確認ダイアログあり
- 複数端末同期・オンラインランキング・セーブデータ移行は今回の対象外
