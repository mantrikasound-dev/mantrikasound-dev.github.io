# Track Operations

A set of quick actions for tracks: manage visibility, collapse/expand Folders, clean up unused tracks, one-click Solo / Mute, and auto-color. Organized by function below; each section lists the exact Action List display name and behavior.

> Common convention: cleanup actions first select all found tracks for preview, then show a confirmation dialog before making changes; all actions in this article support full revert with one Ctrl+Z; Master track is never deleted.

---

## Show / Hide Visibility

A paired set of actions: shrink the project down to only the tracks you care about, then one-click restore the view. Very useful when there are too many tracks.

| Action List display name | Behavior |
| --- | --- |
| `Track - ShowOnly Select Track` | Shows only the currently selected tracks and hides all others from the TCP. Does nothing if no tracks are selected. If the selection is a **collapsed Folder**, **all its child tracks** are automatically shown together. Before hiding, it remembers each track height and the current view range for later restoration. After completion, jumps to the first visible track; if it has Items, the view automatically zooms to their range. |
| `Track - Show All Tracks` | Re-shows all tracks previously hidden by ShowOnly, restoring each track’s **pre-hidden height** and the **pre-hidden horizontal view range** (zoom/scroll position). After completion, jumps back to the **first track that was selected when ShowOnly was used** and scrolls to it. |

**When to use**: when the project has too many tracks, select the ones you want to work on and use ShowOnly to keep only them; use Show All to restore the scene when done.

---

## Collapse / Expand Folder

A paired set of actions: collapse or expand all Folders in the project at once. Useful in large projects for switching between “viewing structure only” and “expanding to work”. Each Folder is processed; Folders already in the target state are skipped.

| Action List display name | Behavior |
| --- | --- |
| `Track - Folder - Collapse All Folders` | Collapses all Folders to minimum, reducing the track list to rows of Folder headers. After collapsing, selection jumps to the outermost Folder containing your originally selected track and scrolls it to the **center** of the screen. |
| `Track - Folder - Expand All Folders` | Expands all Folders, revealing all child tracks inside. After expanding, **your original track selection is preserved**, and the originally selected track is scrolled to the **top** of the screen. |

**When to use**: collapse all for a large-project overview, seeing only Folder structure; expand all to continue working.

---

## Clean Up Unused Tracks

A set of cleanup actions: find unused tracks in the project by different criteria and delete them. After deletion, the action scans again to remove any tracks that became empty as a result.

| Action List display name | Criterion |
| --- | --- |
| `Track - Cleanup Empty Tracks` | Completely empty tracks: must **simultaneously** have no Items, no plugins, no automation envelopes, no Sends / Receives, and not be record-armed (red circle). **Folder tracks** are excluded and never deleted. |
| `Track - Cleanup Unused Tracks (no content, no routing)` | Tracks with no effective content and no incoming signal. Must **simultaneously** have no effective content (either no Items at all, or **all Items muted also counts as no content**), no plugins, and no Receives. Note it **allows Sends out — only checks for Receives in**. **Folder tracks** are excluded and never deleted. |
| `Track - Cleanup Muted Tracks` | Any track in Mute state (**content is irrelevant**). If a muted track is a **Folder track**, it is **deleted together with all its child tracks**. |

> ⚠️ Muted Folders are **removed root and all**, including child tracks that were not muted. Check the preview selection in the dialog before confirming.

**When to use**: Empty for blank tracks created but never used; Unused for tracks that were created but never actually contributed (content fully muted and no incoming signal); Muted to finally clear tracks you muted one by one during auditioning.

---

## One-Click Solo / Mute

A set of toggle actions: quickly Solo or Mute tracks; press again to restore. The difference is the target — either the single last-operated track, or a batch based on the current Item selection.

| Action List display name | Target / Behavior |
| --- | --- |
| `Track - Adaptive - Toggle Solo State (single track)` | Toggles Solo on the **last-operated track** (clicked, selected, or parameter-adjusted; Master does not count). If this is the **only track currently soloed** → unsolo it; otherwise clear all Solos and **solo only this one**. In either case, the play cursor is moved to just before the **nearest Item** on that track (with a little pre-roll). After completion, only this track is selected for visual feedback. |
| `Track - Toggle Solo State From Selected Items` | Finds which tracks contain the selected Items (deduplicated) and toggles Solo on those tracks in batch: **any un-soloed → solo all; all soloed → unsolo all**. In either case, the play cursor is moved just before the **earliest selected Item** (with pre-roll; muted Items do not count). |
| `Track - Toggle Mute State From Selected Items` | Finds which tracks contain the selected Items (deduplicated) and toggles Mute on those tracks in batch: **any un-muted → mute all; all muted → unmute all**. |

**When to use**: single-track quick audition of one track; batch mode lets you select a group of Items across multiple tracks and Solo / Mute those tracks at once without clicking each one.

---

## Auto Color

| Action List display name | Behavior |
| --- | --- |
| `Track - Assign Auto Color to Selected` | Applies auto-color rules to the **currently selected tracks**. The feature must first be **enabled** in the auto-color settings, otherwise does nothing. **Skips Folder tracks** and **tracks that already have a manually assigned color** (does not override your chosen colors); only colors remaining normal tracks according to the rules. |

**When to use**: after creating or importing a batch of uncolored tracks, select them and one-click apply a consistent color scheme.
