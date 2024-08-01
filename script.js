// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

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

// Event listeners and Firebase interactions for each page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('priceButton')) {
        document.getElementById('priceButton').addEventListener('click', () => {
            window.location.href = 'price.html';
        });
    }

    if (document.getElementById('okButton')) {
        document.getElementById('okButton').addEventListener('click', async () => {
            const price = document.getElementById('priceInput').value;
            if (price) {
                try {
                    const priceRef = ref(database, 'prices/latest');
                    await set(priceRef, { price: price });
                    document.getElementById('confirmationMessage').textContent = `You entered: ${price}`;
                    setTimeout(() => {
                        document.getElementById('confirmationMessage').textContent = '';
                    }, 2000);
                } catch (error) {
                    console.error("Error writing document: ", error);
                }
            } else {
                alert('Please enter a price.');
            }
        });
    }

    if (document.getElementById('backButton')) {
        document.getElementById('backButton').addEventListener('click', () => {
            window.location.href = 'main.html';
        });
    }

    if (document.getElementById('userAddButton')) {
        document.getElementById('userAddButton').addEventListener('click', () => {
            window.location.href = 'user_add.html';
        });
    }

    if (document.getElementById('uabackButton')) {
        document.getElementById('uabackButton').addEventListener('click', () => {
            window.location.href = 'users.html';
        });
    }
    // Add event listeners for other buttons as needed
});
