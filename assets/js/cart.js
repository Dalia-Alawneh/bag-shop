function incrementQuantity(id) {
    const cart = getDataFromLocalStorage('cart');
    const updatedCart = cart.map(product => {
        if (product.id === id) {
            product.quantity = (product.quantity || 1) + 1;
        }
        return product;
    });

    saveToLocalStorage('cart', updatedCart);
    calculateCartItems(updatedCart)
    displayCart(updatedCart);
    toasts.push({
        title: 'Info',
        content: 'Product Updated.',
        style: 'verified'
    });
}

function decrementQuantity(id) {
    const cart = getDataFromLocalStorage('cart');
    const updatedCart = cart.map(product => {
        if (product.id === id) {
            product.quantity = Math.max(1, (product.quantity || 1) - 1);
        }
        return product;
    });

    saveToLocalStorage('cart', updatedCart);
    calculateCartItems(updatedCart)
    displayCart(updatedCart);
    toasts.push({
        title: 'Info',
        content: 'Product Updated.',
        style: 'verified'
    });
}

function displayCart(cart) {
    let result = `
        <table class="table">
            <thead>
                <tr>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

    if (!cart.length) {
        result = '<div class="py-3" colspan="6">You don\'t have any product in your cart</div>';
    } else {
        cart.forEach(product => {
            result += `
                <tr>
                    <td class="w-25"><img src="${product.mainImage}" class="w-100 img-fluid" alt="${product.title}"></td>
                    <td>${product.title}</td>
                    <td>${product.discount ? `$${(product.price - (product.price * (product.discount / 100))).toFixed(2)}` : `$${product.price.toFixed(2)}`}</td>
                    <td>
                        <button class="bg-main text-white border-0 shadow" onclick="decrementQuantity(${product.id})">-</button>
                        <span id="quantity-${product.id}">${product.quantity ?? 1}</span>
                        <button class="bg-main text-white border-0 shadow"  onclick="incrementQuantity(${product.id})">+</button>
                    </td>
                    <td id="total-${product.id}">
                        ${product.quantity
                    ? product.discount
                        ? `$${((product.price - (product.price * (product.discount / 100))) * product.quantity).toFixed(2)}`
                        : `$${(product.price * product.quantity).toFixed(2)}`
                    : `$${product.price.toFixed(2)}`
                }
                    </td>
                    <td><button onclick="deleteProduct(${product.id})" class="text-main mt-2 fs-3 bg-transparent border-0"><i class="fa-regular fa-circle-xmark"></i></button></td>
                </tr>`;
        });
        result += `
                </tbody>
            </table>`;

    }


    // Update the cart data in the DOM
    document.getElementById('cart-data').innerHTML = result;
}



generateData(() => getDataFromLocalStorage('cart'), displayCart)
function deleteProduct(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            let cart = getDataFromLocalStorage('cart')
            cart = cart.filter((product) => product.id !== id)
            saveToLocalStorage('cart', cart)
            displayCart(cart)
            calculateCartItems(cart)
            displayCheckoutBtn()
            toasts.push({
                title: 'Warning',
                content: 'Product Deleted.',
                style: 'error'
            });
        }
    })
}
const checkLogin = () => {
    if (isLoggedIn) {
        window.location.href = 'checkout.html'
    } else {
        toasts.push({
            title: 'ERROR',
            content: 'Login to Checkout.',
            style: 'error'
        });
    }
}

function displayCheckoutBtn() {
    let res = ``
    if (cart.length > 0) {
        res = `
            <button class="border-0 bg-main text-white rounded px-3 py-2" onclick="checkLogin()">Checkout</button>  
        `
    } else {
        res = ``
    }
    document.getElementById('cart-checkout').innerHTML = res
}
displayCheckoutBtn()