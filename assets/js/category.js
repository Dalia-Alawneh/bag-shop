const searchElement = document.getElementById("search")

const displayProductsByCategory = (products) => {
    console.log(products);
    let result = `<div class="row align-items-stretch row-gap-3">`
    products.forEach((product) => {

        result += `
        <div class="col-md-4 product-item ">
        <div class="card text-center p-4 h-100 position-relative overflow-hidden ">
        <div class="position-absolute start-0 rounded-pill bg-danger text-white fs-7 bg-gradient px-2 ms-3">${product.discount ? '- ' + product.discount + "%" : ''}</div>
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

        </div>
        </div>
        `
    })
    result += "</div>"

    document.getElementById('category-products').innerHTML = result
}
const generateDataByCategory = async () => {
    const id = getParam('id')
    const data = await fetchData(`categories/${id}`)
    displayProductsByCategory(data.products)
    document.getElementById('category-title').textContent = `${data.title} Category`
    return data.products;
}
generateDataByCategory()


const searchProductByCategory =async (searchTerm) => {
    const products = await generateDataByCategory()
    const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    displayProductsByCategory(filteredProducts)
}
searchElement.addEventListener('input', () => searchProductByCategory(searchElement.value))