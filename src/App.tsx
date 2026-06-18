import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import FoodPage from './pages/FoodPage';
import NaturePage from './pages/NaturePage';
import ArtsPage from './pages/ArtsPage';
import ActivitiesPage from './pages/ActivitiesPage';
import LocalLifePage from './pages/LocalLifePage';
import StaysPage from './pages/StaysPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/food" element={<FoodPage />} />
        <Route path="/nature" element={<NaturePage />} />
        <Route path="/arts" element={<ArtsPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/local-life" element={<LocalLifePage />} />
        <Route path="/stays" element={<StaysPage />} />
      </Route>
    </Routes>
  );
}

export default App;
