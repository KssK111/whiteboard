import { useState } from "react";
import './App.css'
import WhiteboardCanvas from "./components/Canvas/WhiteboardCanvas";
import type { Tool } from "./types";
import Toolbar from "./components/Canvas/Toolbar";

function App() {
	const [tool, setTool] = useState<Tool>('pen')
	const [color, setColor] = useState<string>("#000000")
	const [strokeWidth, setStrokeWidth] = useState<number>(8)

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
			/>

		</div>
  );
}

export default App
