import Fastify, { FastifyRequest } from "fastify";
import websocket from '@fastify/websocket'
import { WebSocket } from 'ws'

const fastify = Fastify({
	logger: true
});
fastify.register(websocket)

interface BoardParams {
	roomId: string
}

fastify.register(async function (fastify) {
	const rooms = new Map<string, Set<WebSocket>>();
	fastify.get<{ Params: BoardParams }>(
		'/board/:roomId',
		{ websocket: true },
		(socket: WebSocket, request: FastifyRequest<{ Params: BoardParams }>) => {

			const { roomId } = request.params;

			fastify.log.info(`A user joined room ${roomId}`)

			if (!rooms.has(roomId))
				rooms.set(roomId, new Set())
			const room = rooms.get(roomId)!;
			room.add(socket)

			socket.on('message', (data) => {
				for (const s of room) {
					if (s !== socket && s.readyState === WebSocket.OPEN)
						s.send(data)
				}
			})

			socket.on('close', () => {
				room.delete(socket)
				if (!room.size)
					rooms.delete(roomId)
			})
		}
	)
})


fastify.listen({
	port: 3000,
	host: '0.0.0.0'
}).catch((e) => {
	fastify.log.fatal(e)
	fastify.close()
	process.exit(1)
})