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

## 部署到 GitHub Pages

1. 在 GitHub 建立 repo（例如 `portfolio`）。
2. 推送：
   ```bash
   git remote add origin https://github.com/<帳號>/portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. repo → Settings → Pages → Source 選 `Deploy from a branch` → `main` / `root` → Save。
4. 幾分鐘後上線：`https://<帳號>.github.io/portfolio/`。
