# Under Mouse (Mouse Position) Actions

This group of actions uses the **current mouse cursor position** as the action point: hover over an object and trigger, and the action applies to whatever is under the mouse without needing to click-select first.

For any variant involving “batch” behavior, the rule is consistent:

- The object under the mouse is **not selected** → only that object is affected.
- The object under the mouse is **already selected** → the action applies to **all selected** objects.

---

## 1. Edit Item Under Mouse

Use the **horizontal position of the mouse cursor** as the action point to Trim, Split, or Fade the Item under the mouse. The cut/action point only looks at the mouse’s horizontal position; vertical position (which exact track the mouse is over) does not matter.

| Action List display name | Function |
| --- | --- |
| **Under Mouse - Item - Trim Items Left** | Use the mouse horizontal position as the cut point; trim off and delete everything **left** of the mouse, keeping only the right side. |
| **Under Mouse - Item - Trim Items Right** | Use the mouse horizontal position as the cut point; trim off and delete everything **right** of the mouse, keeping only the left side. |
| **Under Mouse - Item - Split Items** | Split the Item into two pieces at the mouse horizontal position; both pieces **remain selected** (convenient for dragging or further processing), and neither piece is deleted. |
| **Under Mouse - Item - Fade In** | Add a **Fade In** from the Item start to the mouse horizontal position. Fade-in length = mouse position − Item start; if the mouse is past the Item end, the fade-in is capped at the full Item length. |
| **Under Mouse - Item - Fade Out** | Add a **Fade Out** from the mouse horizontal position to the Item end. Fade-out length = Item end − mouse position; if the mouse is before the Item start, the fade-out is capped at the full Item length. |

### Extra Fade Rules

Applies only to **Fade In** / **Fade Out** variants:

- **Fade In**: if the mouse is before the Item start (fade-in length 0 or negative), that Item is skipped.
- **Fade Out**: if the mouse is after the Item end (fade-out length 0 or negative), that Item is skipped.
- **They can squeeze each other**: if the new fade-in / fade-out plus the existing fade on the other side exceeds the total Item length, the opposite fade is automatically shortened to make room; if squeezed to a very small length, it is zeroed out.

### Notes

- Does nothing if there is no Item under the mouse.
- Each operation is one Undo; press Ctrl+Z once to revert.

---

## 2. Universal Toggle

**Action List display name: Under Mouse - Adaptive - Universal Toggle**

A **universal toggle**: automatically switches the corresponding state based on what the **mouse cursor** is hovering over. One shortcut handles many on/off buttons, so you don’t have to memorize a pile of them.

### What gets toggled depends on what the mouse is over

Priority is evaluated top-down:

- **Over an Item** → toggles that Item’s **Mute**
- **Over a floating FX window** → toggles that FX’s **Bypass**
- **Over TCP FX parameter / Send controls** → simulates Shift+click (same as holding Shift and clicking)
- **Over TCP FX button / FX Bypass button** → toggles the track’s overall **FX Bypass**
- **Over TCP Record Arm (RecArm) button** → toggles **Record arm**
- **Over TCP Phase button** → toggles **Phase invert**
- **Over Envelope Control Panel Arm / Bypass button**, or other envelope panel area → toggles that **Envelope’s Arm / active state**
- **Over an envelope line in the Arrange view**: if the mouse is exactly over an Automation Item → toggles that **Automation Item’s Mute**; otherwise toggles that **Envelope’s active state**
- **Over empty space on a normal track in Arrange** → toggles that **Track’s Mute**
- **Over a Fixed Lane track in Arrange** → toggles **Solo for the lane under the mouse** (Solo ↔ play all lanes)

### Batch when selected, single when not

For Item Mute, Track Mute, FX Bypass, RecArm, and Phase:

- The object under the mouse is **already selected** → toggle **all selected** Items / Tracks together.
- The object under the mouse is **not selected** → toggle only that object.

When toggling a Mirror (Workflow Folder mirror) Item, child Items within its range are toggled together.

### Notes

- Does nothing if the mouse is over nothing.
- The action is one Undo.

---

## 3. Duplicate (Universal Duplicate)

**Action List display name: Under Mouse - Adaptive - Duplicate Selected Thing**

A **universal duplicate**: automatically duplicates whatever the **mouse cursor** is hovering over.

### What gets duplicated depends on where the mouse is

- **Over Track Control Panel (TCP) / Mixer Control Panel (MCP) / envelope control panel (envcp)** → duplicate selected **tracks**
- **Over an envelope line in Arrange**:
  - If an **Automation Item** is selected → duplicate the selected Automation Item(s)
  - Otherwise, if **envelope points** are selected → duplicate the selected points as a group and place them immediately to the right (offset by the span of the selected points); the duplicated points become selected
- **Over normal Arrange area** → duplicate selected **Items** (only if Items are currently selected)

### Notes

- Envelope points: if only **one** point is selected, it is not duplicated (duplicating would stack it on top of itself, which is meaningless); silently skipped.
- If no Items are selected in Arrange, nothing is duplicated.
- Duplicating tracks / Automation Items / Items uses REAPER’s native duplication; duplicating envelope points is one Undo.
