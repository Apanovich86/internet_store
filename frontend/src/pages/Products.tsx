import React from 'react';
import {IProduct} from "../types/user.type";
import ProductPage from "./ProductPage";
import {Col, Container, Row} from "react-bootstrap";
import HeaderContainer from "../Container/HeaderContainer";
import img1 from "../uploads/0d1e9941-e8b0-11ec-b393-89dbe0fbbb08-kurtka-zhinocha-kofta.jpg";
import img2 from "../uploads/0d05cf30-e8b2-11ec-b393-89dbe0fbbb08-zhinoche-llyane-plattya.jpg";
import img3 from "../uploads/0d3efd10-e8b1-11ec-b393-89dbe0fbbb08-legkij-zhinochij-svetr.jpg";
import img4 from "../uploads/0d06e0a0-e8b2-11ec-b393-89dbe0fbbb08-zhinoche-llyane-plattya.jpg";
import img5 from "../uploads/4f8c0fb0-e8b0-11ec-b393-89dbe0fbbb08-povsyakdenne-trikotazhne-plattya.jpg";
import img6 from "../uploads/4f9a1970-e8b0-11ec-b393-89dbe0fbbb08-povsyakdenne-trikotazhne-plattya.jpg";
import img7 from "../uploads/4f59dc20-e8b0-11ec-b393-89dbe0fbbb08-povsyakdenne-trikotazhne-plattya.jpg";
import img8 from "../uploads/4f81d680-e8b0-11ec-b393-89dbe0fbbb08-povsyakdenne-trikotazhne-plattya.jpg";

const products: IProduct[] = [{
    _id:1,
    name: 'Жіночий повсякденний костюм',
    imagePath: img1,
    price: 800
},
    {
        _id:2,
        name: 'Свитшот Carica',
        imagePath: img2,
        price: 800
    },
    {
        _id:3,
        name: 'Куртка',
        imagePath: img3,
        price: 800
    },
    {
        _id:4,
        name: 'Жіночий повсякденний костюм',
        imagePath: img4,
        price: 800
    },
    {
        _id:5,
        name: 'Свитшот Carica',
        imagePath: img5,
        price: 800
    },
    {
        _id:6,
        name: 'Куртка',
        imagePath: img6,
        price: 800
    },
    {
        _id:7,
        name: 'Свитшот Carica',
        imagePath: img7,
        price: 800
    },
    {
        _id:8,
        name: 'Куртка',
        imagePath: img8,
        price: 800
    }
]
const Products = () => {
    return (
<>
        <HeaderContainer/>
        <Container>
            <h1>Усі товари</h1>
            <div className="row">


                {products.map(product => (
                    <div className="col-lg-3 col-sm-6">
                        <ProductPage product={product} key={product._id}/>
                    </div>

                ))}
            </div>
        </Container>
</>
    );
};

export default Products;