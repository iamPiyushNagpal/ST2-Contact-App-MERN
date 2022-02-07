import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import AddContactPage from './pages/AddContactPage';
import UpdateContactPage from './pages/UpdateContactPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="main">
          <Routes>
            <Route path='/' exact element={<HomePage />} />
            <Route path='/add-contact' element={<AddContactPage />} />
            <Route path='/update-contact/:id' element={<UpdateContactPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
