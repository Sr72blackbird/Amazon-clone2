import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from './axios';
//import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProducts from './CheckoutProducts'
import './Payment.css'
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider'


function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

   const stripe = useStripe();
    const elements = useElements();

    const [succeeded,setSucceeded]=useState(false);
    const[processing,setProcessing]= useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const[clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        //generate the stripe secret to charge the customer
        const getClientSecret =  async()=> {
            const response =  await axios ({
                method: 'post',
                //stripe expects the total in a currencies submits
                url:`/payments/create?total = ${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])

    const handleSubmit = async (event) => {
        //stripe
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // payment intent  = payment confirmation

            setSucceeded(true)
            setError(null)
            setProcessing(false)

            history.replace('/orders')
        })
    }
    const handleChange = event => {
        //listens for changes in the CardElement
        // and display any erroe as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment_container'>
                <h1>
                    Checkout (
                    <Link to="/checkout">
                        {basket?.length} items
                    </Link>)
                </h1>
                {/* delivery adress */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Delivery Adress</h3>
                    </div>
                    <div className='payment_adress'>
                        <p>{user?.email}</p>
                        <p> 209 STATE HOUSE ROAD  </p>
                        <p> NAIROBI KENYA</p>
                    </div>
                </div>
                {/* Revieiw Items */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment_items'>
                        {basket.map(item => (
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
                {/* payment Method */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment_details'>
                        {/* Stripe code */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className='payment_priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (

                                        <h3>Order Total:{value}</h3>

                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)} k
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p>:"Buy Now"}</span>
                                </button>
                            </div>
                            {/* eError */}
                            {error && <div>{error}</div> }
                        </form>
                    </div>

                </div>
            </div>

        </div >


    )
}

export default Payment