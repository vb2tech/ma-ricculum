Add a new artifact to the ma-ricculum site and deploy it — fully automated, no user input required.

## Steps

1. **Find unregistered HTML files**
   - Read `src/artifacts/index.js` to see what's already registered
   - List files in `public/artifacts/`
   - Identify any `.html` files not yet imported in `index.js`
   - If none, tell the user to drop their `.html` file into `public/artifacts/` first, then re-run `/add-artifact`.

2. **For each unregistered file, derive all metadata automatically — do NOT ask the user:**
   - **Slug**: the filename without `.html` (e.g. `division-quest`)
   - **Display name**: title-case the slug, replacing hyphens with spaces (e.g. `Division Quest`)
   - **Description**: read the first ~50 lines of the HTML file to understand its purpose, then write a short 3–6 word description in the style of existing entries (e.g. `"Quick arithmetic practice"`, `"Interactive division challenges"`, `"Percentages · Proportional Relationships · Unit Rates"`). Use `·` as a separator if listing topics.
   - **ComponentName**: PascalCase version of the slug (e.g. `DivisionQuest`)

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

4. **Update `src/artifacts/index.js`** — add the import at the top and a new entry to the array:
   ```js
   import <ComponentName> from './<ComponentName>.jsx'
   // add to artifacts array:
   { id: '<slug>', name: '<Display Name>', description: '<description>', component: <ComponentName> }
   ```

5. **Run `npm run build`** to verify no errors.

6. **Commit and push** (include both the HTML file and the new source files):
   ```
   git add public/artifacts/<filename>.html src/artifacts/<ComponentName>.jsx src/artifacts/index.js
   git commit -m "add: <Display Name> artifact"
   git push origin main
   ```
   GitHub Actions will deploy automatically (~60s).

## Notes
- Never prompt the user for name, description, or slug — infer everything from the filename and HTML content.
- For React JSX artifacts (not HTML), the component goes directly in `src/artifacts/` with no iframe wrapper needed — just import and register it.
