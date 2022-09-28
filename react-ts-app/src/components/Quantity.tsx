import React, {FC, useState} from 'react';
import { TypeSetState } from '../types/type';

interface IQuantity {
    count: number
    setCount: TypeSetState<number>
}

const Quantity:FC<IQuantity> = ({ count, setCount }) => {
  
    return (
        <div className='flex items-center my-2'>
            <button onClick={() => count > 0 && setCount(count - 1)}>-</button>
            <input
                type='number'
                className='mx-2 w50'
                onChange={e => setCount(+e.target.value)}
                value={count}
            />
            <button onClick={() => count < 30 && setCount(count + 1)}>+</button>
        </div>
    );
};

export default Quantity;