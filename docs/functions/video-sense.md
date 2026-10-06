# Video Sense

---

## 1. Overview

**Video Sense** analyzes the **video items** in your project and turns what it finds into markers you can work with. Select a video item, pick an analysis, click **Analyze** — the results land on your timeline as take markers, project markers or regions.

The first analysis available is **Shot Cuts**: it finds every hard cut in the picture, frame-accurately. Ambience changes, perspective shifts and edit points in a cinematic or gameplay capture almost always follow the cuts, so having them marked is a fast way to lay out a sound pass.

More analyses (action hits, foley moments) will join the same window later.

Everything runs **locally on your computer** with a small AI model. Nothing is uploaded.

---

## 2. How to Open

Search in the Action List:

| Action name | Purpose |
| --- | --- |
| **`mantrika : Video Sense - Analyze Video Items...`** | Open / close the Video Sense window |

---

## 3. Main Window Overview

| Area | Description |
| --- | --- |
| **Analysis** | Which analysis to run. Currently only `Shot Cuts`; `Actions` and `Foley` are placeholders for later versions |
| **Notice bar** | Appears only when something is missing (FFmpeg or the analysis model); **Set Up...** opens Preferences ▸ AI Runtime to fix it |
| **Selection** | How many video items are currently selected |
| **Sensitivity** | Higher finds more cuts, including subtle ones; lower keeps only obvious cuts. Default 70% |
| **Output** | Which kinds of markers to write (see §5) |
| **Analyze** | Analyze the selected video items and write the results |
| **Cancel / progress bar** | Progress of the current analysis; Cancel stops it |
| **Status** | Result summary, or why something failed |

---

## 4. Install FFmpeg {#install-ffmpeg}

Video Sense uses **FFmpeg** to read video files. FFmpeg isn't bundled with Mantrika Tools, but **Preferences ▸ AI Runtime** can install it for you in one click. You only need to do this once.

### Windows

When FFmpeg is missing, the notice bar in the Video Sense window has a **Set Up...** button that opens **Preferences ▸ AI Runtime**. Click **Install FFmpeg** there: a console window opens and installs FFmpeg 8.1.2 through **winget** (Windows' built-in package manager). When the console closes, Video Sense picks FFmpeg up automatically — no REAPER restart needed. Restart REAPER once if you also want REAPER itself to use this FFmpeg for GPU-accelerated video playback (see [REAPER 7.66+ Stop Letting Your GPU Sleep on the Job](../blog/reaper-gpu-video.md)).

**Which FFmpeg version, by REAPER version:**

| Your REAPER | FFmpeg to use | What Install FFmpeg does |
| --- | --- | --- |
| **Older than 7.80** | **8.x only** — keep it locked to 8.x | Installs 8.1.2 and **pins** it, so `winget upgrade --all` can't move it to 9.x |
| **7.80 or newer** | 8.x or 9.x | Installs 8.1.2 without a pin; you're free to upgrade to 9.x later |

REAPER older than 7.80 can't load FFmpeg 9.x. Video Sense itself works with either version, but on those REAPER versions 9.x silently turns off REAPER's own GPU video playback. 8.1.2 works with every REAPER version, which is why Install FFmpeg always uses it.

If you prefer to do it yourself, open PowerShell and run:

```
winget install Gyan.FFmpeg.Shared --version 8.1.2
```

On REAPER older than 7.80, also run:

```
winget pin add Gyan.FFmpeg.Shared
```

Then click **Detect Again** in Preferences ▸ AI Runtime.

### Mac

Open **Preferences ▸ AI Runtime** and click **Install FFmpeg**. It downloads FFmpeg (about 30 MB) into the Mantrika Tools folder; nothing else on your Mac is changed.

If the download fails, get the macOS arm64 **release** `ffmpeg.zip` from [ffmpeg.martin-riedl.de](https://ffmpeg.martin-riedl.de), unzip it, move `ffmpeg` to a folder you'll keep, and select it with **Choose ffmpeg...** in the same panel.

---

## 5. Output

Turn on any combination of the three outputs:

| Output | What you get |
| --- | --- |
| **Take markers** (default) | Markers named `Cut` inside the video item. They belong to the item, so they stay on the right frames when you move, trim or retime it |
| **Project markers** | `Cut 01`, `Cut 02`, ... on the project timeline |
| **Regions (one per shot)** | `Shot 01`, `Shot 02`, ... covering the video item, one region per shot |

- Numbering starts from 01 for **each video item**.
- Only the part of the video that is visible in the item is marked. If you trimmed the item, cuts outside it are skipped.

---

## 6. Adjusting the Result

After an analysis, the **Sensitivity** slider and the **Output** checkboxes work live on the items you just analyzed:

- **Drag the slider**: the status shows how many cuts you'll get. **Release** to update the markers in the project.
- **Tick or untick an output**: the project updates right away. Unticking an output removes the markers Video Sense wrote for it.
- Each update is one undo step (`Video Sense: Shot cuts`).

The analysis itself is not repeated — adjusting is instant. Analyzing the same video file again (for example a second item cut from the same file) is also instant.

### Re-running is safe

Video Sense remembers which markers it wrote. Running it again on the same item **replaces** its previous markers instead of adding a second set. **Markers you created yourself are never touched**, even if they are named `Cut`.

---

## 7. Accuracy and Limits

- Hard cuts are detected to the exact frame in our tests.
- **Very fast flashes** (an explosion filling the screen, a full-frame VFX burst) can occasionally be mistaken for a cut. Lower the sensitivity a little if that happens.
- **Dissolves / slow crossfades** between two dark shots may be missed.
- Not supported yet: **reversed** video items and items with **stretch markers** (they are skipped and reported in the window).
- Speed: roughly 300–400 video frames per second on a modern CPU — a 1-minute 60 fps video takes about 10–15 seconds. A notice appears before analyzing videos longer than 10 minutes in total.

---

## 8. Troubleshooting

| Symptom | What to do |
| --- | --- |
| Notice bar says FFmpeg is needed, but you installed it | Click **Detect Again** in Preferences ▸ AI Runtime, or point to it with **Choose ffmpeg...** |
| "FFmpeg could not read this video: ..." | The file format isn't supported by your FFmpeg, or the file is damaged. Try playing it in another player |
| No markers appear | Check that at least one Output is ticked, and that the item isn't trimmed to a section without cuts |
| Too many cuts in action-heavy shots | Lower the sensitivity |
| A subtle cut is missing | Raise the sensitivity |
