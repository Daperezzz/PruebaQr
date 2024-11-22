import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private apiUrl = 'http://localhost:3000/api/asistencia';

  constructor(private http: HttpClient) {}

  // Generar un código QR para una clase con token opcional
  generarQrClase(seccion: string, token?: string): Observable<string> {
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.get(`${this.apiUrl}/qr`, {
      params: { seccion },
      headers,
      responseType: 'text' // Recibe la respuesta como texto HTML
    });
  }

  // Registrar asistencia de un estudiante con token opcional
  registrarAsistencia(seccion: string, code: string, token?: string): Observable<any> {
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.post(`${this.apiUrl}/qr`, { seccion, code }, { headers });
  }

  // Listar asistencia de todas las clases para un usuario (con token opcional)
  listarAsistencia(userId: string, token?: string): Observable<any> {
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.get(`${this.apiUrl}/listar`, { params: { userId }, headers });
  }
}
