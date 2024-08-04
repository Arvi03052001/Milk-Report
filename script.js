// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getDatabase, ref, set, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQeWsANccZ7P13iVBsiie26bjmJV9Anng",
    authDomain: "milk-2dd07.firebaseapp.com",
    projectId: "milk-2dd07",
    storageBucket: "milk-2dd07.appspot.com",
    messagingSenderId: "1013506317972",
    appId: "1:1013506317972:web:d0143c779469ac96be1e81",
    measurementId: "G-TXB3TX5TP1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Function to handle the OK button click
async function handleOkButton() {
    const price = document.getElementById('priceInput').value;
    if (price) {
        try {
            const priceRef = ref(database, 'prices/latest');
            await set(priceRef, { price: price });
            document.getElementById('confirmationMessage').textContent = `You entered: ${price}`;
            setTimeout(() => {
                document.getElementById('confirmationMessage').textContent = '';
                window.location.href = 'main.html'; // Redirect after confirmation
            }, 2000);
        } catch (error) {
            console.error("Error writing document: ", error);
        }
    } else {
        alert('Please enter a price.');
    }
}

// Function to handle navigation
function setupNavigation() {
    document.getElementById('priceButton')?.addEventListener('click', () => {
        window.location.href = 'price.html';
    });

    document.getElementById('usersButton')?.addEventListener('click', () => {
        window.location.href = 'users.html';
    });

    document.getElementById('amButton')?.addEventListener('click', () => {
        window.location.href = 'am_milk.html';
    });

    document.getElementById('pmButton')?.addEventListener('click', () => {
        window.location.href = 'pm_milk.html';
    });

    document.getElementById('languageButton')?.addEventListener('click', () => {
        document.getElementById('languagePopup').style.display = 'block';
    });

    document.getElementById('backButton')?.addEventListener('click', () => {
        window.location.href = 'main.html';
    });

    document.getElementById('userAddButton')?.addEventListener('click', () => {
        window.location.href = 'user_add.html';
    });

    document.getElementById('uabackButton')?.addEventListener('click', () => {
        window.location.href = 'users.html';
    });

    document.getElementById('removeUserButton')?.addEventListener('click', () => {
        window.location.href = 'user_remove.html';
    });
}

// Function to set language
async function setLanguage(language) {
    const translations = await loadTranslations(language);
    applyTranslations(translations);
    localStorage.setItem('language', language);
    document.getElementById('languagePopup').style.display = 'none'; // Close popup
}

// Function to load translations
async function loadTranslations(language) {
    const response = await fetch(`translations/${language}.json`);
    return response.json();
}

// Function to apply translations
function applyTranslations(translations) {
    document.querySelector('h1').textContent = translations.title;
    document.getElementById('amButton').textContent = translations.amButton;
    document.getElementById('pmButton').textContent = translations.pmButton;
    document.getElementById('priceButton').textContent = translations.priceButton;
    document.getElementById('usersButton').textContent = translations.usersButton;
    document.getElementById('languageButton').textContent = translations.languageButton;
    // Apply translations to other elements similarly
}

// Function to display user data in am_countlist.html
function displayUserData() {
    const userTable = document.getElementById('user-table');
    const userRef = ref(database, 'users');
    
    onValue(userRef, (snapshot) => {
        userTable.innerHTML = ''; // Clear table content

        snapshot.forEach(childSnapshot => {
            const userData = childSnapshot.val();
            const row = userTable.insertRow();
            row.insertCell(0).textContent = childSnapshot.key;  // Serial Number
            row.insertCell(1).textContent = userData.name || 'No Name';  // Name
        });
    }, (error) => {
        console.error('Error fetching user data:', error.message);
        document.getElementById('message').innerText = 'Error fetching user data. Please try again.';
    });
}

// Setup event listeners and Firebase interactions on page load
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();

    if (document.getElementById('okButton')) {
        document.getElementById('okButton').addEventListener('click', handleOkButton);
    }

    // Apply saved language on page load
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    // Display user data if on the am_countlist.html page
    if (document.body.id === 'am_countlist') {
        displayUserData();
    }
});

// Register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}
