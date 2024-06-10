const usernameMedium = document.getElementById('usernameMedium');
const saveScoreBtnMedium = document.getElementById('SaveScoreBtnMedium');
const finalScoreMedium = document.getElementById('FinalScoreMedium');
const modal = document.getElementById("myModal");
const modalContent = document.querySelector(".modal-content");

let mostRecentScoreMedium = localStorage.getItem('mostRecentScoreMedium') || 0;
let highScoresMedium = JSON.parse(localStorage.getItem('highScoresMedium')) || [];

// Check if the elements exist before manipulating them
if (finalScoreMedium) {
    // Display final score
    finalScoreMedium.innerText = `You Scored ${mostRecentScoreMedium}/100`;
}

if (usernameMedium && saveScoreBtnMedium) {
    // Enable save button when username is entered
    usernameMedium.addEventListener('keyup', () => {
        saveScoreBtnMedium.disabled = !usernameMedium.value;
    });
}

// Save high score function
function saveHighScoreMedium(e) {
    e.preventDefault();

    if (saveScoreBtnMedium.disabled) {
        // Prevent saving if the button is disabled
        return;
    }

    const username = usernameMedium.value;

    // Check if the username already exists
    const existingUser = highScoresMedium.find(score => score.name === username);
    if (existingUser) {
        // Show modal
        modal.style.display = "block";
        // Close the modal when the close button is clicked
        document.querySelector(".close").onclick = function() {
            modal.style.display = "none";
        }
        // Close the modal when user clicks outside the modal
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        return;
    }

    const score = {
        score: mostRecentScoreMedium,
        name: username,
    };
    highScoresMedium.push(score);
    highScoresMedium.sort((a, b) => b.score - a.score);

    localStorage.setItem('highScoresMedium', JSON.stringify(highScoresMedium));

    if (mostRecentScoreMedium === '100') {
        alert("Congratulations! You got a perfect score!");
    }

    // Disable the save button after saving
    saveScoreBtnMedium.disabled = true;
    // Disable the text box after saving
    usernameMedium.disabled = true;
}

if (saveScoreBtnMedium) {
    // Attach click event listener to save button
    saveScoreBtnMedium.addEventListener('click', saveHighScoreMedium);
}

// Close modal function
document.getElementById("modalCloseBtn").onclick = function() {
    modal.style.display = "none";
}

// Show modal function
function showModal() {
    modal.style.display = "block";
}

modal.addEventListener('click', function(event) {
    event.stopPropagation();
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = "block";
    }
});