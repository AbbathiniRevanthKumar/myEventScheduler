import { WebSocket } from "ws";
declare class ConnectionManager {
    private clients;
    addClient(ws: WebSocket): void;
    removeClient(ws: WebSocket): void;
    broadCast(message: object): void;
}
export declare const connectionmanager: ConnectionManager;
export {};
