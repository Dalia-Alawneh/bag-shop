const totalPrice = cart.reduce((total, product) => {
    const discountedPrice = product.price - (product.price * (product.discount / 100));
    return total + (product.quantity * discountedPrice);
}, 0);

document.getElementById('total').innerHTML = `$${totalPrice}`
document.getElementById('subtotal').innerHTML = `$${totalPrice + 30}`