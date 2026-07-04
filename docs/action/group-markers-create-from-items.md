# Markers - Create from Items

Convert the **selected Items** into Markers or Regions. The basic behavior is "one Item, one marker/region": a Region covers the Item's start and end (start = Item start, end = Item end), while a Marker is placed only at the Item start as a zero-length point. Each variant differs in whether it creates a Region or a Marker, and whether the result is named.

---

## Variants

| Action List display name | Creates | Naming |
| --- | --- | --- |
| `Markers - Create Regions From Items (remove extensions)` | One Region per Item (covering its start and end) | Uses the Item name |
| `Markers - Create Regions From Items (no name)` | One Region per Item (covering its start and end) | Left blank |
| `Markers - Create Markers From Items (remove extensions)` | One Marker at each Item start | Uses the Item name |
| `Markers - Create Markers From Items (no name)` | One Marker at each Item start | Left blank |
| `Markers - Create Region From Items and Edit...` | One large Region from all Items | Manual entry via dialog |

---

## Naming rules (named variants only)

The name is taken from the first non-empty source in this order:

1. The Item's **Notes** (only the first line)
2. The Active Take's name
3. If neither exists, the name is **left blank**

Common audio/video file extensions are automatically stripped; other extensions are preserved as-is.

---

## Edit variant differences

The `...and Edit...` variant works differently from the "one Item, one marker/region" logic above:

- If Items are selected: the range spans from the **leftmost selected Item start to the rightmost selected Item end**, and all selected Items are merged into **one** large Region.
- If no Items are selected but a **time selection** exists: the time selection is used as the range.
- If neither Items nor a time selection exist: a notification is shown and nothing happens.
- After creation, REAPER's built-in **Region edit dialog** opens immediately for entering the name and color.

---

## Notes

- If no Item is selected, a notification is shown and nothing happens (the Edit variant falls back to the time selection, as described above).
- Except for the Edit variant, multiple Items each get their own marker/region; they are **not merged**.
- The operation counts as a single Undo step.
