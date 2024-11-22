import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy = { navigate: jasmine.createSpy('navigate') }; // Mock del Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: { getCurrentUser: () => of(null) } }, // Mock de AuthService con getCurrentUser
        { provide: Router, useValue: routerSpy } // Mock del Router
      ],
    });

    guard = TestBed.inject(AuthGuard); // Inyecta el AuthGuard
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to login if not authenticated', (done) => {
    // Simula que el usuario no está autenticado
    spyOn(TestBed.inject(AuthService), 'getCurrentUser').and.returnValue(of(null));

    guard.canActivate().subscribe((isAllowed) => {
      expect(isAllowed).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });

  it('should allow navigation if authenticated', (done) => {
    // Simula que el usuario está autenticado
    spyOn(TestBed.inject(AuthService), 'getCurrentUser').and.returnValue(of({ email: 'user@example.com' }));

    guard.canActivate().subscribe((isAllowed) => {
      expect(isAllowed).toBeTrue();
      done();
    });
  });
});
