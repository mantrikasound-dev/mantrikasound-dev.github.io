# Qi: Apply Preset 1 ~ 5

Apply the Nth Qi preset to the selected Items without opening the window, generating variants instantly. There are five Actions (`Qi: Apply Preset 1` through `Qi: Apply Preset 5`); they behave identically, but each loads the corresponding preset slot.

> For what a "preset" is and how to save a set of Qi parameters into slots 1–5, see **Section 10 of the Qi user manual (qi.md)**, or press the **Preset** button inside the Qi window.

---

## How to use

1. First, save the desired parameters into a preset slot (1–5) inside the Qi window.
2. Assign a shortcut to the corresponding `Qi: Apply Preset N` Action.
3. Select one or more Items on the timeline.
4. Press the shortcut → **variants are generated without opening the window**.

Ideal for quick work when you already know exactly what a preset does.

---

## Behavior details

- Uses the parameters saved in the corresponding slot to generate variants for the selected Items in one go (equivalent to pressing Generate in the Qi window, but with no window opened and no blue preview).
- **No Items selected** → shows "Please select items first." and does nothing.
- **The slot is empty** → shows "Preset N is empty."; save a preset in the Qi window first.
- When multiple Items are selected, they are treated as **one group** and copied together, just like in Qi.

---

## Tip

- Assign a shortcut to each of the five presets (for example, Ctrl+1 through Ctrl+5) so you can "select Items → press key → instantly get a different style variant".
- How to adjust, save, and set default presets is all done inside the Qi window; see qi.md for details.
