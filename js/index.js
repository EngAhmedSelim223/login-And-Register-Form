let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");
let loginEmail = document.getElementById('loginEmail');
let loginPassword = document.getElementById('loginPassword');
let loginBtn = document.getElementById('loginBtn');
let registerName = document.getElementById('registerName');
let registerEmail = document.getElementById('registerEmail');
let registerPassword = document.getElementById('registerPassword');
let registerConfirmPassword = document.getElementById('registerConfirmPassword');
let registerBtn = document.getElementById('registerBtn');
let errAlert = document.getElementById('errAlert');
let successAlert = document.getElementById('successAlert');
let singnupAlert = document.getElementById('singnupAlert');
let regex = {
    name: /^[a-zA-Z\s]+$/, // Allows only letters and spaces
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Standard email regex
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/ // At least one number, one lowercase, one uppercase letter, and minimum 8 characters
};

let users;
if (localStorage.getItem('users')) {
    users = JSON.parse(localStorage.getItem('users'));
} else {
    users = [];
}
// Get the signup form inputs
let nameInput = document.querySelector(".signup-box .name");
let emailInput = document.querySelector(".signup-box .email");
let passwordInput = document.querySelector(".signup-box .password");

signup.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
});
// Login Functionality
loginBtn.addEventListener('click', () => {
    let email = loginEmail.value;
    let password = loginPassword.value;
    let user = users.find(user => user.email === email && user.password === password);
    if (user) {
        successAlert.classList.remove('d-none');
        successAlert.innerHTML = 'Login successful';
        setTimeout(() => {
            successAlert.classList.add('d-none');
             // Store the user's name in localStorage
             localStorage.setItem('loggedInUser', user.name);
             // Redirect to the welcome page
             window.location.href = '../welcome.html';
        }, 1000);

    } else {
        errAlert.classList.remove('d-none');
        errAlert.innerHTML = 'Invalid email or password';
        setTimeout(() => {
            errAlert.classList.add('d-none');
        }, 2000);
    }
});

// Register Functionality
registerBtn.addEventListener('click', () => {
    let name = registerName.value;
    let email = registerEmail.value;
    let password = registerPassword.value;
    let confirmPassword = registerConfirmPassword.value;

     // Check if user already exists
     let existingUser = users.find(user => user.email === email);
     if (existingUser) {
         singnupAlert.classList.remove('d-none');
         singnupAlert.innerHTML = 'User already exists';
         setTimeout(() => {
             singnupAlert.classList.add('d-none');
         }, 2000);
         return;
     }

    if (!name.match(regex.name)) {
        singnupAlert.classList.remove('d-none');
        singnupAlert.innerHTML = 'Invalid name';
        setTimeout(() => {
            singnupAlert.classList.add('d-none');
        }, 2000);
        return;
    }
    if (!email.match(regex.email)) {
        singnupAlert.classList.remove('d-none');
        singnupAlert.innerHTML = 'Invalid email';
        setTimeout(() => {
            singnupAlert.classList.add('d-none');
        }, 2000);
        return;
    }
    if (!password.match(regex.password)) {
        singnupAlert.classList.remove('d-none');
        singnupAlert.innerHTML = 'Password must contain at least one number, one lowercase, one uppercase letter, and minimum 8 characters';
        setTimeout(() => {
            singnupAlert.classList.add('d-none');
        }, 2000);
        return;
    }
    if (password !== confirmPassword) {
        singnupAlert.classList.remove('d-none');
        singnupAlert.innerHTML = 'Passwords do not match';
        setTimeout(() => {
            singnupAlert.classList.add('d-none');
        }, 2000);
        return;
    }
    let user = {
        name,
        email,
        password
    };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    singnupAlert.classList.remove('alert-warning');
    singnupAlert.classList.add('alert-success');
    singnupAlert.classList.remove('d-none');
    singnupAlert.innerHTML = 'Registration successful';
    setTimeout(() => {
        singnupAlert.classList.add('d-none');
        // Move the form switch inside the setTimeout function
        slider.classList.remove("moveslider");
        formSection.classList.remove("form-section-move");
    }, 2000);
    registerName.value = '';
    registerEmail.value = '';
    registerPassword.value = '';
    registerConfirmPassword.value = '';
});