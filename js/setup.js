'use strict';
(function () {

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

  var wizardTemplateElement = document.querySelector('#similar-wizard-template').content
    .querySelector('.setup-similar-item');
  var wizards = createWizards();
  var wizardFragment = createWizardFragment(wizardTemplateElement, wizards);

  window.setup = {
    wizardFragment: wizardFragment,
    KEYCODE_ESC: KEYCODE_ESC,
    KEYCODE_ENTER: KEYCODE_ENTER,
    WIZARD_EYES_COLOR: WIZARD_EYES_COLOR,
    WIZARD_COAT_COLOR: WIZARD_COAT_COLOR,
    FIREBALL_COLOR: FIREBALL_COLOR,
    createRandomNumber: createRandomNumber
  };
})();
