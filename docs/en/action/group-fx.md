# FX Management Actions

A set of tools for managing FX: clean up unused FX, open or close FX windows, and check for FX that output mono. When processing Items, only the **active take** of each Item is considered; FX on other takes are untouched.

---

## Clean Up Unused FX

Permanently delete **unused FX** in the project, removing only the matching ones while leaving normally working FX intact.

Cleanup uses two **independent criteria**:

- **Bypassed**: Manually bypassed FX that are silent but still loaded normally.
- **Failed**: Plugins that cannot be found or loaded, appearing as offline / red shells in the FX Chain.

Bypassed ≠ Failed: a bypassed FX that still loads normally is **not** counted as failed; likewise, failed FX are not treated as bypassed. The two sets require their own corresponding actions.

| Action List display name | Criterion | Scope |
| --- | --- | --- |
| FX - Cleanup Bypassed FX (entire project) | Bypassed | Every track’s FX Chain + active-take FX on every Item + **Master's** FX Chain |
| FX - Cleanup Bypassed FX (entire project exclude master) | Bypassed | Every track’s FX Chain + active-take FX on every Item, **skipping Master** (Master is never touched) |
| FX - Cleanup Bypassed FX (selected tracks) | Bypassed | Only the selected tracks’ own FX Chains; **does not touch** Item FX on those tracks |
| FX - Cleanup Bypassed FX (selected items) | Bypassed | Only the **active take** FX of selected Items; **does not touch** any track FX Chain |
| FX - Cleanup Failed FX (entire project) | Failed | Every track’s FX Chain + active-take FX on every Item + **Master's** FX Chain |

**Behavior**

- First shows a dialog telling you how many matching FX were found; deletion happens only **after confirmation**. If none are found, a notification is shown and nothing is done.
- Only the matching FX are deleted; everything else is left untouched.
- Bypassed cleanup only: if a track’s **entire FX Chain is bypassed** (FX Chain master bypass on), all FX in that Chain are treated as bypassed and deleted.
- Selected-scope only: if no corresponding Track / Item is selected, nothing is found.

**Notes**

- Deletion irreversibly changes the project, but the action is one Undo — press Ctrl+Z once to fully restore.
- Failed FX usually mean you changed machines or are missing plugins. After deletion those FX settings are gone; only delete if you are sure those plugins will not be reinstalled on this machine.

---

## Show FX Chain Window

Open the **FX Chain window** for selected objects.

| Action List display name | Scope |
| --- | --- |
| FX - Show FX Chain Window (selected tracks) | Each selected track |
| FX - Show FX Chain Window (selected items) | Each selected Item (active take) |
| FX - Show FX Chain Window (selected tracks and items) | Selected tracks and selected Items (active take), processed together |

**Behavior**

- Opens only the **FX Chain window itself**, **not** each FX’s individual floating window.
- In track-involved variants, selecting Master also opens its FX Chain.

---

## Hide FX Windows

Close all FX windows for selected objects (or the entire project). This is the inverse of Show; **Hide closes more than Show opens**: Show only opens the FX Chain window, while Hide closes both the **FX Chain window** and each FX’s **individual floating window**.

| Action List display name | Scope |
| --- | --- |
| FX - Hide FX Windows (selected tracks) | Each selected track |
| FX - Hide FX Windows (selected items) | Each selected Item (active take) |
| FX - Hide FX Windows (selected tracks and items) | Selected tracks and selected Items (active take), processed together |
| FX - Hide All FX Windows (entire project) | **Entire project**: every track, every Item (active take), and **Master**; no selection needed |

**Behavior**

- Closes both the **FX Chain window** and each FX’s **individual floating window**.
- In track-involved variants, selecting Master also closes its FX windows.
- `Hide All` clears scattered FX windows from the screen at once, often used after opening many FX to tidy the desktop.

**Notes**

- Only Hide offers the “entire project” scope (i.e. `FX - Hide All FX Windows (entire project)`); there is **no** corresponding project-wide Show (to avoid spawning hundreds of windows at once and freezing the UI).

---

## Report Mono FX

Scan the **entire project**, list all FX that **output mono**, and print them to REAPER’s console window.

| Action List display name | Scope |
| --- | --- |
| FX - Report Mono FX | Every track’s FX Chain, active-take FX on every Item, **Master's** FX Chain, and **Monitor FX** on Master |

**Behavior**

- Criterion: an FX whose **output has only 1 channel** counts as a mono FX. Commonly happens when an FX was left in mono mode and collapses the signal to mono.
- Each entry in the report notes its location: track number and name, whether it is a track FX or an Item FX, and the FX name.
- Total count is shown at the end; if none are found, it reports “No mono FX found”.

**Notes**

- This is a **read-only check**: it only looks, does not modify or delete any FX, and does not create an Undo.
- Results are output to the REAPER console; use the report to address each FX manually.
