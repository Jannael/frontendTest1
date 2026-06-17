# &middot; Examen de Evaluación para el Puesto de Front-End &middot;

## Instrucciones

1. **Maquetado de Interfaces**  
   Deberás implementar las interfaces enviadas, utilizando datos obtenidos a través de peticiones a una API REST. Los assets necesarios estarán disponibles en un archivo de Figma.

   ### Enlace a la Maqueta:

   [Figma - Prueba Front-End](https://www.figma.com/design/a3ZLOVSXnQliLKNloQoXN1/Prueba-Devs?node-id=0-1&t=X0XF6OQZqiBiTN8Z-1)

2. **Peticiones API**
   - **Pedidos próximos:**  
     `https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming`
   - **Todos los pedidos:**  
     `https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders`

## TODOS

- [x] Astro + tailwind + react
- [x] Linter + formatter con pre-commit hooks
- [x] sitemap
- [ ] webmanifest
- [x] Inter font viene en el figma
- [x] Avenir (fuente principal)
- [ ] **og.png** (1200x630) — actualmente usando favicon.webp como placeholder
- [ ] Tests
- [x] Deploy
- [x] Conic gradient
- [ ] component for pickup and droppoff **order.tsx**
- [ ] component for pickup and droppoff **order-details.tsx**
- [x] SSR por que la API bloquea al cliente por CORS

## Criterios de evaluacion

- [x] Layout: Implementación visual según el diseño.
- [ ] Código Modular: Estructura del código clara, reutilizable y organizada.
- [x] Pixel Perfect: Precisión en la maquetación respecto al diseño.
- [x] Cross-Browser: Compatibilidad en los principales navegadores.
- [x] Conexión API REST: Integración funcional con los endpoints proporcionados.
- [ ] Responsive Design: Adaptabilidad a diferentes tamaños de pantalla.

## Especificos de la prueba

- [x] Nuevo repositorio
- [x] Framework de preferencia
- [x] Si los datos de algún pedido no contienen una imagen, deberás mostrar un **avatar predeterminado**.
- [x] En caso de no contar con la tipografía requerida, se permitirá el uso de **Open Sans** como alternativa (usando las dos tipografias del figma).

### Imagen 1 instrucciones

![Instrucciones 1](./assets/Instrucciones-1.png)

- [x] Filtrar ordenes por el numero de la orden
- [x] El tiempo de inicio de navegar debera compararse con el **star_date** de la orden con el tiempo actual. Una vez terminado el tiempo, se habilita el boton y en consola debera mandar un mensaje **navegar**
- [x] Boton para llevar a la interfaz de los detalles de la orden

### Imagen 2 instrucciones

![Instrucciones 2](./assets/Instrucciones-2.png)

- [x] Boton que muestra datos correspondientes al PickUp o DropOff
- [x] Estados de check de acuerdo a los estados en los que se encuentra
- [x] boton que solo se activara en caso de que el status se encuentre del numero 3 en adelante, mostrar en consola **track order**
- [x] Panel expandible para mostrar el resto de la informacion (PickUp Data)
