# Quick Start

---

## 1. What is Mantrika Tools?

**Mantrika Tools** is an extension for REAPER workflows. It is fully self-contained: it does not depend on any other extension, library, or script.

There are three ways to install it:

- Via ReaPack
- Via the quick-install package
- Manual install

---

## 2. Install via ReaPack

1. Open ReaPack.
2. Choose **Import repositories**.
3. Paste the ReaPack link:

   ```URL
   https://raw.githubusercontent.com/mantrikasound-dev/mantrikatools-release/master/index.xml
   ```

4. Click **OK**.
5. Restart REAPER.

---

## 3. Install via the quick-install package

1. Extract the ZIP anywhere.
2. Double-click `Mantrika install-win x64.bat` or `Mantrika install-arm64.sh`.
3. Restart REAPER.

---

## 4. Manual install

1. Extract the ZIP anywhere.
2. Move `reaper_MantrikaTools-x64.dll` (or `reaper_MantrikaTools-arm64.dll`) and the `MantrikaTools Config` folder into your REAPER `UserPlugins` folder.
3. Restart REAPER.

---

## 5. Updating

How you update depends on how you installed Mantrika Tools:

1. If you installed manually, go to the REAPER menu **Extensions → Mantrika Tools → Mantrika Options → Check for updates...**, then click **Update Now**.
2. If you installed via ReaPack, update through ReaPack. You can still use **Check for updates...** as well.

---

## 6. Uninstalling

- Delete the main DLL: `\REAPER\UserPlugins\reaper_MantrikaTools-x64.dll`
- Delete the whole config folder: `\REAPER\UserPlugins\MantrikaTools Config`

---

## 7. Folder overview

- `MantrikaTools Config`: All configuration files. They are human-readable JSON, so you can edit them directly, but that is usually not recommended.
- `MantrikaTools Config\resource`: Contains two CLAP plugins that Mantrika Tools needs. These are updated together with the extension.

---
