
import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Los datos se consideran frescos durante 24 horas
        staleTime: 1000 * 60 * 60 * 24,

        // Los datos inactivos permanecen en memoria durante 24 horas
        gcTime: 1000 * 60 * 60 * 24,

        // Reintentar hasta 2 veces si falla una petición
        retry: 2,

        // No consultar nuevamente al cambiar de ventana
        refetchOnWindowFocus: false,

        // No consultar nuevamente al reconectar internet
        refetchOnReconnect: false,
      },
    },
  });
}
