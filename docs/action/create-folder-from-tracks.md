# Assistants - Folder - Create Folder From Selected Track

Packs the currently **selected tracks** into a newly created Folder.

---

## Behavior details

- Selected tracks do **not** need to be contiguous — they are automatically gathered together before packing.
- Selecting a **Folder parent track** automatically includes all of its child tracks.
- If the selected tracks are **already inside a parent Folder**, the new Folder is nested under that same parent rather than ejected to the top level.
- If a top-level track named **`mantrika-main`** exists, the new top-level Folder automatically creates a Send to it and disables its Master Send (a team pre-master routing convention; this step is skipped if the track does not exist).

---

## Automatic side effects

- Triggers **auto-coloring** (if you have coloring rules enabled)
- Refreshes **Mirror sync** (so Mirror Items on the Folder immediately reflect the change)

The action itself counts as a single Undo step; one Ctrl+Z restores the whole operation.

---

## When to use this vs. other options

This Action only packs by whole-track. If you want to **pick individual segments from several tracks and pack them separately** while keeping the original tracks intact, use `Assistants - Folder - Adaptive - Create Folder`.
