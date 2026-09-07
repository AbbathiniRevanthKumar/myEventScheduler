import { WebSocket } from "ws";

class ConnectionManager {
  private clients: Set<WebSocket> = new Set();
  addClient(ws: WebSocket) {
    this.clients.add(ws);
  }

  removeClient(ws: WebSocket) {
    this.clients.delete(ws);
  }

  broadCast(message: object) {
    const payload = JSON.stringify(message);
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      } else {
        this.clients.delete(client);
      }
    });
  }
}


export const connectionmanager = new ConnectionManager();