import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail from "./routes/js/Detail";
import Home from "./routes/js/Home";
import "./App.css";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path={`/`} element={<Home />}></Route>
        <Route path={`/movie/:id`} element={<Detail />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
