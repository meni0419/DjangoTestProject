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

// document.getElementById("btnPaste").addEventListener("click", async () => {
//     try {
//          // Read text from clipboard and Paste text into the input textarea
//         document.getElementById("inputText").value = await navigator.clipboard.readText();
//         await transliterateText(); // Trigger the transliteration process automatically
//     } catch (err) {
//         console.error("Failed to read clipboard contents: ", err);
//     }
// });
//
// // Copy text from the output textarea to clipboard
// document.getElementById("btnCopy").addEventListener("click", () => {
//     const outputTextarea = document.getElementById("outputText");
//
//     if (outputTextarea.value.trim()) { // Proceed only if outputText is not empty
//         navigator.clipboard.writeText(outputTextarea.value)
//             .then(() => {
//                 alert("Text successfully copied to clipboard!"); // Optional confirmation
//             })
//             .catch((err) => {
//                 console.error("Failed to copy text to clipboard: ", err);
//             });
//     } else {
//         alert("No text available to copy!"); // Warn if outputText is empty
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
    const btnPaste = document.getElementById("btnPaste");
    const btnCopy = document.getElementById("btnCopy");

    // Add event listener for the "Paste" button
    if (btnPaste) {
        btnPaste.addEventListener("click", async () => {
            try {
                // Read text from clipboard and paste it into the input textarea
                const text = await navigator.clipboard.readText();
                document.getElementById("inputText").value = text;
                await transliterateText(); // Trigger the transliteration process automatically
            } catch (err) {
                console.error("Failed to read clipboard contents: ", err);
            }
        });
    } else {
        console.error("btnPaste not found in the DOM.");
    }

    // Add event listener for the "Copy" button
    if (btnCopy) {
        btnCopy.addEventListener("click", () => {
            const outputTextarea = document.getElementById("outputText");
            const toastLive = document.getElementById('liveToast')

            if (outputTextarea.value.trim()) {
                navigator.clipboard.writeText(outputTextarea.value)
                    .then(() => {
                        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive)
                        toastBootstrap.show();
                    })
                    .catch((err) => {
                        console.error("Failed to copy text to clipboard: ", err);
                    });
            } else {
                alert("No text available to copy!"); // Warn if outputText is empty
            }
        });
    } else {
        console.error("btnCopy not found in the DOM.");
    }
});