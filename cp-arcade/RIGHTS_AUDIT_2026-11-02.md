# はしもとgame（旧CP ARCADE） 公開前の権利確認記録

**調査基準日**：2026年11月2日。**状態**：一次監査・一部写真は未確認。**一般公開向けの権利クリアを宣言するものではない。**

本ドキュメントは「YouTubeでゲーム集へのURLを広く紹介する前」にコードと画像の利用条件を見直すための記録。既存サイトやゲームの公開設定・画像カタログにはまだ変更を加えていない。

## 結論 / 公開前の対応状況

- **最優先修正**：画像 `CP-PIC-49`「ピサの斜塔」。カタログには `Leaning_tower_of_Pisa.jpg` / `CC BY 2.5` とある。一方、検索で確認できた `File:Leaning_Tower_of_Pisa.jpg` は **CC BY-SA 3.0**、作者 **Softeis**。小文字・大文字を含むファイル名とライセンスが一致するか未確認。**確証が得られるまで両ゲームの採用候補から除外し、条件を確認した別写真へ差し替えること。** (https://commons.wikimedia.org/wiki/File:Leaning_Tower_of_Pisa.jpg)
- **要注意**：`CP-PIC-57`「モン・サン＝ミシェル」はCommonsライセンス欄に CC BY-SA 4.0 と表示される一方、Exifには「All rights reserved / no reproduction without prior permission」の古い文言がある。Commons上の公開ライセンスが優先と考えられるが、出典の確認や安全優先の差替えを検討。 (https://commons.wikimedia.org/wiki/File:Mont-Saint-Michel_from_distance.JPG)
- **画像クレジット**：CC BY/SA掲載候補13件は全件、著作者名・画像名・出典リンク・正確な版数つきCCライセンスへのリンク・トリミング/分割した旨を掲載。公開前に正確な原本を再照合する。
- **CC BY-SA**：元画像の改変が翻案に該当して公表される場合、該当する画像加工物は同じ互換ライセンスに従う。ゲーム全体のコードまで自動的にCC BY-SAに変わるものではない。写真とゲーム本体のライセンス範囲を明確に記載する。
- **The Met**：APIで `isPublicDomain===true` を要求する処理を維持する。画像本体の著作権と別に商標・人物などの権利は例外になり得る。
- **Pexels**：PexelsライセンスはWebサイト・アプリ内での無料利用と加工を許可している。写真単体再配布、ロゴ/商標への写真使用、写っている人物・ブランドの推薦を装う利用を避ける。全写真の原本ページを一件ずつ開く個別照合は未完了。
- **コード/ゲーム**：DROP / CHAIN / FRUITS / PICTURE系 / NOKORIBI / 漢字8パズルについて、外部のゲーム画像・楽曲ファイルの参照は見つからず、ゲーム内表現は主に独自のSVG・CSS・Canvas・Unicode絵文字。ルールの一致自体は原則著作権侵害ではないが、他社画面・名称の商標・不正競争・特許等のリスクをゼロと保証しない。事前の見た目比較と表示名称の審査は別途必要。
- **名称**：「はしもとgame / ハシモトゲーム」について公開Web上で明瞭な同名例は見つからなかったが、**J-PlatPatでの同一・称呼類似商標調査は未完了**。簡易Web検索だけで権利問題なしとはいえない。
- **情報ページ**：TOPは極力簡潔にし、フッターに「サイトについて」「画像・著作権」「お問い合わせ」への小さいリンク。クレジットは別ページで表にして、絵合わせゲーム画面からも直行できるようにする。
- **プライバシー**：ランキングに3文字のイニシャルだけでなくスコア、ランダムなブラウザ識別子、IPハッシュを記録。収集内容・用途・問い合わせ方法をサイト情報ページに短く明記する。
- **免責**：「初心者がChatGPTを活用して作成」「無償」「不具合があり得る」など事実ベースで書く。「ノークレーム」で著作権侵害や損害賠償責任が自動で免除されるわけではない。
- **公開場所**：現時点のGitHubリポジトリはpublic、GitHub Pagesも公開済み。YouTubeでリンクを紹介するのは公開範囲の変更ではなく周知拡大。

## コード上のカタログ件数

- PICTURE PUZZLE：70候補（The Met 10、Pexels 30、Commons 30）。`名画-05` は `rights_ok=false` かつ `recommended=false` で採用不可。
- PICTURE DROP：60候補（The Met 8、Pexels 22、Commons 30）。60件すべて `rights_ok=true` のフラグ。
- **二作品で重複する画像が多数**。カタログの `rights_ok=true` は登録時のフラグであり第三者の権利が法的にクリアであることの証明ではない。
- Commons 30件はPD-Art想定15、CC BYまたはBY-SA想定13、CC0想定2。公開直前に全30画像の実際のメタデータを再確認する。
- Commonsの画像原本ページについて**15件を抜き出して利用条件を照合した記録**が下表にある。他の画像は「原本未照合」。各画像の表示可否は実行時APIだけに依存させず、公開前に静的な監査記録を残す。

## 個別画像台帳（全70候補）

| ID | カテゴリ | 題名 | 配布元 | 想定権利条件 | 採用範囲 | 監査状況 | 原本 |
|---|---|---|---|---|---|---|---|
| 名画-01 | 世界の名画 | 神奈川沖浪裏 | met | The Met Open Access / CC0 (要OA検証) | 両方 | Met原本OA確認はゲーム実行時 | [原本](https://www.metmuseum.org/art/collection/search/45434) |
| 名画-02 | 世界の名画 | 舟遊び | met | The Met Open Access / CC0 (要OA検証) | 両方 | Met原本OA確認はゲーム実行時 | [原本](https://www.metmuseum.org/art/collection/search/436947) |
| 名画-03 | 世界の名画 | 糸杉のある麦畑 | met | The Met Open Access / CC0 (要OA検証) | 両方 | Met原本OA確認はゲーム実行時 | [原本](https://www.metmuseum.org/art/collection/search/436535) |
| 名画-04 | 世界の名画 | ダンス教室 | met | The Met Open Access / CC0 (要OA検証) | 両方 | Met原本OA確認はゲーム実行時 | [原本](https://www.metmuseum.org/art/collection/search/438817) |
| 名画-05 | 世界の名画 | 睡蓮の池にかかる橋 | met | The Met Open Access / CC0 (要OA検証) | 候補のみ | **採用不可**：rights_ok=false | [原本](https://www.metmuseum.org/art/collection/search/437127) |
| 名画-06 | 世界の名画 | 穀物の収穫 | met | The Met Open Access / CC0 (要OA検証) | 両方 | Met原本OA確認はゲーム実行時 | [原本](https://www.metmuseum.org/art/collection/search/435809) |
| 名画-07 | 世界の名画 | 四本の木 | met | The Met Open Access / CC0 (要OA検証) | 両方 | Met原本OA確認はゲーム実行時 | [原本](https://www.metmuseum.org/art/collection/search/437121) |
| 名画-08 | 世界の名画 | 水差しを持つ女 | met | The Met Open Access / CC0 (要OA検証) | 両方 | Met原本OA確認はゲーム実行時 | [原本](https://www.metmuseum.org/art/collection/search/437881) |
| 名画-09 | 世界の名画 | 花束 | met | The Met Open Access / CC0 (要OA検証) | 両方 | Met原本OA確認はゲーム実行時 | [原本](https://www.metmuseum.org/art/collection/search/827660) |
| 名画-10 | 世界の名画 | グランド・ジャット島の日曜日のための習作 | met | The Met Open Access / CC0 (要OA検証) | 候補のみ | Met原本OA確認はゲーム実行時 | [原本](https://www.metmuseum.org/art/collection/search/437658) |
| 絶景-01 | 世界の絶景 | サントリーニ島の街並み | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/santorini-greece-1010656/) |
| 絶景-02 | 世界の絶景 | 森の滝 | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/waterfall-in-a-forest-8626636/) |
| 絶景-03 | 世界の絶景 | 桜と清水寺 | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/kiyomizu-dera-temple-in-kyoto-japan-16226405/) |
| 絶景-04 | 世界の絶景 | 山と湖の鏡面 | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/view-of-a-mountain-reflecting-in-the-lake-17841930/) |
| 絶景-05 | 世界の絶景 | オーロラの夜空 | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/northern-aurora-lights-on-sky-1938345/) |
| 絶景-06 | 世界の絶景 | ニューヨークの夜景 | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/city-skyline-at-night-8756803/) |
| 絶景-07 | 世界の絶景 | マチュピチュの遺跡 | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/a-view-of-the-machu-picchu-in-peru-6176147/) |
| 絶景-08 | 世界の絶景 | 砂丘の曲線 | pexels | Pexels License | 候補のみ | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/sand-dunes-in-desert-18573922/) |
| 絶景-09 | 世界の絶景 | ターコイズ色の海岸 | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/a-beautiful-beach-with-turquoise-water-7777601/) |
| 絶景-10 | 世界の絶景 | オランダのチューリップ畑 | pexels | Pexels License | 候補のみ | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/photo-of-a-tulip-field-14865394/) |
| 動物-01 | 可愛い動物 | ゴールデンレトリバーの子犬 | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/adorable-golden-retriever-puppy-on-concrete-surface-34221896/) |
| 動物-02 | 可愛い動物 | ふわふわの子猫 | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/close-up-view-of-a-cute-kitten-8538275/) |
| 動物-03 | 可愛い動物 | レッサーパンダ | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/red-panda-146228/) |
| 動物-04 | 可愛い動物 | 白うさぎと草原 | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/a-rabbit-on-grass-field-7121524/) |
| 動物-05 | 可愛い動物 | 泳ぐ子ガモたち | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/close-up-of-ducklings-17914588/) |
| 動物-06 | 可愛い動物 | 雪の中のペンギンたち | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/penguins-on-snow-covered-ground-11058418/) |
| 動物-07 | 可愛い動物 | 赤いキツネ | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/close-up-photo-of-true-fox-animal-at-daytime-162291/) |
| 動物-08 | 可愛い動物 | おやつを食べるハムスター | pexels | Pexels License | 候補のみ | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/cute-hamster-enjoying-tasty-treat-3432929/) |
| 動物-09 | 可愛い動物 | 森のハリネズミ | pexels | Pexels License | 候補のみ | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/animal-blur-close-up-cute-207022/) |
| 動物-10 | 可愛い動物 | かわいいカワウソ | pexels | Pexels License | 候補のみ | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/close-up-photo-of-a-cute-otter-12305418/) |
| 料理-01 | 美味しそうな料理 | 具だくさんのラーメン | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/delicious-bowl-of-japanese-ramen-with-egg-and-noodles-33143858/) |
| 料理-02 | 美味しそうな料理 | 焼きたてピザ | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/overhead-shot-of-pizza-on-a-marble-surface-11653777/) |
| 料理-03 | 美味しそうな料理 | バーガーとポテト | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/photo-of-burger-and-fries-3219547/) |
| 料理-04 | 美味しそうな料理 | ベリーのパンケーキ | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/pancakes-with-berries-6743251/) |
| 料理-05 | 美味しそうな料理 | 色とりどりの寿司 | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/a-sushi-platter-11470589/) |
| 料理-06 | 美味しそうな料理 | カラフルなサラダ | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/close-up-of-salad-15813479/) |
| 料理-07 | 美味しそうな料理 | ベリーのケーキ | pexels | Pexels License | 両方 | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/cake-with-strawberries-17172209/) |
| 料理-08 | 美味しそうな料理 | トマトとバジルのパスタ | pexels | Pexels License | 候補のみ | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/pasta-decorated-with-fresh-basil-and-tomato-served-in-bowl-11937509/) |
| 料理-09 | 美味しそうな料理 | グリルステーキ | pexels | Pexels License | 候補のみ | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/gourmet-grilled-steak-with-herb-sauce-and-vegetables-28962426/) |
| 料理-10 | 美味しそうな料理 | ナンとインドカレー | pexels | Pexels License | 候補のみ | Pexels共通ライセンス確認・個別写真未照合 | [原本](https://www.pexels.com/photo/delicious-indian-curry-with-naan-bread-28497406/) |
| CP-PIC-31 | 世界の名画 | モナ・リザ | commons | PD-Art | 両方 | 原本ページの表示内容と想定ライセンスが一致 | [原本](https://commons.wikimedia.org/wiki/File:Leonardo_da_Vinci_-_Mona_Lisa_(Louvre%2C_Paris).jpg) |
| CP-PIC-32 | 世界の名画 | 最後の晩餐 | commons | PD-Art | 両方 | Commons原本ページは未照合 | [原本](https://commons.wikimedia.org/wiki/File:Last_Supper_by_Leonardo_da_Vinci.jpg) |
| CP-PIC-33 | 世界の名画 | 星月夜 | commons | PD-Art | 両方 | Commons原本ページは未照合 | [原本](https://commons.wikimedia.org/wiki/File:Vincent_Van_Gogh_Starry_Night.jpg) |
| CP-PIC-34 | 世界の名画 | ひまわり | commons | PD-Art | 両方 | Commons原本ページは未照合 | [原本](https://commons.wikimedia.org/wiki/File:Sunflowers_National_Gallery.jpg) |
| CP-PIC-35 | 世界の名画 | 真珠の耳飾りの少女 | commons | PD-Art | 両方 | Commons原本ページは未照合 | [原本](https://commons.wikimedia.org/wiki/File:1665_Girl_with_a_Pearl_Earring.jpg) |
| CP-PIC-36 | 世界の名画 | 睡蓮（1906年の作品） | commons | PD-Art | 両方 | Commons原本ページは未照合 | [原本](https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Waterlilies_-_Google_Art_Project.jpg) |
| CP-PIC-37 | 世界の名画 | 印象・日の出 | commons | PD-Art | 両方 | Commons原本ページは未照合 | [原本](https://commons.wikimedia.org/wiki/File:Monet_-_Impression%2C_Sunrise.jpg) |
| CP-PIC-38 | 世界の名画 | 叫び（1893年カラー絵画） | commons | PD-Art | 両方 | Commons原本ページは未照合 | [原本](https://commons.wikimedia.org/wiki/File:The_Scream.jpg) |
| CP-PIC-39 | 世界の名画 | 夜のカフェテラス | commons | PD-Art | 両方 | Commons原本ページは未照合 | [原本](https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Terrace_of_a_Caf%C3%A9_at_Night_(Place_du_Forum)_1888.jpg) |
| CP-PIC-40 | 世界の名画 | 牛乳を注ぐ女 | commons | PD-Art | 両方 | Commons原本ページは未照合 | [原本](https://commons.wikimedia.org/wiki/File:Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg) |
| CP-PIC-41 | 世界の名画 | 落穂拾い | commons | PD-Art | 両方 | Commons原本ページは未照合 | [原本](https://commons.wikimedia.org/wiki/File:Jean-Fran%C3%A7ois_Millet_-_Des_glaneuses.jpg) |
| CP-PIC-42 | 世界の名画 | ムーラン・ド・ラ・ギャレットの舞踏会 | commons | PD-Art | 両方 | Commons原本ページは未照合 | [原本](https://commons.wikimedia.org/wiki/File:Pierre-Auguste_Renoir_-_Bal_du_moulin_de_la_Galette.jpeg) |
| CP-PIC-43 | 世界の名画 | ヴィーナスの誕生 | commons | PD-Art | 両方 | Commons原本ページは未照合 | [原本](https://commons.wikimedia.org/wiki/File:La_naissance_de_V%C3%A9nus%2C_Boticelli.jpg) |
| CP-PIC-44 | 世界の名画 | 接吻 | commons | PD-Art | 両方 | 原本ページの表示内容と想定ライセンスが一致 | [原本](https://commons.wikimedia.org/wiki/File:Klimt_-_The_Kiss.jpg) |
| CP-PIC-45 | 世界の名画 | 白貂を抱く貴婦人 | commons | PD-Art | 両方 | Commons原本ページは未照合 | [原本](https://commons.wikimedia.org/wiki/File:Lady_with_the_ermine.jpg) |
| CP-PIC-46 | 世界の建物・名所 | エッフェル塔（昼景） | commons | CC BY-SA 4.0 | 両方 | 原本ページの表示内容と想定ライセンスが一致 | [原本](https://commons.wikimedia.org/wiki/File:Eiffel_Tower_during_day_01.jpg) |
| CP-PIC-47 | 世界の建物・名所 | ビッグ・ベン | commons | CC BY-SA 3.0 | 両方 | 原本ページの表示内容と想定ライセンスが一致 | [原本](https://commons.wikimedia.org/wiki/File:BigBenLondon.jpg) |
| CP-PIC-48 | 世界の建物・名所 | タージ・マハル | commons | CC BY-SA 4.0 | 両方 | 原本ページの表示内容と想定ライセンスが一致 | [原本](https://commons.wikimedia.org/wiki/File:Taj_Mahal_frontal.jpg) |
| CP-PIC-49 | 世界の建物・名所 | ピサの斜塔 | commons | CC BY 2.5 | 両方 | **要修正**：登録URLと類似画像のライセンス不一致 | [原本](https://commons.wikimedia.org/wiki/File:Leaning_tower_of_Pisa.jpg) |
| CP-PIC-50 | 世界の建物・名所 | サグラダ・ファミリア | commons | CC BY-SA 4.0 | 両方 | Commons原本ページは未照合 | [原本](https://commons.wikimedia.org/wiki/File:Facade_of_the_Sagrada_Familia%2C_Barcelona%2C_Spain.jpg) |
| CP-PIC-51 | 世界の建物・名所 | コロッセオ | commons | CC BY-SA 4.0 | 両方 | 原本ページの表示内容と想定ライセンスが一致 | [原本](https://commons.wikimedia.org/wiki/File:Exterior_of_Roman_Colosseum.jpg) |
| CP-PIC-52 | 世界の建物・名所 | シドニー・オペラハウス | commons | CC BY-SA 4.0 | 両方 | 原本ページの表示内容と想定ライセンスが一致 | [原本](https://commons.wikimedia.org/wiki/File:Sydney_Opera_House.jpg) |
| CP-PIC-53 | 世界の建物・名所 | 自由の女神（白黒写真） | commons | CC0 1.0 | 両方 | 原本ページの表示内容と想定ライセンスが一致 | [原本](https://commons.wikimedia.org/wiki/File:Statue_of_Liberty_-_New_York_City.jpg) |
| CP-PIC-54 | 世界の建物・名所 | ブルジュ・ハリファ | commons | CC BY-SA 4.0 | 両方 | 原本ページの表示内容と想定ライセンスが一致 | [原本](https://commons.wikimedia.org/wiki/File:Burj_Khalifa_-_Dubai.jpg) |
| CP-PIC-55 | 世界の建物・名所 | エトワール凱旋門 | commons | CC BY-SA 3.0 | 両方 | 原本ページの表示内容と想定ライセンスが一致 | [原本](https://commons.wikimedia.org/wiki/File:Arc_de_Triomphe_-_Front.jpg) |
| CP-PIC-56 | 世界の建物・名所 | ノイシュヴァンシュタイン城 | commons | CC BY-SA 4.0 | 両方 | 原本ページの表示内容と想定ライセンスが一致 | [原本](https://commons.wikimedia.org/wiki/File:Neuschwanstein_Castle_in_Germany.jpg) |
| CP-PIC-57 | 世界の建物・名所 | モン・サン＝ミシェル | commons | CC BY-SA 4.0 | 両方 | **要注意**：Commons本文はBY-SA4、Exif内の権利文言に相違 | [原本](https://commons.wikimedia.org/wiki/File:Mont-Saint-Michel_from_distance.JPG) |
| CP-PIC-58 | 世界の建物・名所 | ペトラ遺跡（エル・ハズネ） | commons | CC BY-SA 3.0 | 両方 | 原本ページの表示内容と想定ライセンスが一致 | [原本](https://commons.wikimedia.org/wiki/File:Petra_-_Al_Khazneh.jpg) |
| CP-PIC-59 | 世界の建物・名所 | 富士山と忠霊塔 | commons | CC BY-SA 4.0 | 両方 | 原本ページの表示内容と想定ライセンスが一致 | [原本](https://commons.wikimedia.org/wiki/File:Chureito_Pagoda_and_Mount_Fuji.jpg) |
| CP-PIC-60 | 世界の建物・名所 | 姫路城 | commons | CC0 1.0 | 両方 | 原本ページの表示内容と想定ライセンスが一致 | [原本](https://commons.wikimedia.org/wiki/File:Himeji_castle.jpg) |

## 確認した公式資料

- [文化庁: 著作物は創作的な「表現」が対象、単なるアイデアは対象外](https://www.bunka.go.jp/seisaku/bunka_gyosei/kibankyoka/faq/index.html)
- [Pexelsライセンス](https://www.pexels.com/ja-jp/license/)
- [The Met Open Accessについて](https://www.metmuseum.org/policies/frequently-asked-questions-image-and-data-resources)
- [Commons: Wikimedia外での再利用](https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia/ja)
- [Creative Commons BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.ja)
- [Creative Commons: CC素材のクレジット方法](https://creativecommons.org/reusing-cc-licensed-content/)
- [個人情報保護委員会: サイトに分かりやすく継続掲載](https://www.ppc.go.jp/all_faq_index/faq1-q7-27/)
- [特許庁: J-PlatPatで商標を調べる](https://www.jpo.go.jp/support/startup/shohyo_search.html)

## 実施前の確認事項

- [ ] CP-PIC-49の配布元・ライセンス問題を解消（差替え/除外を推奨）
- [ ] CP-PIC-57のExifと公開ライセンスの相違を再評価（代替画像ならより確実）
- [ ] Commons 30件の原本・著作者・ライセンスを再照合し表の各行を「照合済」にする
- [ ] Pexelsの採用写真22件およびPUZZLEのみの8件の原本が存在し、利用条件が妥当か確認
- [ ] The Met 10候補のOAフラグを再確認し非OA候補を除外
- [ ] 画像のクレジット一覧ページを作成。TASL（Title/Author/Source/License）、加工の明記、BY-SA素材を区別
- [ ] 利用者向けサイト情報ページを作成し、TOPフッター・画像ゲームから見つけられるようにする
- [ ] 「はしもとgame」名称のJ-PlatPat商標調査（同一＋類似読み）
- [ ] 元ネタに近い3ゲームの独自アート・動作の見た目比較
- [ ] 新人教育コンテンツなど、同じ公開リポジトリ内の情報公開範囲の再確認
- [ ] 画像をYouTubeサムネイル/動画に再掲載する場合のライセンス表示の確認

*本記録は技術的・一般的な権利チェックであり、弁護士の個別法律鑑定ではない。公開可否は未確認項目を解消してから判断する。*
