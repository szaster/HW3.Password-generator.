let lowercaseChecked = false;
let uppercaseChecked = false;
let numericChecked = false;
let specialChecked = false;


// for now password length is fixed
let passwordLength = 32;

// initial value of the password
const emptyString = "";
let password = emptyString;

// password character set
const lowerAlphas = "qwertyuiopasdfghjklzxcvbnm";
const upperAlphas = lowerAlphas.toUpperCase();
const numbers = "1234567890";
const special = "!@#$%^&*()_+=-;':/?.,|\\<>"

// generates n random integers from 0 to a given max (not included)
function randomIntegers(n, max) {
    const intMax = 2 ** 32 - 1;
    const buffer = window.crypto.getRandomValues(new Uint32Array(n)).map(i => {
        return Math.floor(max * i / intMax)
    });
    return buffer;
}


// selects random character from a provided string
function selectAtRandomFrom(str) {
    const positions = randomIntegers(1, str.length);
    return str[positions[0]]; 
}


// return true if any of the checkboxes are checked
function someAreChecked() {
    return lowercaseChecked || uppercaseChecked || numericChecked || specialChecked;
}


function tryShowPassword() {
    if (password !== emptyString) {
        const region = document.getElementById("passwordRegion");
        if (region !== null) {
            region.style.display = "block";
        }
        const display = document.getElementById("passwordDisplay");
        if (display !== null) {
            display.innerText = password;
        }
    }
}

function newPassword() {
    const chars = [];
    if (lowercaseChecked) {
        chars.push(lowerAlphas);
    }
    if (uppercaseChecked) {
        chars.push(upperAlphas);
    }
    if (numericChecked) {
        chars.push(numbers);
    }
    if (specialChecked) {
        chars.push(special);
    }
    const choices = randomIntegers(passwordLength, chars.length);
    const passwordChars = [];
    choices.forEach(i => passwordChars.push(selectAtRandomFrom(chars[i])));
    return passwordChars.join("");
}


function generatePassword() {
    if (someAreChecked()) {
        password = newPassword();
        tryShowPassword();
    } else {
        window.alert("At least one of checkboxes should be checked!");
        return;
    }
}

function hideWelcomeRegion() {
    const startButton = document.getElementById("welcomeRegion");
    if (startButton !== null) {
        startButton.style.display = "none";
    }
}

function toggleLowercase() {
    lowercaseChecked = !lowercaseChecked;
}

function toggleUppercase() {
    uppercaseChecked = !uppercaseChecked;
}

function toggleNumeric() {
    numericChecked = !numericChecked;
}

function toggleSpecial() {
    specialChecked = !specialChecked;
}

function attachEventListeners() {
    const lc = document.getElementById("lowercaseCheckbox");
    if (lc !== null) {
        lc.addEventListener("click", toggleLowercase);
    }
    const uc = document.getElementById("uppercaseCheckbox");
    if (uc !== null) {
        uc.addEventListener("click", toggleUppercase);
    }
    const nc = document.getElementById("numberCheckbox");
    if (nc !== null) {
        nc.addEventListener("click", toggleNumeric);
    }
    const sc = document.getElementById("specialCharsCheckbox");
    if (sc !== null) {
        sc.addEventListener("click", toggleSpecial);
    }
    const gp = document.getElementById("generateButton");
    if (gp !== null) {
        gp.addEventListener("click", generatePassword);
    }
}

function showPasswordCriteriaRegion() {
    const form = document.getElementById("passwordCriteriaRegion");
    if (form !== null) {
        form.style.display = "block";
    }
}

function onStartButtonPressed() {
    hideWelcomeRegion();
    showPasswordCriteriaRegion();
    attachEventListeners();
};

function onWindowLoad() {
    const startButton = document.getElementById("startButton");
    if (startButton !== null) {
        addEventListener("click", onStartButtonPressed);
    } else {
        window.alert("Application has failed to load.")
    }
}

window.addEventListener("load", onWindowLoad);