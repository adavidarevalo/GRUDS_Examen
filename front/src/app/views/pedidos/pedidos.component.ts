import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { IPedido } from '../../Interfaces/ipedido';
import { PedidoService } from '../../Services/pedido.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent {
  title = 'Pedidos';
  pedidos: IPedido[];

  constructor(private pedidoServicio: PedidoService) {}

  ngOnInit() {
    this.cargaTabla();
  }

  cargaTabla() {
    this.pedidoServicio.todos().subscribe((pedidosList) => {
      console.log(pedidosList);
      this.pedidos = pedidosList;
    });
  }

  alerta() {
    Swal.fire('Pedidos', 'Mensaje en Stock', 'success');
  }

  eliminar(clienteId: number) {
    Swal.fire({
      title: 'Pedidos',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoServicio.eliminar(clienteId).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'Pedidos',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'Pedidos',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
