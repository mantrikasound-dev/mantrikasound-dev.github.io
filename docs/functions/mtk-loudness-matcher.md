# MTK Loudness Matcher

---

## 1. Overview

**MTK Loudness Matcher** is a standalone loudness tool for making sounds in a Wwise project sit at a consistent perceived volume. It listens in real time to whatever is playing on your computer (system output or an external input), measures **LUFS / RMS / True Peak**, and writes the result back to the matching Wwise Sound object’s **MakeUpGain / Volume / VolumeOffset** so an entire batch of sounds can be aligned to one target loudness.

**Two working modes:**

- **Fixed Target** — align every sound to a single fixed LUFS target (for example, -14 LUFS).
- **Reference** — align each sound in list B to the loudness of the matching row in list A (A is the reference; B follows A).

**Plus Voice Mode:** purpose-built for Wwise multilingual resources (`Voices/Chinese`, `Voices/English`, and so on). It writes to the **VolumeOffset** of the **AudioFileSource** for the current preview language only, keeping each language completely independent so you never overwrite another language’s volume by accident.

**Typical use cases:**

- Dozens of SFX in a project are uneven; you want them all at -14 LUFS.
- A batch of newly recorded voice lines needs to match the existing ones.
- A multilingual voice project needs each language aligned independently.

---

## 2. Opening the Tool

It is a **standalone windowed application** (not a REAPER plug-in). Just run the executable.

On launch it automatically reconnects to the audio device you last used and restores all previous settings (target value, mode, Criteria, export path, and so on).

---

## 3. Interface Overview

```
┌─────────────────────────────────────────────────────────────┐
│  Device: System Default | 48000 Hz | 480 samples   Pin  ☰  │  ← top status bar
├─────────────────────────────────────────────────────────────┤
│  ▮▮▮▮▮▮▮▮░░░░░░  -18.2  LUFS-S                              │
│  ▮▮▮▮▮░░░░░░░░░  -22.0  RMS                                 │  ← meter cards
│  ▮▮▮▮▮▮░░░░░░░░  -20.5  LUFS-M                              │
│  ▮▮▮▮▮▮▮░░░░░░░  -3.8   TP                                  │
│  -60  -48 -36 -24 -12  0  +3                                │
│                       LUFS-I       -16.3 LUFS               │  ← main display slot
│                         [ Reset ]                           │
├─────────────────────────────────────────────────────────────┤
│  Wwise (WAAPI)                           [ Connect ]        │
│  Connected: Wwise 2023.1.10                                 │
├─────────────────────────────────────────────────────────────┤
│  Mode: [Fixed Target ▾]            Adjust: [MakeUpGain ▾]   │  ← parameter card
│  Target LUFS: [-14.0] Tolerance:[0.5]  Max Duration:[30]    │
│  ─────────────────────────────────────────────────────      │
│  ☐ Voice Mode   ☑ Auto-Verify                                │
├─────────────────────────────────────────────────────────────┤
│  [Measure] ∞ [Match]    [Sync]    [Stop]                    │  ← action buttons
├─────────────────────────────────────────────────────────────┤
│              [ Fetch Selected ]                             │
│                                                             │
│   Sound_01            -12.0  -18.3  +4.3                    │
│   Sound_02             0.0   -14.1  +0.1                    │  ← object list
│   Sound_03            -6.0   -10.5  -3.5                    │
└─────────────────────────────────────────────────────────────┘
```

Five main areas:

| Area | Contents |
|---|---|
| **Top status bar** | Current audio device, Pin (always on top), ☰ (Audio Settings) |
| **Meter cards** | Real-time loudness meters; the main display slot shows the value selected by the current Criteria |
| **WAAPI section** | Wwise connection status and Connect/Disconnect button |
| **Parameter card** | Mode selection, target value, tolerance, capture duration, Voice Mode, Auto-Verify |
| **Actions + list** | Measure/Match/Sync/Stop + the list of Wwise objects fetched into the tool |

---

## 4. Top: Device & Meter

### 4.1 Audio Settings (☰ button)

Click **☰** to open the audio settings popup:

| Option | Purpose |
|---|---|
| **Driver Type** | Choose the driver protocol (Windows Audio / WASAPI / ASIO …) |
| **Device** | Choose the capture device. `[Out] System Default` **captures system output** (loopback; most common); other `[Out] xxx` entries capture the loopback of a specific output device; `[In] xxx` is a physical input |
| **Input** | Choose the input channel pair (stereo pair) |
| **Match Criteria** | **Core setting**: which loudness value is used as the matching reference (see §4.3) |
| ☑ **Export CSV Report after Match** | After each Match, ask whether to export a report |
| **Browse...** | Choose a custom CSV export directory (blank = desktop) |

> 💡 **Recommended setup**: set **Device** to `[Out] System Default`. That way the tool follows whatever headphones or speakers are currently active, no matter how often you switch devices.

### 4.2 Meter Cards

The meter area shows **five readings**:

| Display | Meaning |
|---|---|
| **LUFS-I** | Integrated loudness since the last Reset (EBU R128 with gating) |
| **LUFS-S** | Short-term loudness, 3-second sliding window |
| **LUFS-M** | Momentary loudness, 400 ms sliding window |
| **RMS** | Averaged RMS level across channels |
| **TP** | True Peak (4× oversampled) |

Four horizontal bars plus the bottom **main display slot**. The main display slot shows **whichever Criteria is currently selected** — it pulls that value out of the bar row and shows it larger below.

> 💡 The number on the right of each bar is a max-hold (the highest value since the last Reset), and the number in the main display slot is also a max-hold.

**Reset button** — zeros all max-hold values and the LUFS-I accumulation.

**Auto-Reset**: once connected to Wwise, the meter automatically resets whenever the Wwise transport goes from Stop to Play, so pressing Play in Wwise always starts a fresh measurement.

### 4.3 Match Criteria (Loudness Matching Reference)

In the Audio Settings (☰) popup, the **Match Criteria** dropdown decides which “hearing dimension” the tool uses as the alignment reference:

| Criteria | Technical definition | Best suited for |
|---|---|---|
| **LUFS-M (Momentary Max)** | The peak acoustic energy captured within a 400 ms window. | Short, transient-heavy sounds (UI beeps, gunshots, impact feedback). |
| **LUFS-S (Short-term Max)** | The peak energy captured within a 3-second sliding window. | Medium-length dynamic sounds (skill combos, non-continuous ambient one-shots). |
| **LUFS-I (Integrated)** | The average perceived loudness across the whole playback period. | Long continuous clips (multilingual voice lines, music, linear cutscenes). |
| **RMS (Average)** | A purely physical RMS energy calculation, independent of the ear’s loudness curve. | Sustained looping sounds (engine loops, machinery drones, ambient beds). |

> 💡 The choice affects both the value shown in the “Measured LUFS” column and the value used for matching. Previously measured data is **not lost** when you switch — the tool simply picks the corresponding value for display and calculation.

---

## 5. WAAPI Connection

The WAAPI section is a single row:

- **Connect** — connect to Wwise running on this machine (defaults to `127.0.0.1:8080`; Wwise must have WAAPI enabled).
- **Disconnect** — close the connection.

When connected, the Wwise version is shown in the top-right of this area; when disconnected, all Wwise-related buttons are grayed out.

---

## 6. Parameter Card

The parameter card has three tiers.

### 6.1 Tier 1: Mode + Destination Property

| Control | Options |
|---|---|
| **Mode** | `Fixed Target` or `Reference` |
| **Adjust** | `MakeUpGain` or `Volume` (normal mode); in Voice Mode this is forced to `VolumeOffset` and cannot be changed |

> 💡 **MakeUpGain vs Volume**: MakeUpGain is the Sound object’s output-gain slot designed for loudness compensation and does not affect the fader. Volume is the Sound’s main fader. We generally recommend **MakeUpGain** because it stays independent of your mixing decisions.

### 6.2 Tier 2: Numeric Parameters

| Control | Meaning |
|---|---|
| **Target LUFS** | The target loudness value (only visible in Fixed Target mode; in Reference mode it is read automatically from list A) |
| **Tolerance** | Tolerance in dB. Objects whose measured value is already within this distance of the target are **skipped**, preventing pointless tiny adjustments and false verification failures. |
| **Max Duration (s)** | Maximum measurement duration per object. Wwise stops early when playback ends; this is a safety limit. |

> 💡 **Recommended Tolerance: 0.3 – 1.0 dB**. Too strict and the tool will keep rewriting for a 0.1 dB difference.

### 6.3 Tier 3: Global Toggles

| Toggle | Behavior |
|---|---|
| ☑ **Voice Mode** | Enables Wwise multilingual mode (see §10). |
| ☑ **Auto-Verify** | After Match, **re-measure once** to confirm the values landed correctly. Rows that still exceed the tolerance are marked with `[!]` in red, and the status bar reports `VERIFY FAILED`. |

> 💡 **When Auto-Verify fails**: this usually happens because the target Sound is routed through a chain with a limiter, compressor, or bus effect that “eats” the gain you wrote. This is an **intentional warning** — it tells you that adjusting gain on this Sound alone is not enough; the downstream chain needs attention.

---

## 7. Action Buttons

| Button | Behavior |
|---|---|
| **Measure** | Tells Wwise to play the selected objects while the tool listens and records their loudness. **Nothing selected = measure all** (a confirmation dialog appears first). |
| **∞ (Link)** | Toggles “measure then match.” When lit, **Measure automatically runs Match afterward** — one click end-to-end. |
| **Match** | Writes the measured difference back to Wwise (MakeUpGain / Volume / VolumeOffset). **Nothing selected = match all**. |
| **Sync** | Reads the **current** property values from Wwise (useful if you moved a fader manually in Wwise). See §8.1. |
| **Stop** | Interrupts the current Measure/Match task. |

### 7.1 Color Meanings

| Color | Meaning |
|---|---|
| Blue | Measure action |
| Green | Match (write) action |
| Red | Stop / interrupt |
| Gray | Sync read action (non-destructive) |
| Cyan | ∞ chain (Measure → Match) |

---

## 8. Object List

In both Fixed Target and Reference modes, every row looks like this:

```
Sound_Name [Current] [Measured LUFS] [Delta]
```

| Column | Meaning |
|---|---|
| **Name** | Wwise Sound object name; `[!]` at the start = verification failed; green = already matched |
| **Current** | Current MakeUpGain / Volume / VolumeOffset value in Wwise (dB) |
| **Measured LUFS** | Loudness measured during the last Measure. `---` = not measured yet |
| **Delta** | Difference that needs to be written. Shown only when not yet matched: yellow = +, blue = −, gray = ≈0 |

### 8.1 Sync: Fader Link

Pressing **Sync** does two things:

1. Re-reads the current property values (MakeUpGain / Volume) from Wwise for all listed objects.
2. If a value changed (for example, you nudged a Sound by +3 dB in Wwise), the tool **automatically shifts that row’s “Measured LUFS” by the same +3 dB**.

The logic is simple: **if the Wwise fader moved by N dB, the Sound now actually plays N dB louder or softer** — so the predicted value in the list is shifted by the same amount, saving you from re-measuring.

> 💡 Sync also clears the green “matched” markers — once you have adjusted something manually, the previous Match state is no longer trustworthy.
>
> ⚠️ This is a **linear mathematical shift**, not a real re-measurement. If the Sound passes through a **non-linear** chain such as a limiter or compressor, the prediction may drift from reality. In that case, re-measure directly.

### 8.2 Right-Click Menu

**Fixed Target list:**

| Menu | Behavior |
|---|---|
| **Delete Selected** | Remove from the list (does not affect Wwise) |

**Reference list (A or B):**

| Menu | Behavior |
|---|---|
| **Remove** | Remove this row from the current side (remaining rows shift up); the other side stays put and `[Empty]` is appended at the bottom to keep rows aligned |
| **Insert Empty Above** | Insert an `[Empty]` placeholder above the current row (for manual pairing adjustments) |
| **Delete Pair (A & B)** | Delete the whole row — both A and B disappear |

### 8.3 Keyboard Delete

With rows selected in the list, pressing **Delete** or **Backspace** behaves like **Remove** (single-side deletion).

---

## 9. Workflows for the Two Modes

### 9.1 Fixed Target Mode

Align every sound to a fixed value (for example, -14 LUFS).

```
1. Mode = Fixed Target
2. Target LUFS = -14
3. Adjust = MakeUpGain
4. In Wwise, select the Sounds you want to align → click Fetch Selected
5. Select no rows → click Measure → confirm → OK
 (the tool tells Wwise to play each object and measures it)
6. After Measure, every row shows its LUFS and Delta
7. Click Match → all deltas are written back at once
 (Auto-Verify is on by default and will re-measure)
8. Check the status bar: “Matched: 12 ok, 0 failed | 1 VERIFY FAILED”
 → rows with [!] are stuck behind downstream effects and need individual attention
```

**Shortcut**: turn on the **∞** button, then step 5 produces the final result automatically — Measure runs and then Match follows.

### 9.2 Reference Mode: One-to-One Alignment

Align each sound in list B to the loudness of the matching row in list A.

```
1. Mode = Reference
2. In Wwise, select the “reference” sounds → click Fetch A
3. In Wwise, select the “sounds to adjust” → click Fetch B
4. Lists A and B are now shown in two stacked panes
5. (Optional) click Auto Align → the tool pairs rows by name similarity
6. (Optional) drag rows or Insert Empty to fine-tune the pairing
7. Click Measure → A and B are measured together
8. Click Match → B is written so it matches the corresponding A
```

The auto-alignment logic parses text structure and numeric indices in the asset names to make fuzzy pairings. If the two groups are named very differently, the tool treats them as unmatchable and leaves those rows empty so you can adjust them manually.

### 9.3 Lock A Button

Above list A is an **A (Reference) [Unlocked]** button. When lit it becomes **[LOCKED]** and the list background turns pink.

While locked, list A is **completely frozen** — no dragging, deleting, Insert Empty, or Auto Align can touch it.

> 💡 Use this when A is your golden reference and must not change; only B should adapt.

### 9.4 CSV Pairing Template

**Export CSV** — exports the current A/B pairing to a CSV with two columns: `Reference Path` and `Target Path`. You can edit pairings in Excel.

**Import CSV Map** — loads the edited CSV back. The tool looks up the objects by path in the current A and B lists and re-aligns them. Missing objects appear as `[Missing] xxx` (red text at the start of the row).

**`[Empty]` is a valid value in the CSV** — it means “this row is intentionally blank” and will be restored as a blank row on import.

> ⚠️ Import will fail if the CSV is still open in Excel. **Close Excel first.**

### 9.5 Synchronized Scrolling

In Reference mode, lists A and B scroll together — dragging one scrolls the other.

### 9.6 Drag to Reorder

List rows support mouse dragging:

| Operation | Behavior |
|---|---|
| **Left-drag** | Move to the target position (other rows make room) |
| **Alt + drag** | Copy to the target position (original row stays) |

While dragging, a **yellow horizontal line** shows where the row will land when released.

---

## 10. Voice Mode (Multilingual Voice)

Voice Mode is designed for Wwise **Voices** folder structures:

```
Voices/
 Chinese/ ← Chinese voice wav files
 English/ ← English voice wav files
 Japanese/ ← Japanese voice wav files
```

In **normal mode**, the tool writes to the Sound object’s **MakeUpGain / Volume** — which affects **all languages**.

In **Voice Mode**, the tool writes to the **AudioFileSource** object’s **VolumeOffset** — which affects **only the current Wwise preview language**.

### 10.1 Enabling Voice Mode

1. Check ☑ **Voice Mode**.
2. **Adjust** automatically locks to `VolumeOffset`.
3. A **Language: Chinese** indicator appears on the right side of the parameter card and tracks the current Wwise language in real time.
4. Fetch / Measure / Match work the same as in normal mode.

### 10.2 Voice Mode Notes

- The **Language** display shows Wwise’s current preview language — if you switch Reference Language in Wwise, this follows automatically.
- If the current language is `SFX`, `Mixed`, or `External`, Match will **refuse to run** and show a warning.
- The **Sync** button is disabled in Voice Mode (VolumeOffset belongs to the source layer, not the Sound object layer).
- Resources for the same Sound in different languages are **independent** — switching languages and measuring again is essentially measuring a different set of wav files.
- After Fetch, each Sound is expanded into the AudioFileSource for the current language; Sounds with no resource for that language are skipped.

---

## 11. Status Bar Colors

The WAAPI status bar (the line below Connect) gives real-time feedback:

| Color | Meaning |
|---|---|
| Gray | Idle / informational message |
| Blue | Working (Measuring / Matching) |
| Purple | Re-measuring during Verify |
| Green | Completed successfully |
| Yellow | Interrupted by the user |
| Red | Failure / error / Verify failed |

---

## 12. CSV Report Export

After enabling **Export CSV Report after Match** in Audio Settings, the tool asks whether to export a report every time Match completes.

**Fixed Target report fields**: Name, Path, LUFS-I, Target, Delta, Old Value, New Value

**Reference report fields**: Pair, Role (Reference/Target), Name, Path, LUFS-I, Target, Delta, Old Value, New Value

Report file name: `LoudnessReport_2026-05-23_143052.csv`. Storage location: the directory set in Audio Settings (desktop by default).

---

## 13. Typical Workflows

### Workflow A: Batch SFX to -14 LUFS

```
1. Connect to Wwise
2. Mode = Fixed Target, Target = -14, Tolerance = 0.5
3. In Wwise, select the SFX to process → Fetch Selected
4. Turn on ∞ → click Measure → wait
5. All rows green = done. Check for any [!] rows and handle Verify failures
```

### Workflow B: Align New Voice Lines to Old Ones

```
1. Mode = Reference
2. In Wwise, select the “old” reference set → Fetch A
3. In Wwise, select the “new” target set → Fetch B
4. Click Auto Align → review the pairings
5. Drag / right-click Insert Empty to fix mismatches
6. Lock A (prevents accidental changes to A)
7. Measure → Match
```

### Workflow C: Align Chinese Voice Lines to -16 LUFS Without Touching Other Languages

```
1. In Wwise, switch Reference Language → Chinese
2. Check ☑ Voice Mode → confirm “Language: Chinese”
3. Mode = Fixed Target, Target = -16
4. In Wwise, select the voice Sounds → Fetch Selected
5. Measure → Match
 → Only the Chinese VolumeOffset is written; English/Japanese resources are untouched
```

### Workflow D: A/B Test Different Target Values

```
1. Measure once, then Match with Target = -14
2. Listen — too loud
3. Click Sync (read current Wwise values back)
4. Change Target to -16
5. The Delta values in the list are recalculated automatically
6. Match again → writes the new deltas
```

### Workflow E: You Manually Moved a Wwise Fader and Want to Re-match

```
1. In Wwise, you manually raised Sound_03 by +3 dB
2. Return to the tool and click Sync
 → Sound_03’s “Current” value updates to the new value
 → “Measured LUFS” is shifted by +3 dB
 → green Match markers are cleared (it is no longer aligned)
3. Click Match → the tool recalculates and writes based on the new baseline
```

---

## 14. Notes

### 14.1 Measure Really Does “Listen”

The tool does not read Wwise’s internal analysis; it listens to the audio device in real time. Therefore:

- You must **actually hear the sound** for the tool to measure it — check that headphones are plugged into the right jack and the system is not muted.
- Any system-level processing (EQ, system volume, and so on) is measured too. **Turn it off**, and keep **system volume at 100%**.
- `[Out] System Default` is the safest choice because it follows the active system output device.

### 14.2 Auto-Verify Is Just a Second Listen

Auto-Verify is simple: after Match, the tool **plays the Sounds again and re-measures** to see whether the real loudness reached the target. Rows that still exceed the tolerance are marked with `[!]`.

**Common reasons a row fails Verify:**

- A downstream limiter / compressor / bus effect is eating the gain you wrote.
- The dynamic range is very large and a single measurement is slightly unstable.
- The tolerance is set too tight.

`[!]` simply warns you “this one did not land on target.” It **does not mean the write failed** — the value has already been written to Wwise. You decide whether to leave it, adjust the downstream chain, or widen the tolerance.

### 14.3 Don’t Set Tolerance Too Small

Setting **0.0 dB** means the tool will rewrite on almost every run. **0.3 – 1.0 dB** is recommended, matching real-world loudness resolution.

### 14.4 Reference Mode Auto-Pads Mismatched Row Counts

If lists A and B have different lengths, the shorter side is padded with `[Empty]` placeholders at the bottom. Empty rows take no part in pairing or measurement; they are visual spacers only.

### 14.5 Voice Mode Adjust Lock Is by Design

VolumeOffset is the only per-source compensation slot on an AudioFileSource. Normal-mode MakeUpGain / Volume sit at the Sound level and affect every language. Therefore Voice Mode forces VolumeOffset so other languages are never affected.

### 14.6 Sync Clears Green Match Markers

When you run Sync, the tool assumes you have **already adjusted something manually in Wwise**. The previous Match is no longer guaranteed to be perfect, so the green markers are removed and the row returns to a “waiting to match” state.

### 14.7 Tolerance Skip Logic in ∞ Chain Mode

When Measure automatically runs Match, objects whose delta is smaller than Tolerance are **skipped** — this is not a failure. The status bar reports how many were skipped.

### 14.8 Lock A Really Does Block Everything

While locked, even pressing Delete on an A row is blocked with an “Action Blocked” message. This protects a precious reference list from accidental destruction.

---

## 15. Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| Meter shows no reaction | Wrong device / system output is on another device | Open Audio Settings and choose `[Out] System Default` |
| Meter stays `---` | Wwise is not playing / device has no output | Press Play in Wwise to audition |
| LUFS = -inf / extremely low after Measure | Wwise did not actually play / volume is too low | Check Wwise audition volume and confirm system volume is not 0 |
| Match does not write / status reports 0 ok | Tolerance is too large, all deltas are considered “close enough” | Lower Tolerance |
| Auto-Verify keeps failing | Downstream limiter is eating the gain | Check the Master bus and insert effect chain |
| Green Match markers disappear after Sync | Expected behavior | Re-match as needed |
| Voice Mode says “invalid language” | Current Wwise preview language is SFX / Mixed / External | Switch Wwise to a specific language |
| Some Sounds missing after Voice Mode Fetch | Those Sounds have no AudioFileSource for the current language | Normal — the tool skips them |
| Import CSV fails | CSV is still open in Excel | Close Excel and retry |
| Auto Align pairs incorrectly | Names are too different or similarity is low | Drag rows / Insert Empty to fine-tune |
| Cannot connect to Wwise | Wwise is not running / WAAPI port is occupied | Make sure Wwise is started and WAAPI is enabled; check for multiple Wwise instances |
| Fetch shows no objects after switching Wwise projects | WAAPI connection is still tied to the old project | Disconnect → Connect again |
| List rows are gone | They were deleted with the Delete key | Re-fetch them |
| Reference mode B list errors “missing A reference” | The corresponding A row was not measured | Measure A first, or measure both sides together |
| Still running after pressing Stop | The tool is finishing data transfer with Wwise; or the connection is still tied to the old Wwise project | Wait a moment; if it persists, Disconnect → Connect again |
