import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICliente } from '../Interfaces/icliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlBase: string =
    'http://localhost:8888/Sexto_PHP_ANGULAR/Inventario/Controllers/Clientes.Controller.php?op=';

  constructor(private clientePhp: HttpClient) {}

  todos(): Observable<ICliente[]> {
    return this.clientePhp.get<ICliente[]>(this.urlBase + 'todos');
  }

  insertar(cliente: ICliente): Observable<any> {
    var prov = new FormData();

    prov.append('Nombre', cliente.Nombre);
    prov.append('Correo', cliente.Correo);
    prov.append('Telefono', cliente.Telefono);

    return this.clientePhp.post(this.urlBase + 'insertar', prov);
  }
  eliminar(id: number): Observable<any> {
    var prov = new FormData();
    prov.append('ID_cliente', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', prov);
  }
  uno(id: number): Observable<ICliente> {
    var prov = new FormData();
    prov.append('ID_cliente', id.toString());
    return this.clientePhp.post<ICliente>(this.urlBase + 'uno', prov);
  }
  actualizar(stock: ICliente, id: number): Observable<any> {
    var prov = new FormData();
    prov.append('ID_cliente', id.toString());
    prov.append('Nombre', stock.Nombre);
    prov.append('Correo', stock.Correo);
    prov.append('Telefono', stock.Telefono);

    return this.clientePhp.post(this.urlBase + 'actualizar', prov);
  }
}
