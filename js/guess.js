// Number guessing game with modern UI features, animations and score tracking
document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('guess-game');
  if (!container) return;

  const startBtn = container.querySelector('#guess-start');
  const guessInput = container.querySelector('#guess-input');
  const submitBtn = container.querySelector('#guess-submit');
  const feedback = container.querySelector('#guess-feedback');
  const attemptsEl = container.querySelector('#guess-attempts');
  const resetBtn = container.querySelector('#guess-reset');

  let target = null;
  let attempts = 0;
  let lastGuess = 0;
  const maxAttempts = 10;

  // Utility function for animations
  function animateElement(element, className, duration = 1000) {
    element.classList.add(className);
    setTimeout(() => element.classList.remove(className), duration);
  }

  function startGame() {
    // Generate random number using crypto for better randomness
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    target = (array[0] % 100) + 1;
    
    attempts = 0;
    lastGuess = 0;
    
    feedback.textContent = 'Game started! Guess a number between 1 and 100';
    feedback.className = 'mb-1 fw-bold text-primary';
    attemptsEl.textContent = `Attempts: 0/${maxAttempts}`;
    attemptsEl.className = 'small text-muted';
    
    guessInput.disabled = false;
    submitBtn.disabled = false;
    guessInput.value = '';
    guessInput.focus();
    
    animateElement(container, 'animate-bounce');
    console.log('Target (dev):', target);
  }

  function updateProgressBar(progress) {
    const progressBar = container.querySelector('.progress-bar');
    if (progressBar) {
      $(progressBar).css('width', progress + '%')
        .attr('aria-valuenow', progress)
        .text(progress + '%');
    }
  }

  // Convert event handlers to jQuery
  $(startBtn).on('click', startGame);
  
  $(submitBtn).on('click', function() {
    const guess = parseInt(guessInput.value);
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
      $(feedback)
        .text('Please enter a valid number between 1 and 100')
        .removeClass()
        .addClass('text-danger mb-1 fw-bold')
        .hide()
        .fadeIn();
      animateElement(guessInput, 'animate-shake');
      return;
    }

    attempts++;
    lastGuess = guess;
    
    $(attemptsEl)
      .text(`Attempts: ${attempts}/${maxAttempts}`)
      .effect('highlight', {}, 500);

    // Game over check
    if (attempts >= maxAttempts && guess !== target) {
      $(feedback)
        .text(`Game Over! The number was ${target}`)
        .removeClass()
        .addClass('text-danger mb-1 fw-bold');
      guessInput.disabled = true;
      submitBtn.disabled = true;
      return;
    }

    // Check guess
    if (guess === target) {
      const score = Math.max(0, 100 - (attempts - 1) * 10);
      $(feedback)
        .text(`Congratulations! You found the number ${target} in ${attempts} attempts! Score: ${score}`)
        .removeClass()
        .addClass('text-success mb-1 fw-bold')
        .hide()
        .fadeIn();
      
      // Save high score to localStorage
      const highScore = localStorage.getItem('guessGameHighScore') || 0;
      if (score > highScore) {
        localStorage.setItem('guessGameHighScore', score);
      }
      
      guessInput.disabled = true;
      submitBtn.disabled = true;
      $(container).effect('bounce', { times: 3 }, 300);
    } else {
      const difference = Math.abs(target - guess);
      let message = guess < target ? 'Try higher! ' : 'Try lower! ';
      
      // Add temperature hint
      if (difference <= 5) message += '(Very Hot! 🔥)';
      else if (difference <= 10) message += '(Hot! 🌡️)';
      else if (difference <= 20) message += '(Warm 😊)';
      else if (difference <= 30) message += '(Cool 😐)';
      else message += '(Cold ❄️)';
      
      $(feedback)
        .text(message)
        .removeClass()
        .addClass(difference <= 10 ? 'text-warning mb-1 fw-bold' : 'text-info mb-1 fw-bold')
        .hide()
        .fadeIn();
      
      // Show progress bar
      const progress = Math.min(100, Math.max(0, 100 - difference));
      updateProgressBar(progress);
    }
    
    // Clear input and focus
    $(guessInput).val('').focus();
  });

  $(resetBtn).on('click', function() {
    target = null;
    attempts = 0;
    lastGuess = 0;
    
    $(feedback)
      .text('Game reset. Click Start to play again.')
      .removeClass()
      .addClass('text-muted mb-1')
      .hide()
      .fadeIn();
      
    $(attemptsEl).text('');
    $(guessInput)
      .prop('disabled', true)
      .val('');
    $(submitBtn).prop('disabled', true);
    updateProgressBar(0);
  });
});