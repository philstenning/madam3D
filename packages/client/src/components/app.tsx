import { BrowserRouter } from "react-router-dom";
import Nav from "./nav";
import Header from "./header";
import "typeface-roboto";
import "./app.css";
import "./aside.css";

function App() {
  return (
    <>
        <BrowserRouter basename={import.meta.env.VITE_DEPLOY_HOST?.toString()}>
      <div className="app">
          <Header />
          <div className="app-content">
            <Nav />
          </div>
      </div>
        </BrowserRouter>
    </>
  );
}
export default App;
