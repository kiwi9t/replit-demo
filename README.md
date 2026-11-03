# Study Session Sign-up (demo)

A tiny web app for practicing one workflow: **write code in VS Code, check it in Replit.**
It has a form, a list, and a log. It has no database and no packages to install.

> This repo contains **one intentional bug** for a debugging demo. Try the form and see what happens.
> All data in this demo is made up. Do not type real people's information into it.

## Run it in VS Code

1. Install Node.js 18 or newer from nodejs.org. Check it in a terminal: `node --version`
2. In VS Code, open this folder, then open a terminal: **Terminal → New Terminal**.
3. Start the app:

   ```
   npm start
   ```

4. Open http://localhost:3000 in your browser.
5. Stop the app with **Ctrl+C** in the terminal.

## Check it in Replit

1. Make sure your latest work is pushed to GitHub.
2. Import this repo into Replit (public repo: open `https://replit.com/github.com/<owner>/<repo>`).
3. Press **Run**. If Replit asks for a run command, use `npm start`.
4. Use the app in the **Preview** panel. Read what the app printed in the **Console** panel.

## What the app prints (the log)

Every request and every sign-up is logged, for example:

```
GET /
Saved sign-up #1 (topic: Git branches)
```

The log never includes the person's name. Logs are not a place for personal data.

## Files

| File | What it does |
|---|---|
| `server.js` | The server: shows the page, saves sign-ups in memory, writes the log |
| `public/index.html` | The page and the form |
| `package.json` | Tells Node and Replit how to start the app (`npm start`) |
