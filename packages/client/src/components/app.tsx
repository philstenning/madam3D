import { BrowserRouter } from "react-router-dom";
import Nav from "./nav";
import Header from "./header";
import "typeface-roboto";
import "./app.css";
import "./aside.css";

function App() {
  return (
    <>
      <div
        className="app"
      >
        <Header />

        {/* <BrowserRouter
          basename={import.meta.env.MODE === "production" ? "madam3D" : ""}
        > */}
          <BrowserRouter basename={import.meta.env.VITE_DEPLOY_HOST?.toString()}>
          <div className="app-content">
            <Nav />
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
