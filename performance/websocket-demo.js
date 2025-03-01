import ws from 'k6/ws';
import { check } from 'k6';

export default function () {
    const url = 'wss://echo.websocket.events';
    const res = ws.connect(url, {}, function (socket) {
        socket.on('open', function open() {
            console.log('WebSocket connection opened');
            socket.send(JSON.stringify({ event: 'k6 demo' }));
        });

        socket.on('message', function (data) {
            console.log(`Received message: ${data}`);
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
        });
    });

    check(res, { 'status is 101': (r) => r && r.status === 101 });
}