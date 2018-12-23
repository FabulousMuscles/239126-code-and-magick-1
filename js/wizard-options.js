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

  var similarListItemElement = window.popup.userModalElement.querySelector('.setup-similar-list');
  var wizardElement = window.popup.userModalElement.querySelector('.wizard');
  var fireballElement = window.popup.userModalElement.querySelector('.setup-fireball-wrap');

  similarListItemElement.appendChild(window.setup.wizardFragment);

  window.wizardOptions = {
    addWizardChangeColorHandler: function () {
      wizardElement.addEventListener('click', wizardElementClickHandler);
    },
    removeWizardChangeColorHandler: function () {
      wizardElement.removeEventListener('click', wizardElementClickHandler);
    },
    addFireballChangeColorHandler: function () {
      fireballElement.addEventListener('click', fireballElementClickHandler);
    },
    removeFireballChangeColorHandler: function () {
      fireballElement.removeEventListener('click', fireballElementClickHandler);
    }
  };

})();
