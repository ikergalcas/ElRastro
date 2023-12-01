import CompShowDetallesProducto from "../productos/ShowDetallesProducto.js";
import NavbarPage from "../navbar/navbar.js";

function MiProductoBloque() {

    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <CompShowDetallesProducto></CompShowDetallesProducto>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiProductoBloque