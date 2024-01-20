import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { PedidoService } from '../../../Services/pedido.service';
import { ClienteService } from '../../../Services/cliente.service';
import { ICliente } from '../../../Interfaces/icliente';
import moment from 'moment';

@Component({
  selector: 'app-nuevo-pedido',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nuevo-pedidos.component.html',
  styleUrl: './nuevo-pedidos.component.css',
})
export class NuevoPedidoComponent {
  title = 'Pedido';
  id!: number;

  pedido: FormGroup = new FormGroup({
    ID_cliente: new FormControl('', Validators.required),
    Producto: new FormControl('', Validators.required),
    Cantidad: new FormControl('', Validators.required),
    Fecha_pedido: new FormControl('', Validators.required),
  });
  clientes: ICliente[] = [];
  constructor(
    private pedidosServicio: PedidoService,
    private clienteServicio: ClienteService,
    private rutas: Router,
    private parametros: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCliente();
    this.id = this.parametros.snapshot.params['id'];
    console.log(this.id);
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nuevo Pedido';
    } else {
      this.title = 'Actualizar Pedido';
      this.pedidosServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        const date = moment(res.Fecha_pedido);

        this.pedido.patchValue({
          ID_cliente: res.ID_cliente,
          Producto: res.Producto,
          Cantidad: res.Cantidad,
          Fecha_pedido: date.format('YYYY-MM-DD'),
        });
      });
    }
  }

  getCliente() {
    this.clienteServicio.todos().subscribe((clientesList) => {
      this.clientes = clientesList;
    });
  }

  get f() {
    return this.pedido.controls;
  }

  grabar() {
    Swal.fire({
      title: 'Pedido',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.pedidosServicio.insertar(this.pedido.value).subscribe((res) => {
            Swal.fire({
              title: 'Pedido',
              text: 'Se insertó con éxito el registro',
              icon: 'success',
            });
            this.rutas.navigate(['/pedidos']);
            this.id = 0;
          });
        } else {
          this.pedidosServicio
            .actualizar(this.pedido.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'Pedido',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/pedidos']);
              this.id = 0;
            });
        }
      } else {
        Swal.fire({
          title: 'Pedido',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
