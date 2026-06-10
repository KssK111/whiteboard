import { Layer, Line, Stage } from "react-konva";
import type { Tool, WhiteboardElement, PenElement, BaseElement, RectElement } from "../../types";
import { useState } from "react";
import type { KonvaEventObject } from "konva/lib/Node";
import RenderElement from "./WBElementRenderer";

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

		const base_element: BaseElement = {
			id: crypto.randomUUID(),
			color: props.color,
			strokeWidth: props.strokeWidth
		};
		let element: any = {
			...base_element,
			type: props.tool
		}

		switch (props.tool) {
			case "pen":
				const pen_element: PenElement = {
					...element,
					points: [pos.x, pos.y]
				};
				element = pen_element
				break;

			case "rect":
				const rect_element: RectElement = {
					...element,
					x: pos.x,
					y: pos.y,
					width: 0,
					height: 0
				};
				element = rect_element
				break;

			default:
				throw new Error("Unimplemented");
		}

		setCurrentElement(element)
	};

	const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
		if (!currentElement)
			return

		const pos = (
			e.target
			.getStage()
			?.getPointerPosition()
		)
		if (!pos) return

		let updatedElem: WhiteboardElement;
		switch (currentElement.type) {
			case "pen":
				updatedElem = {
					...currentElement,
					points: [...currentElement.points, pos.x, pos.y]
				}
				break;

			case "rect":
				updatedElem = {
					...currentElement,
					x: Math.min(currentElement.x, pos.x),
					y: Math.min(currentElement.y, pos.y),
					width: Math.abs(currentElement.x - pos.x),
					height: Math.abs(currentElement.y - pos.y),
				};
				break

			default:
				throw new Error("Unimplemented");
		}

		setCurrentElement(updatedElem)
	};

	const handleMouseUp = (e: KonvaEventObject<MouseEvent>) => {
		if (!currentElement)
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
				{elements.map(RenderElement)}

				{currentElement && RenderElement(currentElement)}
      </Layer>
    </Stage>
  );
}

export default WhiteboardCanvas