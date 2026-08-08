# Change Log

All notable changes to **Mantrika Tools**, newest first.

---

## 1.04

*2026-08-01*

- **Render Queue**: Fixed an issue where the output path was displayed incorrectly in the UI after applying an item override.
- **macOS**: Fixed the global scroll wheel speed to keep it consistent with native system behavior.

---

## 1.03

*2026-07-30*

- **Render Queue**: Changed Stem rendering mode to use fast parallel rendering (*via master, fast*).
- **Render Queue**: Fixed a bug with the Task counter in Stem mode.
- **Render Queue**: Changed the default setting for FFmpeg HW video rendering to H.264 to ensure compatibility.
- **Mirror**: Fixed an API bug in the Adoptable Region workflow.
- **Create Folder Action**: Fixed a folder hierarchy bug occurring with multi-level nesting.

---

## 1.02

*2026-07-19*

- **Render Queue**: Added support for region-based stem rendering.
- **Render Queue**: Added FFmpeg GPU-accelerated video rendering.
- **Radial Menu**: The menu itself can now act as an executable item.
- **Solo Action**: Modified parameters to retain track Send information.
- **macOS**: Fixed mouse cursor offset issues.

---

## 1.01

*2026-07-05*

- **Project Manager**: Virtual Folder custom content can be reordered via Ctrl+drag. Newly added content is pinned to the top by default to start ordering.
- **Sample Broker**: Added a stereo waveform option.
- **ProScan**: Clicking an Item or Track now automatically centers the Arrange view.
- **Wwise Replace**: Added an **Auto-Hide Window** checkbox.
- **Create Folder Action**: Fixed an exception that occurred when Mirror was disabled.
- **macOS**: Comprehensive optimization.

---

## 1.00

*2026-07-03*

- Initial public release, served from our own distribution server.
