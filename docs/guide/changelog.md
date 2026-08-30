# Change Log

All notable changes to **Mantrika Tools**, newest first.

---

## 1.08

2026-08-31

- **Render Queue**: Switched the video parameter adjustment UI to a text input box mode to accommodate more diverse resolution settings.
- **Project Manager**: Restricted drag-and-drop operations to the left mouse button only; refined dialog box copy.
- **Segment Switch**: Fixed audio noise/artifact spill issues when playrate is not equal to 1; optimized performance for items sharing the same source.

---

## 1.07

2026-08-28

- **Render Queue**: Added two 9:16 vertical video export options.
- **Render Queue**: Improved List visual styling when Queue Bar is disabled, and added prompt text for empty Regions in Matrix mode.

---

## 1.06

2026-08-16

- **ProScan**: Added support for jumping to Regions and Markers.
- **ProScan**: Added support for renaming all items in the list (Shortcut: F2).
- **Subproject**: Added two new actions: delete and rename subprojects (available in the Extension menu).
- **HunDun**: Updated model.

---

## 1.05

2026-08-09

- **AI Runtime**: Added self-developed local inference model "hundun-seg.onnx", supporting various Audio Segment-related features within the plugin.
- **Segment Switch**: Added local inference engine support, allowing switching between DSP and ML engines in Preferences.
- **Preference**: Added AI Runtime page to configure and manage AI-related resources.
- **Adaptive Region**: Fixed a bug where the Mute state of a Child Folder would not trigger Region recalculation.
- **Radial Menu**: Fixed text box bugs, increased the sector limit to 12, and removed language restrictions during configuration.

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
