import type { Tool } from "../../types"

interface ButtonProps {
	text: string
	isActive: boolean
	onToolChange: () => void
}

function ChangeToolButton(props: ButtonProps) {
	return (
		<button
			onClick={() => props.onToolChange()}
			style={{
				fontWeight: props.isActive ? 'bold' : 'normal'
			}}
		>
			{props.text}
		</button>
	)
}

interface Props {
	currentTool: Tool
	onToolChange: (tool: Tool) => void
	currentColor: string
	onColorChange: (color: string) => void
	currentStrokeWidth: number
	onStrokeWidthChange: (strokeWidth: number) => void
}

function Toolbar(props: Props) {
	return (
		<>
			<ChangeToolButton
				text="Select"
				isActive={props.currentTool === "select"}
				onToolChange={() => props.onToolChange("select")}
			/>
			<ChangeToolButton
				text="Pen"
				isActive={props.currentTool === "pen"}
				onToolChange={() => props.onToolChange("pen")}
			/>
			<ChangeToolButton
				text="Rectangle"
				isActive={props.currentTool === "rect"}
				onToolChange={() => props.onToolChange("rect")}
			/>
			<ChangeToolButton
				text="Ellipse"
				isActive={props.currentTool === "ellipse"}
				onToolChange={() => props.onToolChange("ellipse")}
			/>
			<input type="color"
				value={props.currentColor}
				onChange={(e) => {
					props.onColorChange(e.target.value)
				}}
			/>
			<input type="range"
				value={props.currentStrokeWidth}
				onChange={(e) => {
					props.onStrokeWidthChange(Number(e.target.value))
				}}
			/>
		</>
	)
}

export default Toolbar