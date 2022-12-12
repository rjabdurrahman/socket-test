import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import path from 'path';
const __dirname = path.resolve();

const PORT = 3000;
const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', ['POST', 'PUT', 'DELETE']]
}))

app.use(express.static('public'))
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

const server = app.listen(PORT, () => console.log(`Listening on http://localhost:3000`));
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});
io.use((socket, next) => {
    // console.log(socket.id, socket.request)
    next();
});
io.on('connection', (socket) => {
    console.log('a user Connected', socket.id);
    socket.on('disconnect', (reason) => {
        console.log('Disconnected');
        console.log(reason);
    })
});