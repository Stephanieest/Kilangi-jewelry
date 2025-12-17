// ========================================
// KILANGI JEWELLERY - MAIN INTERACTIONS
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initGoldGlowEffects();
  initSmoothScrolling();
  initHeaderScrollEffect();
  initProductCardAnimations();
  initFilterButtons();
  initParallaxHero();
  initLazyImageLoading();
  initTestimonialHover();
  initCartCounter();
});

// ========================================
// 1. GOLD GLOW HOVER EFFECTS
// ========================================
function initGoldGlowEffects() {
  const glowElements = [
    '.product-card',
    '.recent-card',
    '.gift-card',
    '.collection-item',
    '.promo',
    '.btn-cta',
    '.btn-outline',
    '.test-card'
  ];

  glowElements.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      // Add transition class
      el.classList.add('gold-glow-transition');
      
      el.addEventListener('mouseenter', function() {
        this.classList.add('gold-glow');
        
        // Find images inside and add glow
        const img = this.querySelector('img');
        if (img) img.classList.add('gold-glow');
      });

      el.addEventListener('mouseleave', function() {
        this.classList.remove('gold-glow');
        
        // Remove from images
        const img = this.querySelector('img');
        if (img) img.classList.remove('gold-glow');
      });
    });
  });
}

// ========================================
// 2. SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ========================================
// 3. HEADER SCROLL EFFECT
// ========================================
function initHeaderScrollEffect() {
  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
      header.style.boxShadow = '0 4px 20px rgba(16, 34, 31, 0.08)';
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
      header.style.boxShadow = 'none';
      header.style.backgroundColor = 'transparent';
    }

    // Hide header on scroll down, show on scroll up
    if (currentScroll > 200) {
      if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.style.transform = 'translateY(-100%)';
        header.style.transition = 'transform 0.3s ease';
      } else if (currentScroll < lastScroll) {
        header.style.transform = 'translateY(0)';
      }
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  });
}

// ========================================
// 4. PRODUCT CARD ANIMATIONS
// ========================================
function initProductCardAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe product cards
  document.querySelectorAll('.product-card, .recent-card, .gift-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// ========================================
// 5. ENHANCED FILTER BUTTONS
// ========================================
function initFilterButtons() {
  const filterButtons = document.querySelectorAll('.filters .pill');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active from all
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      
      // Add active to clicked
      this.classList.add('active');
      this.setAttribute('aria-pressed', 'true');
      
      // Add ripple effect
      createRipple(this, event);
      
      // Simulate filter animation
      animateProductGrid();
    });
  });
}

function createRipple(button, event) {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.style.position = 'absolute';
  ripple.style.borderRadius = '50%';
  ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
  ripple.style.pointerEvents = 'none';
  ripple.style.animation = 'ripple-animation 0.6s ease-out';
  
  button.style.position = 'relative';
  button.style.overflow = 'hidden';
  button.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 600);
}

function animateProductGrid() {
  const products = document.querySelectorAll('.product-card');
  
  products.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
    }, index * 80);
  });
}

// ========================================
// 6. PARALLAX HERO EFFECT
// ========================================
function initParallaxHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      hero.style.opacity = 1 - (scrolled / 800);
    }
  });
}

// ========================================
// 7. LAZY IMAGE LOADING WITH FADE-IN
// ========================================
function initLazyImageLoading() {
  const images = document.querySelectorAll('img[src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        if (img.complete) {
          img.style.opacity = '1';
        } else {
          img.onload = () => {
            img.style.opacity = '1';
          };
        }
        
        imageObserver.unobserve(img);
      }
    });
  }, { threshold: 0.01 });

  images.forEach(img => imageObserver.observe(img));
}

// ========================================
// 8. TESTIMONIAL CARD TILT EFFECT
// ========================================
function initTestimonialHover() {
  const cards = document.querySelectorAll('.test-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
    
    card.style.transition = 'transform 0.3s ease';
  });
}

// ========================================
// 9. ANIMATED CART COUNTER
// ========================================
function initCartCounter() {
  const cartBtn = document.querySelector('.icon-btn[aria-label="Cart"]');
  if (!cartBtn) return;

  let cartCount = 0;
  const counter = document.createElement('span');
  counter.style.cssText = `
    position: absolute;
    top: -8px;
    right: -8px;
    background: #d32f2f;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    opacity: 0;
    transform: scale(0);
    transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  `;
  
  cartBtn.style.position = 'relative';
  counter.textContent = cartCount;
  cartBtn.appendChild(counter);

  // Demo: Add items on product card clicks
  document.querySelectorAll('.product-card, .recent-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      
      cartCount++;
      counter.textContent = cartCount;
      counter.style.opacity = '1';
      counter.style.transform = 'scale(1)';
      
      // Bounce animation
      counter.style.animation = 'bounce 0.5s ease';
      setTimeout(() => {
        counter.style.animation = '';
      }, 500);
    });
  });
}

// ========================================
// 10. ADD RIPPLE ANIMATION CSS DYNAMICALLY
// ========================================
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.3); }
  }
  
  /* Enhance existing transitions */
  .product-card, .recent-card, .gift-card, .test-card {
    will-change: transform, opacity;
  }
  
  /* Smooth header transition */
  .site-header {
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }
`;
document.head.appendChild(style);

// ========================================
// 11. SEARCH BAR ENHANCEMENT
// ========================================
const searchInput = document.querySelector('.search input');
const searchForm = document.querySelector('.search');

if (searchInput && searchForm) {
  searchInput.addEventListener('focus', () => {
    searchForm.style.transform = 'scale(1.02)';
    searchForm.style.boxShadow = '0 12px 36px rgba(24, 75, 71, 0.12)';
  });

  searchInput.addEventListener('blur', () => {
    searchForm.style.transform = 'scale(1)';
    searchForm.style.boxShadow = '0 8px 28px rgba(16, 34, 31, 0.06)';
  });

  searchForm.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
}

// ========================================
// 12. PRICE ANIMATION ON HOVER
// ========================================
document.querySelectorAll('.price, .recent-price').forEach(price => {
  const parent = price.closest('.product-card, .recent-card');
  
  if (parent) {
    parent.addEventListener('mouseenter', () => {
      price.style.transform = 'scale(1.08)';
      price.style.color = 'var(--green-deep)';
    });
    
    parent.addEventListener('mouseleave', () => {
      price.style.transform = 'scale(1)';
      price.style.color = '';
    });
    
    price.style.transition = 'transform 0.3s ease, color 0.3s ease';
  }
});

console.log('✨ Kilangi Jewellery - Premium interactions loaded');