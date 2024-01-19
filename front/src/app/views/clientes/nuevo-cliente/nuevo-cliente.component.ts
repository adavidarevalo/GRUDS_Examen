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
import { ClienteService } from '../../../Services/cliente.service';

@Component({
  selector: 'app-nuevo-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nuevo-cliente.component.html',
  styleUrl: './nuevo-cliente.component.css',
})
export class NuevoClienteComponent {
  title = '';
  id!: number;

  cliente: FormGroup = new FormGroup({
    ID_cliente: new FormControl('', Validators.required),
    Nombre: new FormControl('', Validators.required),
    Correo: new FormControl('', Validators.required),
    Telefono: new FormControl('', Validators.required),
  });
  constructor(
    private clienteServicio: ClienteService,
    private rutas: Router,
    private parametros: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.parametros.snapshot.params['id'];
    console.log(this.id);
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nuevo Cliente';
    } else {
      this.title = 'Actualizar Cliente';
      this.clienteServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        this.cliente.patchValue({
          ID_cliente: res.ID_cliente,
          Nombre: res.Nombre,
          Correo: res.Correo,
          Telefono: res.Telefono,
        });
      });
    }
  }
  get f() {
    return this.cliente.controls;
  }

  grabar() {
    Swal.fire({
      title: 'Clientes',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.clienteServicio.insertar(this.cliente.value).subscribe((res) => {
            Swal.fire({
              title: 'Cliente',
              text: 'Se insertó con éxito el registro',
              icon: 'success',
            });
            this.rutas.navigate(['/clientes']);
            this.id = 0;
          });
        } else {
          this.clienteServicio
            .actualizar(this.cliente.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'Cliente',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/clientes']);
              this.id = 0;
            });
        }
      } else {
        Swal.fire({
          title: 'Cliente',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
