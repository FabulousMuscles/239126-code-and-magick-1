'use strict';
(function () {

var wizardElementClickHandler = function (evt) {
  if (evt.target.classList.contains('wizard-coat')) {
    evt.target.style.fill = window.setup.WIZARD_COAT_COLOR[window.setup.createRandomNumber(0, window.setup.WIZARD_COAT_COLOR.length - 1)];
  } else if (evt.target.classList.contains('wizard-eyes')) {
    evt.target.style.fill = window.setup.WIZARD_EYES_COLOR[window.setup.createRandomNumber(0, window.setup.WIZARD_EYES_COLOR.length - 1)];
  }
};

var fireballElementClickHandler = function (evt) {
  evt.currentTarget.style.backgroundColor = window.setup.FIREBALL_COLOR[window.setup.createRandomNumber(0, window.setup.FIREBALL_COLOR.length - 1)];
};

var openPopup = function () {
  userModalElement.classList.remove('hidden');
  document.addEventListener('keydown', popupEscKeydownHandler);
  handleElement.addEventListener('mousedown', handleElementMouseDownHandler);
  wizardElement.addEventListener('click', wizardElementClickHandler);
  inputUserNameElement.addEventListener('focus', inputUserNameElementFocusHandler);
  inputUserNameElement.addEventListener('blur', inputUserNameElementBlurHandler);
  fireballElement.addEventListener('click', fireballElementClickHandler);
  window.dragAndDrop.artifactElement.addEventListener('dragstart', window.dragAndDrop.artifactDragStartHandler);
  window.dragAndDrop.artifactElement.addEventListener('dragend', window.dragAndDrop.artifactDragEndHandler);
};

var closePopup = function () {
  userModalElement.classList.add('hidden');
  userModalElement.removeAttribute('style');
  document.removeEventListener('keydown', popupEscKeydownHandler);
  handleElement.removeEventListener('mousedown', handleElementMouseDownHandler);
  wizardElement.removeEventListener('click', wizardElementClickHandler);
  inputUserNameElement.removeEventListener('focus', inputUserNameElementFocusHandler);
  inputUserNameElement.removeEventListener('blur', inputUserNameElementBlurHandler);
  fireballElement.removeEventListener('click', fireballElementClickHandler);
  window.dragAndDrop.artifactElement.removeEventListener('dragstart', window.dragAndDrop.artifactDragStartHandler);
  window.dragAndDrop.artifactElement.removeEventListener('dragend', window.dragAndDrop.artifactDragEndHandler);
};

var popupEscKeydownHandler = function (evt) {
  if (evt.keyCode === window.setup.KEYCODE_ESC) {
    closePopup();
  }
};

var inputUserNameElementFocusHandler = function () {
  document.removeEventListener('keydown', popupEscKeydownHandler);
};

var inputUserNameElementBlurHandler = function () {
  document.addEventListener('keydown', popupEscKeydownHandler);
};


var userModalElementOpenClickHandler = function () {
  openPopup();
};

var userModalElementOpenKeydownHandler = function (evt) {
  if (evt.keyCode === window.setup.KEYCODE_ENTER) {
    openPopup();
  }
};

var userModalElementOpenClickHandler = function () {
  openPopup();
};

var userModalElementCloseClickHandler = function () {
  closePopup();
};

var userModalElementCloseKeydownHandler = function (evt) {
  if (evt.keyCode === window.setup.KEYCODE_ENTER) {
    closePopup();
  }
};

var handleElementMouseDownHandler = function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var handleElementMouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    userModalElement.style.top = (userModalElement.offsetTop - shift.y) + 'px';
    userModalElement.style.left = (userModalElement.offsetLeft - shift.x) + 'px';
  };

  var handleElementMouseUpHandler = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', handleElementMouseMoveHandler);
    document.removeEventListener('mouseup', handleElementMouseUpHandler);

    if (dragged) {
      var clickHandlerPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        handleElement.removeEventListener('click', clickHandlerPreventDefault);
      };
      handleElement.addEventListener('click', clickHandlerPreventDefault);
    }
  };

  document.addEventListener('mousemove', handleElementMouseMoveHandler);
  document.addEventListener('mouseup', handleElementMouseUpHandler);
};

var userModalElement = document.querySelector('.setup');
var similarListItemElement = userModalElement.querySelector('.setup-similar-list');
var userModalElementOpen = document.querySelector('.setup-open-icon');
var userModalElementClose = userModalElement.querySelector('.setup-close');
var inputUserNameElement = userModalElement.querySelector('.setup-user-name');
var wizardElement = userModalElement.querySelector('.wizard');
var fireballElement = userModalElement.querySelector('.setup-fireball-wrap');
var handleElement = userModalElement.querySelector('.upload');

userModalElement.querySelector('.setup-similar').classList.remove('hidden');
similarListItemElement.appendChild(window.setup.wizardFragment);

userModalElementOpen.addEventListener('click', userModalElementOpenClickHandler);

userModalElementOpen.addEventListener('keydown', userModalElementOpenKeydownHandler);

userModalElementClose.addEventListener('click', userModalElementCloseClickHandler);

userModalElementClose.addEventListener('keydown', userModalElementCloseKeydownHandler);

wizardElement.addEventListener('click', wizardElementClickHandler);

})();
