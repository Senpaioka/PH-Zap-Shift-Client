import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <div className="bg-base-300 py-8">
        <Navbar></Navbar>
      </div>

      <div className="bg-base-300 py-10">
        <Outlet></Outlet>
      </div>

      <div className="bg-base-300 py-20">
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;