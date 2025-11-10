// jQuery Interactive Demos Implementation
$(function(){
  // Selectors & CSS Demo
  let isStyleChanged = false;
  
  // Selector by tag example
  $('p').css('line-height', '1.6');
  
  // Selector by class example
  $('.demo-panel').css('opacity', '0.95');
  
  $('#sel-btn').on('click', function(){
    if (!isStyleChanged) {
      // Using both .text() and .html() for demonstration
      $('#sel-par')
        .html('✨ Text with <strong>HTML</strong> transformed by <em>jQuery magic!</em>')
        .css({
          color: '#0b6cf2',
          fontWeight: '700',
          transform: 'scale(1.05)',
          transition: 'all 0.3s ease',
          background: 'linear-gradient(45deg, #f3f4f6, #ffffff)',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        });
      $(this).text('Reset Style');
    } else {
      $('#sel-par')
        .text('This paragraph will be dynamically updated with jQuery.')
        .css({
          color: '',
          fontWeight: '',
          transform: '',
          transition: '',
          background: '',
          padding: '',
          borderRadius: '',
          boxShadow: ''
        });
      $(this).text('Transform Text & Style');
    }
    isStyleChanged = !isStyleChanged;
  });

  // Effects Demo with Smooth Transitions
  $('#hide-btn').on('click', function(){ 
    $('#effect-par').fadeOut(400, function() {
      $(this).hide();
    }); 
  });
  
  $('#show-btn').on('click', function(){ 
    $('#effect-par').fadeIn(400, function() {
      $(this).show();
    }); 
  });
  
  $('#toggle-btn').on('click', function(){ 
    $('#effect-par').fadeToggle(400); 
  });

  // Enhanced Fade Effects
  $('#fade-in').on('click', function(){ 
    $('#effect-img')
      .css('opacity', '0')
      .show()
      .animate({opacity: 1}, 600); 
  });
  
  $('#fade-out').on('click', function(){ 
    $('#effect-img').animate({opacity: 0}, 600, function() {
      $(this).hide();
    }); 
  });
  
  $('#fade-toggle').on('click', function(){ 
    $('#effect-img').fadeToggle(600); 
  });

  // Smooth Slide Animations
  $('#slide-up').on('click', function(){ 
    $('#slide-panel').slideUp(400, function() {
      $(this).addClass('hidden');
    }); 
  });
  
  $('#slide-down').on('click', function(){ 
    $('#slide-panel').removeClass('hidden').slideDown(400); 
  });
  
  $('#slide-toggle').on('click', function(){ 
    $('#slide-panel').slideToggle(400); 
  });

  // Enhanced DOM Manipulation
  let itemCounter = 1;
  
  $('#item-text').on('keypress', function(e) {
    if (e.which === 13) { // Enter key
      $('#add-item').click();
    }
  });

  $('#add-item').on('click', function(){
    const text = $('#item-text').val().trim();
    if(!text) { 
      $('#item-text')
        .addClass('is-invalid')
        .attr('placeholder', 'Please enter some text...');
      setTimeout(() => {
        $('#item-text')
          .removeClass('is-invalid')
          .attr('placeholder', 'Enter new item text...');
      }, 1200);
      return;
    }

    const $newItem = $('<li>')
      .addClass('list-group-item')
      .hide()
      .html(`
        <div class="d-flex justify-content-between align-items-center">
          <span>${text}</span>
          <span class="badge bg-primary rounded-pill">#${itemCounter++}</span>
        </div>
      `);

    $('#demo-list').append($newItem);
    $newItem.slideDown(300);
    $('#item-text').val('').focus();
  });

  $('#remove-item').on('click', function(){ 
    const $lastItem = $('#demo-list li').last();
    if ($lastItem.length) {
      $lastItem.slideUp(300, function() {
        $(this).remove();
        itemCounter = Math.max(1, itemCounter - 1);
      });
    }
  });

  // Image and Link Switcher with Animation
  const images = [
    { src: 'assets/images/godofwar.jpg', title: 'God of War' },
    { src: 'assets/images/ed.webp', title: 'Elden Ring' },
    { src: 'assets/images/tf2.jpeg', title: 'Team Fortress 2' }
  ];
  let currentImage = 0;

  $('#change-src').on('click', function(){
    const $img = $('#demo-image');
    currentImage = (currentImage + 1) % images.length;
    
    $img.fadeOut(300, function() {
      $(this)
        .attr('src', images[currentImage].src)
        .attr('alt', images[currentImage].title)
        .fadeIn(300);
    });
  });

  const links = [
    { url: 'https://store.steampowered.com', text: 'Steam Store' },
    { url: 'https://epicgames.com', text: 'Epic Games' },
    { url: 'https://gog.com', text: 'GOG Games' }
  ];
  let currentLink = 0;

  $('#change-link').on('click', function(){
    const $link = $('#demo-link');
    currentLink = (currentLink + 1) % links.length;
    
    $link
      .fadeOut(200, function() {
        $(this)
          .attr('href', links[currentLink].url)
          .html(`<i class="bi bi-box-arrow-up-right me-1"></i>${links[currentLink].text}`)
          .fadeIn(200);
      });
  });

  // Enhanced Animation Sequence
  let isAnimating = false;
  $('#run-anim').on('click', function(){
    if (isAnimating) return;
    isAnimating = true;
    const box = $('#animate-box');
    const sequence = [
      { props: { left: '+=200px', backgroundColor: '#084ea8' }, duration: 600 },
      { props: { top: '+=100px', transform: 'rotate(360deg)' }, duration: 600 },
      { props: { width: '40px', height: '40px', opacity: 0.7 }, duration: 400 },
      { props: { 
          left: '0px', 
          top: '0px', 
          width: '80px', 
          height: '80px', 
          opacity: 1,
          transform: 'rotate(0deg)',
          backgroundColor: '#0b6cf2'
        }, 
        duration: 600 
      }
    ];

    let promise = box.animate(sequence[0].props, sequence[0].duration).promise();
    
    for(let i = 1; i < sequence.length; i++) {
      promise = promise.then(() => {
        return box.animate(sequence[i].props, sequence[i].duration).promise();
      });
    }

    promise.then(() => {
      isAnimating = false;
    });
  });

  // Enhanced Image Gallery
  let currentThumb = 0;
  const thumbnails = $('#gallery .thumb');
  
  thumbnails.each(function(index){
    $(this)
      .on('mouseenter', function(){ 
        $(this)
          .stop(true)
          .fadeTo(200, 0.6)
          .css('transform', 'scale(1.05)'); 
      })
      .on('mouseleave', function(){ 
        $(this)
          .stop(true)
          .fadeTo(200, 1)
          .css('transform', 'scale(1)'); 
      })
      .on('click', function(){
        currentThumb = index;
        updateGallery($(this));
        thumbnails.removeClass('selected');
        $(this).addClass('selected');
      });
  });

  function updateGallery($thumb) {
    const large = $thumb.data('large');
    const title = $thumb.attr('alt');
    
    $('#gallery-large')
      .fadeOut(150, function(){ 
        $(this)
          .attr('src', large)
          .attr('alt', title)
          .fadeIn(200); 
      });
  }

  // Improved Accordion
  $('.acc-panel').hide();
  $('.acc-toggle').each(function() {
    const $toggle = $(this);
    const $panel = $toggle.closest('.mb-3').find('.acc-panel');
    const $icon = $toggle.find('.bi');
    
    $toggle.on('click', function() {
      const isOpen = $panel.is(':visible');
      
      // Close all other panels
      $('.acc-panel').not($panel).slideUp(300);
      $('.acc-toggle').not($toggle).removeClass('active')
        .find('.bi').removeClass('bi-chevron-down').addClass('bi-chevron-right');
      
      // Toggle current panel
      $panel.slideToggle(300);
      $toggle.toggleClass('active');
      
      // Rotate icon
      if (isOpen) {
        $icon.removeClass('bi-chevron-down').addClass('bi-chevron-right');
      } else {
        $icon.removeClass('bi-chevron-right').addClass('bi-chevron-down');
      }
    });
  });

  // Physics-based Bouncing Ball Animation
  let ballTimer = null;
  let isBallBouncing = false;
  let animationFrame;
  
  $('#start-ball').on('click', function(){
    const $ball = $('#ball');
    const $area = $('#ball-area');
    const $btn = $(this);
    const width = $area.width() - $ball.width();
    const height = $area.height() - $ball.height();
    
    if (isBallBouncing) {
      // Stop animation
      cancelAnimationFrame(animationFrame);
      $ball.css({
        left: '0',
        top: '0',
        transform: 'scale(1)'
      });
      $btn.html('<i class="bi bi-play-circle me-2"></i>Start Animation');
      isBallBouncing = false;
      return;
    }

    // Physics parameters
    const physics = {
      x: 0,
      y: 0,
      vx: 8, // horizontal velocity
      vy: 0, // vertical velocity
      gravity: 0.5,
      bounce: 0.7, // bounce factor (energy retention)
      friction: 0.99 // air/surface friction
    };

    // Start animation
    isBallBouncing = true;
    $btn.html('<i class="bi bi-stop-circle me-2"></i>Stop Animation');
    
    function animate() {
      // Update position
      physics.x += physics.vx;
      physics.y += physics.vy;
      physics.vy += physics.gravity;
      
      // Apply friction
      physics.vx *= physics.friction;
      
      // Floor collision (bottom)
      if (physics.y > height) {
        physics.y = height;
        physics.vy = -physics.vy * physics.bounce;
        
        // Squish effect on impact
        const impact = Math.min(Math.abs(physics.vy) / 20, 0.5);
        $ball.css('transform', `scaleY(${1 - impact}) scaleX(${1 + impact})`);
        setTimeout(() => $ball.css('transform', 'scale(1)'), 50);
      }
      
      // Wall collisions (left and right)
      if (physics.x > width) {
        physics.x = width;
        physics.vx = -physics.vx * physics.bounce;
        // Squish effect on wall impact
        $ball.css('transform', 'scaleX(0.8)');
        setTimeout(() => $ball.css('transform', 'scale(1)'), 50);
      }
      if (physics.x < 0) {
        physics.x = 0;
        physics.vx = -physics.vx * physics.bounce;
        // Squish effect on wall impact
        $ball.css('transform', 'scaleX(0.8)');
        setTimeout(() => $ball.css('transform', 'scale(1)'), 50);
      }
      
      // Stop if almost stationary
      if (Math.abs(physics.vx) < 0.1 && Math.abs(physics.vy) < 0.1 && physics.y === height) {
        physics.vx = 0;
        physics.vy = 0;
      } else {
        // Update ball position
        $ball.css({
          left: physics.x + 'px',
          top: physics.y + 'px'
        });
        
        // Continue animation
        animationFrame = requestAnimationFrame(animate);
      }
    }
    
    // Start animation loop
    animate();
  });

  // Enhanced Page Interaction Demo
  $('h1.display-4').on('mouseenter', function(){
    $(this).css({
      'transform': 'scale(1.02)',
      'transition': 'transform 0.3s ease'
    });
  }).on('mouseleave', function(){
    $(this).css('transform', 'scale(1)');
  });

  // Add initial animation to the page
  $('.demo-panel').each(function(i) {
    $(this).delay(i * 100).fadeIn(500);
  });
});