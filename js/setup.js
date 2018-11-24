'use strict';

var WIZZAR_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZZAR_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZZAR_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZZAR_EYES_COLOR = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LIMIT = 4;

var createWizard = function () {
  return {
    name: WIZZAR_NAMES[getRandomIndex(WIZZAR_NAMES)],
    surname: WIZZAR_SURNAMES[getRandomIndex(WIZZAR_SURNAMES)],
    coatColor: WIZZAR_COAT_COLOR[getRandomIndex(WIZZAR_COAT_COLOR)],
    eyesColor: WIZZAR_EYES_COLOR[getRandomIndex(WIZZAR_EYES_COLOR)]
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

var userModalElement = document.querySelector('.setup');
var similarListItemElement = userModalElement.querySelector('.setup-similar-list');
var wizardTemplateElement = document.querySelector('#similar-wizard-template').content
    .querySelector('.setup-similar-item');

var wizards = createWizards();
var wizardFragment = createWizardFragment(wizardTemplateElement, wizards);

userModalElement.classList.remove('hidden');
userModalElement.querySelector('.setup-similar').classList.remove('hidden');
similarListItemElement.appendChild(wizardFragment);
