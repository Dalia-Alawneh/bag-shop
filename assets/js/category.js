const filterForm = document.getElementById('filterForm');
const searchElement = document.getElementById("search")

const displayProductsByCategory = (products) => {
    console.log(products);
    let result = `<div class="row align-items-stretch row-gap-3">`
    if (products.length > 0) {
        products.forEach((product) => {

            result += `
            <div class="col-md-6 col-lg-4 product-item ">
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
    } else {
        result = "<div class='text-center pt-5'>No Products Found</div>"
    }

    result += "</div>"
    document.getElementById('category-products').innerHTML = result
}
const getProductsByCategory = async () => {
    const id = getParam('id')
    const data = await fetchData(`categories/${id}`)
    return data
}
const generateDataByCategory = async () => {
    const data = await getProductsByCategory()
    displayProductsByCategory(data.products)
    document.getElementById('category-title').textContent = `${data.title} Category`
}
generateDataByCategory()


const searchProductByCategory = async (searchTerm) => {
    const data = await getProductsByCategory()
    const filteredProducts = data.products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    displayProductsByCategory(filteredProducts)
}
searchElement.addEventListener('input', () => searchProductByCategory(searchElement.value))

filterForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const data = await getProductsByCategory()
    const selectedDiscount = document.querySelector('input[name="discount"]:checked');
    const selectedPriceRanges = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(input => input.value);
    const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(input => input.value);

    const filteredProducts = data.products.filter(product => {
        if (selectedDiscount?.value === "discount" && (product.discount !== undefined && product.discount > 0)) {
            return true;
        }
        if (selectedDiscount?.value === "nodiscount" && (product.discount === undefined || product.discount === 0)) {
            return true;
        }
        if (selectedDiscount?.value === "all") {
            return true;
        }
        console.log(selectedPriceRanges);
        if (selectedPriceRanges.length > 0) {
            const price = product.price;
            const isValid = selectedPriceRanges.some(range => {
                const [min, max] = range.split('-').map(Number);
                return price >= min && price <= max;
            });

            if (isValid) {
                return true; 
            }else{
                return false
            }
        }
        if (selectedBrands?.length > 0 && selectedBrands?.includes(product.brand?.toLowerCase())) {
            return true;
        }
    });

    console.log("Filtered Products: ", filteredProducts);

    console.log(filteredProducts);
    displayProductsByCategory(filteredProducts);
});
