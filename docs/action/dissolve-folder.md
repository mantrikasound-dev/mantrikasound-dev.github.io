# Assistants - Folder - Dissolve Folder(s)

Dissolves the currently **selected Folder track(s)** — the Folder wrapper disappears, and the child tracks stay where they are, becoming normal tracks (or promoted into the parent Folder above).

---

## Behavior details

- Only affects **selected Folder parent tracks**; selecting normal tracks has no effect.
- Multiple Folders can be dissolved at once.
- Child tracks **remain in place**; they are not deleted or moved, only detached from the Folder.
- **Nested scenario**: dissolving an inner Folder automatically **promotes** its child tracks one level up into the outer Folder, rather than ejecting them to the project top level.
- The Folder track itself is **kept** and becomes an empty normal track (delete it yourself with Ctrl+Del if you don't need it).

---

## ⚠️ Note: Item grouping is cleared

During dissolution, the **Item Group IDs on this Folder and all its child tracks are reset to zero**. The reason: after dissolving, these Items are no longer in the same Folder context, and keeping their groups would leave "orphan" groupings with no visible counterpart, causing selection and editing problems later.

If you rely on grouping relationships, **make a note of which Items are grouped** and regroup them after dissolving.

---

## Automatic side effects

- Triggers **auto-coloring** re-evaluation (if you have rules enabled)
- Refreshes **Mirror sync**
- Preserves the original track selection after the operation

The action itself counts as a single Undo step; one Ctrl+Z restores the whole operation, including the group ID reset.
