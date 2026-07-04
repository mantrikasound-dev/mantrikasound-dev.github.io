# Process - Create Spectral Transition for Overlapping Items

For **Items that already overlap on the same track**, generates a "spectral transition" Item over their overlap region so the first sound smoothly transforms into the second — without opening the Spectral Forge window, all in one click.

> This is a companion Action to Spectral Forge. For the algorithm, Source/Target roles, and related concepts, see the **Spectral Forge user manual (spectral-forge.md)**.

---

## How to use

1. On the **same track**, select **at least 2 audio Items that overlap each other** (arranged in time order).
2. Trigger this Action.
3. A transition Item is automatically generated for each overlap region and placed back on the timeline.

Each pair of adjacent Items gets its own transition in their overlap region.

---

## Behavior details

- Selected Items **must all be on the same track**; otherwise the action notifies you and stops.
- **MIDI** Items are not supported (a notification is shown).
- The overlap must be **at least 100 ms** to be valid; overlaps that are too short are skipped. If no valid overlaps are found, the message "No valid overlaps found" is shown.
- During generation: the first Item is slightly trimmed at the end of the overlap, the second Item is slightly trimmed at the start, and a synthesized **transition Item** is inserted in between with automatic crossfades so the three segments blend smoothly.
- The transition Item inherits the volume of the first Item.
- The rendered audio file is written to the project's `SpectralForge/` directory.

---

## Notes

- Time selection and track selection do not matter; **what matters is the set of overlapping Items you select**.
- The entire operation is **one Undo step**; one Ctrl+Z restores everything.
- For more control (choosing the algorithm, previewing, adjusting parameters), use the main Spectral Forge window; see spectral-forge.md.
