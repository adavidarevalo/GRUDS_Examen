CREATE TABLE Clientes (
    ID_cliente INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(255),
    Correo VARCHAR(255),
    Telefono VARCHAR(15)
);

CREATE TABLE Pedidos (
    ID_pedido INT PRIMARY KEY AUTO_INCREMENT,
    ID_cliente INT,
    Producto VARCHAR(255),
    Cantidad INT,
    Fecha_pedido datetime DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ID_cliente) REFERENCES Clientes(ID_cliente)
);