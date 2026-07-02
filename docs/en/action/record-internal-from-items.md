# Record - Internal Record From Selected Items

Records the sound of the **selected Items after passing through their entire signal chain** into a new audio file inside the project — automatically following Sends and Folder routing to the summing point, creating a new record track, and cleaning up when done.

Useful for "baking" a group of sounds with FX and routing into a single dry-ready stem without manually patching cables.

---

## Behavior

When triggered, the Action automatically:

1. Starts from the tracks of the selected Items and **follows the signal downstream** (Folder parent sends and explicit Sends are both followed) to find the final **summing-point track(s)**.
2. Creates a new record track at the **top of the project** (named `MTK_InternalRec`).
3. Routes the summed signals from each summing point **into this record track**, recording the processed sound.
4. Sets the recording range based on the overall range of the selected Items, with **0.5 seconds of pre-roll and 1 second of tail**.
5. Starts recording and **stops automatically** at the end.
6. After stopping, **removes the temporary routing** and restores the pre-recording state (track arm states, time selection, loop state, and cursor position).

---

## Notes

- If no Items are selected, a notification is shown and nothing happens.
- If no valid summing point is found (for example, the selected track goes straight to Master), a notification is shown and nothing happens.
- At start, the Action **temporarily changes**: stops any playing/recording, turns off loop, disarms all tracks, arms only the record track, and sets the time selection — all of which are **restored** after recording.
- The record track captures the sound **after the final summing point**; signals that have already reached Master are not followed (to avoid re-recording the main output).
- Muted Sends are skipped and ignored for routing.
- Only one internal recording can run at a time; triggering again while recording is in progress shows a notification.
- To stop midway, press REAPER's Stop button; this Action will detect it and finish cleanup / state restoration automatically.
