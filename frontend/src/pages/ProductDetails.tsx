import React from 'react';
import {Container} from "react-bootstrap";

const ProductDetails = () => {
    return (
        // <Container>
        //     <ul className="nav nav-tabs" role="tablist">
        //         <li><a href="#main_about_product" role="tab" data-toggle="tab">Головне про товар</a></li>
        //         <li><a href="#characteristics" role="tab" data-toggle="tab">Характеристики</a></li>
        //         <li><a href="#feedbacks" role="tab" data-toggle="tab">Відгуки та коментарі</a></li>
        //     </ul>
        //    <div className="tab-content">
        //        <div role="tabpanel" className="tab-pane" id="main_about_product">Vkladka main about product</div>
        //    </div>
        // </Container>
        <div>
            <ul className="nav nav-pills nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="main-tab" data-bs-toggle="pill" data-bs-target="#main"
                            type="button" role="tab" aria-controls="main" aria-selected="true">Головне про товар
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="characteristics-tab" data-bs-toggle="pill" data-bs-target="#characteristics"
                            type="button" role="tab" aria-controls="characteristics" aria-selected="false">Характеристики
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="feedbacks-tab" data-bs-toggle="pill" data-bs-target="#feedbacks"
                            type="button" role="tab" aria-controls="feedbacks" aria-selected="false">Відгуки та коментарі
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="main" role="tabpanel" aria-labelledby="main-tab">Головне про товар
                </div>
                <div className="tab-pane fade" id="characteristics" role="tabpanel" aria-labelledby="characteristics-tab">Характеристики</div>
                <div className="tab-pane fade" id="feedbacks" role="tabpanel" aria-labelledby="feedbacks-tab">Відгуки та коментарі</div>
            </div>
        </div>
    );
};

export default ProductDetails;