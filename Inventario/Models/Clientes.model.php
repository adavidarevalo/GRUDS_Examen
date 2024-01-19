<?php
require_once('../Config/cls_conexion.model.php');
class Clase_Clientes
{
    public function todos()
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "SELECT * FROM `Clientes`";
            $result = mysqli_query($con, $cadena);
            return $result;
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function uno($ID_cliente)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "SELECT * FROM `Clientes` WHERE ID_cliente=$ID_cliente";
            $result = mysqli_query($con, $cadena);
            return $result;
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function insertar($Nombre, $Correo, $Telefono) {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "INSERT INTO `Clientes`( `Nombre`, `Correo`, `Telefono`) VALUES ('$Nombre','$Correo','$Telefono')";
            $result = mysqli_query($con, $cadena);
            return 'ok';
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($ID_cliente, $Nombre, $Correo, $Telefono) {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "UPDATE `Clientes` SET `Nombre`='$Nombre',`Correo`='$Correo',`Telefono`='$Telefono' WHERE ID_cliente=$ID_cliente";
            $result = mysqli_query($con, $cadena);
            return 'ok';
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($ID_cliente) {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "DELETE FROM `Clientes` WHERE ID_cliente=$ID_cliente";
            $result = mysqli_query($con, $cadena);
            return 'ok';
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }


    // public function insertar($ProductoId, $ProveedorId, $Cantidad, $Precio_Venta)
    // {
    //     try {
    //         $con = new Clase_Conectar_Base_Datos();
    //         $con = $con->ProcedimientoConectar();
    //         $cadena = "INSERT INTO `Stocks`( `ProductoId`, `ProveedorId`, `Cantidad`, `Precio_Venta`) VALUES ('$ProductoId','$ProveedorId',$Cantidad,'$Precio_Venta')";
    //         $result = mysqli_query($con, $cadena);
    //         return 'ok';
    //     } catch (Throwable $th) {
    //         return $th->getMessage();
    //     } finally {
    //         $con->close();
    //     }
    // }
    // public function actualizar($StockId, $ProductoId, $ProveedorId, $Cantidad, $Precio_Venta)
    // {
    //     try {
    //         $con = new Clase_Conectar_Base_Datos();
    //         $con = $con->ProcedimientoConectar();
    //         $cadena = "UPDATE `Stocks` SET `ProductoId`='$ProductoId',`ProveedorId`='$ProveedorId',`Cantidad`='$Cantidad',`Precio_Venta`='$Precio_Venta' WHERE `StockId`=$StockId";
    //         $result = mysqli_query($con, $cadena);
    //         return $ProveedorId;
    //     } catch (Throwable $th) {
    //         return $th->getMessage();
    //     } finally {
    //         $con->close();
    //     }
    // }
    // public function eliminar($StockId)
    // {
    //     try {
    //         $con = new Clase_Conectar_Base_Datos();
    //         $con = $con->ProcedimientoConectar();
    //         $cadena = "delete from Stocks where StockId=$StockId";
    //         $result = mysqli_query($con, $cadena);
    //         return "ok";
    //     } catch (Throwable $th) {
    //         return $th->getMessage();
    //     } finally {
    //         $con->close();
    //     }
    // }
}
