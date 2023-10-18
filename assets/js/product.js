
const displayProduct = (product) => {
    let result = `
    <div class="col-md-5">
        <img src="${product.mainImage}" class="w-100 img-fluid" alt="${product.title}">

    </div>
    <div class="col-md-7 position-relative">
        <h1>${product.title}</h1>
        <h3>${product.category}</h3>
        <p>${product.brand ?? ''}</p>
        <p>${product.description}</p>
        <span class="rounded-pill bg-danger text-white fs-6 bg-gradient px-3 py-1">${product.discount}% off</span>
        <div class="countdown mt-3 d-flex gap-2 text-center my-3" id="countdown-${product.id}"></div>
        ${product.discount ?
            `<div class="d-flex gap-1 mt-3 align-items-center fs-4">
            <span class="text-main text-decoration-line-through text-secondary fs-5">$${product.price.toFixed(2)}</span> <span class="fw-bold text-main fs-4">$${(product.price - product.discount).toFixed(2)}</span>
            </div>`
            : `<span class="fw-bold text-main fs-4">$${(product.price).toFixed(2)}</span>`}
            <div>
            <button class="my-2 bg-main text-white p-2 border-0 rounded" onclick="addProductToWishlist(${JSON.stringify(product).replace(/"/g, '&quot;')})">
            <i class="fa-regular fa-heart"></i> Add To Wishlist
        </button>
        <button class="my-2 bg-main text-white d-inline-block p-2 rounded border-0" onclick="addProductToCart(${JSON.stringify({ ...product }).replace(/"/g, '&quot;')})">
            <i class="fa-brands fa-opencart"></i> Add To Cart
        </button>
            </div>
    </div>`;
    document.getElementById('product-container').innerHTML = result
    calculateTimeRemaining(product.coponDate, product.id)
}
const generateProduct = async () => {
    const id = parseInt(getParam('id'));
    const data = await fetchData(`products/3`)
    console.log(data.all); // 
    const product = data.all.find((product) => product.id === id)
    displayProduct(product)
    document.getElementById('product-title').textContent = `${product.title}`
}
generateProduct()


