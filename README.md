# Slate Tasks — Expo React Native To‑Do App

A minimal, fast, and offline‑first to‑do list built with Expo (React Native) and AsyncStorage. Create tasks, mark them as done, and your data persists across app restarts.

## Highlights
- **Offline-first**: Tasks are stored locally with `@react-native-async-storage/async-storage`.
- **Simple & fast**: Instant add, toggle done, and delete interactions.
- **Clean UI**: Modern styles using Tailwind-like utility classes (via NativeWind or similar setup).
- **Lightweight state**: Plain React state hooks, no external state manager.

## Tech Stack
- **Runtime**: React Native (Expo)
- **Language**: TypeScript/TSX
- **Storage**: `@react-native-async-storage/async-storage`
- **Styling**: Tailwind-style utility classes applied via `className` (e.g., NativeWind)

## App Structure
Only the key screen is shown here; your project may include additional files.
- `components/Home-Screen.tsx`: Main screen with input, task list, and persistence logic.

## How It Works
- Tasks are stored as an array of strings (`taskTitles`).
- Completed tasks are tracked as an array of indices (`doneTask`).
- Data is persisted to AsyncStorage with the following keys:
  - `taskTitles`: JSON-encoded string[]
  - `doneTask`: JSON-encoded number[] of indices
- On delete, completed indices are reindexed so completion states stay aligned with the list.

Data model example:
```json
{
  "taskTitles": ["Buy milk", "Ship package", "Write report"],
  "doneTask": [1]
}
```

## Features in `Home-Screen.tsx`
- Add a new task (trims whitespace; disabled button for empty input)
- Toggle task done/undone (✓/○)
- Delete a task (reindexes done state to remain consistent)
- Persistent counts and a subtle debug count display

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm
- Expo CLI (optional): `npm i -g expo`
- Expo Go app on your device (for quick testing) or an emulator/simulator

### Install
```bash
# from project root
npm install
# or
yarn
# or
pnpm install
```

### Run (Development)
```bash
npx expo start
```
Then:
- Press `i` to launch iOS simulator (macOS only), or
- Press `a` to launch Android emulator, or
- Scan the QR code with the Expo Go app on your device.

### Build (Optional)
Use EAS Build for production binaries:
```bash
npx expo prebuild           # if you use native code or need prebuild
npx expo run:android        # local dev build (Android)
npx expo run:ios            # local dev build (iOS, macOS only)
# or
npx expo export -p web      # optional web export, if configured
```

## Usage
- Type into the input and tap "Add Task".
- Tap the circle to toggle completion; completed tasks show a ✓ and line‑through style.
- Tap × to delete a task.
- Task and completion counts are shown under the title. Data persists automatically.

## Styling Notes
The UI uses `className` with Tailwind-like utilities (e.g., `bg-card`, `text-text-primary`). Ensure a compatible setup (such as NativeWind) is configured in your project for these classes to take effect. If not using NativeWind, replace `className` styles with `StyleSheet` or your preferred styling method.

## Key Implementation Snippets
- Load and save tasks with AsyncStorage keys `taskTitles` and `doneTask`.
- Reindex `doneTask` on deletion so stored indices remain correct.

```tsx
// Pseudocode summary
const [taskTitles, setTaskTitles] = useState<string[]>([]);
const [doneTask, setDoneTask] = useState<number[]>([]);

useEffect(() => {
  // load taskTitles and doneTask from AsyncStorage
}, []);

useEffect(() => {
  // persist doneTask when it changes
}, [doneTask]);

const addTitle = () => { /* add trimmed title, persist */ };
const taskdone = (index: number) => { /* toggle index in doneTask */ };
const deleteTitle = (index: number) => { /* remove; reindex doneTask; persist */ };
```

## Troubleshooting
- If styles don’t apply, verify NativeWind/Tailwind integration and that `className` is supported.
- If data doesn’t persist, confirm `@react-native-async-storage/async-storage` is installed and properly linked (Expo manages this automatically in managed workflow).
- If Metro bundler won’t start, clear caches:
```bash
npx expo start -c
```

## Roadmap Ideas
- Edit task titles
- Task detail view, notes, due dates
- Sort and filter (active/completed)
- Theming (dark/light system sync)
- Migrate from index-based completion to ID-based tasks

## Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -m "feat: add your feature"`
4. Push branch: `git push origin feat/your-feature`
5. Open a Pull Request

## License
MIT — see `LICENSE` (or include your preferred license). 