const form = document.querySelector('form');
form.addEventListener('submit', async(evt) => {
    evt.preventDefault();

    await axios.post('http://localhost:3000/logout')
        .then(response => {
            //console.log(response.data)
            document.querySelector('.pageNavigationLink').click();
        })
        .catch(err => {
            console.log(err)
        })
});