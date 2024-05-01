let signupfield = document.querySelector('.signupbtn');
let siginfield = document.querySelector('.signinbtn')
let title = document.querySelector('.title');
let nameField = document.querySelector('.namefield');

siginfield.addEventListener('click' , ()=>{
    nameField.style.maxHeight = '0';
    title.innerHTML='Sign In'
    signupfield.classList.add('disable')
    siginfield.classList.remove('disable');

})

signupfield.addEventListener('click' , ()=>{
    nameField.style.maxHeight = '60px';
    title.innerHTML='Sign Up'
    signupfield.classList.remove('disable')
    siginfield.classList.add('disable');
})

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const formData = new FormData(this); // Get form data
    const userData = Object.fromEntries(formData.entries()); // Convert FormData to object

    // Send form data to server
    axios.post('https:localhost:5000/api/register', userData)
        .then(function(response) {
            console.log(response.data); // Log server response
            alert('User registered successfully!');
        })
        .catch(function(error) {
            console.error(error); // Log error
            alert('Failed to register user.');
        });
});

