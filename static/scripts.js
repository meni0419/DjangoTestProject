// Load persisted theme preference and switcher state on page load
document.addEventListener("DOMContentLoaded", () => {
    const storedTheme = localStorage.getItem("theme");
    const themeSwitcher = document.getElementById("flexSwitchCheckDefault");

    if (storedTheme === "dark") {
        enableDarkMode();
        themeSwitcher.checked = true; // Match switcher state to dark mode
    } else {
        disableDarkMode();
        themeSwitcher.checked = false; // Match switcher state to light mode
    }
});

// Toggle between light and dark mode
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById("themeToggleIcon");

    // Check the current mode and toggle
    if (body.classList.contains("dark-mode")) {
        disableDarkMode();
        localStorage.setItem("theme", "light"); // Save preference to localStorage
    } else {
        enableDarkMode();
        localStorage.setItem("theme", "dark"); // Save preference to localStorage
    }
}

// Enable Dark Mode
function enableDarkMode() {
    document.body.classList.add("dark-mode");
    document.getElementById("themeToggleIcon").classList.replace("bi-sun-fill", "bi-moon-fill");
    document.getElementById("themeToggleIcon").title = "Switch to Day Mode";
    document.getElementById("pageTitle").classList.replace("text-primary", "text-info");
    document.getElementById("labelToggle").innerText = "Світла";

    // Apply dark mode to textareas
    document.querySelectorAll("textarea").forEach((textarea) => textarea.classList.add("dark-mode"));

    // Also ensure all labels become 'dark-mode' styled
    document.querySelectorAll("label").forEach((label) => label.classList.add("dark-mode"));

    // Apply dark mode to cards
    document.querySelectorAll(".card").forEach((card) => card.classList.add("dark-mode"));
}

// Disable Dark Mode (Light Mode)
function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    document.getElementById("themeToggleIcon").classList.replace("bi-moon-fill", "bi-sun-fill");
    document.getElementById("themeToggleIcon").title = "Switch to Night Mode";
    document.getElementById("pageTitle").classList.replace("text-info", "text-primary");
    document.getElementById("labelToggle").innerText = "Темна";

    // Remove dark mode from textareas
    document.querySelectorAll("textarea").forEach((textarea) => textarea.classList.remove("dark-mode"));

    // Also revert labels to their default styles
    document.querySelectorAll("label").forEach((label) => label.classList.remove("dark-mode"));

    // Remove dark mode from cards
    document.querySelectorAll(".card").forEach((card) => card.classList.remove("dark-mode"));
}

// Transliterate input text function (replace with your logic)
async function transliterateText() {
    const inputText = document.getElementById("inputText").value;
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // Placeholder for POST request (replace with your Django logic)
    const response = await fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-CSRFToken": csrfToken
        },
        body: new URLSearchParams({
            "text": inputText
        })
    });

    const data = await response.json();
    document.getElementById("outputText").value = data.transliterated_text;
}