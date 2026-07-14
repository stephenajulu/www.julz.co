# Google Antigravity Guide (ANTIGRAVITY.md)

This document maps out the specifications, CLI configurations, sandbox parameters, and pairing workflow rules when working with the Google Antigravity AI coding assistant in the JULZ codebase.

---

## 1. Environment & Workspace Context

* **Operating System:** Windows (PowerShell / pwsh).
* **Workspace Directory:** `C:\Users\ajulu\Desktop\PROJECTS\Dev PROJECTS\www.julz.co`
* **Remote Corpus Name:** `stephenajulu/www.julz.co`
* **Application Data Directory:** `C:\Users\ajulu\.gemini\antigravity-cli`
* **Conversation logs location:** `<appDataDir>\brain\<conversation-id>\.system_generated\logs\transcript.jsonl`

---

## 2. Compilation & Build Tasks

When working on assets or frontmatter changes, use these PowerShell commands directly. Do not use external packages or custom build files.

### Launch Local Development Server
To launch the Hugo development server with hot-reloading:
```powershell
hugo server -D
```
*Port:* Accessible at `http://localhost:1313/`
*Admin Panel:* Accessible at `http://localhost:1313/admin/`

### Clean & Recompile Assets
When SCSS compiles are not rendering or the asset pipeline requires a hard reset:
```powershell
Remove-Item -Path "resources/_gen" -Recurse -Force
Remove-Item -Path "public" -Recurse -Force
hugo
```

---

## 3. Pairing Workflow Guidelines

Antigravity operates on a collaborative, pair-programming model. To ensure high-quality, reliable output:

1. **Keep Responses Concise:** Do not output paragraphs of generic text. Let code and structured markdown files do the speaking.
2. **Clickable File Links:** In all chat messages, construct clickable, absolute file links using the `file://` scheme and forward slashes.
   * *Correct:* `[baseof.html](file:///C:/Users/ajulu/Desktop/PROJECTS/Dev%20PROJECTS/www.julz.co/layouts/_default/baseof.html)`
   * *Incorrect:* ``[`baseof.html`](/layouts/_default/baseof.html)``
3. **No Parallel File Edits:** Do not run parallel edit calls on the same file. Complete one operation before beginning the next.
4. **Clean Builds Check:** Proactively compile the site using `hugo` after editing layouts or stylesheet templates to guarantee builds are always green.
