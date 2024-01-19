export interface IPedido {
  ID_pedido: number;
  ID_cliente: string;
  Producto: number;
  Cantidad: string;
  Fecha_pedido: string;
  Nombre_cliente?: string;
}
