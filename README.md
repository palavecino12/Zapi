# Zapi – Sistema de Autoservicio para Kiosco

Zapi es una aplicación web de autoservicio desarrollada para un kiosco ubicado dentro de una sede universitaria. Su objetivo es simplificar y automatizar el proceso de compra, permitiendo a los clientes seleccionar productos, gestionar su carrito y realizar el pago digitalmente mediante Mercado Pago.

La aplicación fue desarrollada para resolver un proceso de compra que anteriormente se realizaba de forma manual: los precios estaban indicados en los estantes y el pago se realizaba mediante un alias para transferencia.

Actualmente, Zapi se encuentra **en producción y siendo utilizada por el kiosco**.

---

## Funcionamiento

Antes de ingresar al kiosco, el cliente puede escanear un código QR que lo dirige directamente a la aplicación web.

Desde la aplicación puede:

- Añadir productos al carrito escaneando los códigos de barras de los mismos.
- Aumentar o disminuir cantidades.
- Eliminar productos.
- Consultar el total de la compra.
- Agregar productos desde una lista en caso de no poder utilizar la cámara.
- Realizar el pago mediante Mercado Pago Checkout Pro.

El objetivo es que el cliente pueda realizar todo el proceso de compra desde su propio dispositivo sin necesidad de asistencia.

---

## Sistema de ventas y pagos

El sistema utiliza tres entidades principales para representar las operaciones:

### `Sale`

Representa la venta realizada por el cliente.

Contiene información como:

- Identificador de la venta.
- Total.
- Estado.
- Fecha de creación.

Los estados posibles son:

```text
PENDING
PAID
CANCELLED
EXPIRED
```

Una venta comienza como `PENDING` y pasa a `PAID` únicamente después de que Mercado Pago confirma el pago.

### `SaleItem`

Representa cada producto incluido dentro de una venta.

Almacena:

- Producto.
- Cantidad.
- Precio al momento de la venta.
- Venta a la que pertenece.

El precio se almacena como `priceAtSale` para conservar el valor histórico del producto aunque posteriormente su precio sea modificado.

### `Payment`

Representa el pago confirmado por Mercado Pago.

Almacena información como:

- Identificador del pago en Mercado Pago.
- Monto.
- Método de pago.
- Venta asociada.

La relación entre estas entidades permite mantener un historial completo de las operaciones realizadas.

---

## Flujo de compra

El proceso de compra comienza cuando el cliente selecciona los productos y confirma el carrito.

El backend valida los productos y el stock disponible antes de crear la operación de venta y generar la preferencia de Mercado Pago.

Una vez que el cliente realiza el pago, Mercado Pago envía una notificación mediante un **webhook** al backend.

El backend consulta la información completa del pago y realiza diferentes validaciones antes de confirmar la venta:

- Verificar que el pago esté aprobado.
- Comprobar que el pago no haya sido procesado anteriormente.
- Verificar que la venta exista.
- Comprobar que la venta no haya sido pagada previamente.
- Validar que el monto recibido coincida con el total de la venta.

La prevención de pagos duplicados se realiza mediante la comprobación del `providerPaymentId` y una restricción `UNIQUE` en la base de datos.

La relación entre la venta y el pago externo se realiza mediante `external_reference`, que permite asociar el pago de Mercado Pago con la `Sale` correspondiente.

Una vez aprobado el pago:

- La `Sale` pasa a estado `PAID`.
- Se crea el `Payment` correspondiente.
- Se descuenta el stock de los productos comprados.

Estas operaciones se realizan mediante una **transacción de Prisma**, garantizando que se ejecuten de forma atómica.

---

## Arquitectura

### Frontend

```text
Component → Hook → Service → API
```

Cada capa tiene una responsabilidad específica:

- **Component:** renderiza la interfaz y maneja la interacción del usuario.
- **Hook:** contiene la lógica y el estado necesario para las funcionalidades del frontend.
- **Service:** centraliza la comunicación con la API.

Se utiliza **React Context API** para compartir globalmente el estado del carrito.

### Backend

```text
Route → Controller → Service → Repository → Prisma → MySQL
```

Cada capa encapsula una responsabilidad específica:

- **Controller:** recibe y responde las peticiones HTTP.
- **Service:** contiene la lógica de negocio.
- **Repository:** centraliza el acceso a los datos.
- **Prisma:** actúa como ORM para interactuar con MySQL.

Además, se utiliza **Zod** para la validación de datos y un **middleware centralizado para el manejo de errores**.

---

## Estadísticas y datos

Las operaciones almacenadas en `Sale`, `SaleItem` y `Payment` permiten obtener información útil sobre el comportamiento de las ventas.

A partir de estos datos es posible analizar:

- Productos más vendidos.
- Productos con menor demanda.
- Períodos con mayor cantidad de ventas.
- Productos que requieren reposición de stock.
- Evolución de las ventas.

Actualmente estos datos son utilizados para obtener información sobre el funcionamiento del kiosco.

Se encuentra en desarrollo una **interfaz de administración** que permitirá a los responsables gestionar productos y visualizar las estadísticas directamente desde la aplicación.

---

## Tecnologías

### Frontend

- React
- TypeScript
- Tailwind CSS
- React Context API
- Zod
- `@zxing/browser`
- AOS
- react-spring / `@react-spring/web`

### Backend

- Node.js
- Express
- TypeScript
- Prisma
- Zod
- Mercado Pago Checkout Pro
- Error Handler personalizado

### Base de datos

- MySQL

### Herramientas

- Git
- Postman

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/palavecino12/Zapi.git
cd Zapi
```

### 2. Instalar dependencias

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` en cada aplicación utilizando la configuración correspondiente.

#### Backend (`backend/.env`)

```env
PORT=3000
DATABASE_URL=tu_database_url
FRONTEND_URL=http://localhost:5173

MP_ACCESS_TOKEN=tu_access_token
BACKEND_URL=http://localhost:3000
```

#### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Ejecutar la aplicación

En una terminal:

```bash
cd backend
npm run dev
```

En otra terminal:

```bash
cd frontend
npm run dev
```

---

## Estado del proyecto

**En producción.**

Zapi se encuentra actualmente siendo utilizada por el kiosco para gestionar las compras de los clientes.

El proyecto continúa en desarrollo, con futuras funcionalidades orientadas a la **administración de productos y visualización de estadísticas de ventas**, permitiendo utilizar los datos generados por el sistema para facilitar la toma de decisiones del negocio.