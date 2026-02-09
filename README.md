# gridPlace
GridPlace is a real-time collaborative grid where authenticated users collectively mark cells with colors. Each cell can be marked only once, and updates are instantly visible to all connected users, resulting in a shared, evolving canvas.

How It Works:
-The application displays a fixed n × m grid of cells.
-Users sign up / sign in and select a color.
-Clicking an unmarked cell permanently marks it with the selected color.
=Hovering over a cell shows whether it is marked and which user marked it.
=Grid state is persisted in the database, allowing consistency across reloads and reconnects.

Real-Time Updates:
-The server acts as the single source of truth for grid state.
-When a user clicks a cell, the client emits a WebSocket event with cell coordinates and color.
-The server validates the request, updates the database, and broadcasts the cell update to all connected clients.
-Clients apply only the updated cell, keeping the grid synchronized in real time.

Trade-offs & Design Decisions:
-Database-backed grid: Ensures grid state survives refreshes and reconnects.
-Single-write cells: Each cell can be marked only once, preventing conflicting updates.
-Server-authoritative logic: All updates are validated on the server to avoid race-condition inconsistencies.
-Minimal UI: Native browser tooltips are used to display cell ownership without adding UI complexity.
