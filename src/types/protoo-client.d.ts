declare module "protoo-client" {
  export class WebSocketTransport {
    constructor(url: string);

    closed: boolean;
    close(): void;
    on(
      event: "open" | "disconnected" | "close" | "failed",
      callback: () => void
    ): void;
  }

  export class Peer {
    constructor(transport: WebSocketTransport);

    close(): void;

    request(method: string, data?: any): Promise<any>;
    notify(method: string, data?: any): void;

    on(
      event:
        | "open"
        | "disconnected"
        | "close"
        | "failed"
        | "request"
        | "notification",
      callback: (...args: any[]) => void
    ): void;
  }
}
