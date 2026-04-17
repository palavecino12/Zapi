import { CameraView } from './scanner/CameraView'
import ProductDetails from './pages/client/components/ProductDetails'

function App() {
  return (
    <>
      <ProductDetails nombre="Zapatillas" precio={95000} />
      <CameraView />
    </>
  );
}

export default App
