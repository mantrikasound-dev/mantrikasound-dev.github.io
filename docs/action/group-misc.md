# Miscellaneous Actions

A set of independent small utility tools.

---

## 1. Toggle Monitor Dim

**Action List display name: Misc - Dim - Toggle Monitor Dim (monitoring FX)**

One-click **dim the monitoring level**, press again to restore. Specifically lowers monitoring loudness, **without touching any volume in the project**, so export / render is completely unaffected.

### Behavior

- First trigger: automatically inserts a volume smoother into Master’s Monitor FX chain and lowers monitoring by a fixed dB amount.
- Subsequent triggers: toggles between “dimmed” and “restored”.
- The dB reduction is configured in **Preferences** (default -15 dB).

### Notes

- Only affects Master’s **Monitoring FX** — what you hear in your ears, not the project signal chain, and does not affect rendering.
- When in the “dimmed” state, this action appears **lit (on)** so you can tell at a glance that monitoring is dimmed.
- The first time, a notification tells you the smoother has been added and by how many dB.

---

## 2. Enable LFO for Last Touched Parameter

**Action List display name: Misc - LFO - Enable for Last Touched Parameter**

Opens LFO modulation for the **last parameter you touched** and pops up the Parameter Modulation panel, saving you from manually right-clicking to find the entry.

### Usage

1. Move the parameter you want to modulate (drag a knob/fader so it becomes the “last touched” parameter).
2. Trigger this action.

Then:

- Enables **LFO modulation** for this parameter.
- Automatically opens the **Parameter Modulation** panel so you can adjust LFO rate, shape, and amount.

### Notes

- Supports parameters on Track FX and Take FX.
- Only affects the **last touched** parameter; does nothing if no parameter has been moved.
- Only responsible for “enable LFO + open panel”; the specific LFO waveform and parameters are still set by you in the panel.

---

## 3. Locate Source Files in Explorer

**Action List display name: Misc - Locate Source Files in Explorer**

Locate the source audio files of selected Items in the system file explorer — directly opens the containing folder and highlights the file.

### Behavior

- For each selected Item, finds its source audio file and locates it in the file explorer.
- **The same file is opened only once** (multiple Items pointing to the same source file will not spawn duplicate windows).
- However many different source files are found, that many locations are opened.

### Notes

- Does nothing if no Items are selected.
- Only processes audio sources; **MIDI** does not count as a source file and is skipped.
- When more than **3** different files need to be opened, a dialog first asks whether to continue, to avoid flooding the screen with windows.
