import { Routes } from '@angular/router';
import { DashboardComponent } from './Views/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { ClientesComponent } from './Views/clientes/clientes.component';
import { NuevoClienteComponent } from './Views/clientes/nuevo-cliente/nuevo-cliente.component';
import { PedidosComponent } from './views/pedidos/pedidos.component';
import { NuevoPedidoComponent } from './views/pedidos/nuevo-pedidos/nuevo-pedidos.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'clientes',
    component: ClientesComponent,
  },
  {
    path: 'nuevo-cliente',
    component: NuevoClienteComponent,
  },
  {
    path: 'editar-cliente/:id',
    component: NuevoClienteComponent,
  },
  {
    path: 'pedidos',
    component: PedidosComponent,
  },
  {
    path: 'nuevo-pedido',
    component: NuevoPedidoComponent,
  },
  {
    path: 'editar-pedido/:id',
    component: NuevoPedidoComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponentComponent },
];
