# Assistants - Mirror Actions

A set of actions for **Mirror (mirror Items)**: manually apply large text display, clear all, burn Mirrors into static Regions, and batch-name Mirrors from track names. (What Mirror, Note, and large text display are can be found in the Mirror user manual.)

---

## Variants

| Action List display name | What it does |
| --- | --- |
| `Assistants - Mirror - Apply Stretched Text to All Mirrors` | Apply large text display to **all** Mirrors in the project |
| `Assistants - Mirror - Apply Stretched Text to Selected Mirrors` | Apply large text display only to **currently selected** Mirrors |
| `Assistants - Mirror - Clear All Mirrors` | Clear all Mirrors and their grouping with one click |
| `Assistants - Mirror - Create Static Regions from Mirrors` | Burn Mirrors that have Notes into static Regions that no longer follow |
| `Assistants - Mirror - Apply Track Name to Mirror Notes` | Force the selected track name onto all Mirror Notes on that track (`_01/_02` suffix added when there are ≥2 Mirrors) |

---

## Apply Stretched Text (two variants)

Enlarge the Mirror’s Note text to fill the entire block so it’s readable from a distance. The two variants differ only in **scope**: one processes all Mirrors, the other only selected Mirrors; the rest are untouched.

Common rules:

- **Only affects Mirrors that already have Notes**: empty Notes are ignored at the underlying level and automatically skipped.
- Mirrors already in large-text mode are skipped; not reprocessed.
- The `All` variant shows a notification telling you how many were processed, even if none needed processing.

This is a **manual one-shot trigger** for large text display, more efficient than leaving `Auto Mirror Large Text Display` always on; recommended for use when needed. The `Selected` variant is useful when you only want to highlight a few local Mirrors. The action is one Undo.

---

## `Assistants - Mirror - Clear All Mirrors`

One-click “reset” of the Mirror system:

- Deletes **all Mirrors** in the project.
- Clears Item grouping caused by Mirrors.

Note: Only deletes **Mirror-system objects**; **Regions you created yourself are not affected**. Use this when Mirrors are messed up or you want to start over. The action is one Undo.

---

## `Assistants - Mirror - Create Static Regions from Mirrors`

Turn Mirrors that have Notes **into a batch of static Regions** — generate Regions based on the Mirror’s current position and length; afterwards these Regions **no longer follow the Mirror**.

- Generates a **Region** over the Mirror’s current time range.
- **Region name = first line of the Note** (only the first line is used if there are multiple lines).
- Mirrors with empty Notes are skipped.

**What “static” means**: These Regions are frozen at the Mirror’s position and length at the moment of creation, and afterwards are **not managed by Mirror and will not follow Mirror movement** — even if you later `Clear All Mirrors` or disable Mirror, they remain. Suitable for the scenario where “the segments and naming are finalized and you want to permanently freeze the current layout”. The action is one Undo.

---

## `Assistants - Mirror - Apply Track Name to Mirror Notes`

Unlike the large-text and burn-to-Region actions above, this action handles **Mirror naming**, direction **track name → Mirror Note** (using the track name to fill the Mirror Note).

Can also be triggered from the **Extensions menu** or the **track context menu**.

**Good for**: the track **already has a good name**, and you just want the Mirror Notes on that track to use the track name **without having to name each Mirror individually**. One click, all Mirrors on the track are named.

Applies to **all selected tracks**, each track processed independently. For each track:

- **Force overwrite** — regardless of what the Mirror Note previously said, it is rewritten with the track name; no merging, no preserving.
- **Track has ≥2 Mirrors**: left-to-right along the timeline, append suffixes `_01`, `_02`… to the track name (two-digit zero padding; naturally expands to three digits at the 100th). **Only supports `_01 _02` style `underscore + number` suffixes**; letter suffixes (`_a/_b`) or other separators are not supported.
- **Track has only 1 Mirror**: no suffix; the Note equals the track name itself.
- **Track name is empty**: all Mirror Notes on that track are **cleared** (so you won’t get empty-name `_01` suffixes).
- **Track has no Mirrors**: **silently skipped**, no error or dialog.

After writing Notes, it **also applies large text display** (same as `Apply Stretched Text`), ensuring the result is enlarged. The whole action is one Undo.

> It does not conflict with the always-on `Auto Mirror Track Name` (opposite direction: Mirror Note → track name): when both basenames agree, `Note=Gun_01` and `track name=Gun` converge consistently.
