# Pokédex - Optimización de transferencia de datos

Aplicación web desarrollada con **Next.js 16**, **React**, **TypeScript** y **TanStack Query v5**, que consume la API pública de PokéAPI.

## Tecnologías utilizadas

- Next.js 16 (App Router).
- React.
- TypeScript.
- TanStack Query v5.
- PokéAPI.

## Funcionalidades

- Listado de Pokémon con renderizado inicial desde el servidor.
- Paginación de 50 Pokémon por página.
- Visualización de imágenes y nombres.
- Visualización de estadísticas, tipos, habilidades y cadena evolutiva.
- Precarga de información al pasar el cursor sobre las tarjetas.
- Hidratación de datos entre servidor y cliente.
- Estrategia de caché para reducir solicitudes repetidas.


### Precarga de datos

Se implementa `prefetchQuery` en las tarjetas de Pokémon mediante el evento `onMouseEnter`.

Esto permite solicitar anticipadamente la información del Pokémon antes de que el usuario abra su página de detalles.

### Hidratación

Se utilizan `dehydrate` y `HydrationBoundary` para transferir al cliente los datos obtenidos durante el renderizado del servidor.

Así se evita realizar nuevamente una consulta cuando el cliente recibe información que ya fue precargada.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/3smer4ld4/Pokedex.git
```

Ingresar al proyecto:

```bash
cd pokedex
```

Instalar dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abrir en el navegador:

```text
http://localhost:3000
```

## Compilación de producción

```bash
npm run build
```

## API utilizada

[PokéAPI](https://pokeapi.co/)

## Autor

Los caché son datos volatiles que con determinada durabilidad facilitad el acceso dentro de una pagina.