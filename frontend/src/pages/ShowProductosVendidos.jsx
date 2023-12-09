import ShowProductosVendidos from "../productos/ShowProductosVendidos.js";
import NavbarPage from "../navbar/navbar.js";

function ProductosVendidos() {

    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <ShowProductosVendidos></ShowProductosVendidos>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductosVendidos