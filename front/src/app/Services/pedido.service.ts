import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPedido } from '../Interfaces/ipedido';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private urlBase: string =
    'http://localhost:8888/Sexto_PHP_ANGULAR/Inventario/Controllers/Pedidos.Controller.php?op=';

  constructor(private clientePhp: HttpClient) {}

  todos(): Observable<IPedido[]> {
    return this.clientePhp.get<IPedido[]>(this.urlBase + 'todos');
  }

  insertar(pedido: IPedido): Observable<any> {
    var prov = new FormData();

    prov.append('ID_cliente', pedido.ID_cliente);
    prov.append('Producto', pedido.Producto.toString());
    prov.append('Cantidad', pedido.Cantidad);

    return this.clientePhp.post(this.urlBase + 'insertar', prov);
  }
  eliminar(id: number): Observable<any> {
    var prov = new FormData();
    prov.append('ID_pedido', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', prov);
  }
  uno(id: number): Observable<IPedido> {
    var prov = new FormData();
    prov.append('ID_pedido', id.toString());
    return this.clientePhp.post<IPedido>(this.urlBase + 'uno', prov);
  }
  actualizar(pedido: IPedido, id: number): Observable<any> {
    var prov = new FormData();
    prov.append('ID_pedido', id.toString());
    prov.append('ID_cliente', pedido.ID_cliente);
    prov.append('Producto', pedido.Producto.toString());
    prov.append('Cantidad', pedido.Cantidad);

    return this.clientePhp.post(this.urlBase + 'actualizar', prov);
  }
}
