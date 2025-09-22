(() => {
  'use strict';

  // Map of quiz ids to their correct answers
  const correctAnswers = {
    'characteristics': 'B',
    'design-flow': 'C',
    'software-techniques': 'B',
    'io-devices': 'B',
    'communication': 'C',
    'history': 'B'
  };

  // Exposed function used by inline onclick handlers in index.html
  function checkAnswer(button, quizId, userAnswer) {
    const feedbackEl = document.getElementById(`feedback-${quizId}`);
    if (!feedbackEl) return;

    const quizCard = button.closest('.quiz-card');
    const optionsContainer = quizCard ? quizCard.querySelector('.options') : null;
    if (!optionsContainer) return;

    const buttons = Array.from(optionsContainer.querySelectorAll('button'));
    const correct = correctAnswers[quizId];
    const letterToIndex = { A: 0, B: 1, C: 2, D: 3 };

    // Reset feedback state
    feedbackEl.classList.remove('correct', 'incorrect');

    if (userAnswer === correct) {
      feedbackEl.textContent = 'Correct! Well done.';
      feedbackEl.classList.add('correct');
      button.style.backgroundColor = '#28a745'; // Green for correct
    } else {
      feedbackEl.textContent = 'Oops! That\'s not quite right. Try reviewing the section above.';
      feedbackEl.classList.add('incorrect');
      button.style.backgroundColor = '#dc3545'; // Red for incorrect
    }

    // Subtly mark the correct option
    const correctBtn = buttons[letterToIndex[correct]];
    if (correctBtn) {
      correctBtn.style.boxShadow = '0 0 0 2px #28a745 inset';
    }

    // Disable all buttons in this quiz after an attempt
    buttons.forEach(b => { b.disabled = true; });
  }

  // Expose globally for inline HTML onclick access
  window.checkAnswer = checkAnswer;

  document.addEventListener('DOMContentLoaded', () => {
    // Initialize accordion content to be hidden
    document.querySelectorAll('.accordion-content').forEach(content => {
      content.style.display = 'none';
      content.style.maxHeight = '0px';
      content.setAttribute('aria-hidden', 'true');
    });

    // Accordion toggle behavior
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.setAttribute('aria-expanded', 'false');
      header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isOpen = header.classList.contains('active');

        if (isOpen) {
          header.classList.remove('active');
          header.setAttribute('aria-expanded', 'false');
          content.style.maxHeight = '0px';
          setTimeout(() => { content.style.display = 'none'; }, 200);
          content.setAttribute('aria-hidden', 'true');
        } else {
          header.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
          content.style.display = 'block';
          // Force reflow to enable the transition on first open
          void content.offsetHeight;
          content.style.maxHeight = content.scrollHeight + 'px';
          content.setAttribute('aria-hidden', 'false');
        }
      });
    });

    // Did You Know? rotating facts
    const facts = [
      'Many embedded systems run on just a few kilobytes of RAM.',
      'An average car contains dozens of embedded controllers.',
      'Real-time systems value determinism more than raw speed.',
      'Microcontrollers integrate CPU, memory, and peripherals on one chip.',
      'Power efficiency is a primary design goal in embedded devices.',
      'The Apollo Guidance Computer used core rope memory.'
    ];

    const factEl = document.getElementById('fact-display');
    if (factEl) {
      let idx = Math.floor(Math.random() * facts.length);
      factEl.textContent = facts[idx];

      setInterval(() => {
        idx = (idx + 1) % facts.length;
        factEl.textContent = facts[idx];
      }, 8000);
    }
  });
})();
