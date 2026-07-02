# Razor Eraser - Hold Key + Right-Drag to Delete Areas

A temporary “eraser” mode — while you hold its shortcut key, **right-drag to directly delete the swept area**. Under the hood it borrows REAPER’s Razor Edit to select and delete the area. Two variants, differing only in whether the deletion area **snaps**.

---

## Two Variants at a Glance

| Exact Action List display name | Does the right-drag selection snap? |
|---|---|
| **Razor eraser (hold key + right-drag to delete areas)** | **Snaps** to grid / Item edges and other snap points |
| **Razor eraser ignoring snap (hold key + right-drag to delete areas)** | **No snapping**; placement follows the cursor exactly |

---

## How to Use

1. Assign a shortcut key to this Action.
2. **Hold** that shortcut key.
3. **Right-drag** in the Arrange view to frame the area to delete.
4. **Release right-click** → the framed area is immediately deleted.
5. To erase another area, right-drag again.
6. **Release the shortcut key** → exit eraser mode.

Think of it as “hold key = pick up eraser, release key = put down eraser”.

---

## Common Behavior Details

- Entering eraser mode **clears any existing Razor selection** first, to avoid accidental deletion on entry.
- Deletion uses REAPER’s standard “Delete razor area” behavior: deletes Item contents and clears the selected area.
- Each **right-click release** is **one Undo** — if you erase wrong, press Ctrl+Z once to revert that stroke.
- On exit, any **remaining Razor selection is cleared** and the right-click modifier settings are **restored to your original configuration** (the eraser temporarily borrowed right-click; it is returned on exit).
- While the mode is active, **right-click is temporarily occupied** for drawing deletion areas; the normal right-click menu is suppressed.
- A small hint text follows the cursor telling you that you are in eraser mode.

---

## The Only Difference Between the Two Variants

The only difference is whether the right-drag selection **snaps**:

- **Razor eraser** (snap version): the selection **snaps** to grid / Item edges and other snap points.
- **Razor eraser ignoring snap** (no-snap version): the selection **does not snap**; placement follows the cursor exactly.

All other behavior (clear old selection on entry, each right-release = one Undo, clear remaining selection and restore right-click settings on exit, cursor hint text) is **identical** between the two.

### When to Use the No-Snap Variant

- When the area to delete is **not on a grid / Item boundary** and snapping keeps pulling you off target.
- When you want to freely scrape off a small segment without snap interference.
