import React from 'react';
import cn from 'classnames';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useDispatch} from 'react-redux';
import {removeFromCart} from '../../components/actions/action_cart';
import {useEffect} from "react";
import {Link} from 'react-router-dom';

const ShopingCart = () => {
    const cart = useTypedSelector(state => state.cartinstance);
    const total = cart.reduce((acc, item) => acc + item.count*item.price, 0);
    const dispatch = useDispatch()

    const removeHandler = (id: number) => {
        dispatch(removeFromCart(id))
    }
    
    useEffect(() => {
        
    },[])
    return (
        
        <div
            className={cn(
                'bg-white absolute right-0 shadow-md p-5 rounded-md z-10')}
            style={{
                top: 60,
            }}
        >
            {total? (
            <div>
                <Link className="text-decoration-none" to="/"><button className="linkMain">Перейти на головну</button></Link>
                <h2 className="mb70">Кошик</h2>
            {cart.map(item => (
                <div
                    className='dFlex cg flex items-center mb-4'
                    key={`cart item ${item.title}`}
                >
                    <img
                        src={item.urlImage}
                        alt={item.title}
                        width='55'
                        height='55'
                        className='mr-3'
                    />
                    <div className="mshop">
                        <div className="dFlex">
                        <div>{item.title},&nbsp;</div>
                      
                        <div> колір:&nbsp; {item.color.name},</div>
                        <div> &nbsp;розмір:&nbsp; {item.size.name},</div>
                       
                        
                        <div> &nbsp;ціна: &nbsp;{`${item.count} x ${item.price.toLocaleString()}`} грн.&nbsp;</div>
                        <button
                            className="shopRem"
                            onClick={() => removeHandler(item.id)}
                        >
                            Видалити
                        </button>
                        </div>
                    </div>
                </div>
            ))}

            <div className='text-lg border-solid border-t-2 border-red-100 pt-1 mt-5 mb70'>
                Всього: <b>{total.toLocaleString()} грн.</b>
                <Link className="text-decoration-none" to="/"><button className="linkPayment">Перейти до оплати</button></Link>
            </div>
            </div>
            ):(
                <div className="cart cart--empty h200 mcart">
                    <h2>
                        Кошик порожній <i>😕</i>
                    </h2>
                    <Link className="text-decoration-none" to="/">Перейти до покупок</Link>
                </div>
            )}
            
        </div>
    );
};

export default ShopingCart;
