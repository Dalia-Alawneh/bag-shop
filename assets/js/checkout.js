const totalPrice = cart.reduce((total, product) => {
    const isValidProduct =
        typeof product.price === 'number' &&
        typeof product.discount === 'number' &&
        typeof product.quantity === 'number' &&
        product.discount >= 0 && product.discount <= 100 &&
        product.quantity >= 0;

    if (isValidProduct) {
        const discountedPrice = product.price - (product.price * (product.discount / 100));
        return total + (product.quantity * discountedPrice);
    } else {
        console.warn('Invalid product data:', product);
        return total; // Exclude invalid products from the total
    }
}, 0);

console.log(totalPrice);

document.getElementById('total').innerHTML = `$${totalPrice}`
document.getElementById('subtotal').innerHTML = `$${totalPrice + 8}`