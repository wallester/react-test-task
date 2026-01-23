# Frontend Live Task (90 minutes) — Recipes Explorer

## Context
This repository contains a small React application that shows a list of recipes and a recipe details page.

The app uses:
- React 18
- Redux Toolkit
- React Router v5
- axios
- lodash
- clsx / classnames
- rc-* components (rc-menu, rc-dropdown, rc-dialog)
- SCSS (SASS)

API (real endpoint): DummyJSON  
- `GET https://dummyjson.com/recipes?limit=10&skip=0`  
- `GET https://dummyjson.com/recipes/{id}`  

---

## Session format
This is a collaborative live session (~90 minutes).

You may use Google and/or AI tools if you want.  
We care about **how you reason, structure code, and explain tradeoffs**, not memorization or typing speed.

Recommended flow:
- 10 min — clarify requirements, plan
- 60 min — implement selected improvements
- 20 min — walkthrough, polish, discussion

---

## Starting point
Already implemented:
- `/recipes` list page with basic paging UI
- `/recipes/:id` details page with an example `rc-dialog`
- Redux Toolkit store and slices
- Basic loading / error / empty states
- Real API integration (DummyJSON)

Intentionally **not implemented**:
- URL query synchronization
- request cancellation / stale response protection
- real sorting behavior
- robust search behavior decisions
- normalized entities or caching

These gaps are intentional and part of the task.

---

## Your task
Pick **ONE Main option** and **ONE Optional option** from the lists below.

If you finish early, you may improve UX or code quality in a way you think is most valuable.

---

## Main options (choose 1)

### Option A — URL-driven list state
Make `/recipes` reflect and restore list state via URL query parameters:
- `q` (search query)
- `page`
- (optional) `pageSize`
- (optional) sorting fields

**Acceptance criteria**
- UI updates the URL when state changes
- Page refresh restores the same state
- Back/forward navigation works correctly

---

### Option B — Async correctness for search
Improve search behavior so fast typing does not cause incorrect UI updates:
- decide on client-side vs server-side search
- handle request lifecycle correctly
- prevent stale results from appearing

**Acceptance criteria**
- Rapid input changes never show outdated results
- Loading/error states remain predictable
- Logic is not hidden inside UI components

---

### Option C — Sorting implementation
The UI contains a “Sort (TODO)” dropdown using rc-* components.

Implement sorting either:
- client-side (sorting loaded results), or
- server-side (by adjusting API usage)

**Acceptance criteria**
- Sorting visibly changes the list
- Selected sort is stored in Redux state
- Sorting works together with paging/search

---

### Option D — State modeling improvement
Refactor Redux state to be more scalable, for example:
- normalize recipes by id, or
- add caching for recipe details

**Acceptance criteria**
- Clear explanation of the new state shape
- List and details stay consistent
- No unnecessary complexity for this app size

---

## Optional options (choose 1)

Pick one:
1. Add a **page size selector** (10 / 20 / 50)
2. Improve **error handling** and retry behavior
3. Add small **UI polish** (skeletons, layout improvements)
4. Add a **Favorites** feature (Redux-managed, optional persistence)
5. Improve **performance hygiene** (memoized selectors, fewer rerenders)

---

## What we evaluate
We evaluate:
- Correctness and predictable UI states
- Redux state modeling and separation of concerns
- Async reasoning and data flow
- Code readability and maintainability
- Ability to explain tradeoffs and next steps

We do **not** evaluate:
- pixel-perfect UI
- number of features implemented
- typing speed
- framework trivia

---

## Walkthrough discussion
In the last part of the session, please be ready to explain:
- what you implemented and why
- tradeoffs you made due to time
- what you would improve next if this were a real project

---

## Notes
If anything is unclear, ask questions during the session — that’s part of the evaluation.
