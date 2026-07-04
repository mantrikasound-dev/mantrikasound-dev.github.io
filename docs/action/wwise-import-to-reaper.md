# Wwise - Import Selected WAV to REAPER

> Windows only · Requires Wwise to be running

One-click import of the source WAVs corresponding to objects selected in the **Wwise Project Explorer** onto the current REAPER track.

---

## How to Use

```
1. In Wwise, select the objects to import (Sound / Container / Folder / Work Unit all work)
2. In REAPER, select a target Track and place the cursor at the desired insertion time
3. Execute the Action: Wwise - Import Selected WAV to REAPER
```

The tool will automatically:

- Insert WAVs into the current track **in the order they appear in the Wwise Project Explorer**
- Arrange them from the cursor position, with **0.5 seconds** of space between each Item
- Recursively pull all Sounds from container objects (ActorMixer / RandomSequence / SwitchContainer / BlendContainer / Folder / WorkUnit)

---

## Where Files Are Stored

Copied to a folder under the **current REAPER project directory**:

```
<your-rpp-directory>/ImportFromWwise/<today's-date>/
```

Example: `MyProject/ImportFromWwise/2026-05-24/Swain_Q.wav`

**Why copy**: Wwise Originals are project-delivery assets; linking them directly risks modifying the originals. Copying to the REAPER project side means changes only affect the copies.

---

## Smart Duplicate Detection

When importing the same batch of WAVs repeatedly:

- **Files are completely identical** (size + modification time match) → **skip copying** and reuse the existing file on disk.
- **Files differ** (the source in Wwise has been updated) → automatically append a suffix to avoid overwriting: `Swain_Q.wav` → `Swain_Q_1.wav` → `Swain_Q_2.wav` ...

This prevents duplicate files from multiple imports of the same batch, while also ensuring updated versions in Wwise are not hidden by old copies.

---

## Prerequisites

| Requirement | What happens if not met |
|---|---|
| Wwise is running with WAAPI enabled | Dialog: "Cannot connect to Wwise" |
| At least one object is selected in Wwise | Dialog: "No objects selected in Wwise" |
| REAPER project has been saved (rpp exists on disk) | Dialog: "Please SAVE the Reaper project first!" |
| A Track is selected in REAPER | Dialog: "Select a track first." |

---

## Notes

- Selecting **more than 100 Sounds** at once triggers a confirmation dialog — prevents accidentally importing an entire Work Unit of thousands of files.
- If the selected objects contain **no resolvable Sound** (e.g. pure Event / Bus selections) → dialog: "No WAV files found".
- Container recursion only collects **Sound** type child objects; other types (such as child Events) are ignored.
