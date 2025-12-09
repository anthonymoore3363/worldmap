# World Map Fix (NgModule bootstrap)

This zip contains ONLY the files you need to replace in your existing Angular project to fix the CI build errors.

## What to do

1. In your repo, back up your current `src/` folder.
2. Copy the contents of this zip into your existing project so these paths exist:
```
src/main.ts
src/index.html
src/assets/map.svg
src/app/app.module.ts
src/app/app.component.ts
src/app/app.component.html
src/app/app.component.scss
src/app/app-routing.module.ts
src/app/components/world-map/world-map.component.ts
src/app/components/world-map/world-map.component.html
src/app/components/world-map/world-map.component.scss
src/app/pages/map-page/map-page.component.ts
src/app/pages/map-page/map-page.component.html
src/app/pages/map-page/map-page.component.scss
src/app/services/worldbank.services.ts
src/app/types/country-info.ts
```
3. **Delete** any stray standalone files if present: `src/app/app.ts` and `src/app/app.config.ts`.
4. Clean & install dependencies:
   - PowerShell at project root:
```
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install --legacy-peer-deps
Remove-Item -Recurse -Force .angular, dist -ErrorAction SilentlyContinue
ng serve -o
```
5. Commit and push; your GitLab CI build should now succeed (the production build uses `main.ts` NgModule bootstrap).

> Note: `assets/map.svg` here is a tiny placeholder. Keep your real world SVG if you have one.
