import { CameraView } from './scanner/CameraView';
import { Button } from './components/Button';

function App() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen">
      <CameraView />
      <Button>Añadir producto</Button>
    </div>
  );
}

export default App;