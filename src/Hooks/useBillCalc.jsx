// useCalculator.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function useBillCalc() {
    const cart = useSelector(state => state.cart.cart)
    const [calculatedValues, setCalculatedValues] = useState({});

    const calculateValues = () => {
        const totalItems = cart.length;
        const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        const discount = (total * 10) / 100;
        const discountedPrice = total - discount;
        const GST = (discountedPrice * 15) / 100;
        const deliveryCharges = 100 > total ? 40 : 60;
        const subTotal = discountedPrice + deliveryCharges + GST;
        return { deliveryCharges, subTotal, total, totalItems, GST, discount, discountedPrice };
    };

    useEffect(() => {
        if (cart.length > 0) {
            setCalculatedValues(calculateValues());
        }
    }, [cart.length]);
    return calculatedValues
}

export default useBillCalc;
