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
var databaseCard = document.getElementById('database');
var getStartedCard = document.getElementById('get-started');

var tocLinks = document.querySelectorAll('.table-of-content-item');

var subheaderList = document.querySelector('.table-of-content-wrapper');
var subheaderItem;

var dropdownMenu = document.querySelector('.dropdown-list');
var playVideoBool = true;

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

      subheaderItem = document.querySelector('[href="#giving-feedback"]');
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

      subheaderItem = document.querySelector('[href="#receiving-feedback"]');
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

      subheaderItem = document.querySelector('[href="#developing-teams"]');
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

      subheaderItem = document.querySelector('[href="#the-dashboard"]');
      subheaderItem.classList.add('active');

      subheaderList.scrollLeft =
        subheaderItem.offsetLeft -
        subheaderList.offsetWidth / 2 +
        subheaderItem.offsetWidth / 2;

      //intervalManager(true, sliderInterval, 5000);

      // if (playVideoBool && document.readyState === 'complete') playVideos();
      // playVideoBool = false;
    }
    if (window.scrollY >= theDashboardCard.offsetTop + 150 && playVideoBool) {
      playVideos();
      playVideoBool = false;
    }
    if (window.scrollY >= pdfReportsCard.offsetTop - header.offsetHeight - 30) {
      for (var i = 0; i < tocLinks.length; i++) {
        tocLinks[i].classList.remove('active');
      }

      subheaderItem = document.querySelector('[href="#pdf-reports"]');
      subheaderItem.classList.add('active');

      subheaderList.scrollLeft =
        subheaderItem.offsetLeft -
        subheaderList.offsetWidth / 2 +
        subheaderItem.offsetWidth / 2;
    }

    if (window.scrollY >= databaseCard.offsetTop - header.offsetHeight - 30) {
      for (var i = 0; i < tocLinks.length; i++) {
        tocLinks[i].classList.remove('active');
      }

      subheaderItem = document.querySelector('[href="#database"]');
      subheaderItem.classList.add('active');

      subheaderList.scrollLeft =
        subheaderItem.offsetLeft -
        subheaderList.offsetWidth / 2 +
        subheaderItem.offsetWidth / 2;
    }

    // if (window.scrollY >= getStartedCard.offsetTop - header.offsetHeight - 30) {
    //   for (var i = 0; i < tocLinks.length; i++) {
    //     tocLinks[i].classList.remove('active');
    //   }

    //   subheaderItem = document.querySelector('[href="#get-started"]');
    //   subheaderItem.classList.add('active');

    //   subheaderList.scrollLeft =
    //     subheaderItem.offsetLeft -
    //     subheaderList.offsetWidth / 2 +
    //     subheaderItem.offsetWidth / 2;
    // }
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

// window.addEventListener('load', function () {
//   if (window.scrollY >= theDashboardCard.offsetTop - 300) {
//     playVideos();
//   }
// });

var slider = document.querySelector('.section-dashboard-main-body-slider');
var slides = document.querySelectorAll(
  '.section-dashboard-main-body-slider-slide'
);
var slideBtns = document.querySelectorAll(
  '.section-dashboard-main-body-list-item-link'
);

// document.querySelector('.slide-01').addEdventListener('loadeddata', (e) => {
//   //Video should now be loaded but we can add a second check

//   if (videoElement.readyState >= 3) {
//     //your code goes here
//     playVideos();
//   }
// });

function playVideos() {
  var index;
  for (var i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active')) {
      index = i;
      break;
    }
  }

  // if (!currentVideo.readyState > 3) {
  //   console.log('ALERT!!!!!!!!!!!');
  //   playVideos();
  // }

  slideBtns[0].classList.remove('active');
  slideBtns[1].classList.remove('active');
  slideBtns[2].classList.remove('active');
  slideBtns[3].classList.remove('active');

  slides[0].classList.remove('active');
  slides[1].classList.remove('active');
  slides[2].classList.remove('active');
  slides[3].classList.remove('active');

  slideBtns[index].classList.add('active');
  slides[index].classList.add('active');
  var currentVideo = slides[index];
  var currentVideoDuration = currentVideo.duration;

  var currentBtn = slideBtns[index];
  var currentBtnProgress = currentBtn.querySelector('.video-progress');

  // currentVideo.pause();
  currentVideo.currentTime = 0;
  currentVideo.play();
  currentBtnProgress.style.animationDuration = `${currentVideoDuration}s`;
  currentBtnProgress.classList.add('animate');

  var nextVideo = slides[index + 1];
  var nextBtn = slideBtns[index + 1];

  var firstVideo = slides[0];
  var firstBtn = slideBtns[0];

  currentVideo.onended = function () {
    currentVideo.classList.remove('active');
    currentBtn.classList.remove('active');
    currentBtnProgress.classList.remove('animate');

    if (index < slides.length - 1) {
      nextVideo.classList.add('active');
      nextBtn.classList.add('active');
    } else {
      firstVideo.classList.add('active');
      firstBtn.classList.add('active');
    }

    playVideos();
  };
}

for (var i = 0; i < slideBtns.length; i++) {
  slideBtns[i].addEventListener('click', function (e) {
    slideBtns[0].classList.remove('active');
    slideBtns[1].classList.remove('active');
    slideBtns[2].classList.remove('active');
    slideBtns[3].classList.remove('active');

    slides[0].classList.remove('active');
    slides[1].classList.remove('active');
    slides[2].classList.remove('active');
    slides[3].classList.remove('active');

    e.target.classList.add('active');
    var video = document.querySelector(
      '.' + e.target.getAttribute('slide-target')
    );

    video.classList.add('active');
    playVideos();
  });
}

// var intervalID = null;

// function intervalManager(flag, animate, time) {
//   if (flag) {
//     if (!intervalID) {
//       intervalID = setInterval(animate, time);
//     }
//   } else {
//     clearInterval(intervalID);
//   }

// if (flag) intervalID = setInterval(animate, time);
// else clearInterval(intervalID);
//}

// function sliderInterval() {
//   var index;
//   for (var i = 0; i < slides.length; i++) {
//     if (slides[i].classList.contains('active')) {
//       index = i;
//       break;
//     }
//   }

//   slides[index].classList.remove('active');
//   slideBtns[index].classList.remove('active');

//   if (index >= slides.length - 1) {
//     slides[0].classList.add('active');
//     slides[0].pause();
//     slides[0].currentTime = 0;
//     slides[0].play();
//     slideBtns[0].classList.add('active');
//   } else {
//     slides[index + 1].classList.add('active');
//     slides[index + 1].pause();
//     slides[index + 1].currentTime = 0;
//     slides[index + 1].play();
//     slideBtns[index + 1].classList.add('active');
//   }
// }

// for (var i = 0; i < slideBtns.length; i++) {
//   slideBtns[i].addEventListener('click', function (e) {
//     // console.log(slides[i]);
//     intervalManager(false);
//     slides[0].classList.remove('active');
//     slides[1].classList.remove('active');
//     slides[2].classList.remove('active');
//     slides[3].classList.remove('active');

//     slideBtns[0].classList.remove('active');
//     slideBtns[1].classList.remove('active');
//     slideBtns[2].classList.remove('active');
//     slideBtns[3].classList.remove('active');

//     e.target.classList.add('active');

// var video = document.querySelector(
//   '.' + e.target.getAttribute('slide-target')
// );

// video.classList.add('active');
//     video.pause();
//     video.currentTime = 0;
//     video.play();
//     intervalID = null;
//     intervalManager(true, sliderInterval, 5000);
//   });
// }
