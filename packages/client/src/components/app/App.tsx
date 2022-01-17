import { BrowserRouter } from "react-router-dom";
import Nav from "../nav/Nav";
import Header from "../header/Header";
import "typeface-roboto";
import "./app.css";
import "../aside/aside.css";
// import useMeasure from "react-use-measure";

function App() {
  // const [ref,{width,height}] = useMeasure()
  // console.log('dfasdfasdfs', width, height, window.innerWidth)
  return (
    <>
      <div
        // ref={ref}
        className="app"
      >
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
