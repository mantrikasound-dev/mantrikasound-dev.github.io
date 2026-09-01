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

   ```
   https://dl.mantrikasound.com/index.xml
   ```

4. Click **OK**.
5. Restart REAPER.

---

## 3. Install via Terminal

1. **Close REAPER** (Windows users only — this is not required on macOS).
2. Open a terminal and run the one-line installer for your OS:

   **macOS**

   ```bash
   curl -fsSL https://dl.mantrikasound.com/install-mac.sh | bash
   ```

   **Windows** — paste this into Command Prompt (cmd), PowerShell, or the Win+R Run box:

   ```powershell
   powershell -c "irm https://dl.mantrikasound.com/install-win.ps1 | iex"
   ```

3. Restart REAPER.

---

## 4. Manual install

1. Extract the ZIP anywhere.
2. Move `reaper_MantrikaTools-x64.dll` (or `reaper_MantrikaTools-arm64.dll`) and the `MantrikaTools Config` folder into your REAPER `UserPlugins` folder.
3. Restart REAPER.

---

## 5. Windows: "not designed to run on Windows" (error 0xc0e90002)

On Windows 11, REAPER may fail to load the extension and Windows may show:

> `reaper_MantrikaTools-x64.dll` is not designed to run on Windows or it contains an error. Try installing the program again using the original installation media, or contact your system administrator or the software vendor for support. Error status 0xc0e90002

Nothing is wrong with the download. This is **Smart App Control**, a Windows 11 security feature, refusing to load the DLL. Smart App Control only allows binaries whose code signature Microsoft already recognises, and it ships in "evaluation mode" and can switch itself to enforcing at any time — so an extension that worked yesterday can be blocked today, with no action on your part.

**Confirm it.** Run this in Command Prompt or PowerShell:

```
reg query "HKLM\SYSTEM\CurrentControlSet\Control\CI\Policy" /v VerifiedAndReputablePolicyState
```

A value of `0x1` means Smart App Control is enforcing. You can see the block itself in Event Viewer, under **Applications and Services Logs → Microsoft → Windows → CodeIntegrity → Operational**: look for events 3077 and 3033 naming `reaper.exe` and `reaper_MantrikaTools-x64.dll`.

**Fix it.** Open **Windows Security → App & browser control → Smart App Control settings** and set it to **Off**, then restart REAPER.

::: warning
Turning Smart App Control off is permanent. Windows only lets you switch it back on by reinstalling the operating system. This is Microsoft's design and nothing Mantrika Tools can work around.
:::

---

## 6. Updating

How you update depends on how you installed Mantrika Tools:

1. If you installed manually, go to the REAPER menu **Extensions → Mantrika Tools → Mantrika Options → Check for updates...**, then click **Update Now**.
2. If you installed via ReaPack, update through ReaPack. You can still use **Check for updates...** as well.

---

## 7. Uninstalling

- Delete the main DLL: `\REAPER\UserPlugins\reaper_MantrikaTools-x64.dll`
- Delete the whole config folder: `\REAPER\UserPlugins\MantrikaTools Config`

---

## 8. Folder overview

- `MantrikaTools Config`: All configuration files. They are human-readable JSON, so you can edit them directly, but that is usually not recommended.
- `MantrikaTools Config\resource`: Contains two CLAP plugins that Mantrika Tools needs. These are updated together with the extension.

---
