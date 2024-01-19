import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducto } from '../Interfaces/iproducto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private urlBase: string =
    'http://localhost:8888/Sexto_PHP_ANGULAR/Inventario/Controllers/Producto.Controller.php?op=';

  constructor(private clientePhp: HttpClient) {}

  todos(): Observable<IProducto[]> {
    return this.clientePhp.get<IProducto[]>(this.urlBase + 'todos');
  }

  insertar(producto: IProducto): Observable<any> {
    const form = new FormData();
    form.append('nombre', producto.Nombre);
    form.append('precio', producto.Precio.toString());
    form.append('cantidad', producto.Cantidad.toString());

    return this.clientePhp.post(this.urlBase + 'insertar', form);
  }

  eliminar(id: number): Observable<any> {
    const form = new FormData();
    form.append('productoId', id.toString());

    return this.clientePhp.post(this.urlBase + 'eliminar', form);
  }

  uno(id: number): Observable<IProducto> {
    const form = new FormData();
    form.append('productoId', id.toString());

    return this.clientePhp.post<IProducto>(this.urlBase + 'uno', form);
  }

  actualizar(producto: IProducto, id: number): Observable<any> {
    const form = new FormData();
    form.append('productoId', id.toString());
    form.append('nombre', producto.Nombre);
    form.append('precio', producto.Precio.toString());
    form.append('cantidad', producto.Cantidad.toString());

    return this.clientePhp.post(this.urlBase + 'actualizar', form);
  }
}
