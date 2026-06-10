import { useEffect, useState } from "react";
import './App.css'
import WhiteboardCanvas from "./components/Canvas/WhiteboardCanvas";
import type { Tool } from "./types";
import Toolbar from "./components/Canvas/Toolbar";

function App() {
	const [tool, setTool] = useState<Tool>('pen')
	const [color, setColor] = useState<string>("#000000")
	const [strokeWidth, setStrokeWidth] = useState<number>(8)

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
			/>

		</div>
  );
}

export default App
