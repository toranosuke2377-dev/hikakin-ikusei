# 画像・動画素材の差し替え場所

アプリはイベントデータ内の `visual` キーから、このディレクトリ以下の素材を自動的に読み込みます。素材がまだ存在しない場合は、ゲーム内のデザインされたプレースホルダーが表示されます。

## 画像

画像形式は WebP です。

- 背景 `bg/dorm_room_2008` → `public/assets/bg/dorm_room_2008.webp`
- 立ち絵 `portrait/hikakin`、表情 `determined` → `public/assets/portrait/hikakin_determined.webp`
- イベントCG `cg/first_upload` → `public/assets/cg/first_upload.webp`
- タイトル画面 → `public/assets/ui/title_hero.webp`

## 動画

動画形式は MP4またはWebM、音声なし・ループ再生前提です。

- `video/viral_counter` → `public/assets/video/viral_counter.mp4`

## 推奨寸法

- 背景・イベントCG: 1920×1080以上、16:9
- 立ち絵: 1200×1800前後、背景透過
- 動画: 1920×1080または1280×720、H.264 MP4

ファイルを所定のパスへ置けば、コードの変更は不要です。最終的な全素材キーは `docs/asset-manifest.md` に出力します。
