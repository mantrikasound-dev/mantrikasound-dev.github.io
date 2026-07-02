# Prune - Trim and Clean-up Actions

A set of “delete Items and clean up empty tracks” tools: after deleting or moving Items, any tracks that become **empty as a result** are also removed, so the project doesn’t retain hollow tracks. Five variants in total.

---

## Five Variants at a Glance

| Exact Action List display name | What it does to Items | Cascade-delete empty tracks? |
|---|---|---|
| **Prune - Delete Selected Items (cleanup empty tracks)** | Deletes selected Items | Yes |
| **Prune - Crop Project to Selection (keep only selected items)** | Deletes **unselected** Items, keeping only selected ones | Yes |
| **Prune - Extract & Purge Up (move items up, delete empty source tracks)** | Selected Items each **move up one track** | Yes (deletes original tracks) |
| **Prune - Extract & Purge Down (move items down, delete empty source tracks)** | Selected Items each **move down one track** | Yes (deletes original tracks) |
| **Prune - Delete Selected Items with Envelope Points** | Deletes selected Items and clears automation points within their time range | **No**, tracks are always kept |

---

## What Counts as an “Empty Track”

Except for “Delete Selected Items with Envelope Points”, the other four variants use the same strict criteria for cascade deletion — a track is deleted only if **all** of the following are true:

- The track has **no Items** at all.
- It has no FX.
- It has no Sends and no Receives.
- It is **not** a Folder parent track (Folder tracks with child tracks are not deleted).

If a track still has FX, routing, or is a Folder parent, it is **kept** even if it has no Items.

---

## Common Behavior

- Master is **always protected** and never deleted.
- Each action is one Undo; press Ctrl+Z once to revert.

---

## Variant Differences

### Delete Selected Items (delete selected + clean tracks)

1. Deletes all selected Items.
2. Checks the tracks those Items were on and deletes any that became empty.

- Does nothing if no Items are selected.
- Preserves your original track selection after the operation.

### Crop Project to Selection (inverse pruning, keep only selected)

1. Deletes **all unselected Items** in the project (selected Items are kept as-is).
2. Checks tracks that were emptied and deletes any that became empty.

- If no Items are selected, a dialog reminds you to **select at least one Item**; it will not empty the entire project.

### Extract & Purge Up (move up + clean source tracks)

1. Each selected Item moves up one track (same as REAPER’s native “Item nudge up one track”).
2. Checks their original tracks and deletes any that became empty.

- Does nothing if no Items are selected.
- If selected Items are already all on the **first track** (cannot move further up), does nothing.

### Extract & Purge Down (move down + clean source tracks)

Fully symmetrical to Extract & Purge Up, just downward.

1. Each selected Item moves down one track (same as REAPER’s native “Item nudge down one track”).
2. Checks their original tracks and deletes any that became empty.

- Does nothing if no Items are selected.

### Delete Selected Items with Envelope Points (delete selected + wipe automation)

Deletes selected Items and simultaneously clears automation points within those Items’ time ranges, including envelope strokes hidden underneath the Items. For each selected Item:

1. Clears **all envelope points** on its track that fall within the Item’s time range (covering every envelope on that track).
2. Deletes the Item itself.

- Does nothing if no Items are selected.
- Unlike other Prune actions, this one **does not** cascade-delete empty tracks; **tracks are always kept**.
- Only envelope points within the Item’s time range are cleared; points outside the range are untouched.
- Press Ctrl+Z once to revert everything, including cleared automation points.
