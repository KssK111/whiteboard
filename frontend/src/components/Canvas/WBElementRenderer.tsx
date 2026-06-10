import { Line, Rect } from "react-konva";
import type { WhiteboardElement } from "../../types";

function RenderElement(element: WhiteboardElement) {
	switch (element.type) {
		case "pen":
			return <Line
				key={element.id}
				points={element.points}
				stroke={element.color}
				strokeWidth={element.strokeWidth}

				lineCap="round"
				lineJoin="round"
				tension={.3}
			/>

		case "rect":
			return <Rect
				key={element.id}
				x={element.x}
				y={element.y}
				width={element.width}
				height={element.height}
				stroke={element.color}
				strokeWidth={element.strokeWidth}
			/>

		default:
			throw new Error("Unimplemented");;
	}
}

export default RenderElement