// websocketManager.ts
import { EventEmitter } from 'eventemitter3';

interface Message {
    event: string;
    [key: string]: any;
}

interface WebSocketManagerEvents {
    open: () => void;
    message: (message: Message) => void;
    error: (error: string) => void;
    close: (event: CloseEvent) => void;
    [key: string]: (...args: any[]) => void;
}

class WebSocketManager extends EventEmitter<WebSocketManagerEvents> {
    private static instance: WebSocketManager;
    public socket: WebSocket | null = null; // Made public for readyState checks
    private token: string | null = null;

    private constructor() {
        super();
    }

    public static getInstance(): WebSocketManager {
        if (!WebSocketManager.instance) {
            WebSocketManager.instance = new WebSocketManager();
        }
        return WebSocketManager.instance;
    }

    public connect(onOpenCallback?: () => void): void {
        if (this.socket) {
            this.disconnect();
        }

        const wsUrl = `wss://pulsevoice.hudson-ai.com/pulse/api/v1/chat/message`;
        this.socket = new WebSocket(wsUrl);

        this.socket.onopen = () => {
            console.log('WebSocket connected');
            this.emit('open');

            if (onOpenCallback) {
                onOpenCallback();
            }
        };

        this.socket.onmessage = (event: MessageEvent) => {
            const message: Message = JSON.parse(JSON.parse(event.data));
            // console.debug('WebSocket message', message);
            if (message.event) {
                this.emit(message.event, message);
            }
        };

        this.socket.onerror = (event: Event) => {
            console.error('WebSocket error', event);
            this.emit('error', event.toString());
        };

        this.socket.onclose = (event: CloseEvent) => {
            console.log('WebSocket closed', event.code, event.reason);
            this.emit('close', event);
            this.reconnect();
        };
    }

    public send(data: object): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            console.warn('WebSocket is not open. ReadyState:', this.socket?.readyState);
        }
    }

    public disconnect(): void {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }

    private reconnect(): void {
        let attempt = 1;
        const maxAttempts = 5;

        const reconnectInterval = setInterval(
            () => {
                if (attempt > maxAttempts) {
                    clearInterval(reconnectInterval);
                    console.error('Max reconnection attempts reached');
                    return;
                }

                console.log(`Reconnection attempt ${attempt}`);
                this.connect();

                attempt += 1;
            },
            Math.min(30000, 1000 * 2 ** attempt),
        );
    }
}

const wsManager = WebSocketManager.getInstance();
export default wsManager;
