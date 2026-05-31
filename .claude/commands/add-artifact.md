Add a new artifact to the ma-ricculum site and deploy it.

Usage: `/add-artifact [type]`
- `/add-artifact game` — register as a game (shown under Math Games picker)
- `/add-artifact lesson` — register as a lesson (shown under Unit Lessons)
- `/add-artifact` — infer type from the HTML content, then confirm with user

## Steps

1. **Find unregistered HTML files**
   - Read `src/artifacts/index.js` to see what's already registered
   - List files in `public/artifacts/`
   - Identify any `.html` files not yet imported in `index.js`
   - If none found, tell the user to drop their `.html` into `public/artifacts/` first, then re-run

2. **Determine the type**
   - If a type argument was passed (`game` or `lesson`), use it directly
   - If no argument, read the first ~60 lines of the HTML file and infer:
     - Signs of a **game**: scoring, timers, win/lose states, "play", "challenge", arcade-style UI
     - Signs of a **lesson**: study guide, curriculum topics, exercises with explanations, unit/chapter references
   - Tell the user your inference and the reason in one sentence, then ask: *"Confirm as `[type]`? (y / or type the correct one)"*
   - Wait for confirmation before proceeding

3. **Derive all metadata automatically — do NOT ask the user:**
   - **Slug**: filename without `.html` (e.g. `division-quest`)
   - **Display name**: title-case the slug, replacing hyphens with spaces (e.g. `Division Quest`)
   - **Description**: read the HTML to understand the artifact's purpose, write a short 3–6 word description matching the style of existing entries (e.g. `"Quick arithmetic practice"` or `"Percentages · Proportional Relationships · Unit Rates"`)
   - **ComponentName**: PascalCase of the slug (e.g. `DivisionQuest`)

4. **Create the JSX wrapper** at `src/artifacts/<ComponentName>.jsx`:
   ```jsx
   export default function <ComponentName>() {
     return (
       <iframe
         src="./artifacts/<filename>.html"
         style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
         title="<Display Name>"
       />
     )
   }
   ```

5. **Update `src/artifacts/index.js`** — add the import at the top and a new entry with the correct `type`:
   ```js
   import <ComponentName> from './<ComponentName>.jsx'
   // add to artifacts array:
   { id: '<slug>', type: '<game|lesson>', name: '<Display Name>', description: '<description>', component: <ComponentName> }
   ```

6. **Run `npm run build`** to verify no errors.

7. **Commit and push**:
   ```
   git add public/artifacts/<filename>.html src/artifacts/<ComponentName>.jsx src/artifacts/index.js
   git commit -m "add: <Display Name> artifact"
   git push origin main
   ```
   GitHub Actions deploys automatically (~60s).

## Notes
- `type: 'lesson'` → appears directly in the Unit Lessons sidebar section
- `type: 'game'` → appears in the Math Games card picker
- For React JSX artifacts (not HTML), no iframe wrapper needed — drop directly in `src/artifacts/`, import, and register with the correct type
- If the user passes an unrecognized type, tell them the valid options are `game` and `lesson`
