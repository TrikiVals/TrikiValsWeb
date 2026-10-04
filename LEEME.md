# Web de TrikiVals

Web estática: el contenido son archivos de texto en `src/`, y GitHub la publica sola cada vez que cambias algo.

## Ponerla en marcha (una sola vez)

1. Crea un repositorio **público** en GitHub y sube todo el contenido de esta carpeta a la rama `main`.
2. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Abre `src/admin/config.yml` y cambia `TU-USUARIO/TU-REPOSITORIO` por los tuyos.
4. Espera un par de minutos: en la pestaña **Actions** verás "Publicar web". Al terminar, la web está en la dirección que indica Settings → Pages.
5. Dominio propio: Settings → Pages → Custom domain, y sigue las instrucciones de DNS de GitHub.

## Usar el panel de admin

1. Entra en `tu-web/admin/`.
2. Pulsa **Sign In with Token**. El panel te da un enlace a GitHub para crear el token con los permisos correctos; cópialo y pégalo.
3. Edita y guarda. Cada guardado se publica solo en uno o dos minutos.

El token es tu llave: no lo compartas. Solo quien tenga un token con permiso de escritura en el repositorio puede cambiar la web.

## Qué se edita desde el admin

| Apartado del admin | Qué controla |
|---|---|
| Ajustes generales | Portada, horario de directos, redes y contacto |
| Novedades | Avisos de la portada |
| Eventos | Fichas de evento, estado y cuenta atrás de inscripciones |
| Series y proyectos | EL SURVIVAL, Triki Family Server… |
| Descargas | Cada descarga con versión, tamaño y enlace |
| Merch | Productos, estado, precio de coste y cuenta atrás de pedidos |
| Ateren · Portada / Leer / Wiki | El universo, sus capítulos y sus entradas de wiki |
| Páginas sueltas | Sobre TrikiVals, Apoyo, Contacto, Interacciones |

La portada muestra sola lo último de novedades, eventos, descargas, merch y capítulos (salvo lo que tenga desmarcado "Mostrar en las novedades").

## Cambiar el diseño

- **Toda la web**: colores, tipografías y medidas están al principio de `src/assets/estilo.css`.
- **Una sección** (Historias, Directo, Merch, Comunidad) o **un universo**: los bloques `body[data-seccion=…]` y `body[data-universo=…]` del mismo archivo.
- **Una sola página**: en el admin, los campos "Color de acento" y "CSS propio".

## Añadir otro universo

1. Copia la carpeta `src/historias/ateren` con otro nombre (por ejemplo `otro`) y cambia `ateren` por `otro` dentro de su archivo `.json`.
2. En `src/admin/config.yml`, duplica los tres bloques `ateren_…` cambiando nombre y carpetas.
3. En `estilo.css`, añade un bloque `body[data-universo="otro"]` con sus colores.

## Probar en tu ordenador (opcional)

Con Node.js instalado: `npm install` y luego `npm run dev`.
