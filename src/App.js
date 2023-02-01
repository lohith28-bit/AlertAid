import './App.css';
import Header from './content/Header';
import Camera from './content/Camera';
import Commentbox from './content/Commentbox';
function App() {
  return (
    <div className="App">
      <Header/>
      <Camera/>
      <Commentbox></Commentbox>
    </div>
  );
}

export default App;
