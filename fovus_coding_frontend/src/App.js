import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './pages/form';
import ViewData from './pages/view-data';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route element={<Form/>} path='/'/>
      <Route element={<ViewData/>} path='/view-data'/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
