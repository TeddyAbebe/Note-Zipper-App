import "./App.css";
import Footer from "./Component/Footer/Footer";
import Header from "./Component/Header/Header";
import LandingPage from "./Screens/LandingPage/LandingPage";
import { BrowserRouter, Route } from "react-router-dom";
import MyNotes from "./Screens/MyNotes/MyNotes";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Route path="/" component={LandingPage} exact />
        <Route path="/mynotes" component={MyNotes} />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
