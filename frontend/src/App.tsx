import './App.css'
import { Route, Routes } from "react-router-dom";
import BoardPage from "./pages/BoardPage";

function App() {

  return (
	<Routes>
		<Route
			path="/board/:roomId"
			element={<BoardPage />}
		/>
		<Route
			path="/"
			element={<h1>Home</h1>}
		/>
	</Routes>
  );
}

export default App
