import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ICliente } from '../../Interfaces/icliente';
import { ClienteService } from '../../Services/cliente.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent {
  title = 'Clientes';
  clientes: ICliente[];

  constructor(private clienteServicio: ClienteService) {}

  ngOnInit() {
    this.cargaTabla();
  }

  cargaTabla() {
    this.clienteServicio.todos().subscribe((clientesList) => {
      console.log(clientesList);
      this.clientes = clientesList;
    });
  }

  alerta() {
    Swal.fire('Stock', 'Mensaje en Stock', 'success');
  }

  eliminar(clienteId: number) {
    Swal.fire({
      title: 'Clientes',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteServicio.eliminar(clienteId).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'Clientes',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'Clientes',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
