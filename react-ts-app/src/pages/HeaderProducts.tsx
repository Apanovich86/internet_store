import {Link} from "react-router-dom";

const Navbar = () => {
    return (<>
            <nav className="navbar navbar-expand-lg " style={{ backgroundColor: '#D0F0C0' }} >
                <div className="container-fluid">
                    <a className="navbar-brand " href="/">Усі товари</a>
                    <button className="navbar-toggler" type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/colors/all">Список кольорів</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/color/add">Додати колір</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/books/listbooks">Список розмірів</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/books/addbook">Додати розмір </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav></>

    );
}

export default Navbar;