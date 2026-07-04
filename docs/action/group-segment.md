# Segment (Audio Segment Switching) Actions

Segment lets an Item **switch between multiple sound segments like a sampler**.

The tool analyzes the source audio and splits it into several **Segments** — for example, a recording of five footsteps is detected as five Segments. After detection, this segment data is **stored on the Item** (travels with the Item), and subsequent **switching / randomization / splitting / restoring** all use this data.

The full Segment toolkit includes: first use **Enable** to analyze and activate, then use **Next / Previous** to switch between segments, **Random** for random switching, **Dynamic Split** to split all segments into independent Items, or **Restore** to fully revert.

> Common notes: Unless otherwise stated, each action does **nothing if no Item is selected**; when multiple Items are processed together, **each Item is handled independently**; **each execution is one Undo**. Except for Enable / Restore, if an Item has not been analyzed yet, the action will **automatically analyze it first** before executing.

---

## Enable and Analyze

**REAPER Action List display name:** `Assistants - Segment - Enable Multi-Segment Switching`

This is the entry point to the Segment toolkit — analyze first, then you can use Next / Previous / Random to switch.

After execution, for each selected Item:

1. **Performs an audio analysis** (cached; repeated execution will not re-run)
2. Trims the Item geometry to the shape of **Segment 0** — you’ll see the Item immediately shrink to only the first segment
3. Applies default **Fade In 1 ms / Fade Out 50 ms** to avoid clicks

Notes:

- Repeating Enable on the same Item will not re-analyze; to force re-detection, Restore first, then Enable.

---

## Switch to Next Segment

**REAPER Action List display name:** `Assistants - Segment - Switch to Next Segment`

Switches the selected Item to the **next Segment** (wraps around; the last loops back to the first).

For each selected Item:

1. Automatically determines which segment the Item is currently showing based on its geometry
2. Switches to `(current segment + 1) % total segments` — at the last segment it **wraps back to the first**
3. Item geometry changes to the new segment shape; fade settings are preserved

Notes:

- Does nothing if there is only 1 segment or detection failed
- For the opposite direction use `Switch to Previous Segment`; to jump randomly use `Switch to Random Segment`

---

## Switch to Previous Segment

**REAPER Action List display name:** `Assistants - Segment - Switch to Previous Segment`

Switches the selected Item to the **previous Segment** (wraps around; the first jumps to the last).

For each selected Item:

1. Automatically determines which segment the Item is currently showing based on its geometry
2. Switches to `(current segment - 1)` — when already at the first segment, it **wraps to the last segment**
3. Item geometry changes to the new segment shape; fade settings are preserved

Notes:

- Does nothing if there is only 1 segment or detection failed

---

## Random Switch (Transient-Aware)

**REAPER Action List display name:** `Assistants - Segment - Switch to Random Segment (transient-aware)`

Randomly switches the selected Item to another Segment, with transient alignment — the new segment’s start is aligned to the transient position of the old segment, so the switch sounds natural.

For each selected Item:

1. Randomly picks a **different** segment from the current one
2. **Transient alignment**: if the current segment contains visible transient points, the new segment is positioned so its transient aligns to the timeline position of the old segment’s transient — preserving the rhythmic feel
3. Item changes to the new segment shape; fade settings are preserved

Notes:

- Does nothing if there is only 1 segment
- Repeated execution keeps giving you different segments

---

## Dynamic Split (Split Segments into Independent Items)

**REAPER Action List display name:** `Assistants - Segment - Dynamic Split`

**Cuts the selected Item at each detected Segment boundary** into multiple independent Items, one per segment; silent gaps between segments are deleted.

Similar to REAPER’s built-in Dynamic Split, but uses Segment boundaries (with energy anchors and transient detection).

For each selected Item:

1. Uses Segment data to find **all segment boundaries** within the Item’s currently visible range (cached if already analyzed; otherwise automatically runs analysis once)
2. Splits the Item at each boundary, producing a series of new Items
3. Checks whether **each piece’s center point** falls inside a Segment:
   - Inside → keep (this is a valid Segment Item)
   - Outside (indicates silence between segments) → **delete**

Finally you get a clean chain of Segment Items; the original Item’s source audio, fades, and other settings are correctly inherited by each segment.

Use cases:

- Cut a long recording of “5 footsteps” into 5 independent Items for individual volume / position adjustment or reuse
- Prepare for randomized triggering: after splitting, send directly to tools like Macro Control / Qi for batch randomization

Notes:

- Does nothing if there are no segments in the current visible range

---

## Restore Original Item

**REAPER Action List display name:** `Assistants - Segment - Restore Original Item`

**Fully restores** a Segment-processed Item to its original pre-analysis state — clears Segment data, restores geometry, and removes the automatically added fades.

For each selected Item:

1. **Clears Segment data** (all segment information recorded on the Item is erased)
2. **Restores original geometry** — Item length / start offset return to pre-analysis values
3. **Clears Fade In / Fade Out** (even values you manually changed later will be cleared)
4. **Clears Reverse Fold state** (if previously processed with `Reverse Items with Fold Effect`)

When to use:

- You no longer want Segment switching and want to return to a normal Item
- Segment detection did not split ideally and you want to clear and re-Enable (re-analyze)
- You also want to clean up prior Reverse Fold processing

Notes:

- ⚠️ This **clears fades**, including values you manually adjusted later — if you care, note the fade values beforehand, or rely on Undo to revert.
