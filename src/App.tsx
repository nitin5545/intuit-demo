import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventViewer from './components/EventViewer';

function App() {
  return (
    <div className="App">
      <EventViewer selectableEventCount={3} />
    </div>
  );
}

export default App;
