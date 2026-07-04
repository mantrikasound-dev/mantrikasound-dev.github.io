# Assistants - Folder - Adaptive - Create Folder

The adaptive version of "Create Folder". It **prioritizes the Items you have selected**; only when no Items are selected does it fall back to the selected tracks.

---

## When Items are selected

For each track, the action decides **whether to move the whole track or extract only certain segments**:

- **All Items on the track are selected** → The **entire track** is moved into the new Folder (simplest; the original track is relocated directly).
- **Only some Items are selected** → A **new track is duplicated** containing only the selected Items, and the corresponding Items on the original track are removed.
- If the original track becomes empty and its parent Folder also becomes empty, those empty shells are **automatically cleaned up**.

It also understands **Mirror Items** (mirrored segments on Folders): selecting a Mirror causes the Items within the corresponding time range to follow it into the new Folder; nested Mirrors are deduplicated to avoid packing the same content twice.

---

## When no Items are selected, but tracks are selected

Behavior is identical to `Assistants - Folder - Create Folder From Selected Track`: the selected tracks (including children) are packed into a new Folder, with the same gathering, nested preservation, and `mantrika-main` routing behavior.

---

## When nothing is selected

Nothing happens.

---

## Automatic side effects

- Triggers **auto-coloring** (if you have coloring rules enabled)
- Refreshes **Mirror sync**

The action itself counts as a single Undo step; one Ctrl+Z restores the whole operation.

---

## When to use it

- You want to **pick a few segments from several tracks** and pack them separately while keeping the original tracks.
- You are working with **Mirror Items** / Folder mirrors.

When you simply want whole tracks moved into a Folder, `Assistants - Folder - Create Folder From Selected Track` is more direct.
