# Jessi Tsai — Portfolio

互動體驗開發者作品集。純靜態網站（HTML / CSS / vanilla JS），無建置步驟、零相依。
主題：Frozen Mist（生成式霧氣 canvas + 捲動穿越進場）。

## 本機預覽

```bash
python -m http.server 8000
# 開 http://localhost:8000/
```

或直接用瀏覽器開 `index.html`。

## 檔案

- `index.html` — 內容與區塊
- `styles.css` — 設計 tokens、版面、RWD
- `mist.js` — 生成式霧氣背景
- `script.js` — 導覽、手機選單、捲動進場
- `images/` — 專案縮圖（見 `images/README.md`）

## 部署到 GitHub Pages（user site）

規劃使用 user site repo `jessi0109.github.io`，上線網址會是 `https://jessi0109.github.io/`。

1. 在 GitHub 建立 **Public** repo，名稱 `jessi0109.github.io`（先不要加 README）。
2. 在本資料夾推送：
   ```bash
   git remote add origin https://github.com/Jessi0109/jessi0109.github.io.git
   git branch -M main
   git push -u origin main
   ```
3. repo → Settings → Pages → Source 選 `Deploy from a branch` → `main` / `root` → Save。
4. 幾分鐘後上線：`https://jessi0109.github.io/`。

> 已用 `gh` 登入 Jessi0109 的話，可一鍵完成：
> ```bash
> gh repo create jessi0109.github.io --public --source=. --remote=origin --push
> ```
> 推送後到 Settings → Pages 確認 Source 為 `main` / `root`。
