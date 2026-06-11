import { useEffect, useRef, useState } from "react";
import WhiteboardCanvas from "../components/Canvas/WhiteboardCanvas";
import type { Message, Tool, WhiteboardElement } from "../types";
import Toolbar from "../components/Toolbar/Toolbar";
import { useParams } from "react-router-dom";

function BoardPage() {
	const [elements, setElements] = useState<WhiteboardElement[]>([])
	const [tool, setTool] = useState<Tool>('pen')
	const [color, setColor] = useState<string>("#000000")
	const [strokeWidth, setStrokeWidth] = useState<number>(8)

	const { roomId } = useParams<{ roomId: string }>();
	console.log(roomId);

	const ws = useRef<WebSocket | null>(null)
	useEffect(() => {
		const socket = new WebSocket(`ws://localhost:3000/board/${roomId}`);
		socket.onmessage = async (event) => {
			console.log(event.data);

			const text = await (event.data as Blob).text()
			const message: Message = JSON.parse(text);
			switch (message.type) {
				case "element":
					setElements(prev => [...prev, message.data])
					break;

				default:
					throw new Error("Unimplemented");
			}
		}

		ws.current = socket

	  return () => {
			if (socket.readyState === WebSocket.OPEN) {
				socket.close(1000)
			}
	  }
	}, [roomId])


	useEffect(() => {
	  const handler = (e: KeyboardEvent) => {
		switch (e.key) {
			case 's':
				setTool("select")
				break;
			case 'p':
				setTool("pen")
				break;
			case 'r':
				setTool("rect")
				break;
			case 'e':
				setTool("ellipse")
				break;

			default:
				break;
		}
	  }

	  window.addEventListener('keydown', handler)

	  return () => {
		window.removeEventListener('keydown', handler)
	  }
	}, [])


  return (
		<div
			style={{
				position: 'relative'
			}}
		>

			<div
				style={{
					position: 'fixed',
					top: 16,
					left: '50%',
					transform: 'translateX(-50%)',
					zIndex: 10
				}}
			>
				<Toolbar
					currentTool={tool}
					onToolChange={setTool}
					currentColor={color}
					onColorChange={setColor}
					currentStrokeWidth={strokeWidth}
					onStrokeWidthChange={setStrokeWidth}
				/>
			</div>

			<WhiteboardCanvas
				tool={tool}
				color={color}
				strokeWidth={strokeWidth}
				elements={elements}
				onElementAdded={(e) => {
					setElements([...elements, e])
					const message: Message = {
						type: "element",
						data: e
					}
					console.log(message);
					ws.current?.send(JSON.stringify(message))
				}}
			/>

		</div>
  );
}

export default BoardPage
