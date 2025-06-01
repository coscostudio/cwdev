/**
 * Simple connect trigger - fade in/out, icon rotation, and smooth scroll
 */
export const initConnectTrigger = () => {
  const connectTrigger = document.querySelector('.connect-trigger') as HTMLElement;
  const connectWrapper = document.querySelector('.footer-connect-wrapper') as HTMLElement;
  const connectIcon = connectTrigger?.querySelector('.connect-icon') as HTMLElement;
  const mainFooter = document.querySelector('.footer-main-wrapper') as HTMLElement;

  if (!connectTrigger || !connectWrapper) {
    console.warn('Connect trigger or wrapper not found');
    return;
  }

  let isVisible = false;

  // Set initial state - hidden with opacity 0
  connectWrapper.style.opacity = '0';
  connectWrapper.style.display = 'none';
  connectWrapper.style.transition = 'opacity 0.4s ease-out';

  // Add icon rotation transition if icon exists
  if (connectIcon) {
    connectIcon.style.transition = 'transform 0.3s ease-out';
  }

  const showConnect = () => {
    // Show the wrapper first
    connectWrapper.style.display = 'flex';

    // Force reflow to ensure display change is registered
    connectWrapper.offsetHeight;

    // Then fade in and rotate icon
    connectWrapper.style.opacity = '1';
    if (connectIcon) {
      connectIcon.style.transform = 'rotate(45deg)';
    }

    // Calculate fresh position each time and scroll to connect wrapper
    requestAnimationFrame(() => {
      const elementPosition = connectWrapper.getBoundingClientRect().top + window.pageYOffset;
      const offset = 20; // Small offset from top
      const targetPosition = elementPosition - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });

    isVisible = true;
  };

  const hideConnect = () => {
    // Start fade out and icon rotation immediately
    connectWrapper.style.opacity = '0';
    if (connectIcon) {
      connectIcon.style.transform = 'rotate(0deg)';
    }

    // Calculate where to scroll to position main footer bottom at viewport bottom
    // Do this while fading out, not after
    const mainFooterRect = mainFooter
      ? mainFooter.getBoundingClientRect()
      : connectTrigger.getBoundingClientRect();
    const mainFooterBottom = mainFooterRect.bottom + window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const targetScrollPosition = mainFooterBottom - viewportHeight;

    // Scroll while fading out
    window.scrollTo({
      top: Math.max(0, targetScrollPosition), // Don't scroll past top of page
      behavior: 'smooth',
    });

    // Hide after fade completes
    setTimeout(() => {
      connectWrapper.style.display = 'none';
    }, 400);

    isVisible = false;
  };

  // Add click event listener
  connectTrigger.addEventListener('click', (e) => {
    e.preventDefault();

    if (isVisible) {
      hideConnect();
    } else {
      showConnect();
    }
  });
};
