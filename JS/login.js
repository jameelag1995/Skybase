/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const emailInput = document.getElementById("email");
const emailErr = document.getElementById("emailError");
const passwordInput = document.getElementById("password");
const passwordErr = document.getElementById("passwordError");
const form = document.getElementById("userForm");
const admin = document.getElementById("admin");
/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */

let isValid = true;



/* -------------------------------------------------------------------------- */
/*                                    Func                                    */
/* -------------------------------------------------------------------------- */

function displayErrorMsg(dist, msg) {
    dist.innerText = msg;
}
function hideErrorMsg(dist) {
    dist.innerText = "";
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

emailInput.addEventListener("keyup", (e) => {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(e.target.value)) {
        displayErrorMsg(emailErr, "Please enter a valid email.");
        isValid = false;
        emailInput.classList.add('error');
    } else {
        hideErrorMsg(emailErr);
        emailInput.classList.remove('error');
        isValid = true;
    }
});

passwordInput.addEventListener("keyup", (e) => {
    const re = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (!re.test(e.target.value)) {
        displayErrorMsg(
            passwordErr,
            "Password must be at least 8 characters long, containing lowercase, uppercase letters, numbers, and a special character."
        );
        passwordInput.classList.add('error');
        isValid = false;        
    } else {
        hideErrorMsg(passwordErr);
        passwordInput.classList.remove('error');
        isValid = true;
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isAdmin = admin.checked;
    if (isValid) {
        localStorage.setItem('email',emailInput.value);
        localStorage.setItem('isAdmin',isAdmin);
        form.reset();
        window.location.href = '../HTML/homepage.html';
    } else {
        return;
    }
});

