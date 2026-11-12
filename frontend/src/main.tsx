import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './features/cart/context/CartProvider.tsx'

//Cuarto paso del context, encerramso el App con el provider
createRoot(document.getElementById('root')!).render(
    <CartProvider>
      <App />
    </CartProvider>
)
