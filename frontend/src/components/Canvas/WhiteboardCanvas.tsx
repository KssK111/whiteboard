import { Layer, Stage } from "react-konva";
import type { Tool, WhiteboardElement, PenElement, BaseElement, RectElement, EllipseElement, Cursor } from "../../types";
import { useRef, useState } from "react";
import type { KonvaEventObject } from "konva/lib/Node";
import RenderElement from "./WBElementRenderer";
import RenderCursor from "./CursorRenderer";

interface Point {
	x: number
	y: number
}

interface Props {
  tool: Tool
  color: string
  strokeWidth: number
  elements: WhiteboardElement[]
  onElementAdded: (element: WhiteboardElement) => void
  cursors: Map<`${string}-${string}-${string}-${string}-${string}`, Cursor>
  onCursorMove: (x: number, y: number) => void
}

function WhiteboardCanvas(props: Props) {
	const [currentElement, setCurrentElement] = useState<WhiteboardElement | null>(null)
	const startPos = useRef<Point | null>(null)

	const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
		const pos = (
			e.target
			.getStage()
			?.getPointerPosition()
		)
		if (!pos) return

		const base_element: BaseElement = {
			//id: crypto.randomUUID(),
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
					height: 0,
				};
				startPos.current = pos
				element = rect_element
				break;

			case "ellipse":
				const ellipse_element: EllipseElement = {
					...element,
					x: pos.x,
					y: pos.y,
					radiusX: 0,
					radiusY: 0,
				};
				startPos.current = pos
				element = ellipse_element
				break

			default:
				throw new Error("Unimplemented");
		}

		setCurrentElement(element)
	};

	const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
		if (!currentElement)
			return
		const start = startPos.current!;

		const pos = (
			e.target
			.getStage()
			?.getPointerPosition()
		)
		if (!pos) return
		props.onCursorMove(pos.x, pos.y)
		console.log(`position: x=${pos.x} y=${pos.y}`);

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
					x: Math.min(start.x, pos.x),
					y: Math.min(start.y, pos.y),
					width: Math.abs(start.x - pos.x),
					height: Math.abs(start.y - pos.y),
				};
				break

			case "ellipse":
				updatedElem = {
					...currentElement,
					x: (start.x + pos.x) / 2,
					y: (start.y + pos.y) / 2,
					radiusX: Math.abs(pos.x - start.x) / 2,
					radiusY: Math.abs(pos.y - start.y) / 2,
				}
				break

			default:
				throw new Error("Unimplemented");
		}

		setCurrentElement(updatedElem)
	};

	const handleMouseUp = (_e: KonvaEventObject<MouseEvent>) => {
		if (!currentElement)
			return

		startPos.current = null

		props.onElementAdded(currentElement)
		setCurrentElement(null)
	}

  return (
    <Stage
			width={window.innerWidth}
			height={window.innerHeight}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			style={{
				cursor: props.tool === "select" ? "default" : "crosshair"
			}}
		>
      <Layer>
				{props.elements.map(RenderElement)}

				{currentElement && RenderElement(currentElement)}

				{[...props.cursors.values()].map(RenderCursor)}
      </Layer>
    </Stage>
  );
}

export default WhiteboardCanvas