        button.style.backgroundColor = '#28a745'; // Green for correct
    } else {
        feedbackElement.textContent = 'Oops! That\'s not quite right. Try again!';
        feedbackElement.classList.add('incorrect');
        button.style.backgroundColor = '#dc3545'; // Red for incorrect
        // Optionally, highlight the correct answer
        Array.from(optionsContainer.children).forEach(btn => {
            if (btn.textContent.startsWith(correctAnswer)) { // Assuming option text starts with A), B), C)
                // This is a bit tricky with current button text, might need to adjust button text or add data-attribute
                // For now, just indicate incorrect.
            }
        });
    }
    // Disable all buttons in this quiz after an attempt
    Array.from(optionsContainer.children).forEach(btn => {
        btn.disabled = true;
    });
}
// Initial setup for accordion content to be hidden
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.accordion-content').forEach(content => {
        content.style.display = 'none';
        content.style.maxHeight = '0'; // Ensure initial state for animation
    });
});
