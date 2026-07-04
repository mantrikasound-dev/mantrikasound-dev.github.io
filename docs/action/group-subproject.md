# Subproject (Child Project) Actions

This group of actions revolves around REAPER subprojects: pack the contents of selected tracks into an independent subproject, jump back from a subproject to its parent, render subprojects back into the parent, set the `=START` / `=END` markers that define the render range, and automatically sync cursor position when entering a subproject.

A subproject is identified by a pair of **`=START` / `=END` markers**, which also determine the render range. All “is this a subproject” checks below look for these markers. Unless otherwise stated, each action is one Undo.

---

## Create

Pack the contents of **selected tracks** into a Subproject Item — the selected tracks’ Items are moved into an independent project, and the parent project keeps a Subproject Item that carries them.

| Exact Action List display name | Behavior |
|---|---|
| **Subproject - Create Subproject From Selected** | Pack selected track contents into a subproject; the parent project keeps a Subproject Item that carries it. |

- You must **select at least one track** first, otherwise a prompt is shown and nothing is done.
- The project **must have been saved** (so the project directory is available); otherwise you are prompted to save first.
- A dialog lets you **enter the subproject name** (pre-filled with a cleaned version of the first selected track name by default); pressing Cancel aborts.
- Creates a **`Subproject Archive`** folder under the project directory and stores the generated subproject in its own subdirectory named as you entered (duplicate names automatically get `_1`, `_2` suffixes; nothing is overwritten).
- The subproject’s **`=START` / `=END` markers** automatically snap to the actual content range (no extra blank space).
- The Subproject Item in the parent project **aligns its geometry to the content** — length is exact, fades are cleared, start offset is zeroed; the **track that carries it is renamed** to the subproject name.
- If the selected tracks’ content is **segmented (gaps in the middle)**, the generated Subproject Item is **automatically split into multiple pieces**, skipping blank areas, with each piece landing where the original content was.
- The subproject view is automatically zoomed to the content and the cursor is moved to the content start so you can begin editing immediately.

---

## Jump to Parent Project

Executed inside a subproject — **jumps back to the parent project that contains it**, automatically selecting, zooming, and locating the corresponding Subproject Item.

| Exact Action List display name | Behavior |
|---|---|
| **Subproject - Jump to Parent Project** | Jump back to the parent project, clear the existing selection, select only the corresponding Subproject Item, zoom to it, and scroll its track to the center of the view. |

- Only takes effect when the **current project is a subproject**; otherwise does nothing.
- The parent project must **already be open** (in a project tab); otherwise it cannot be found and no jump occurs.
- If one subproject is referenced by multiple Items, jumps to the **first one found**.

---

## Render

Save and render each open subproject once, so Subproject Items in the parent project reflect the latest content. Three variants differ in **render range** and **whether the parent Item geometry is repaired**.

| Exact Action List display name | Render range | Repair Item geometry? | Stops at |
|---|---|---|---|
| **Subproject - Render all Subprojects (auto save)** | All open subprojects | **No**, only renders; parent Item length / splits stay unchanged | The project you were in before executing |
| **Subproject - Render all Subprojects and Fix Main Item (auto save)** | All open subprojects | **Yes**, repairs each Subproject Item in the parent project | Parent project |
| **Subproject - Render and Sync Selected Main Items (auto save)** | Only subprojects corresponding to **selected** Subproject Items | **Yes**, repairs only the selected Items | Current project |

Common behavior:

- Automatically finds target subprojects (project tabs with `=START` / `=END` markers), saves and renders them one by one; **each subproject is automatically saved**.
- Even if you have REAPER’s “automatic render on save” option disabled, rendering is **forced here**.

Variant differences:

- **Render all Subprojects (render only)**: Renders all open subprojects, then returns to the project you were in before executing; **only renders, does not repair Item geometry** — Subproject Item length / splits in the parent project remain unchanged. Silently returns if no subprojects are open. If you changed subproject content length or added/removed splits and want parent Items to align accordingly, use the Fix / Sync variants below.

- **Render all Subprojects and Fix Main Item (render and fix all)**: After rendering, switches to the parent project and **repairs all Subproject Items** — when the number of Items matches the number of content segments in the subproject, each Item’s length and start offset are aligned to each segment; when they **do not match** (you added/removed segments in the subproject), the earliest Item is used as the baseline to rebuild and re-split, **and changes on the other Items (volume, FX, etc.) will be lost**. Fade and snap offset are always cleared during repair. The action ends in the parent project. When segment counts mismatch, non-baseline Item processing is discarded; if this matters, confirm the subproject segments are consistent first.

- **Render and Sync Selected Main Items (render and sync selected only)**: From the selected Items, automatically picks out Subproject Items (normal Items are ignored), saves and renders the corresponding subprojects one by one, then **repairs the geometry of these selected Items** to align with subproject content — when segment counts **match**, length and start offset are aligned per segment; when they **do not match**, a dialog warns of structural changes and asks whether to continue. Continuing uses the earliest Item as the baseline to rebuild and re-split (**changes on other Items will be lost**); cancel skips that subproject. Fade and snap offset are always cleared during repair. If no Subproject Items are selected, a prompt is shown and nothing is done. Involved subprojects **must already be open** (in project tabs); otherwise the names of unopened subprojects are listed and the operation aborts.

---

## Set START & END Markers

Set the subproject’s **`=START` / `=END` markers** to the ends of the specified range, defining the render range. Two variants differ in **where the range is taken from**.

| Exact Action List display name | Range source |
|---|---|
| **Subproject - Set START and END markers to Time Selection** | Start and end of the current **time selection** |
| **Subproject - Set START and END markers to Items** | Item range (selected Items preferred; if none selected, uses all Items) |

Common behavior:

- `=START` is set to the range start, `=END` to the range end (**no extra padding**).
- Existing markers with the same name are **moved to the new position**; new markers are created if absent.
- If the current project has **no `=START` / `=END` markers**, a dialog warns “this may be the parent project”; only continues after confirmation.

Variant differences:

- **Set markers to Time Selection**: `=START` / `=END` are set to the time selection start and end; does nothing if there is no time selection (or the selection is invalid).
- **Set markers to Items**: If Items are selected, uses the leftmost start to rightmost end of all **selected Items**; if no Items are selected, automatically uses the range of **all Items** in the project; does nothing if the project has **no Items at all**.

---

## Cursor Sync

A toggle action. When enabled, every time you **switch from the parent project into a subproject**, the play cursor in the subproject automatically jumps to the **position corresponding to the parent project cursor**, so you can continue editing from the same spot.

| Exact Action List display name | Behavior |
|---|---|
| **Subproject - Toggle Auto-Sync Cursor from Parent** | Toggle; when enabled, entering a subproject syncs the cursor to the corresponding parent-project position. |

- This is a **toggle**: one execution turns it on, another turns it off (menu / toolbar shows whether it is currently lit); it is a persistent switch and does not affect Undo.
- While enabled, the moment you **switch to a subproject tab**: the current parent-project cursor position is taken, converted to an offset relative to the subproject’s `=START`, and the subproject play cursor is set to the corresponding position.
- Only syncs when **entering** a subproject; direction is **parent → child** only; switching back to the parent does not sync in reverse.
- The parent-project cursor must be near the Subproject Item range (about ±1 second tolerance) for sync to occur; too far away and nothing happens.
- The subproject must have an `=START` marker to serve as the reference point.
