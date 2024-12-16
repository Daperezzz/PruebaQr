import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CuentaService } from './services/cuenta.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const cuentaService = inject(CuentaService); // Utilizamos la instancia de CuentaService aquí
  const router = inject(Router);

  return cuentaService.getCurrentUser().pipe( // Usamos cuentaService en lugar de CuentaService
    take(1),
    map(user => {
      if (user) {
        return true; // Si hay un usuario autenticado, permite el acceso
      } else {
        router.navigate(['/login']); // Si no hay usuario, redirige al login
        return false;
      }
    })
  );
};
