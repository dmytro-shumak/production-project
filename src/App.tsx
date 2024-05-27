import { Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Counter } from "./components/Counter";
import "./index.css";
import { AboutPageLazy } from "./pages/AboutPage/AboutPageLazy";
import { MainPageLazy } from "./pages/MainPage/MainPageLazy";

const App = () => {
  return (
    <div className="app">
      <Link to="/">Main Page</Link>
      <Link to="/about">About Page</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainPageLazy />} />
          <Route path="/about" element={<AboutPageLazy />} />
        </Routes>
      </Suspense>
      <Counter />
    </div>
  );
};

export default App;
