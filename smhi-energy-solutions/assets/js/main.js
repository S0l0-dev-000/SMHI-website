// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function(e) {
      e.preventDefault();
      mobileMenu.classList.toggle('hidden');
      this.setAttribute('aria-expanded', 
        this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
      );
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.add('hidden');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Skip if it's a button or has a different href
    if (anchor.getAttribute('role') === 'button' || 
        anchor.getAttribute('href') === '#') {
      return;
    }
    
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Don't prevent default if it's a button or empty link
      if (targetId === '#' || this.getAttribute('role') === 'button') {
        return;
      }
      
      e.preventDefault();
      
      // Close mobile menu if open
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
      }
      
      // Smooth scroll to target
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80; // Height of your header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add active class to current section in navigation
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  function highlightNavigation() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = '#' + section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('text-blue-600', 'font-semibold');
      if (link.getAttribute('href') === current) {
        link.classList.add('text-blue-600', 'font-semibold');
      }
    });
  }
  
  // Run once on page load
  highlightNavigation();
  
  // Run on scroll
  window.addEventListener('scroll', function() {
    // Throttle the scroll event for better performance
    let ticking = false;
    
    if (!ticking) {
      window.requestAnimationFrame(function() {
        highlightNavigation();
        ticking = false;
      });
      
      ticking = true;
    }
  });
  
  // Form submission handling
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Add your form submission logic here
      console.log('Form submitted!');
      // You can add AJAX form submission or other logic here
    });
  }
});
