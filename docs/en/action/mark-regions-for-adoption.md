# Assistants - Mark Regions For Adoption

Marks your own Regions in the project **orange and queues them for adoption** — later, newly created Mirrors will automatically inherit these Region names.

---

## Behavior

- Scans all Regions in the project that were **not created by the Mirror system**, marks them **orange**, and queues them for adoption.
- Regions already managed by the Mirror system are **left untouched** (they will not be marked again).
- The queue is updated **from scratch** (overwritten): Regions that have already been adopted are automatically removed from the queue.
- If the project has **no adoptable Regions**, a notification tells you so (only Regions not created by this extension can be marked).

---

## How to use (with Mirror)

```
1. Name your Regions
2. Run this Action → target Regions turn orange and enter the adoption queue
3. Create a Folder + child tracks with source material so a Mirror grows on the Folder
4. → The new Mirror automatically adopts any overlapping orange Region: its name is written into the Mirror's Note,
 and the old Region is downgraded to a regular Marker
```

> **Order matters**: Adoption only happens at the moment a Mirror is **newly created**. Existing Mirrors will not adopt retroactively, so be sure to **mark the Regions first, then let the Mirror grow**.

---

## Notes

- This Action only performs the "mark orange, queue up" step; the actual name inheritance happens later when a new Mirror is created.
- In the Action List, search for **`Adopt`** or **`Regions`** — **searching for `Mirror` will not find it**.
- It is a one-time batch operation and **does not support Undo**.

> For the full adoption flow (orange Region → Mirror inherits name → old Region becomes Marker), see the "Region Adoption" section of the Mirror user manual.
