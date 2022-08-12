import './App.css';
import Country from './Charts/Country';
import Navbars from './Components/Navbar';





function App() {


  return (
    <div className="App">
      <h2>Countries</h2>
      <Navbars />
      <h2>Intensity</h2>
      <Country />

    </div>
  );
}

export default App;
