# gridPlace

GridPlace is a real-time collaborative grid where authenticated users collectively mark cells with colors. Each cell can be marked only once, and all updates are reflected instantly for every connected user, forming a shared and evolving canvas.

## How It Works
- The application renders a fixed `n × m` grid of cells.
- Users sign up or sign in and select a color.
- Clicking an unmarked cell permanently assigns it the selected color.
- Hovering over a cell displays whether it is marked and which user marked it.
- Grid state is persisted in the database, ensuring consistency across page reloads and reconnects.

## Real-Time Updates
- The server maintains the grid as the single source of truth.
- On a cell interaction, the client emits a WebSocket event containing the cell coordinates and color.
- The server validates the request, updates the database, and broadcasts the change to all connected clients.
- Clients apply only the updated cell, keeping the grid synchronized in real time.

## Trade-offs and Design Decisions
- **Database-backed state**: Grid data is stored in the database so the state survives refreshes and reconnects.
- **Single-write cells**: Each cell can be marked only once, eliminating conflicts from simultaneous updates.
- **Server-authoritative updates**: All state changes are validated on the server to prevent race-condition inconsistencies.
- **Minimal UI**: Native browser tooltips are used to show cell ownership without introducing unnecessary UI complexity.
