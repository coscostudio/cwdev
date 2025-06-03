import { initConnectTrigger } from './utils/connect-accordion';

// Add styles to the document
const style = document.createElement('style');
style.textContent = `
  .splide.related-products {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s ease-in, visibility 0.5s ease-in;
  }
  .splide.related-products.is-visible {
    opacity: 1;
    visibility: visible;
  }

  /* Product grid image fade-in styles */
  .product-image-thumbnail {
    opacity: 0;
    transition: opacity 0.6s ease-out;
  }
  .product-image-thumbnail.fade-in {
    opacity: 1;
  }

  /* Product page slider image fade-in styles */
  .splide.product-images .image {
    opacity: 0;
    transition: opacity 0.5s ease-out;
  }
  .splide.product-images.images-loaded .image {
    opacity: 1;
  }
`;
document.head.appendChild(style);

// Declare Splide types and global variable
interface SplideOptions {
  type?: string;
  autoWidth?: boolean;
  gap?: string;
  arrows?: boolean;
  pagination?: boolean;
  drag?: boolean | 'free' | string;
  focus?: string;
  snap?: boolean;
}

interface SplideComponents {
  Elements: {
    slides: HTMLElement[];
  };
}

interface SplideInstance {
  mount: (extensions?: unknown) => void;
  go: (index: number) => void;
  on: (event: string, callback: () => void) => void;
  Components?: SplideComponents;
}

declare global {
  interface Window {
    Splide: new (element: Element, options: SplideOptions) => SplideInstance;
    splide: {
      Extensions?: unknown;
    };
  }
}

// Function to animate product grid images
function animateProductGridImages() {
  const productImages = document.querySelectorAll('.product-image-thumbnail');

  if (!productImages.length) return;

  productImages.forEach((image, index) => {
    setTimeout(() => {
      image.classList.add('fade-in');
    }, index * 50); // Overlapping animations with 50ms stagger
  });
}

// Function to animate product page slider images
function animateProductSliderImages() {
  const productSlider = document.querySelector('.splide.product-images');

  if (!productSlider) return;

  // Add a small delay to ensure images are loaded
  setTimeout(() => {
    productSlider.classList.add('images-loaded');
  }, 150);
}

function initSplide(selector: string, options: SplideOptions, useAutoScroll = false) {
  // Query all matching elements instead of just one
  const splideElements = document.querySelectorAll(selector);
  if (!splideElements.length) return;

  // Initialize each instance
  splideElements.forEach((element, index) => {
    const uniqueId = `${selector.replace(/\./g, '')}-${index}`;
    element.setAttribute('id', uniqueId);

    // Check if track and list elements exist
    const track = element.querySelector('.splide__track');
    if (!track) {
      console.error(`Splide track element missing for ${selector}. Creating it.`);
      const trackElement = document.createElement('div');
      trackElement.className = 'splide__track';

      // Move all children into the new track
      while (element.firstChild) {
        trackElement.appendChild(element.firstChild);
      }
      element.appendChild(trackElement);
    }

    // Check if list element exists inside track
    const track2 = element.querySelector('.splide__track');
    const list = track2?.querySelector('.splide__list');
    if (track2 && !list) {
      console.error(`Splide list element missing for ${selector}. Creating it.`);
      const listElement = document.createElement('div');
      listElement.className = 'splide__list';

      // Move all children from track into the new list
      while (track2.firstChild) {
        listElement.appendChild(track2.firstChild);
      }
      track2.appendChild(listElement);
    }

    const splide = new window.Splide(element, {
      ...options,
    });

    // Enable clicking on slides to navigate (but not for related products)
    splide.on('mounted', () => {
      // Handle related products slider separately (no click navigation)
      if (selector === '.splide.related-products') {
        requestAnimationFrame(() => {
          element.classList.add('is-visible');
        });
        return;
      }

      // Trigger fade-in animation for product slider images
      if (selector === '.splide.product-images') {
        setTimeout(() => {
          animateProductSliderImages();
        }, 100);
      }

      // Add click navigation for other sliders
      if (splide.Components && splide.Components.Elements) {
        const { slides } = splide.Components.Elements;
        slides.forEach((slide: HTMLElement, slideIndex: number) => {
          slide.addEventListener('click', () => {
            splide.go(slideIndex);
          });
        });
      }
    });

    // Mount Splide with Autoscroll extension only if needed
    if (useAutoScroll && window.splide?.Extensions) {
      splide.mount(window.splide.Extensions);
    } else {
      splide.mount();
    }
  });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the connect trigger animation
  initConnectTrigger();

  // Animate product grid images after a short delay
  setTimeout(() => {
    animateProductGridImages();
  }, 150);

  // Splide configuration
  const splideConfigs = [
    {
      selector: '.splide.product-images',
      options: {
        type: 'slide',
        autoWidth: true,
        gap: '0px',
        arrows: false,
        pagination: false,
        drag: 'free',
        focus: 'left',
        snap: true,
      },
      useAutoScroll: false,
    },
  ];

  // Initialize product images slider immediately
  splideConfigs.forEach((config) => {
    initSplide(config.selector, config.options, config.useAutoScroll);
  });

  // Delay only the related products slider
  setTimeout(() => {
    initSplide(
      '.splide.related-products',
      {
        type: 'slide',
        autoWidth: true,
        gap: '0px',
        arrows: false,
        pagination: false,
        drag: 'free',
        focus: 'left',
        snap: true,
      },
      false
    );
  }, 500); // 500ms delay to allow Shopyflow to render
});
