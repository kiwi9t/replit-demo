// Study Session Sign-up: a tiny demo app for practicing
// "build in VS Code, check in Replit".
// No database: sign-ups live in memory and disappear when the app restarts.
// No packages to install: it uses only what comes with Node.js.

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const signups = []; // each item looks like { name: "...", topic: "..." }

// Turn characters like < and > into safe text before showing them on the page.
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Fill the page template with the current list and an optional message.
function renderPage(message, kind) {
  const template = fs.readFileSync(path.join(__dirname, "public", "index.html"), "utf8");
  const rows = signups.length
    ? signups.map((s) => `<li><strong>${escapeHtml(s.name)}</strong><span>${escapeHtml(s.topic)}</span></li>`).join("")
    : `<li class="empty">No one has signed up yet. Be the first.</li>`;
  const note = message ? `<p class="note ${kind}" role="status">${escapeHtml(message)}</p>` : "";
  return template.replace("{{NOTE}}", note).replace("{{SIGNUPS}}", rows).replace("{{COUNT}}", String(signups.length));
}

function send(res, status, html) {
  res.writeHead(status, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}

function handleSignup(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    try {
      const form = new URLSearchParams(body);
      const name = form.get("name").trim();
      const topic = (form.get("topic") || "").trim();

      if (name === "" || topic === "") {
        console.log("Rejected a sign-up: a field was empty.");
        send(res, 400, renderPage("Fill in both your name and a topic, then select Sign up.", "error"));
        return;
      }

      signups.push({ name, topic });
      // Log what happened, but not the person's name: logs are not a place for personal data.
      console.log(`Saved sign-up #${signups.length} (topic: ${topic})`);
      send(res, 200, renderPage("You are signed up. See you at the session.", "ok"));
    } catch (err) {
      // The visitor gets a short message; the details go to the log for the developer.
      console.error("Sign-up failed:", err);
      send(res, 500, renderPage("Something went wrong on our side, and your sign-up was not saved.", "error"));
    }
  });
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  if (req.method === "GET" && req.url === "/") {
    send(res, 200, renderPage("", ""));
  } else if (req.method === "POST" && req.url === "/signup") {
    handleSignup(req, res);
  } else {
    send(res, 404, renderPage("That page does not exist. Use the form below.", "error"));
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Study Session Sign-up is running on port ${PORT}`);
});
