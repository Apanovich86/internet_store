import React, {FC} from 'react';
import {ICartItem} from "../types/type";

const cartItems:ICartItem[] = [{
    imagePath: 'https://buy-all.store/_next/image?url=https%3A%2F%2Fapi.buy-all.store%2Fstatic%2Fuploads%2Fc5bb4621-3167-11ec-8a05-e7406f0c9962.jpeg&w=640&q=100',
    name: 'тeплий жилет',
    count: 1,
    price: 250
}]

const ListProduct: FC = () => {
    return (
        <div>
            {cartItems.map(item => (
                <div>
                    <img src={item.imagePath} alt={item.name} width='55' height='55' className='mr-3'/>
                    <div>
                        <div>{item.name}</div>
                        <div>{`${item.count} x ${item.price}`}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

const Basket = () => {
    return (
        <div>
            Basket
        </div>
    );
};

export default Basket;