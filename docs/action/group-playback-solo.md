# Playback - Play from Mouse and Solo (Hold/Release)

This group of actions works like a “walkie-talkie” audition key: **hold** the shortcut to start playback from the **mouse cursor** horizontal position and temporarily isolate the sound (hear only what is under the mouse); **release** the shortcut to stop playback and restore all states.

Common behavior:

- **Hold**: edit cursor jumps to the mouse horizontal position, playback starts, the corresponding isolation is applied, and the cursor becomes a speaker cursor.
- **Release**: playback stops, **isolation is cancelled and playback state is restored** — if it was playing before, it resumes; if paused, it returns to pause; if stopped, it stays stopped.

---

## Variant Differences

| Action List display name | Isolation target | Isolation method |
|---|---|---|
| **Playback - Play from Mouse and Solo Track (adaptive/hold shortcut key)** | Track under mouse | Sets the track under the mouse to Solo. **Fixed Lane track**: only Solos the lane under the mouse (falls back to full-track Solo if that lane has no Items) |
| **Playback - Play from Mouse and Solo Item - Compatible (adaptive/hold shortcut key)** | Item under mouse | Solos the track containing the target Item and **temporarily Mutes other Items on the same track** to achieve “hear only this one”; straightforward logic with best compatibility |
| **Playback - Play from Mouse and Solo Item - Recommendation (adaptive/hold shortcut key)** | Item under mouse | Selects the target Item and calls REAPER’s native **Play (solo selected items)**; isolation is left to the native mechanism, lighter and snappier |

### Selected or Not

- **Target already selected** → isolate / hear **all selected tracks (or Items)**.
- **Target not selected** → isolate / hear only that one; the two Item variants temporarily make it the only selection and restore your original selection on release.

### Additional Fallback Rules for the Two Item Variants

- **Mouse is over a track but no Item** → automatically degrades to Solo Track behavior (solo one or many depending on selection).
- When the mouse is over a Mirror (Workflow Folder mirror) Item, it is not treated as an Item; falls back to track-based handling.
- **Compatible variant**: when the mouse is over a Fixed Lane track, Solos the lane containing the target Item.
- **Recommendation variant**: if the target Item or its track is currently Muted, it is **temporarily unmuted** so you can hear it; restored on release.

---

## Compatible vs Recommendation

Both are “hear the Item under the mouse”; the difference is only the isolation method:

- **Recommendation** uses REAPER’s native “play only selected Items” mechanism, lighter and snappier.
- **Compatible** manually Mutes other Items on the same track to isolate, straightforward logic that works in all kinds of projects.

**Prefer the Recommendation variant; switch to Compatible if behavior is off.**

---

## Notes

- Mouse must be inside the **Arrange view** (does not trigger over the track control area, Mixer, or ruler).
- Does not trigger if there is no track under the mouse.
- **Does not trigger while recording**.
- After release, all Solo / Mute / playback states are automatically restored; the whole process **leaves no trace in the Undo history** (you won’t see it with Ctrl+Z).
