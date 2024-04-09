import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import ExpanseTracker from "./components/ExpanseTracker";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expanse-tracker" exact element={<ExpanseTracker />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
