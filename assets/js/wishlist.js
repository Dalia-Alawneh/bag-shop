const displayWishlist = (wishlist) => {
    let result = ``
    if(!wishlist.length){
        result = 'You dont have any product in your wishlist'
    }else{
        wishlist.forEach(product => {
            result+= `
            <div class="col-lg-3 col-md-6">
                <img src="${product.mainImage}" class="w-100 img-fluid" alt="${product.title}">
                <h3 class="my-3">${product.title}</h3>
                ${product.discount ? 
                    `<div class="d-flex gap-1 justify-content-center">
                    <span class="text-main text-decoration-line-through text-secondary">$${product.price.toFixed(2)}</span> <span class="fw-bold text-main">$${(product.price - product.discount).toFixed(2)}</span>
                    </div>` 
                    : `<div class="fw-bold text-main">$${(product.price).toFixed(2)}</div>`}
                <button onclick="deleteProduct(${product.id})" class="text-main mt-2 fs-3 bg-transparent border-0"><i class="fa-regular fa-circle-xmark"></i></button>
            </div>
            `
        });
    }
    document.getElementById('wishlist-data').innerHTML = result
}


generateData(()=> getDataFromLocalStorage('wishlist'), displayWishlist)
function deleteProduct(id){
    wishlist = getDataFromLocalStorage('wishlist')
    wishlist = wishlist.filter((product)=> product.id !== id)
    saveToLocalStorage('wishlist', wishlist)
    displayWishlist(wishlist)
    toasts.push({
        title: 'Warning',
        content: 'Product Deleted.',
        style: 'error'
    });
}