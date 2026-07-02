# Automation Items - Adaptive

Create Automation Items on a Track's envelope based on the position of the Items on that track, or clear them all with one click.

---

## Variants

| Action List display name | What it does |
| --- | --- |
| `Automation Items - Adaptive - Create From Track Items (no loop)` | Creates Automation Items from Item positions; **does not loop** (lengthening will not repeat the content). |
| `Automation Items - Adaptive - Create From Track Items (looped)` | Same as above, but **looping is enabled** (lengthening will repeat the source content). |
| `Automation Items - Adaptive - Clear All Automation Items` | Deletes **all Automation Items** on the envelope. |

The two Create variants differ only by the **loop switch**; everything else is identical.

---

## Targets (common to all three variants, in priority order)

1. If an **Envelope is currently selected**, operate only on that Envelope.
2. Otherwise, operate on the **selected track(s)**, processing **all** Envelopes on each track.

If no Envelope or track is selected, nothing happens.

---

## Create: How the range is determined

For each track (or the track owning the selected Envelope), Items are found in this order:

1. **Selected Items** on that track.
2. If none are selected, **all Items** on that track.
3. If the track is a Folder parent and has no Items of its own, the Items on its **child tracks** are automatically collected (muted tracks and muted Items are skipped).

Each Item occupies one segment; **overlapping segments are merged** into a single segment, and Automation Items are created accordingly. After creation, any existing selected Automation Items are first deselected, then the newly created ones are automatically selected.

---

## Clear: What gets removed

Only Automation Items are deleted; **the Envelope itself and any hand-drawn points on it are left untouched**.

---

## Notes

- Create: If a track has no Envelope, or no Items can be found, the action silently skips it.
- The operation counts as a single Undo step.
