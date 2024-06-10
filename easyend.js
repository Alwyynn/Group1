const usernameEasy = document.getElementById('usernameEasy');
const saveScoreBtnEasy = document.getElementById('SaveScoreBtnEasy');
const finalScoreEasy = document.getElementById('FinalScoreEasy');
const modal = document.getElementById("myModal");
const modalContent = document.querySelector(".modal-content");

let mostRecentScoreEasy = localStorage.getItem('mostRecentScoreEasy') || 0;
let highScoresEasy = JSON.parse(localStorage.getItem('highScoresEasy')) || [];

// Check if the elements exist before manipulating them
if (finalScoreEasy) {
    // Display final score
    finalScoreEasy.innerText = `You Scored ${mostRecentScoreEasy}/100`;
}

if (usernameEasy && saveScoreBtnEasy) {
    // Enable save button when username is entered
    usernameEasy.addEventListener('keyup', () => {
        saveScoreBtnEasy.disabled = !usernameEasy.value;
    });
}

// Save high score function
function saveHighScoreEasy(e) {
    e.preventDefault();

    if (saveScoreBtnEasy.disabled) {
        // Prevent saving if the button is disabled
        return;
    }

    const username = usernameEasy.value;

    // Check if the username already exists
    const existingUser = highScoresEasy.find(score => score.name === username);
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
        score: mostRecentScoreEasy,
        name: username,
    };
    highScoresEasy.push(score);
    highScoresEasy.sort((a, b) => b.score - a.score);

    localStorage.setItem('highScoresEasy', JSON.stringify(highScoresEasy));

    if (mostRecentScoreEasy === '100') {
        alert("Congratulations! You got a perfect score!");
    }

    // Disable the save button after saving
    saveScoreBtnEasy.disabled = true;
    // Disable the text box after saving
    usernameEasy.disabled = true;
}

if (saveScoreBtnEasy) {
    // Attach click event listener to save button
    saveScoreBtnEasy.addEventListener('click', saveHighScoreEasy);
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