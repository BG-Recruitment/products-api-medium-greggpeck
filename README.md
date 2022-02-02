# Products API Medium

## Data:
Example of a trade data JSON object:
```json
{
   "id":1,
   "name": "Premium Roast Coffee",
   "price": 1.19,
   "mrp": 1.19,
   "stock": 1,
   "isPublished": false
}
```

## Project Specifications:
La implementación del modelo está proporcionado y es sólo de lectura

La tarea es implementar el un servicio REST que exponga el endpoint `/products`, que permita gestionar la colección de productos de la siguiente manera

- **POST** request a `/products`
    - crea un nuevo producto
    - se espera un producto JSON sin los campos `id`, `isPublished` en el body, puedes asumir que el objeto json es siempre válido
    - el nuevo producto se creará siempre con `isPublished = false`
    - si el body contiene el campo `isPublished`, se omitirá su valor y se creará con el valor `false`
    - agregua el producto a la BD con `id` único y autoincremental. El primer producto creado tendrá el **id 1**, el segundo **id 2**, y así sucesivamente
    - Una vez que el objeto sea creado, el status code de respuesta debe ser `201`

- **GET** request to `/products`
    - Devuelve la colección de todos los productos
    - status code `200`, y el body debe ser un arreglo de todos los producos ordenados por su `id ASC`

- **PATCH** request to `/products/<id>:id`
    - puede asumir que el body enviado siempre será `{ "isPublished" : true }`
    - si el producto existe, debe validar si el producto puede ser publicado si cumple los siguientes criterios, en el orden que se mencionan a continuación:
        - **CRITERIA 1**: verificar si el campo `mrp`  es mayor o igual que el campo `price` del producto encontrado.
        - **CRITERIA 2**: verificar si el campo `stock` es mayor a 0. 
    - if any of the criterias fail, the response code is 422 with the response body containing an array of error messages:
    - si alguna de las criterias falla, el response code is `422` y el response body contendrá un arreglo con los siguientes mensajes. 
    - if only CRITERIA 1 fails, the response body should be an array containing the message 'MRP should be less than equal to the Price' at the 0th index.
    - si sólo el **CRITERIA 1** falla, el response body deberá ser un arreglo de un elemento conteniendo el mensage **MRP should be less than equal to the Price**
    - si sólo el **CRITERIA 2** falla, el response body deberá ser un arreglo de un elemento conteniendo el mensage **Stock count is 0** 
    - si ambos **CRITERIA 1** y **CRITERIA** fallan, el response body debe ser un arreglo con los siguientes mensajes **MRP should be less than equal to the Price** y **Stock count is 0**
    - si se pasan las criterias pasan, el producto se actualizará con `isPublished = true` con el response code `204` sin ningún response body
    - puede asumir que el **id** pasado será siempre válido

- **DELETE**, **PUT** request to `/products/<id>:id`
    - el status code es `405` porque la API no permite borrar o modificar productos para ningún id

You should complete the given project so that it passes all the test cases when running the provided unit tests. The project by default supports the use of the SQLite3 database.

## Environment 
- Node Version: ^12.18.2
- Default Port: 8000

**Read Only Files**
- `test/*`

**Commands**
- run: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
- test: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm test
```
