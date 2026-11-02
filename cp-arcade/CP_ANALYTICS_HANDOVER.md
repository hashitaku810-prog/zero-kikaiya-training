# はしmoto Games — アクセス集計・運用引継書

実装日：2026-11-02
対象：GitHub Pages \`hashitaku810-prog/zero-kikaiya-training/cp-arcade\`
目的：YouTube紹介前からサイト訪問者、PV、ゲーム別開始回数、流入元を集計。

## URL
- 公開TOP：\`https://hashitaku810-prog.github.io/zero-kikaiya-training/cp-arcade/\`
- 管理者用：\`https://hashitaku810-prog.github.io/zero-kikaiya-training/cp-arcade/cp_analytics_admin.html\`
- アクセスAPI：\`https://zotajucfdvmyernfwxnm.supabase.co/functions/v1/arcade-analytics\`
- YouTube例：\`https://hashitaku810-prog.github.io/zero-kikaiya-training/cp-arcade/?utm_source=youtube&utm_medium=video&utm_campaign=channel_intro\`

管理画面はTOPからリンクしない。アクセスキーの平文はGitHubソース・この文書・公開サイト・Edge Functionの環境変数には保存していない。DBにSHA-256ハッシュ1件のみ保持し、HTTPSのAuthorizationヘッダーで送信。キーは所有者にチャットで個別に渡す。キーを紛失した場合は新しい乱数でSHA-256ハッシュを生成し、Supabaseの \`arcade_analytics_admin_keys\` の該当行のみ更新してローテーションする（**既存ランキング・集計データを削除しない**）。

## 追加したファイル
- \`cp_analytics.js\`：全作品共通の匿名ブラウザID、セッションの30分タイムアウト、訪問イベント、ゲーム開始イベント、YouTubeのUTMパラメーター、公開カウンター読み込み
- \`cp_analytics_admin.html\`：7/30/90日切替、今日・累計の訪問者数、PV、ゲーム人気、流入元、YouTubeキャンペーン、CSV保存、YouTube用URL作成
- 公開TOP \`index.html\`：累計推定訪問者、今日の推定訪問者、累計PVのカウンター
- 8ゲームのHTML：本当のゲーム開始処理に \`window.CPAnalytics?.gameStart(game)\` を追加
- \`about.html\`：匿名集計の説明と匿名アクセス計測停止のチェックボックス
- \`credits.html\`：サイト内ページビューのみ計測

## サーバー構成
- 既存Supabase \`zotajucfdvmyernfwxnm\` のEdge Function \`arcade-analytics\` v1（\`verify_jwt=false\`、APIが自前でリクエスト種別・Origin・管理者キーを検証）。
- 既存 \`arcade-ranking\`（ランキング）/ \`arcade_scores\` / \`arcade_runs\` は一切変更しない。
- 新規マイグレーション \`add_arcade_first_party_analytics_v1\`：
  - \`arcade_analytics_visitors\`（ブラウザごとの匿名UUID）
  - \`arcade_analytics_daily_visitors\`（日単位のユニーク）
  - \`arcade_analytics_sessions\`（30分単位の訪問セッション、流入元、キャンペーン）
  - \`arcade_analytics_daily_metrics\`（日別UV・セッション・PV・ゲーム開始）
  - \`arcade_analytics_daily_games\`（日別ゲーム開始）
  - \`arcade_analytics_daily_sources\`（日別流入元・YouTube動画キー）
  - \`arcade_analytics_rate_guard\`（短時間連打の除外）
  - \`arcade_analytics_admin_keys\`（所有者アクセスキーのハッシュ）
  - RPC：\`arcade_analytics_record\`, \`arcade_analytics_public_stats\`
- 全8テーブルはRLS有効でポリシーなし。匿名・一般ログインには表への権限もRPC呼び出し権限も付けない。service_roleに限り、Edge FunctionがDB操作。
- Security AdvisorのRLS有効ポリシーなしINFO（ランキング2件+集計8件）は意図した設計。

## 計測仕様と注意
- 「累計推定訪問者」はブラウザ保存の匿名UUIDで数える。ログイン不要、同一ブラウザの再訪は原則重複しない。スマホとPC、ブラウザの変更、データ削除では別人数。厳密な実人数ではない。
- 「今日の推定訪問者」はJSTでの日別匿名UUID数、「PV」はサイトページを表示した回数。管理画面の日別訪問者合計は日をまたぐと重複する「延べ」。
- ゲーム開始は各ゲーム固有の開始処理に設置。CP PICTURE DROP・CP NOKORIBIのようにページを開くと自動開始するゲームは初期ロードも1開始となる。
- 流入元は \`utm_source=youtube\` を最優先し、その他は短い参照元ドメイン分類だけ（完全なURLはサーバー送信・保存しない）。\`utm_campaign\` は小文字英数字・\`_\`・\`-\`の60文字以内。YouTube動画別集計はこのキャンペーン文字列単位。
- ブラウザ内の \`localStorage.hm_games_visitor_v1\` と \`sessionStorage.hm_games_session_v1\` 以外にトラッキング用のCookieを設置しない。DNT/GPCを尊重。
- \`about.html\` の停止設定キーは \`hm_games_analytics_off\`、値 \`1\` で以降の計測を停止しブラウザIDをクリアする。
- ゲームの得点・漢字帳、氏名、メール、フルreferrer、IPアドレスはアクセス集計用のDBに送らない（ただし接続先通信インフラのアクセスログは別）。
- 頻繁なイベントをクライアント／サーバーの双方で抑制。BOTや人為的な水増しを完全には排除できず、数字は参考値。
- 管理画面はタブ内sessionStorageにキーを一時記録し、ログアウトで破棄。URLやYouTubeにキーを貼らない。
- 既存のSupabase使用枠内での運用を目指す。大量の訪問が発生した場合、Edge Function呼び出し数やDB容量を見て調整。
- 従来の全8ゲームはAPIに繋がらなくてもゲーム継続可能（オプショナルチェーン、通信失敗を握りつぶす）。TOPカウンターが取れない時は "--" と注記。

## テスト
- 全11個の公開HTML（TOP、8ゲーム、about/credits）に共通計測読み込みがあることを確認。
- 全8ゲームに独立のgameStart呼び出しを追加。静的JavaScript構文検査PASS。
- 管理画面はキー入力、日別集計、ゲーム別・参照元別集計、CSV・YouTubeリンク生成までJavaScript構文検査PASS。
- DB権限検査：anonに訪問者表のSELECTなし、authenticatedに日別表のSELECTなし、anonにはRPCのEXECUTEなし。service_roleは記録用RPC実行権限あり。
- DBトランザクション内で訪問イベント・ゲーム開始イベントをテストし、ROLLBACKによりテスト用データを残していない。既存ランキング記録6件は保持。
- GitHub Pagesビルド結果と、Edge Functionの実HTTPアクセス確認は別途運用時に確認する。Python/containerからインターネット疎通ができない環境の場合、GitHub Actionsの成功とSupabase側SQL確認をもってコード側確認とし、Android実機で表示・入力・CSV等をユーザーが確認する。

## 次回の改善候補
- サイト人気の実運用データが貯まってから、BOT判定やセッション重複の除外、保存データの保持期間・無料枠の最適化。
- YouTube公開後に動画別の流入、人気ゲーム、PVと継続率を比較。
