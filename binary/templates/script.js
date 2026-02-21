// // ===============================
// // Neon Binary Lab - Frontend Logic
// // ===============================

// const textInput = document.getElementById("textInput");
// const convertButton = document.querySelector(".convert-button");
// const toggleButtons = document.querySelectorAll(".toggle-btn");

// const binaryOutput = document.getElementById("binaryOutput");
// const statCharacters = document.getElementById("statCharacters");
// const statBits = document.getElementById("statBits");
// const statBlocks = document.getElementById("statBlocks");
// const statArchitecture = document.getElementById("statArchitecture");

// const outputCard = document.querySelector(".output-card");

// let selectedMode = 32;

// // -------------------------------
// // Toggle Architecture Selection
// // -------------------------------
// toggleButtons.forEach(button => {
//     button.addEventListener("click", () => {
//         toggleButtons.forEach(btn => btn.classList.remove("active"));
//         button.classList.add("active");
//         selectedMode = Number(button.dataset.arch);
//     });
// });

// // -------------------------------
// // Convert Button Handler
// // -------------------------------
// convertButton.addEventListener("click", async () => {
//     const userInput = textInput.value.trim();

//     // Prevent empty submission
//     if (!userInput) {
//         alert("Please enter some text before converting.");
//         textInput.focus();
//         return;
//     }

//     try {
//         convertButton.disabled = true;
//         convertButton.textContent = "Converting...";

//         const response = await fetch("/convert", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 text: userInput,
//                 mode: selectedMode
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`Server error: ${response.status}`);
//         }

//         const data = await response.json();

//         // Update UI with response data
//         updateUI(data);

//     } catch (error) {
//         console.error("Conversion failed:", error);
//         alert("Something went wrong. Please try again.");
//     } finally {
//         convertButton.disabled = false;
//         convertButton.textContent = "Convert";
//     }
// });

// // -------------------------------
// // UI Update Function
// // -------------------------------
// function updateUI(data) {
//     const { binary, characters, bits, blocks, architecture } = data;

//     binaryOutput.textContent = binary;
//     statCharacters.textContent = characters;
//     statBits.textContent = bits;
//     statBlocks.textContent = blocks;
//     statArchitecture.textContent = `${architecture}-bit`;

//     // Smooth fade-in animation
//     outputCard.style.opacity = "0";
//     outputCard.style.transform = "translateY(20px)";
//     outputCard.style.display = "block";

//     requestAnimationFrame(() => {
//         outputCard.style.transition = "all 0.4s ease";
//         outputCard.style.opacity = "1";
//         outputCard.style.transform = "translateY(0)";
//     });
// }

















// Assuming:
// 1. Your Python backend file is named: app.py
// 2. It runs on: http://127.0.0.1:5000
// 3. It has a route: @app.route("/convert", methods=["POST"])
// 4. You are running the Flask server locally

// const response = await fetch("http://127.0.0.1:5000/convert", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         text: userInput,
//         mode: selectedMode
//     })
// });

// if (!response.ok) {
//     throw new Error(`Server error: ${response.status}`);
// }

// const data = await response.json();












































// ===============================
// Connect Frontend to Flask (app.py)
// Sends data to /convert and updates UI
// Without clearing previous binary output
// ===============================

const textInput = document.getElementById("textInput");
const convertButton = document.querySelector(".convert-button");
const toggleButtons = document.querySelectorAll(".toggle-btn");

const binaryOutput = document.getElementById("binaryOutput");
const statCharacters = document.getElementById("statCharacters");
const statBits = document.getElementById("statBits");
const statBlocks = document.getElementById("statBlocks");
const statArchitecture = document.getElementById("statArchitecture");

let selectedMode = 32;

// Toggle selection
toggleButtons.forEach(button => {
    button.addEventListener("click", () => {
        toggleButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        selectedMode = Number(button.dataset.arch);
    });
});

// Convert button handler
convertButton.addEventListener("click", async () => {
    const userInput = textInput.value.trim();

    if (!userInput) {
        alert("Please enter some text.");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/convert", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: userInput,
                mode: selectedMode
            })
        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();

        // Append new result instead of replacing previous data
        binaryOutput.textContent += 
            `\n\n===== New Conversion (${data.architecture}-bit) =====\n\n` +
            data.binary;

        // Update stats (latest conversion shown)
        statCharacters.textContent = data.characters;
        statBits.textContent = data.bits;
        statBlocks.textContent = data.blocks;
        statArchitecture.textContent = `${data.architecture}-bit`;

    } catch (error) {
        console.error("Error:", error);
        alert("Conversion failed. Make sure Flask server is running.");
    }
});
