"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionmanager = void 0;
const ws_1 = require("ws");
class ConnectionManager {
    clients = new Set();
    addClient(ws) {
        this.clients.add(ws);
    }
    removeClient(ws) {
        this.clients.delete(ws);
    }
    broadCast(message) {
        const payload = JSON.stringify(message);
        this.clients.forEach((client) => {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(payload);
            }
            else {
                this.clients.delete(client);
            }
        });
    }
}
exports.connectionmanager = new ConnectionManager();
//# sourceMappingURL=connectionManager.js.map