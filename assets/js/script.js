const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList]?.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

const bannersItems = document.querySelector('.banners-items')

const generateData = async (callback, display) => {
    const data = await callback()
    console.log(data);
    display(data)
}

const calculateTimeRemaining = (couponDate, id) => {
    let expired = false;
    if(!couponDate){
        return expired
    }
    const countdownInterval = setInterval(() => {
        const now = new Date();
        const [day, month, year] = couponDate.split('/').map(Number);
        const targetDate = new Date(year, month - 1, day); 

        const timeRemaining = targetDate - now;

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            expired = true;  
            return;
        }

        const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / (1000));
        document.querySelector(`#countdown-${id}`).innerHTML = `
        <div class="rounded-circle text-main shadow">
            <div>D</div>
            <div>${daysRemaining}</div>
        </div>
        <div class="rounded-circle text-main shadow">
            <div>H</div>
            <div>${hoursRemaining}</div>
        </div>
        <div class="rounded-circle text-main shadow">
            <div>M</div>
            <div>${minutesRemaining}</div>
        </div>
        <div class="rounded-circle text-main shadow">
            <div>S</div>
            <div>${secondsRemaining}</div>
        </div>
        `
    }, 1000);

    // Return the expired flag
    return expired;
}


const generateProductHTML = (products,id) => {
    console.log(products);
    let result = `<div class="row justify-content-center align-items-stretch row-gap-3">`
    products.forEach((product) => {

console.log(calculateTimeRemaining(product.coponDate, product.id) );
        result += `
        <div class="col-md-3 product-item ">
        <div class="card text-center p-4 h-100 position-relative overflow-hidden ">
        ${calculateTimeRemaining(product.coponDate, product.id) ? '': `<div class="position-absolute start-0 rounded-pill bg-danger text-white fs-7 bg-gradient px-2 ms-3">${product.discount?'- '+product.discount+"%":''}</div>` }
            <div class="actions pe-4 pt-3 position-absolute">
                <div class="my-2" onclick="addProductToWishlist(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                    <i class="fa-regular fa-heart rounded-circle bg-white shadow p-2 d-flex justify-content-center align-items-center"></i>
                </div>
                <div onclick="addProductToCart(${JSON.stringify({ ...product }).replace(/"/g, '&quot;')})">
                    <i class="fa-brands fa-opencart rounded-circle bg-white shadow p-2 d-flex justify-content-center align-items-center"></i>
                </div>
            </div>
            <a href="product.html?id=${product.id}"><img src="${product.mainImage}" class="img-fluid w-100" alt="${product.title}"></a>
            <span>${product.category}</span>
            <h4 class="mt-2">${product.title}</h4> 
            ${product.discount ?
                `<div class="d-flex gap-1 justify-content-center">
                <span class="text-main text-decoration-line-through text-secondary">$${product.price.toFixed(2)}</span> <span class="fw-bold text-main">$${(product.price - product.discount).toFixed(2)}</span>
                </div>`
                : `<span class="fw-bold text-main">$${(product.price).toFixed(2)}</span>`}

                <div class="countdown mt-3 d-flex gap-2 position-absolute" id="countdown-${product.id}">
                    
                </div>
        </div>
        </div>
        `
        calculateTimeRemaining(product.coponDate, product.id)
    })
    result += "</div>"

    return result
}
const displayProducts = (products) => {
    console.log(products.mainProducts);
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabPanes.forEach((pane) => {
        const dataType = pane.getAttribute('data-type');
        const filteredProducts = products.mainProducts.filter(product => product.category === dataType);
        pane.innerHTML = generateProductHTML(filteredProducts,1);
    });
};
const displayFeatruedProducts = (products) => {
    const tabPanes = document.querySelectorAll('.featured .tab-pane');

    tabPanes.forEach((pane) => {
        const dataType = pane.getAttribute('data-type');
        const filteredProducts = products.featuredProducts.filter(product => product.category === dataType);
        pane.innerHTML = generateProductHTML(filteredProducts,2);
    });
};
const displayCategories = (categories) => {
    let result = '';

    categories.forEach(cat => {
        result += `
            <div class="col-md-3  overflow-hidden">
            <a href="category.html?id=${cat.id}">
            <div class="position-relative category">
                <div class="overlay d-flex justify-content-center align-items-center position-absolute z-2 text-uppercase top-0 start-0 end-0 bottom-0 w-100 h-100">
                    ${cat.title}
                </div>
                    <img src="${cat.image}" class="img-fluid w-100 position-relative z-1" alt="">
                </div>
            </a>
            </div>
        `;
    });

    const categoriesList = document.getElementById('categories');
    categoriesList.innerHTML = result;
};

generateData(() => fetchData('products/1'), displayProducts)
generateData(() => fetchData('products/2'), displayFeatruedProducts)


const saveToLocalStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value))
}
const getDataFromLocalStorage = (name) => {
    return JSON.parse(localStorage.getItem(name))
}

let wishlist = getDataFromLocalStorage('wishlist') ?? []
let cart = getDataFromLocalStorage('cart') ?? []

function calculateCartItems(cart) {
    let items = cart.reduce((reducer, curr) => {
        return { quantity: reducer.quantity + curr.quantity };
    }, { quantity: 0 });

    document.getElementById('cart-items').textContent = items.quantity;
}

calculateCartItems(cart)

const addProductToWishlist = (product) => {
    wishlist.push(product)
    saveToLocalStorage('wishlist', wishlist)
    toasts.push({
        title: 'Success',
        content: 'Added to wishlist successfully.',
        style: 'success'
    });
}
const addProductToCart = (product) => {
    const productInCart = cart.find((productInCart) => productInCart.id === product.id);

    if (productInCart) {
        productInCart.quantity++;
        console.log(productInCart);
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    saveToLocalStorage('cart', cart);
    calculateCartItems(cart)
    toasts.push({
        title: 'Success',
        content: 'Added to cart successfully.',
        style: 'success'
    });
};



