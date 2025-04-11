import Footer from "./components/Footer";
import Header from "./components/Header";
import TeamSizePage from './components/TeamSizePage';
import LandingPage from "./components/LandingPage";
import QuestionsPage from "./components/QuestionsPage";
import ResultsPage from "./components/ResultsPage";
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
     <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/TeamSizePage" element={<TeamSizePage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
