const email = document.querySelector('input[id=email]');
const username = document.querySelector('input[id=username]');
const password = document.querySelector('input[id=password]');

/* Show/hide password in login and signup forms*/
const showHidePasswordBtns = document.querySelectorAll('.showHidePassword');

showHidePasswordBtns[1].addEventListener('click', () => {
    showHidePasswordBtns[1].classList.add('d-none');
    password.setAttribute('type', 'text');
});
showHidePasswordBtns[0].addEventListener('click', () => {
    showHidePasswordBtns[1].classList.remove('d-none');
    password.setAttribute('type', 'password');
});

/* No spaces allowed in username or password in signup form*/
username.addEventListener('input', checkForSpaces);
password.addEventListener('input', checkForSpaces);

function checkForSpaces() {
    if (this.value.includes(' ')) {
        this.setCustomValidity('This field cannot have spaces.');
    } else {
        this.setCustomValidity('');
    }
}

/* Submitting Form */
const form = document.querySelector('form');
const loader = document.querySelector('.loader');
form.addEventListener('submit', sendFormData);

async function sendFormData(evt) {
    evt.preventDefault();
    loader.classList.remove('d-none');

    let url = '';

    const dataToBeSent = {
        username: username.value,
        password: password.value
    }

    username.setCustomValidity('');
    password.setCustomValidity('');    

    if (email) {
        dataToBeSent.email = email.value;
        url = 'http://localhost:3000/signup';
    }    
    else {
        url = 'http://localhost:3000/login';
    }

    await axios.post(url, dataToBeSent)
        .then(response => {
            loader.classList.add('d-none');
            document.querySelector('.pageNavigationLink').click();
        })
        .catch(err => {
            loader.classList.add('d-none');
            const failureMessage = document.querySelector('.failureMessage');
            failureMessage.classList.remove("d-none");
            failureMessage.textContent = err.response.data;
        })
}