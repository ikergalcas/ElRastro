import ShowProductosSinVender from "../productos/ShowProductosSinVender.js";
import NavbarPage from "../navbar/navbar.js";

function ProductosSinVender() {

    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <ShowProductosSinVender></ShowProductosSinVender>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductosSinVender