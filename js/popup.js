'use strict';
(function () {

  var openPopup = function () {
    userModalElement.classList.remove('hidden');
    document.addEventListener('keydown', popupEscKeydownHandler);
    inputUserNameElement.addEventListener('focus', inputUserNameElementFocusHandler);
    inputUserNameElement.addEventListener('blur', inputUserNameElementBlurHandler);
    window.wizardOptions.addWizardChangeColorHandler();
    window.wizardOptions.addFireballChangeColorHandler();
    window.dragAndDrop.addHandleElementMouseDown();
    window.dragAndDrop.addDragStart();
    window.dragAndDrop.addDragEnd();
  };

  var closePopup = function () {
    userModalElement.classList.add('hidden');
    userModalElement.removeAttribute('style');
    document.removeEventListener('keydown', popupEscKeydownHandler);
    inputUserNameElement.removeEventListener('focus', inputUserNameElementFocusHandler);
    inputUserNameElement.removeEventListener('blur', inputUserNameElementBlurHandler);
    fireballElement.removeEventListener('click', fireballElementClickHandler);
    window.wizardOptions.removeWizardChangeColorHandler();
    window.wizardOptions.removeFireballChangeColorHandler();
    window.dragAndDrop.removeHandleElementMouseDown();
    window.dragAndDrop.removeDragStart();
    window.dragAndDrop.removeDragEnd();
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

  var userModalElementCloseClickHandler = function () {
    closePopup();
  };

  var userModalElementCloseKeydownHandler = function (evt) {
    if (evt.keyCode === window.setup.KEYCODE_ENTER) {
      closePopup();
    }
  };

  var userModalElement = document.querySelector('.setup');
  var userModalElementOpen = document.querySelector('.setup-open-icon');
  var userModalElementClose = userModalElement.querySelector('.setup-close');
  var inputUserNameElement = userModalElement.querySelector('.setup-user-name');

  userModalElement.querySelector('.setup-similar').classList.remove('hidden');

  userModalElementOpen.addEventListener('click', userModalElementOpenClickHandler);

  userModalElementOpen.addEventListener('keydown', userModalElementOpenKeydownHandler);

  userModalElementClose.addEventListener('click', userModalElementCloseClickHandler);

  userModalElementClose.addEventListener('keydown', userModalElementCloseKeydownHandler);

  window.popup = {
    userModalElement: userModalElement
  };

})();
