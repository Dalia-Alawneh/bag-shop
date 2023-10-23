const getParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
const user = JSON.parse(localStorage.getItem('loggedInUser'))
if (user) {
    document.getElementById('account').innerHTML = `
    <div class="dropdown">
        <button class="border-0 bg-transparent dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-regular fa-circle-user"></i>
        </button>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item text-capitalize active" href="#">${user.name}</a></li>
            <li><a class="dropdown-item" href="#" id="logout">Logout</a></li>
        </ul>
    </div>
    `
}else{
    document.getElementById('account').innerHTML = '<a href="login.html" class="text-decoration-none">Login</a>'
}
document.getElementById('logout')?.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.removeItem('loggedInUser')
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000)
})

window.onscroll = ()=>{
    if(window.scrollY > 200){

        document.querySelector('.navbar').classList.add('fixed-top', 'bg-white')
    }else{
        document.querySelector('.navbar').classList.remove('fixed-top')
    }
}
const toasts = new Toasts({
    offsetX: 20, // 20px
    offsetY: 20, // 20px
    gap: 20, // The gap size in pixels between toasts
    width: 300, // 300px
    timing: 'ease', // See list of available CSS transition timings
    duration: '.5s', // Transition duration
    dimOld: true, // Dim old notifications while the newest notification stays highlighted
    position: 'top-right' // top-left | top-center | top-right | bottom-left | bottom-center | bottom-right
});
const fetchData = async (data) => {
    const response = await fetch(`http://localhost:3000/${data}`)
    return await response.json()
}

const isLoggedIn = () => {
    return !! JSON.parse(localStorage.getItem('loggedInUser'))
}

const saveToLocalStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value))
}
const getDataFromLocalStorage = (name) => {
    return JSON.parse(localStorage.getItem(name))
}