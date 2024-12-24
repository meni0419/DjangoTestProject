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
    document.getElementById("themeToggleIcon");
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
    document.getElementById("headTitleAndSwitch").classList.add("dark-mode");
    document.getElementById("themeToggleIcon").classList.replace("bi-sun-fill", "bi-moon-fill");
    document.getElementById("themeToggleIcon").title = "Перемкнути на світлу тему";
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
    document.getElementById("headTitleAndSwitch").classList.remove("dark-mode");
    document.getElementById("themeToggleIcon").classList.replace("bi-moon-fill", "bi-sun-fill");
    document.getElementById("themeToggleIcon").title = "Перемкнути на темну тему";
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

document.addEventListener("DOMContentLoaded", () => {
    const btnPaste = document.getElementById("btnPaste");
    const btnCopy = document.getElementById("btnCopy");

    // Add event listener for the "Paste" button
    if (btnPaste) {
        btnPaste.addEventListener("click", async () => {
            try {
                // Read text from clipboard and paste it into the input textarea
                document.getElementById("inputText").value = await navigator.clipboard.readText();
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

// Snowfall Animation Script with Random Attributes
document.addEventListener("DOMContentLoaded", () => {
    const maxSnowflakes = 100; // Number of snowflakes
    const snowContainer = document.createElement("div");

    // Set container styles
    snowContainer.style.position = "fixed";
    snowContainer.style.top = "0";
    snowContainer.style.left = "0";
    snowContainer.style.width = "100%";
    snowContainer.style.height = "100%";
    snowContainer.style.pointerEvents = "none";
    snowContainer.style.overflow = "hidden";
    document.body.appendChild(snowContainer);

    // Random helper function
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    for (let i = 0; i < maxSnowflakes; i++) {
        const snowflake = document.createElement("div");
        snowflake.className = "snowflake";

        // Randomize properties
        const size = `${randomInRange(3, 5)}px`;
        const opacity = randomInRange(0.5, 1).toFixed(2);
        const startLeft = `${randomInRange(0, 100)}%`;
        const fallDuration = `${randomInRange(5, 10)}s`;
        const swayDuration = `${randomInRange(3, 5)}s`;
        const delay = `${randomInRange(0, 3)}s`;

        // Set properties to CSS variables
        snowflake.style.setProperty("--size", size);
        snowflake.style.setProperty("--opacity", opacity);
        snowflake.style.setProperty("--start-left", startLeft);
        snowflake.style.setProperty("--fall-duration", fallDuration);
        snowflake.style.setProperty("--sway-duration", swayDuration);
        snowflake.style.setProperty("--delay", delay);

        // Debugging for the first snowflake
        if (i === 0) {
            console.log("First Snowflake Debug:");
            console.log(`  Size: ${size}`);
            console.log(`  Opacity: ${opacity}`);
            console.log(`  Start Left: ${startLeft}`);
            console.log(`  Fall Duration: ${fallDuration}`);
            console.log(`  Sway Duration: ${swayDuration}`);
            console.log(`  Delay: ${delay}`);
        }

        snowContainer.appendChild(snowflake);
    }

    // Reset snowflake positions if they fall off-screen
    setInterval(() => {
        document.querySelectorAll(".snowflake").forEach(snowflake => {
            const rect = snowflake.getBoundingClientRect();
            if (rect.top > window.innerHeight) {
                const newLeft = `${Math.random() * 100}%`;
                snowflake.style.setProperty("--start-left", newLeft);
                snowflake.style.animation = "none"; // Stop animation temporarily
                void snowflake.offsetWidth; // Trigger reflow for reanimation
                snowflake.style.animation = ""; // Restart animation
            }
        });
    }, 1000);
});