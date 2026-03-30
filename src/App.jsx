import Home from "./home/Home";
import { useEffect } from "react";
import { CONFIG } from "./config/bioConfig";

function App() {

  useEffect(() => {
    document.title = CONFIG.name;
  }, []);

  return <Home />;
}

export default App;