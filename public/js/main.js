var menu = document.querySelector('.nav-menu');
var menuOpen = document.querySelectorAll('.nav-menu-toggle.open');
var menuClose = document.querySelector('.nav-menu-toggle.close');

for (var i = 0; i < menuOpen.length; i++) {
  menuOpen[i].addEventListener('click', function () {
    menu.classList.add('menu-open');
  });
}

menuClose.addEventListener('click', function () {
  menu.classList.remove('menu-open');
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
  var originalTop = distanceToTop(targetAnchor) - header - subheader + 10;

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
var tableOfContent = document.querySelector('.table-of-content');
var tableOfContentPos = document.querySelector('.activate-toc');

window.addEventListener('scroll', function () {
  if (window.scrollY > header.offsetHeight) {
    header.classList.add('header-scroll');
  } else {
    header.classList.remove('header-scroll');
  }

  if (window.scrollY >= tableOfContentPos.offsetTop) {
    header.classList.add('hide');
    tableOfContent.classList.add('table-of-content-scroll');
  } else {
    header.classList.remove('hide');
    tableOfContent.classList.remove('table-of-content-scroll');
  }
});
