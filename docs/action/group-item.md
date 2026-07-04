# Item (Media Item) Actions

A set of operations for selected Items in the project: trim, fade, split, nudge volume/pitch, reverse, navigate, clean up muted Items, align, solo audition, and create seamless loops. This is the largest action category, organized by function below.

**Common conventions** (observed by default in each section, not repeated):

- Multiple selected Items can be processed at the same time, with each Item handled **independently**.
- Each operation is **one Undo** — press Ctrl+Z once to revert the whole thing.
- Most operations prompt you to select Items first when nothing is selected.

---

## Table of Contents

1. [Trim](#1-trim)
2. [Fade & Crossfade](#2-fade--crossfade)
3. [Split](#3-split)
4. [Volume / Pitch Nudge](#4-volume--pitch-nudge)
5. [Reset Volume](#5-reset-volume)
6. [Reverse](#6-reverse)
7. [Navigate](#7-navigate)
8. [Clean Up Muted Items](#8-clean-up-muted-items)
9. [Align to Region by Matching Name](#9-align-to-region-by-matching-name)
10. [Solo and Focus View](#10-solo-and-focus-view)
11. [Zero-Crossing Loop](#11-zero-crossing-loop)
12. [Copy Selected Object Name](#12-copy-selected-object-name)
13. [Set Mirror Name from Child Item](#13-set-mirror-name-from-child-item)

---

## 1. Trim

Trim one edge of the selected Item to the **current play cursor** — the content on the other side of the cursor is cut off, and the corresponding edge aligns to the cursor.

| Action List display name | Which edge | Effect |
| --- | --- | --- |
| **Item - Trim Selected Item Left** | Left edge | Moves the left edge to the cursor; the segment **left** of the cursor is silenced, and the Item start shrinks inward. |
| **Item - Trim Selected Item Right** | Right edge | Moves the right edge to the cursor; the segment **right** of the cursor is silenced, and the Item end shrinks inward. |

---

## 2. Fade & Crossfade

Add fade-in, fade-out, or crossfade between adjacent Items for smoother transitions. All use REAPER’s native functionality.

| Action List display name | Function | Range |
| --- | --- | --- |
| **Item - Fade In to Cursor** | Add a fade-in | Item start → current play cursor |
| **Item - Fade Out to Cursor** | Add a fade-out | Current play cursor → Item end |
| **Item - Crossfade in Time Selection** | Crossfade adjacent Items | Within the time selection |

**How to use Crossfade**: First draw a **time selection** covering the overlap between two adjacent Items, then trigger this action; the two Items crossfade into and out of each other within the selection.

---

## 3. Split

Split selected Items at the specified position. The split point can be the edit cursor, a Marker, or a Region boundary; the three variants **handle the result differently**.

| Action List display name | Where it splits | Post-split handling |
| --- | --- | --- |
| **Item - Split items at edit cursor** | At the edit cursor (uses time selection / Razor Edit boundaries when a time selection exists) | When there is no time selection, **deselects all Items** after splitting so you don’t end up with only half an Item selected. |
| **Item - Split Items at Markers** | At each Marker position (Markers only, not Regions) | All resulting pieces **are kept**; nothing is deleted. |
| **Item - Split Items at Region Boundaries** | At the start and end of every Region | **Deletes all pieces that fall outside any Region**, keeping only the parts that stay completely inside a Region. |

**Region Boundaries details**: Collects the start/end points of all Regions as cut lines (overlapping Regions are merged first; adjacent Regions are not merged). After splitting, each segment is checked: pieces fully inside a Region are kept; pieces not covered by any Region are deleted. Useful for cutting a long source into segments by Region, automatically clearing the gaps between Regions.

**Notes**:

- Marker / Region Boundaries variants: prompt you to select Items first if none are selected.
- Does nothing when the project has no Markers / Regions (the Region variant will not accidentally delete anything).
- Cut lines that coincide exactly with an Item’s own start/end boundaries are skipped to avoid redundant empty splits.

---

## 4. Volume / Pitch Nudge

Nudge selected Items by one step: volume ±1 dB, or pitch ±1 semitone. All adjustments are **relative** (added to the current value); repeated triggers accumulate (e.g. +1, +2…). Pitch comes in two flavors: **preserve length** and **tape-style varispeed** — the difference is important.

| Type | Action List display name | What it changes | Length |
| --- | --- | --- | --- |
| Volume +1 dB | **Item - Nudge Volume Up (+1 dB)** | Item-level volume, raised 1 dB | Unchanged |
| Volume -1 dB | **Item - Nudge Volume Down (-1 dB)** | Item-level volume, lowered 1 dB | Unchanged |
| Pitch +1 semitone | **Item - Nudge Pitch Up (+1 semitone)** | Active take’s independent pitch offset | **Unchanged** |
| Pitch -1 semitone | **Item - Nudge Pitch Down (-1 semitone)** | Active take’s independent pitch offset | **Unchanged** |
| Varispeed +1 semitone | **Item - Nudge Pitch Up via Playrate (+1 semitone)** | Active take’s playrate (faster, like tape speeding up) | **Shorter** |
| Varispeed -1 semitone | **Item - Nudge Pitch Down via Playrate (-1 semitone)** | Active take’s playrate (slower, like tape slowing down) | **Longer** |

**Volume adjustment (±1 dB)**: Raises or lowers volume by 1 dB on top of the current value; it does **not** set a fixed value. **Polarity is preserved** (Items that were phase-inverted stay inverted); **muted Items stay muted** (Items already at -∞ remain silent).

**Pitch adjustment (±1 semitone, length unchanged)**: For each Item’s **active take**, uses the take’s independent pitch offset to shift pitch by ±1 semitone **without changing playrate**, so **Item length stays the same**.

**Varispeed (±1 semitone, tape-style, length changes)**: Changes pitch by speeding up or slowing down playrate — pitch and duration change together; raising pitch shortens the Item, lowering pitch lengthens it. This action automatically resizes the Item proportionally so no audio content is cut off. It **forces off** the take’s "Preserve pitch during rate changes" option so the pitch shift actually takes effect (this overwrites the relevant setting on that take), and **clears the take’s independent pitch offset** to avoid stacking with the varispeed pitch change.

---

## 5. Reset Volume

| Action List display name | Behavior |
| --- | --- |
| **Item - Reset Item Volume (0 dB)** | Resets the selected Item’s **Item-level** volume to 0 dB (gain 1.0). Does not affect take volume, track volume, or envelopes. |

---

## 6. Reverse

Reverse (play backward) the selected Items. The two variants differ in how the reversed Item is **positioned**.

| Action List display name | Positioning |
| --- | --- |
| **Item - Reverse Items with Fold Effect** | Like folding a page in half: after reversal the whole segment flips to the **left** of its original start (the new end lands exactly on the original start). Toggle action — press again to restore. |
| **Item - Reverse Items in Place** | Position and length **stay in place**: the content plays backward, but the segment still covers the same original sound area, and the same audio content is guaranteed to play. |

**With Fold Effect (fold reversal)**: Toggle action; each Item is judged independently —

- **Not yet folded** → reverses the audio and moves the Item to the left of the original start (new end aligns with original start), storing the original position / length / reversed state.
- **Already folded** → reverses back to normal, restoring position / length / start offset to pre-fold values.

Use case: creating "reverse suction / suck-in" style effects where the reversed tail meets the original source start; one key toggles between normal and folded reverse.

**In Place (in-place reversal)**: After reversing each Item’s audio, it **automatically compensates** for the Item’s source offset so the reversed Item still pulls from **the same original segment** (just played backward), rather than jumping to a different part of the source. Then it restores position and length to pre-reversal values. Takes the Item playrate into account. Use case: reverse a segment in place without moving the Item or exposing other parts of the source.

---

## 7. Navigate

Jump along the play cursor to adjacent Items on the **current track**: select the Item and move the cursor to its start. Wraps around at the ends.

| Action List display name | Jump direction |
| --- | --- |
| **Item - Cycle Navigate to Next Item** | Jump to the next Item **to the right** of the cursor; wraps to the first Item at the end. |
| **Item - Cycle Navigate to Previous Item** | Jump to the previous Item **to the left** of the cursor; wraps to the last Item at the beginning. |

**Behavior**: On the first selected track, Items are sorted by position; the nearest Item in the requested direction is found, **only that Item is selected** (other selections cleared), and the cursor moves to its start. If already at the end, it wraps to the other side. Jumping during playback pauses first, then resumes automatically from the new position after the jump.

**Notes**:

- Does nothing if no track is selected.
- **Does not jump while recording**.
- If the track contains **Mirror Items (mirror segments)**, navigation is limited to those Mirror Items (priority); otherwise it navigates among normal Items.

---

## 8. Clean Up Muted Items

Find muted Items, select them all for preview, then show a dialog with the count and ask whether to delete. The five variants differ only in **search scope**.

| Action List display name | Scope |
| --- | --- |
| **Item - Cleanup Muted - Entire Project** | All Items in the **entire project**. |
| **Item - Cleanup Muted - Selected Items Only** | Only the **currently selected Items**; unselected Items are untouched. |
| **Item - Cleanup Muted - Overlapping Any Region** | Items in the entire project that **overlap any Region** (touching inside a Region boundary counts; full containment is not required). |
| **Item - Cleanup Muted - On Folder Child Tracks** | Only on **child tracks of all Folder tracks** (including nested inner tracks); normal tracks outside any Folder are untouched. |
| **Item - Cleanup Muted - On Selected Tracks** | Only on the **currently selected tracks**; based on track selection, independent of Item selection. |

**Behavior**: Finds muted Items within the scope → **selects them all** for visual preview → **shows a dialog with the count and asks whether to delete**. Confirm to delete; cancel to keep them selected for inspection.

**Notes**: If there are no muted Items in the scope, a message is shown and nothing is done. The Overlapping Any Region variant also notifies you if the project has no Regions; the On Selected Tracks variant notifies you if no tracks are selected.

---

## 9. Align to Region by Matching Name

| Action List display name | Behavior |
| --- | --- |
| **Item - Align to Region by Matching Name** | For each selected Item, find a Region whose name matches the Item's **source file name** and align the Item’s start to that Region’s start. |

**Behavior**: A dialog first asks for a **suffix to remove** (default `-imported`; clear if not needed). For each selected Item, the source file name (without extension) has that suffix removed once, and the resulting name is used to find a **Region with the exact same name** in the project. If found, the Item is moved to that Region’s start (**only horizontal position changes; track and length stay the same**); if not found, it is left unchanged and recorded in a failure list. After finishing, the console reports success / failure counts.

**Notes**: The name must match **exactly** (the suffix is removed only once from the end). Only the start is aligned; Item length is not changed. Use case: a batch of imported sources with a uniform suffix (e.g. `xxx-imported`) can be returned to pre-marked Regions with matching names after removing the suffix.

---

## 10. Solo and Focus View

| Action List display name | Behavior |
| --- | --- |
| **Item - Solo Tracks of Selected Items and Focus the View** | Solo only the tracks that contain the selected Items so you can audition them in isolation, and move the cursor just before the earliest Item (with pre-roll) for immediate playback. Trigger again to restore the original state. |

**Behavior**: Finds all tracks that contain selected Items, **solos only those tracks** while muting the rest; moves the play cursor to about **70 ms before** the earliest Item (pre-roll); also selects those tracks for visual feedback. The original solo state is remembered before entering solo; triggering again with the same Items **exits solo and restores the original state**.

**Details**: Items that are muted themselves, or whose track (including parent Folder) is muted, are **not counted**. The solo state of the Folder parent track is preserved and not cleared. If no Items are selected, the action exits and restores if currently in this tool’s solo state, otherwise does nothing. Use case: quickly isolate and audition the tracks of a few Items, then one-click restore; useful for A/B comparison.

---

## 11. Zero-Crossing Loop

| Action List display name | Behavior |
| --- | --- |
| **Item - Create Zero Crossing Crossfade Loop (adaptive time selection)** | Cut the Item in half at a zero crossing, swap the two halves front-to-back, and crossfade the seam to create a seamless looping Loop. |

**Behavior**: For each Item, find the nearest **zero crossing** around the midpoint and cut into two segments → **swap the two halves** (original latter half moves to the front, former half follows) → apply a **crossfade** at the seam, with fade length about 15% of the total segment. This moves the original start/end content to the middle and smooths it with a crossfade, so loop playback has no audible seam; cutting at a zero crossing prevents clicks at the splice.

**Two modes (auto-detected)**:

- **Item mode** (default): when there is no valid time selection, or the time selection exactly equals the Item range, the entire Item is processed.
- **Time selection mode**: when you draw a time selection different from the Item range, a loop is created at the selection length; extra material on both sides of the selection is used to feed the crossfade, and loop length strictly matches the selection. In this mode the Item must **fully cover the selection**, otherwise it is skipped.

**Note**: In selection mode, if no Item covers the selection, a message is shown that there is nothing to process.

---

## 12. Copy Selected Object Name

| Action List display name | Behavior |
| --- | --- |
| **Item - Copy selected item/track/mirror name to clipboard** | One-click copy of the current selection’s name to the **system clipboard**, ready to paste anywhere with `Ctrl+V` (rename boxes, text, tables, etc.). Automatically recognizes whether the selection is an **Item / Track / Mirror** and uses the corresponding name. |

**Behavior**: Object type is determined by **current focus** — if focus is in the Item area, the selected **Item** name is copied; if focus is in the track panel, the selected **track** name is copied. If no object is selected in that context, it **automatically falls back** to the other context so you don’t get “nothing copied despite having something selected”. When **multiple** objects are selected, their names are joined with commas `, ` and copied together.

Naming rules for each object type:

- **Track** → track name
- **Normal Item** → active take name, with media file extension stripped (`.wav`/`.mp3`/`.aif` and other common audio/video/project extensions; only whitelisted extensions are stripped, so normal dots in names like `Drums 2.0` or `Hit_v1.5` are not harmed)
- **Mirror** → its Note text

**Notes**:

- When a Mirror is selected, **child Items belonging to that Mirror are not duplicated** (Items on the Mirror’s Folder child tracks within its time range are considered part of the Mirror); standalone Items not belonging to any Mirror are still copied normally.
- If there is nothing to copy, the action stays **silent and does nothing**, without clearing the clipboard.
- Read-only plus clipboard write; **does not modify the project**, so no Undo is needed.

---

## 13. Set Mirror Name from Child Item

| Action List display name | Behavior |
| --- | --- |
| **Item - Set mirror name from selected child item** | Select one child Item under a Mirror and use its name (extension stripped) to **overwrite** the parent Mirror’s Note. Direction: **child Item name → Mirror Note**. |

**Usage**: If a Mirror segment contains several source Items and you want to use one of their names as the Mirror’s name — select **one** Item under the Mirror (within its Folder child tracks + time range) and trigger this action. Then:

- Automatically finds the Mirror that owns this Item (judged by Folder child tracks + time range)
- Takes the Item name, **strips the media file extension** (same rules as above), and **forcibly overwrites** the Mirror’s Note

**Only takes effect when exactly one Item belonging to a Mirror is selected**; all other cases do **nothing**:

- Multiple Items selected (even under the same Mirror, or one from each of multiple Mirrors)
- Selected Item **does not belong to any Mirror**
- Selection is the **Mirror itself**, or the selected Item name is empty

Writing the Note is **one Undo**; press Ctrl+Z to revert. Complements `Assistants - Mirror - Apply Track Name to Mirror Notes` (track name → Note, applies to all Mirrors on the track): this one is more precise, targeting a **single** Mirror and using the **child Item name**.
