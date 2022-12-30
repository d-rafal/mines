import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter
    // basename={process.env.NODE_ENV === "development" ? "/rates" : ""}
    >
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
