interface BaseElement {
	id: string
	color: string
	strokeWidth: number
}

export interface PenElement extends BaseElement {
	type: 'pen'
	points: number[]
}

export interface RectElement extends BaseElement {
	type: 'rect'
	x: number
	y: number
	width: number
	height: number
}

export interface EllipseElement extends BaseElement {
	type: 'ellipse'
	x: number
	y: number
	radiusX: number
	radiusY: number
}

export type Tool = 'select' | 'pen' | 'rect' | 'ellipse'
export type WhiteboardElement = PenElement | RectElement | EllipseElement