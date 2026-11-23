import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './features/cart/context/CartProvider.tsx'
import { AuthProvider } from './features/auth/context/AuthProvider.tsx'

//Cuarto paso del context, encerramso el App con el provider
createRoot(document.getElementById('root')!).render(
  <CartProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </CartProvider>
)
