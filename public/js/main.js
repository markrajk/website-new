// var menuToggle = document.querySelectorAll('.menu-toggle');
// var header = document.querySelector('header');
// var nav = document.querySelector('.nav');
// var burger = nav.querySelector('.burger');
// var toolbar = document.querySelector('.toolbar');
// var body = document.querySelector('body');
// var subheader = document.querySelector('.subheader-wrapper');

// function addEvent(element, evName, fn) {
//   if (element.addEventListener) {
//     element.addEventListener(evName, fn, false);
//   } else if (element.attachEvent) {
//     element.attachEvent('on' + evName, function (e) {
//       fn(e || window.event);
//     });
//   }
// }

// for (let i = 0; i < menuToggle.length; i++) {
//   addEvent(menuToggle[i], 'click', function () {
//     var pos = window.scrollY;
//     nav.style.transition = 'transform .5s ease-in-out';
//     setTimeout(function () {
//       nav.style.transition = 'none';
//     }, 500);
//     if (nav.classList.contains('onscreen')) {
//       //window.scrollTo(0, 0);
//       enableScrolling();
//       nav.classList.remove('onscreen');
//       burger.innerHTML = '<i class="fas fa-bars show-md-inline-flex"></i>';
//     } else {
//       disableScrolling();
//       nav.classList.add('onscreen');
//       burger.innerHTML = '<i class="fas fa-times show-md-inline-flex"></i>';
//     }
//   });
// }

// var scrollPositionY = window.scrollY;
// var scrollDown = false;
// var scrollEnabled = true;

// if (subheader) {
//   window.addEventListener('scroll', function (e) {
//     if (!scrollEnabled) return;
//     if (window.scrollY > scrollPositionY) {
//       scrollPositionY = window.scrollY;
//       scrollDown = true;
//     } else {
//       scrollPositionY = window.scrollY + 1;
//       scrollDown = false;
//     }

//     if (scrollDown) {
//       // header.style.display = 'none';
//       //body.style.paddingTop = '7.05rem';
//       header.classList.add('move-up');
//       subheader.style.top = '0';
//       subheader.style.boxShadow = '0 3px 5px 0 rgba(0,0,0,.1)';
//       subheader.style.borderBottom = 'none';
//     } else {
//       body.style.paddingTop = '0';
//       // header.style.display = 'block';
//       header.classList.remove('move-up');
//       subheader.style.top = '7.05rem';
//     }

//     if (scrollPositionY < 10) {
//       subheader.style.boxShadow = 'none';
//       subheader.style.borderBottom = '1.5px solid #F4F4F4';
//     }
//   });
// }
// function disableScrolling() {
//   var x = window.scrollX;
//   var y = window.scrollY;
//   window.onscroll = function () {
//     window.scrollTo(x, y);
//   };
//   scrollEnabled = false;
// }

// function enableScrolling() {
//   window.onscroll = function () {};
//   scrollEnabled = true;
// }

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

// it could probably work in two dimensions too... that'd be kinda cool.

// var subheaderList = document.querySelector('.subheader-list');
// var subheaderItem = document.querySelector('.subheader-list-item-link.active');
// console.log(subheaderItem.offsetLeft);

// subheaderList.scrollLeft = 500;

// setTimeout(function () {
//   var subheaderList = document.querySelector('.subheader-list');
//   var subheaderItem = document.querySelector(
//     '.subheader-list-item-link.active'
//   );

//   console.log(subheaderItem.offsetLeft);
//   console.log(subheaderList.offsetWidth);
//   subheaderList.scrollLeft =
//     subheaderItem.offsetLeft -
//     subheaderList.offsetWidth / 2 +
//     subheaderItem.offsetWidth / 2;
// }, 100);

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

docReady(function () {
  var subheaderList = document.querySelector('.subheader-list');
  var subheaderItem = document.querySelector(
    '.subheader-list-item-link.active'
  );

  console.log(subheaderItem.offsetLeft);
  console.log(subheaderList.offsetWidth);
  subheaderList.scrollLeft =
    subheaderItem.offsetLeft -
    subheaderList.offsetWidth / 2 +
    subheaderItem.offsetWidth / 2;
});

AOS.init();
