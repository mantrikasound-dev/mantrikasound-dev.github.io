# Assistants - DC - Double-Click Enhancements

A set of **double-click (DC) behavior enhancement** actions designed to replace REAPER’s default double-click behavior. Recommended to **bind to mouse double-click modifiers** (triggered when double-clicking the Track Control Panel (TCP), Items, or Automation Items). Each does its own thing, explained separately below.

Each action’s exact REAPER Action List display name appears in its section heading.

---

## `Assistants - DC - Toggle Folder Collapse / Select Items`

Looks at the **currently selected track** type and does one of two things:

- Selected track is a **Folder parent track** → **toggle its collapse/expand**.
- Selected track is a **normal track** → **select all Items on this track**.

Best **bound to Track Control Panel (TCP) double-click**: double-click a Folder header to open/close the Folder; double-click a normal track to select all its Items at once.

Note: does nothing if no track is selected; Folder collapse state changes sync the corresponding Mirror grouping; the action is one Undo.

---

## `Assistants - DC - Select All Automation Items`

Selects **all Automation Items on the currently selected Envelope** at once. Selects all of them, however many there are. Does nothing if the Envelope has no Automation Items or if no Envelope is selected.

Best **bound to Automation Item double-click**: double-click one Automation Item to select all on the same Envelope, convenient for moving / copying / deleting them as a group. The action is one Undo.

---

## `Assistants - DC - Enhanced Media Item`

Enhanced “double-click Item” behavior: first checks whether you clicked a **Mirror (mirror Item)**, then decides how to handle it (preferring the only selected one, otherwise the one under the mouse):

- It **is a Mirror** → **collapse/expand the Folder it lives in** (double-click the Mirror overview bar to open/close the Folder).
- It is **not a Mirror** → follows REAPER default double-click behavior by Item type:
  - **Subproject** → open the subproject
  - **Click source / timecode source** → open source properties
  - **MIDI** → open the MIDI editor
  - **Normal media Item** → enter source editing / editor
  - **Empty item** → open Item properties

**Bound to Item double-click**: usual Item behaviors remain unchanged, except that double-clicking a Mirror overview bar on a Folder becomes open/close Folder. The action is one Undo. (What Mirror is can be found in the Mirror user manual.)

---

## `Assistants - DC - Enhanced TCP Select`

Enhanced “double-click TCP” behavior; intelligently batch-selects based on the track type clicked:

- **Folder track** (top-level or child Folder) → clear selection, then **select this Folder and all its child tracks**.
- **Child track inside a Folder** → clear selection, then **select the entire Folder it belongs to (including all sibling child tracks)**.
- **Normal independent track** → **select all tracks in the project**.

**Bound to TCP double-click**: double-click a Folder header or any of its child tracks to select the whole Folder at once; double-click an isolated track to select all tracks. Convenient for moving / coloring groups. The action is one Undo.

---

## `Assistants - DC - Jump to and Focus View on Items of Selected Track`

Jumps the view **to and focuses** on the content of the currently selected track, using the **first selected track** as the reference:

1. **Vertically**: scroll the TCP to center this track.
2. **Horizontally**:
  - Track **has its own Items** → zoom to fit the range of all Items on this track.
  - Track **has no Items but is a Folder parent** → zoom to fit the **time union** of all its child tracks’ content.
3. Places the edit cursor a little before the content start (small pre-roll).

Best **bound to track-name / TCP double-click**: double-click a selected track (or Folder header) to instantly jump the view and zoom to see all its content.

Note: does nothing if no track is selected; does nothing if a normal track with no Items (and not a Folder) is selected; this is a pure view operation, **does not modify any Items / tracks, and does not enter Undo**.
