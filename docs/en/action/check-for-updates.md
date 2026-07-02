# Check for Updates

Check whether a newer version of Mantrika Tools is available. When triggered, a small window pops up showing the **current version** and the **latest online version**; if an update is available, it can be downloaded and installed with one click.

---

## How to use

1. Trigger this Action → a window opens, first showing **"Checking for updates..."**
2. After a few seconds, once the online check finishes, the window displays the result:

| Display | Meaning | What you can do |
|---|---|---|
| **You're up to date** | Already on the latest version | Click **Reinstall** to reinstall the current version |
| **New version available!** | A newer version exists | Click **Update Now** to download and install it |
| **Update failed. Please try again.** | Network or check failure | Click **Retry** to try again |

The window also shows the **changelog** (what changed in this version) and a **View on GitHub** link that opens the release page.

---

## One-click update flow

After clicking **Update Now** (or **Reinstall**):

1. The button changes to **"Downloading..."** and a progress bar appears below.
2. The new version and its companion resource files are automatically downloaded and put in place.
3. When finished, a message appears: **"Update ready! Restart REAPER to apply."**
4. **Restart REAPER** for the update to take effect.

---

## Notes

- Both checking and downloading **require an internet connection**.
- The update **does not take effect immediately after download; you must restart REAPER**.
- The top of the window always shows `Current: current version | Latest: latest version` for quick comparison.
- The window can be opened and closed repeatedly; triggering the Action again will recheck.
