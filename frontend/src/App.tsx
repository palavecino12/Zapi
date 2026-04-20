import { CameraView } from './scanner/CameraView'
import  Cartitem  from './cart/CartItem';

function App() {
  return (
    <>
      <Cartitem nombre="Zapatillas" precio={15000} />
      <CameraView />
    </>
  );
}

export default App
