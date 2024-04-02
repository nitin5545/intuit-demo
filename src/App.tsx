import './App.css';
import EventViewer from './components/EventViewer';

function App() {
  return (
    <div className="App">
      <EventViewer selectableEventCount={3} />
    </div>
  );
}

export default App;
