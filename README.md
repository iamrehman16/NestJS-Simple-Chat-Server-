# NestJS Chat Server using Socket.IO

A basic real-time chat server built with **NestJS** and **Socket.IO** to understand WebSocket fundamentals, gateways, and server–client communication.

---

## What I Learned

- **Socket.IO fundamentals**
  - Event-based communication
  - Custom events such as `sendMessage` and `message`
  - Gateway lifecycle hooks: `handleConnection()` and `handleDisconnect()`

- **TypeScript concepts**
  - Type inference in functions
  - Conditional return types and union type inference
  - Why type inference does not weaken type safety

- **NestJS design practices**
  - Why **Services** often rely on inferred return types
  - Why **Controllers** usually define explicit return types as API contracts
  - Clear separation of responsibilities between Controllers, Services, and Gateways

- **WebSocket architecture**
  - Singleton nature of WebSocket Gateways
  - Persistent socket connections per client
  - Difference between HTTP request–response and WebSocket event-driven models

- **Server response strategies**
  - Unicast responses using `client.emit()`
  - Broadcast messages using `client.broadcast.emit()`
  - Global messaging using `server.emit()`
  - Conceptual understanding of rooms and targeted messaging
