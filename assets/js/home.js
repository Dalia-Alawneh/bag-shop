

const displayBanners = (banners) => {
    let result = ``
    banners.forEach(banner => {
        result += `
        <div class="col-sm-12 col-md-6 col-lg-6 img">
            <a href="" class="">
                <img src="${banner}" class="img-fluid w-100" alt="">
            </a>
        </div>
        `
    });
    bannersItems.innerHTML = result
}
generateData(() => fetchData('banners'), displayBanners)
generateData(() => fetchData('categories'), displayCategories)