/*
  * reframe.js - Reframe.js: responsive iframes for embedded content
  * @version v2.2.7
  * @link https://github.com/dollarshaveclub/reframe.js#readme
  * @author Jeff Wainwright <jjwainwright2@gmail.com> (http://jeffry.in)
  * @license MIT
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).reframe=t()}(this,function(){"use strict";return function(e,t){var i="string"==typeof e?document.querySelectorAll(e):e,n=t||"js-reframe";"length"in i||(i=[i]);for(var o=0;o<i.length;o+=1){var r=i[o];if(!(-1!==r.className.split(" ").indexOf(n)||-1<r.style.width.indexOf("%"))){var d=(r.getAttribute("height")||r.offsetHeight)/(r.getAttribute("width")||r.offsetWidth)*100,f=document.createElement("div");f.className=n;var s=f.style;s.position="relative",s.width="100%",s.paddingTop=d+"%";var a=r.style;a.position="absolute",a.width="100%",a.height="100%",a.left="0",a.top="0",r.parentNode.insertBefore(f,r),r.parentNode.removeChild(r),f.appendChild(r)}}}});

// Handle responsive video embeds
window.addVideoEmbedsHandlers = function() {
	reframe('iframe[src*="youtube.com"],iframe[src*="vimeo.com"]');
};

window.removeVideoEmbedsHandlers = function() {
	const frameWrappers = document.querySelectorAll('.js-reframe');
	if (frameWrappers) {
		for (let i = 0; i < frameWrappers.length; i += 1) {
			const frameWrapper = frameWrappers[i];
			const frame = frameWrapper.firstChild;
			frame.removeAttribute('style');
			frameWrapper.parentNode.insertBefore(frame, frameWrapper);
			frameWrapper.parentNode.removeChild(frameWrapper);
		}
	}
};

// Handle navigation
function navToggleHandler(e) {
	e.preventDefault();
	document.body.classList.toggle('js-nav-open');
}

window.addMainNavigationHandlers = function() {
	const menuToggle = document.querySelectorAll('.js-nav-toggle');
	if (menuToggle) {
		for (let i = 0; i < menuToggle.length; i++) {
			menuToggle[i].addEventListener('click', navToggleHandler, false);
		}
	}
};

window.removeMainNavigationHandlers = function() {
	document.body.classList.remove('js-nav-open');
	const menuToggle = document.querySelectorAll('.js-nav-toggle');
	if (menuToggle) {
		for (let i = 0; i < menuToggle.length; i++) {
			menuToggle[i].removeEventListener('click', navToggleHandler, false);
		}
	}
};

window.addEventListener('resize', function () {
  if (document.querySelector('.js-nav-toggle').offsetParent === null) {
    document.body.classList.remove('js-nav-open');
  }
}, true);

// Handle dropdown click toggle for mobile / desktop click support
function dropdownToggleHandler(e) {
  e.preventDefault();
  const parentItem = this.closest('.menu__item--dropdown');
  if (parentItem) {
    parentItem.classList.toggle('is-active');
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
  }
}

window.addDropdownHandlers = function() {
  const dropdowns = document.querySelectorAll('.dropdown-toggle');
  if (dropdowns) {
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].addEventListener('click', dropdownToggleHandler, false);
    }
  }
};

window.removeDropdownHandlers = function() {
  const dropdowns = document.querySelectorAll('.dropdown-toggle');
  if (dropdowns) {
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].removeEventListener('click', dropdownToggleHandler, false);
    }
  }
};

// SPA Router & Transitions
document.addEventListener('click', function(e) {
  const link = e.target.closest('a');
  if (!link) return;
  
  const url = link.getAttribute('href');
  // Only intercept internal relative links, excluding admin and anchor hashes
  if (url && (url.startsWith('/') || !url.includes('://')) && !url.startsWith('/admin') && !url.includes('#') && link.getAttribute('target') !== '_blank') {
    e.preventDefault();
    navigateToPage(url);
  }
});

function updateActiveNavLink(url) {
  const links = document.querySelectorAll('.menu__item a, .dropdown-menu__item a');
  const path = url.split('?')[0].split('#')[0].replace(/^\/|\/$/g, ''); // Trim slashes and query params
  
  links.forEach(link => {
    const item = link.closest('li');
    if (!item) return;
    
    // Remove active classes
    item.classList.remove('menu__item--current', 'dropdown-menu__item--current');
    
    // Check if parent dropdown exists and clear its active state too
    const parentDropdown = item.closest('.menu__item--dropdown');
    if (parentDropdown) parentDropdown.classList.remove('menu__item--current');
    
    const linkUrl = link.getAttribute('href').split('?')[0].split('#')[0].replace(/^\/|\/$/g, '');
    if (path === linkUrl) {
      if (item.classList.contains('menu__item')) {
        item.classList.add('menu__item--current');
      } else if (item.classList.contains('dropdown-menu__item')) {
        item.classList.add('dropdown-menu__item--current');
        if (parentDropdown) parentDropdown.classList.add('menu__item--current');
      }
    }
  });
}

function navigateToPage(url) {
  const contentArea = document.getElementById('content');
  if (!contentArea) return;
  
  // Close mobile navigation drawer before swapping
  document.body.classList.remove('js-nav-open');
  
  // Fade out current content
  contentArea.style.opacity = '0';
  contentArea.style.transform = 'translateY(8px)';
  contentArea.style.transition = 'opacity 0.18s ease-out, transform 0.18s ease-out';
  
  setTimeout(() => {
    fetch(url)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.getElementById('content');
        const newTitle = doc.querySelector('title');
        
        if (newContent) {
          contentArea.innerHTML = newContent.innerHTML;
          if (newTitle) document.title = newTitle.innerText;
          
          // Scroll smoothly to top
          window.scrollTo({ top: 0, behavior: 'instant' });
          
          // Re-hook lifecycle listeners
          if (window.removeMainNavigationHandlers) window.removeMainNavigationHandlers();
          if (window.addMainNavigationHandlers) window.addMainNavigationHandlers();
          
          if (window.removeDropdownHandlers) window.removeDropdownHandlers();
          if (window.addDropdownHandlers) window.addDropdownHandlers();
          
          if (window.removeVideoEmbedsHandlers) window.removeVideoEmbedsHandlers();
          if (window.addVideoEmbedsHandlers) window.addVideoEmbedsHandlers();
          
          // Re-trigger Mermaid if present on page
          if (window.renderMermaidDiagrams) window.renderMermaidDiagrams();
          
          // Update menu active links highlight
          updateActiveNavLink(url);
          
          // Initialize social sharing buttons on page load
          if (window.initializeShareButtons) window.initializeShareButtons();
          
          // Push state to browser history
          history.pushState(null, '', url);
          
          // Fade in new content
          setTimeout(() => {
            contentArea.style.opacity = '1';
            contentArea.style.transform = 'translateY(0)';
          }, 50);
        }
      })
      .catch(error => {
        console.warn('SPA router fallback:', error);
        window.location.href = url; // Hard fallback on error
      });
  }, 180);
}

// Support browser back/forward buttons
window.addEventListener('popstate', function() {
  navigateToPage(window.location.pathname);
});

// Web Share API and Copy Link Initializer
window.initializeShareButtons = function() {
  const webshareBtn = document.getElementById('js-webshare-btn');
  const copylinkBtn = document.getElementById('js-copylink-btn');
  
  if (webshareBtn) {
    if (navigator.share) {
      webshareBtn.style.display = 'inline-flex';
      // Use clean event handler binding to avoid duplicates
      webshareBtn.onclick = function() {
        navigator.share({
          title: document.title,
          text: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
          url: window.location.href
        }).catch(err => console.log('Share failed:', err));
      };
    } else {
      webshareBtn.style.display = 'none';
    }
  }
  
  if (copylinkBtn) {
    copylinkBtn.onclick = function() {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const textSpan = document.getElementById('copylink-btn-text');
        if (textSpan) {
          const originalHTML = textSpan.innerHTML;
          textSpan.innerHTML = 'Link Copied!';
          setTimeout(() => {
            textSpan.innerHTML = originalHTML;
          }, 2000);
        }
      }).catch(err => console.warn('Could not copy link:', err));
    };
  }
};

