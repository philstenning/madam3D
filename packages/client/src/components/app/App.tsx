import { BrowserRouter } from "react-router-dom";
import Nav from "../nav/Nav";
import Header from "../header/Header";
import "./app.css";

function App() {
  return (
    <>
      <div className="app">
        <Header />
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
