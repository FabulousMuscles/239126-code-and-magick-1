'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_LIMIT = 4;
var KEYCODE_ESC = 27;
var KEYCODE_ENTER = 13;

var createWizard = function () {
  return {
    name: WIZARD_NAMES[getRandomIndex(WIZARD_NAMES)],
    surname: WIZARD_SURNAMES[getRandomIndex(WIZARD_SURNAMES)],
    coatColor: WIZARD_COAT_COLOR[getRandomIndex(WIZARD_COAT_COLOR)],
    eyesColor: WIZARD_EYES_COLOR[getRandomIndex(WIZARD_EYES_COLOR)]
  };
};

var createWizards = function () {
  var wizards = [];

  for (var i = 0; i < WIZARD_LIMIT; i++) {
    wizards.push(createWizard());
  }
  return wizards;
};

var getRandomIndex = function (arr) {
  return Math.floor(arr.length * Math.random());
};

var createWizardElement = function (templateElement, data) {
  var element = templateElement.cloneNode(true);

  element.querySelector('.setup-similar-label').textContent = data.name + ' ' + data.surname;
  element.querySelector('.wizard-coat').style.fill = data.coatColor;
  element.querySelector('.wizard-eyes').style.fill = data.eyesColor;

  return element;
};

var createWizardFragment = function (templateElement, wizards) {
  var fragment = document.createDocumentFragment();

  wizards.forEach(function (wizard) {
    fragment.appendChild(
        createWizardElement(templateElement, wizard)
    );
  });

  return fragment;
};

var createRandomNumber = function (min, max) {
  return Math.round(min + Math.random() * (max - min));
};

var popupEscKeydownHandler = function (evt) {
  if (evt.keyCode === KEYCODE_ESC) {
    closePopup();
  }
};

var openPopup = function () {
  userModalElement.classList.remove('hidden');
  document.addEventListener('keydown', popupEscKeydownHandler);
  artifactElement.addEventListener('dragstart', artifactDragStartHandler);
  artifactElement.addEventListener('dragend', artifactDragEndHandler);
};

var closePopup = function () {
  userModalElement.classList.add('hidden');
  userModalElement.removeAttribute('style');
  document.removeEventListener('keydown', popupEscKeydownHandler);
  artifactElement.removeEventListener('dragstart', artifactDragStartHandler);
  artifactElement.removeEventListener('dragend', artifactDragEndHandler);
};

var userModalElementOpenKeydownHandler = function (evt) {
  if (evt.keyCode === KEYCODE_ENTER) {
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
  if (evt.keyCode === KEYCODE_ENTER) {
    closePopup();
  }
};

var wizardElementClickHandler = function (evt) {
  if (evt.target.classList.contains('wizard-coat')) {
    evt.target.style.fill = WIZARD_COAT_COLOR[createRandomNumber(0, WIZARD_COAT_COLOR.length - 1)];
  } else if (evt.target.classList.contains('wizard-eyes')) {
    evt.target.style.fill = WIZARD_EYES_COLOR[createRandomNumber(0, WIZARD_EYES_COLOR.length - 1)];
  }
};

var fireballElementClickHandler = function (evt) {
  evt.currentTarget.style.backgroundColor = FIREBALL_COLOR[createRandomNumber(0, FIREBALL_COLOR.length - 1)];
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

var playerBackpackDragOverHandler = function (evt) {
  evt.preventDefault();
  if (evt.target.classList.contains('setup-artifacts-cell')) {
    evt.target.style.backgroundColor = 'yellow';
  }
};

var playerBackpackDragEnterHandler = function (evt) {
  evt.preventDefault();
};

var playerBackpackDragLeaveHandler = function (evt) {
  if (evt.target.classList.contains('setup-artifacts-cell')) {
    evt.target.removeAttribute('style');
  }
};

var playerBackpackDropHandler = function (evt) {
  evt.preventDefault();
  if (evt.target.classList.contains('setup-artifacts-cell')) {
    evt.target.removeAttribute('style');
    evt.target.append(artifactElement);
  }
};

var initializeDragging = function () {
  playerBackpackElement.addEventListener('dragover', playerBackpackDragOverHandler);
  playerBackpackElement.addEventListener('dragenter', playerBackpackDragEnterHandler);
  playerBackpackElement.addEventListener('dragleave', playerBackpackDragLeaveHandler);
  playerBackpackElement.addEventListener('drop', playerBackpackDropHandler);
};

var unitializeDragging = function () {
  playerBackpackElement.removeEventListener('dragover', playerBackpackDragOverHandler);
  playerBackpackElement.removeEventListener('dragenter', playerBackpackDragEnterHandler);
  playerBackpackElement.removeEventListener('dragleave', playerBackpackDragLeaveHandler);
  playerBackpackElement.removeEventListener('drop', playerBackpackDropHandler);
};

var artifactDragStartHandler = function () {
  initializeDragging();
};

var artifactDragEndHandler = function () {
  unitializeDragging();
};

var userModalElement = document.querySelector('.setup');
var similarListItemElement = userModalElement.querySelector('.setup-similar-list');
var wizardTemplateElement = document.querySelector('#similar-wizard-template').content
    .querySelector('.setup-similar-item');
var userModalElementOpen = document.querySelector('.setup-open-icon');
var userModalElementClose = userModalElement.querySelector('.setup-close');
var inputUserNameElement = userModalElement.querySelector('.setup-user-name');
var wizardElement = userModalElement.querySelector('.wizard');
var fireballElement = userModalElement.querySelector('.setup-fireball-wrap');
var handleElement = userModalElement.querySelector('.upload');

var playerElement = document.querySelector('.setup-player');
var shopElement = document.querySelector('.setup-artifacts-shop');
var artifactElement = shopElement.querySelector('img');
var playerBackpackElement = playerElement.querySelector('.setup-artifacts');

var wizards = createWizards();
var wizardFragment = createWizardFragment(wizardTemplateElement, wizards);

userModalElement.querySelector('.setup-similar').classList.remove('hidden');
similarListItemElement.appendChild(wizardFragment);

userModalElementOpen.addEventListener('click', userModalElementOpenClickHandler);

userModalElementOpen.addEventListener('keydown', userModalElementOpenKeydownHandler);

userModalElementClose.addEventListener('click', userModalElementCloseClickHandler);

userModalElementClose.addEventListener('keydown', userModalElementCloseKeydownHandler);

inputUserNameElement.addEventListener('focus', function () {
  document.removeEventListener('keydown', popupEscKeydownHandler);
});

inputUserNameElement.addEventListener('blur', function () {
  document.addEventListener('keydown', popupEscKeydownHandler);
});

wizardElement.addEventListener('click', wizardElementClickHandler);

fireballElement.addEventListener('click', fireballElementClickHandler);

handleElement.addEventListener('mousedown', handleElementMouseDownHandler);

artifactElement.addEventListener('dragstart', artifactDragStartHandler);
artifactElement.addEventListener('dragend', artifactDragEndHandler);
