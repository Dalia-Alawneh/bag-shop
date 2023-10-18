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
function handleSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    if (!name || !phone || !email || !password || !confirmPassword) {
        toasts.push({
            title: 'Warning',
            content: 'Please fill in all fields!',
            style: 'error'
        });
        return;
    }

    if (password !== confirmPassword) {
        toasts.push({
            title: 'Warning',
            content: 'Passwords do not match.',
            style: 'error'
        });
        return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const isEmailUnique = users.every(user => user.email !== email);

    if (!isEmailUnique) {
        toasts.push({
            title: 'Warning',
            content: 'Email is already registered. Please use a different email.',
            style: 'error'
        });
        return;
    }
    const user = { name, phone, email, password };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    toasts.push({
        title: 'Success',
        content: 'User registered successfully!',
        style: 'success'
    });
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000)
}

const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', handleSubmit);