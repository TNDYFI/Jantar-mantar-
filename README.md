# Reclaim Jantar Mantar 3D — DYFI Tamil Nadu Edition (v1.1)
Open `index.html` (works offline; Firebase features switch off by themselves).
## Firebase setup
1. In `index.html` replace `YOUR_EXISTING_FIREBASE_API_KEY` with your project's web API key (project `server-41203`).
2. Console > Authentication > enable **Anonymous**; add your hosting domain under Authorized domains.
3. Realtime Database > Rules: paste `firebase-database.rules.json` and publish. Test in the Rules Playground before production.
4. Reactions need the function: `cd functions && npm i && firebase deploy --only functions`.
5. Moderators: set custom claim `mod:true` with the Admin SDK; they can write `game/comments/{id}/hidden=true` (hide) or delete comments.
## Presence rule
Counts come from the newest 200 presence records refreshed every 30 s; records older than 90 s are ignored. "Active sessions" are browser tabs, not unique people. Paused counts as viewing.
## Limits
Score bounds in the rules are plausibility checks only; client scores are not tamper-proof. Use a Cloud Function for competitive ranking.
