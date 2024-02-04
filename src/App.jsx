import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css'
import Booking from './Booking/Booking';
import Login from './Loginform/Login';

function App() {
return (
  <Router>
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/booking' element={<Booking />}></Route>
    </Routes>
  </Router>
  )
}

export default App;
