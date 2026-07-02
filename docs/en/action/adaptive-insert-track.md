# Assistants - Track - Adaptive - Insert Track (folder aware)

Behaves like REAPER's own "Insert new track", but **when you insert after the last track inside a Folder, the new track stays inside the Folder** instead of being pushed outside.

---

## Why this exists

REAPER's native `Track: Insert new track` has this behavior:

```
▼ My Folder
 Track A
 Track B ← last selected track in the Folder
Press the new-track shortcut

▼ My Folder
 Track A
 Track B
New Track ← ⚠️ ends up outside the Folder!
```

This Action fixes that scenario — the new track stays **inside the Folder** and naturally becomes its new last child:

```
▼ My Folder
 Track A
 Track B
 New Track ← still inside the Folder
```

---

## Behavior details

- If the **Last Touched** track is **not** the last track in a Folder → uses REAPER's native Insert behavior, exactly like the stock action.
- If it **is** the last track in a Folder → uses special insertion logic so the new track takes over the Folder close point, and the previous last track becomes the second-to-last.
- If there is no Last Touched track → also uses native Insert behavior.
- After the operation, the **new track is selected**, matching native behavior.
