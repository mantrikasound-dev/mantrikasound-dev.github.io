# Take Operations

A set of operations for multi-take Items: combine multiple Items into a single multi-take Item, cycle between Takes, crop or delete Takes, explode Takes into separate Items, and reset take volume.

All actions below **automatically skip Mirror Items** (left untouched to avoid accidental changes) and are **one Undo** — press Ctrl+Z once to fully revert.

---

## Take - Implode Selected Items as Takes (multi-take item)

Combine **multiple selected Items into one multi-take Item** — each original Item becomes a Take, stacked at the same position.

- Requires at least **2 Items** selected to be meaningful; fewer than 2 does nothing.
- After combining, all Items become **one Item**, positioned at the location of the **topmost track / earliest time** Item.
- Take order is arranged by **track top-to-bottom, then left-to-right within the same track**.
- Each Take **keeps its original content start**; switching to a Take still shows its original segment.
- Combined Item length = the **longest Take**.

---

## Take - Cycle Active Take (1->2->3->1) / Take - Cycle Active Take Reverse (1->3->2->1)

Advance the active Take of selected **multi-take Items** by one step, wrapping at the ends. Forward and reverse directions are provided.

| Action List display name | Direction |
| --- | --- |
| **Take - Cycle Active Take (1->2->3->1)** | Advance forward (1→2→3→1); after the last Take, wraps to the first. |
| **Take - Cycle Active Take Reverse (1->3->2->1)** | Step backward (1→3→2→1); when on the first Take, wraps to the last. Opposite direction of forward. |

- Each selected Item is advanced **independently**; they do not affect each other.
- Items with only **1 Take** do nothing.
- Automatically **skips empty Take slots**, landing on the next Take with actual content in the chosen direction.
- At the end in that direction, wraps to the other end.

---

## Take - Crop to Active Take (delete other takes)

Delete **all Takes other than the active Take** in the selected Item, leaving only the current one and turning it back into a single-take Item.

- Uses the **active Take** as the reference; all other Takes are removed.
- After removal, the Item tail is **trimmed to the active Take’s actual playable length** — if the original Item was longer than this Take’s content, the extra empty tail is trimmed (only shortens, never lengthens).

---

## Take - Delete Active Take (other take becomes active)

Delete the **active Take** of the selected Item; the next Take behind it becomes the new active Take.

- After deleting the active Take, the remaining Takes automatically take over the current position.
- If the Item has only **one Take** left, deleting it **deletes the entire Item**.

---

## Take - Explode Takes into Separate Items

Split a **multi-take Item** into **multiple single-take Items, all staying on the same track**, placed one after another.

For each selected multi-take Item:

- Each Take becomes **one independent Item**, remaining on the **original track**.
- The **active Take** keeps the original Item position; the remaining Takes are placed sequentially to the right.
- A fixed **1-second gap** is left between Items.
- Each new Item length is set to the **actual playable length** of its Take, with content start zeroed.
- Fades are **cleared** from the exploded Items.
- After exploding, **all new Items are selected**.
- Only **multi-take Items** are processed; single-take Items are skipped.

---

## Take - Reset Active Take Volume (0 dB / polarity preserved)

Reset the active Take volume of selected Items to **0 dB** (gain 1.0).

- **Polarity is preserved** — a Take that was phase-inverted remains phase-inverted after reset.
