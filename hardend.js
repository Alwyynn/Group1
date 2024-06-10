const usernameHard = document.getElementById('usernameHard');
const saveScoreBtnHard = document.getElementById('SaveScoreBtnHard');
const finalScoreHard = document.getElementById('FinalScoreHard');
const modal = document.getElementById("myModal");
const modalContent = document.querySelector(".modal-content");

let mostRecentScoreHard = localStorage.getItem('mostRecentScoreHard') || 0;
let highScoresHard = JSON.parse(localStorage.getItem('highScoresHard')) || [];

// Check if the elements exist before manipulating them
if (finalScoreHard) {
    // Display final score
    finalScoreHard.innerText = `You Scored ${mostRecentScoreHard}/100`;
}

if (usernameHard && saveScoreBtnHard) {
    // Enable save button when username is entered
    usernameHard.addEventListener('keyup', () => {
        saveScoreBtnHard.disabled = !usernameHard.value;
    });
}

// Save high score function
function saveHighScoreHard(e) {
    e.preventDefault();

    if (saveScoreBtnHard.disabled) {
        // Prevent saving if the button is disabled
        return;
    }

    const username = usernameHard.value;

    // Check if the username already exists
    const existingUser = highScoresHard.find(score => score.name === username);
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
        score: mostRecentScoreHard,
        name: username,
    };
    highScoresHard.push(score);
    highScoresHard.sort((a, b) => b.score - a.score);

    localStorage.setItem('highScoresHard', JSON.stringify(highScoresHard));

    if (mostRecentScoreHard === '100') {
        alert("Congratulations! You got a perfect score!");
    }

    // Disable the save button after saving
    saveScoreBtnHard.disabled = true;
    // Disable the text box after saving
    usernameHard.disabled = true;
}

if (saveScoreBtnHard) {
    // Attach click event listener to save button
    saveScoreBtnHard.addEventListener('click', saveHighScoreHard);
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