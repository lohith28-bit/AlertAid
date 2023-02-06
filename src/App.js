import './App.css';
import Header from './content/Header';
import Camera from './content/Camera';
import Commentbox from './content/Commentbox';
import GetLocation from './content/GetLocation';

function App() {
  return (
    <div className="App">
      <Header/>
      <Camera/>
      <GetLocation />
      <Commentbox></Commentbox>
    </div>
  );
}

export default App;
