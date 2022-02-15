import React from 'react';

const CartDummy = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <img src={`/assets/cartDummy.svg`} alt={'Cart dummy'}/>
      <h4>Cart is empty</h4>
      <p className="text-secondary">But it is never too late to change it :)</p>
    </div>
  );
};

export default CartDummy;