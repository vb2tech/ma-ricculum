Add a new artifact to the ma-ricculum site and deploy it.

## Steps

1. **Find unregistered HTML files**
   - Read `src/artifacts/index.js` to see what's already registered (look for existing import paths)
   - List files in `public/artifacts/` 
   - Identify any `.html` files not yet imported in `index.js`

2. **For each unregistered file**, ask the user:
   - Display name (e.g. "Unit 6 Study Guide")
   - Short description (e.g. "Percentages · Proportional Relationships")
   - A slug ID (suggest one based on the filename, e.g. `unit6-study-guide`)

3. **Create the JSX wrapper** at `src/artifacts/<ComponentName>.jsx`:
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
   Derive `<ComponentName>` from the slug in PascalCase (e.g. `unit6-study-guide` → `Unit6StudyGuide`).

4. **Update `src/artifacts/index.js`** — add the import at the top and a new entry to the array:
   ```js
   import <ComponentName> from './<ComponentName>.jsx'
   // add to artifacts array:
   { id: '<slug>', name: '<Display Name>', description: '<description>', component: <ComponentName> }
   ```

5. **Run `npm run build`** to verify no errors.

6. **Commit and push**:
   ```
   git add .
   git commit -m "add: <Display Name> artifact"
   git push origin main
   ```
   GitHub Actions will deploy automatically (~60s).

## Notes
- If the user already placed the HTML file in `public/artifacts/` before running this command, skip straight to step 2.
- If there are no unregistered files, tell the user to drop their `.html` file into `public/artifacts/` first, then re-run `/add-artifact`.
- For React JSX artifacts (not HTML), the component goes directly in `src/artifacts/` with no iframe wrapper needed — just import and register it.
