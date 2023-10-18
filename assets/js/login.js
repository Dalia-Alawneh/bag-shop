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
function handleLogin(event) {
    event.preventDefault();

    const loginEmail = document.getElementById('email').value;
    const loginPassword = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === loginEmail && user.password === loginPassword);

    if (user) {
        toasts.push({
            title: 'Success',
            content: 'Login successful!',
            style: 'success'
        });
        localStorage.setItem("loggedInUser", JSON.stringify(user))
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000)
    } else {
        toasts.push({
            title: 'Warning',
            content: 'Invalid email or password. Please try again.',
            style: 'error'
        });
    }
}

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', handleLogin);