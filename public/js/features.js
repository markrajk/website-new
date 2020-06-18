var menu = document.querySelector('.nav-menu');
var menuOpen = document.querySelectorAll('.nav-menu-toggle.open');
var menuClose = document.querySelector('.nav-menu-toggle.close');
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener(
    'test',
    null,
    Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

for (var i = 0; i < menuOpen.length; i++) {
  menuOpen[i].addEventListener('click', function () {
    menu.classList.add('menu-open');
    disableScroll();
  });
}

menuClose.addEventListener('click', function () {
  menu.classList.remove('menu-open');
  enableScroll();
});

function anchorLinkHandler(e) {
  var distanceToTop = (el) => Math.floor(el.getBoundingClientRect().top);
  var header = document.querySelector('.header').offsetHeight;
  var subheader = document.querySelector('.subheader')
    ? document.querySelector('.subheader').offsetHeight
    : 0;

  e.preventDefault();
  var targetID = this.getAttribute('href');
  var targetAnchor = document.querySelector(targetID);
  if (!targetAnchor) return;
  var originalTop = distanceToTop(targetAnchor) - header - subheader + 50;

  window.scrollBy({
    top: originalTop,
    left: 0,
    duration: 5000,
    behavior: 'smooth',
  });

  var checkIfDone = setInterval(function () {
    var atBottom =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
    if (distanceToTop(targetAnchor) === 0 || atBottom) {
      // targetAnchor.tabIndex = '-1';
      // targetAnchor.focus();
      // window.history.pushState('', '', targetID);
      clearInterval(checkIfDone);
    }
  }, 100);
}

var linksToAnchors = document.querySelectorAll('a[href^="#"]');

linksToAnchors.forEach((each) => (each.onclick = anchorLinkHandler));

//HEADER SHADOW
var header = document.querySelector('.header');
var tableOfContent = document.querySelector('.table-of-content-wrapper');
var tableOfContentPos = document.querySelector('.activate-toc');
var hideToc = document.getElementById('hide-toc');

var giveFeedbackCard = document.getElementById('giving-feedback');
var receiveFeedbackCard = document.getElementById('receiving-feedback');
var developingTeamsCard = document.getElementById('developing-teams');
var theDashboardCard = document.getElementById('the-dashboard');
var pdfReportsCard = document.getElementById('pdf-reports');

var tocLinks = document.querySelectorAll('.table-of-content-item-link');

var subheaderList = document.querySelector('.table-of-content-wrapper');
var subheaderItem;

var dropdownMenu = document.querySelector('.dropdown-list');

// for (var i = 0; i < tocLinks.length; i++) {
//   tocLinks[i].addEventListener('click', function (e) {
//     for (var j = 0; j < tocLinks.length; j++) {
//       tocLinks[j].classList.remove('active');
//     }
//     e.target.classList.add('active');
//   });
// }

window.addEventListener('scroll', function () {
  if (window.scrollY > header.offsetHeight) {
    header.classList.add('header-scroll');
  } else {
    header.classList.remove('header-scroll');
  }

  if (window.scrollY >= tableOfContentPos.offsetTop - 90) {
    header.style.top = '-8.4rem';
    header.style.transitionDuration = `${2 / Math.abs(checkScrollSpeed())}s`;
    tableOfContent.classList.add('move');
    dropdownMenu.classList.add('hidden');
    if (
      window.scrollY >=
      giveFeedbackCard.offsetTop - header.offsetHeight - 30
    ) {
      for (var i = 0; i < tocLinks.length; i++) {
        tocLinks[i].classList.remove('active');
      }

      subheaderItem = document.querySelector('[href="#giving-feedback"] p');
      subheaderItem.classList.add('active');

      subheaderList.scrollLeft =
        subheaderItem.offsetLeft -
        subheaderList.offsetWidth / 2 +
        subheaderItem.offsetWidth / 2;
    }
    if (
      window.scrollY >=
      receiveFeedbackCard.offsetTop - header.offsetHeight - 30
    ) {
      for (var i = 0; i < tocLinks.length; i++) {
        tocLinks[i].classList.remove('active');
      }

      subheaderItem = document.querySelector('[href="#receiving-feedback"] p');
      subheaderItem.classList.add('active');

      subheaderList.scrollLeft =
        subheaderItem.offsetLeft -
        subheaderList.offsetWidth / 2 +
        subheaderItem.offsetWidth / 2;
    }

    if (
      window.scrollY >=
      developingTeamsCard.offsetTop - header.offsetHeight - 30
    ) {
      for (var i = 0; i < tocLinks.length; i++) {
        tocLinks[i].classList.remove('active');
      }

      subheaderItem = document.querySelector('[href="#developing-teams"] p');
      subheaderItem.classList.add('active');

      subheaderList.scrollLeft =
        subheaderItem.offsetLeft -
        subheaderList.offsetWidth / 2 +
        subheaderItem.offsetWidth / 2;
    }

    if (
      window.scrollY >=
      theDashboardCard.offsetTop - header.offsetHeight - 30
    ) {
      for (var i = 0; i < tocLinks.length; i++) {
        tocLinks[i].classList.remove('active');
      }

      subheaderItem = document.querySelector('[href="#the-dashboard"] p');
      subheaderItem.classList.add('active');

      subheaderList.scrollLeft =
        subheaderItem.offsetLeft -
        subheaderList.offsetWidth / 2 +
        subheaderItem.offsetWidth / 2;
    }
    if (window.scrollY >= pdfReportsCard.offsetTop - header.offsetHeight - 30) {
      for (var i = 0; i < tocLinks.length; i++) {
        tocLinks[i].classList.remove('active');
      }

      subheaderItem = document.querySelector('[href="#pdf-reports"] p');
      subheaderItem.classList.add('active');

      subheaderList.scrollLeft =
        subheaderItem.offsetLeft -
        subheaderList.offsetWidth / 2 +
        subheaderItem.offsetWidth / 2;
    }
    // if (window.scrollY >= hideToc.offsetTop - 150) {
    //   tableOfContent.classList.add('hide');
    //   console.log('HIDEN');
    // } else {
    //   tableOfContent.classList.remove('hide');
    // }
  } else {
    header.style.top = '0';
    header.classList.remove('hide');
    tableOfContent.classList.remove('table-of-content-scroll');
    tableOfContent.classList.remove('move');
    dropdownMenu.classList.remove('hidden');
  }
});

var checkScrollSpeed = (function (settings) {
  settings = settings || {};

  var lastPos,
    newPos,
    timer,
    delta,
    delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

  function clear() {
    lastPos = null;
    delta = 0;
  }

  clear();

  return function () {
    newPos = window.scrollY;
    if (lastPos != null) {
      // && newPos < maxScroll
      delta = newPos - lastPos;
    }
    lastPos = newPos;
    clearTimeout(timer);
    timer = setTimeout(clear, delay);
    return delta;
  };
})();

function docReady(fn) {
  // see if DOM is already available
  if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
  ) {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    //document.addEventListener('DOMContentLoaded', fn);
    setTimeout(fn, 100);
  }
}

// docReady(function () {
//   console.log(subheaderItem.offsetLeft);
//   console.log(subheaderList.offsetWidth);
//   subheaderList.scrollLeft =
//     subheaderItem.offsetLeft -
//     subheaderList.offsetWidth / 2 +
//     subheaderItem.offsetWidth / 2;
// });

// for (var i = 0; i < tocLinks.length; i++) {
//   tocLinks[i].addEventListener('click', function () {
//     console.log('Clicked');
//     var subheaderList = document.querySelector('.table-of-content-wrapper');
//     var subheaderItem = document.querySelector(
//       '.table-of-content-item-link.active'
//     );

//     console.log(subheaderItem.offsetLeft);
//     console.log(subheaderList.offsetWidth);
//     subheaderList.scrollLeft =
//       subheaderItem.offsetLeft -
//       subheaderList.offsetWidth / 2 +
//       subheaderItem.offsetWidth / 2;
//   });
// }

//DROPDOWN
// var dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
// var dropdownMenu = document.querySelector('.dropdown-list');

// window.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('dropdown-trigger')) {
//     dropdownMenu.style.display = 'block';
//   }
// });

// window.addEventListener('click', function (e) {
//   if (
//     !e.target.classList.contains('dropdown-trigger') &&
//     !e.target.classList.contains('dropdown-list') &&
//     !e.target.classList.contains('dropdown-list-item') &&
//     !e.target.classList.contains('dropdown-list-item-link') &&
//     !e.target.classList.contains('dropdown-list-item-title') &&
//     !e.target.classList.contains('dropdown-list-item-footer')
//   ) {
//     dropdownMenu.style.display = 'none';
//   }
// });
