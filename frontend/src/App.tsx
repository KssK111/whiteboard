import './App.css'
import WhiteboardCanvas from "./components/Canvas/WhiteboardCanvas";

function App() {
  return (
    <WhiteboardCanvas
			tool="pen"
			color="#000000"
			strokeWidth={10}
		/>
  );
}

export default App
