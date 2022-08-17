import React from 'react'
import './Checkout.css'
import CheckoutProducts from './CheckoutProducts';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal'


function Checkout() {
    const [{basket, user},dispatch] = useStateValue();

    return (
        <div className='checkout'>
            <div className='checkout_left'>
                
                <img
                    className='checkout_ad'
                    src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonGo/Engagment/Promotions/2022/PrimeDay/AG_PD22_desktop_1500x150_wCTA.png'
                    alt='' />
                <div>
                    <h3>
                        Hello.{user?.email}
                    </h3>
                    <h2 className='checkout_title'>
                        Your Shopping Basket
                    </h2>

{basket.map(item=>(
    <CheckoutProducts
    id={item.id}
    title={item.title}
    image={item.image}
    price={item.price}
    rating={item.rating}
    />
))}
                </div>
            </div>
            <div className='checkout-right'>
                <Subtotal/>
                
            </div>

        </div>
    )
}

export default Checkout