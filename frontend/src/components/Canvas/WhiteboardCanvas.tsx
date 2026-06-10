import { Layer, Line, Stage } from "react-konva";
import type { Tool, WhiteboardElement, PenElement } from "../../types";
import { useState } from "react";
import type { KonvaEventObject } from "konva/lib/Node";

interface Props {
  tool: Tool
  color: string
  strokeWidth: number
}

function WhiteboardCanvas(props: Props) {
	const [elements, setElements] = useState<WhiteboardElement[]>([])
	const [currentElement, setCurrentElement] = useState<WhiteboardElement | null>(null)

	const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
		const pos = (
			e.target
			.getStage()
			?.getPointerPosition()
		)
		if (!pos) return

		const pen_element: PenElement = {
			id: crypto.randomUUID(),
			type: "pen",
			color: props.color,
			strokeWidth: props.strokeWidth,
			points: [pos.x, pos.y]
		};
		setCurrentElement(pen_element)
	};

	const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
		if (!currentElement || currentElement.type !== 'pen')
			return

		const pos = (
			e.target
			.getStage()
			?.getPointerPosition()
		)
		if (!pos) return

		const updatedElem: PenElement = {
			...currentElement,
			points: [...currentElement.points, pos.x, pos.y]
		};
		setCurrentElement(updatedElem)
	};

	const handleMouseUp = (e: KonvaEventObject<MouseEvent>) => {
		if (!currentElement || currentElement.type !== 'pen')
			return

		setElements([...elements, currentElement])
		setCurrentElement(null)
	}

  return (
    <Stage
			width={window.innerWidth}
			height={window.innerHeight}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
		>
      <Layer>
				{elements
					.filter((e) => e.type === "pen")
					.map((e) => <Line
						key={e.id}
						points={e.points}
						stroke={e.color}
						strokeWidth={e.strokeWidth}
					/>)
				}

				{currentElement?.type === 'pen' && (
					<Line
						key={currentElement.id}
						points={currentElement.points}
						stroke={currentElement.color}
						strokeWidth={currentElement.strokeWidth}
					/>
				)}
      </Layer>
    </Stage>
  );
}

export default WhiteboardCanvas