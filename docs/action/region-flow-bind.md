# Assistants - Region Flow - Bind Region Under Cursor to Selected Folder Track

One-click binding: renames the **currently selected top-level Folder** to match the **Region under the edit cursor**, pairing them immediately in Adaptive Regions (Region Flow).

---

## Behavior

1. Takes the **currently selected top-level Folder track**.
2. Takes the **Region that contains the edit cursor**.
3. Renames the Folder to the Region's **name stem** (removing trailing numbers, version suffixes, extensions, and similar).
4. The pairing is completed right away — the Region's boundaries and color are immediately applied to the Folder's contents.

Essentially, it does the "rename Folder to match Region" step for you, saving a manual rename. After that, the following behavior works just like normal Adaptive Regions.

---

## How to use

```
1. Select exactly one top-level Folder track
2. Move the edit cursor inside the desired Region
3. Run this Action
```

---

## Notifications when conditions are not met

- **Adaptive Regions (Region Flow) master switch is off**
- **Not exactly one top-level Folder track is selected** (none, multiple, or a non-top-level Folder will not work)
- **The cursor is not inside any Region**
- **This Region is already paired to another Folder**, or **this Folder is already paired to another Region** (one-to-one relationship)
- The Region name is empty after removing suffixes

The operation counts as a single Undo step.

> For details on Adaptive Regions / name-stem pairing, see the Adaptive Regions user manual.
