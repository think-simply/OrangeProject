import ws from 'k6/ws';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

// Metrics
const connectedCounter = new Counter('ws_connected');
const messageReceivedCounter = new Counter('ws_message_received');
const connectionErrorCounter = new Counter('ws_connection_error');

export const options = {
    vus: 10, // Number of virtual users
    duration: '30s', // Increased duration for better data collection
    thresholds: {
        'ws_connected': ['rate > 0.9'], // 90% connection success rate
        'ws_message_received': ['rate > 0.9'], // 90% message receive rate
        'ws_connection_error': ['rate < 0.1'], // 10% connection error rate
    },
};

export default function () {
    const url = 'wss://echo.websocket.events';
    const res = ws.connect(url, {}, function (socket) {
        socket.on('open', function open() {
            console.log('WebSocket connection opened');
            connectedCounter.add(1); // Increment connection counter
            socket.send(JSON.stringify({ event: 'k6 demo' }));
        });

        socket.on('message', function (data) {
            console.log(`Received message: ${data}`);
            messageReceivedCounter.add(1); // Increment message counter
            check(data, {
                'is k6 demo message': (d) => d.includes('k6 demo'),
            });
            socket.close();
        });

        socket.on('close', function close() {
            console.log('WebSocket connection closed');
        });

        socket.on('error', function error(e) {
            console.error('WebSocket error:', e);
            connectionErrorCounter.add(1); // Increment error counter
        });
    });

    check(res, { 'status is 101': (r) => r && r.status === 101 });
    sleep(1); // Add a sleep to prevent excessive requests
}