import React, {FC, useState} from 'react';

const Quantity:FC = () => {
    const [count, setCount] = useState(0);
    return (
        <div className="d-flex">
            <button onClick={() => setCount(prev => prev++)}>+</button>
            <input type="number" onChange={e => setCount(+e.target.value)} value={count}/>
            <button onClick={() => setCount(prev => prev--)}>-</button>
        </div>
    );
};

export default Quantity;