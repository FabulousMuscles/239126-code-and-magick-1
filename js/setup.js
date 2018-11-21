'use strict';
/*Объект с моковыми данными*/
var WIZARD_DATA = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green']
}
/*Первоначальные манипуляции с DOM*/
/*модальное окно убираю класс hidden*/
var userModal = document.querySelector('.setup');
userModal.classList.remove('hidden');
/*Список элементов где должны рендерится в html волшебники, так же убираю класс hidden =)*/
var similarListItem = userModal.querySelector('.setup-similar-list');
userModal.querySelector('.setup-similar').classList.remove('hidden');
/*Обращаюсь к элементам внутри template и записываю их в переменную*/
var wizardTemplateElement = document.querySelector('#similar-wizard-template').content
    .querySelector('.setup-similar-item');
/*функция конструктор объектов волшебников =)*/
var Wizard = function (name, surname, coatColor, eyesColor) {
  this.name = name + ' ' + surname;
  this.coatColor = coatColor;
  this.eyesColor = eyesColor;
};
/*Функция для генерации случайного числа принимает текущий массив и умножает рандомного число на его длинну*/
var getRandomIndex = function (currentArray) {
  var randomIndex = Math.floor(currentArray.length * Math.random());

  return randomIndex;
};
/*Функция для генерации массива объектов из моковых данных:
инициализирую массив, после запускаю цикл с четыремя итерациями внутри которого запускаю
функцию конструктор с моковыми данными и дальше вставляю их в созданный выше массив*/
var renderWizardsArray = function (wizardData) {
  var wizardsArray = [];
  for (var i = 0; i < 4; i++) {
    var wizard = new Wizard(wizardData.NAMES[getRandomIndex(wizardData.NAMES)], wizardData.SURNAMES[getRandomIndex(wizardData.SURNAMES)], wizardData.COAT_COLOR[getRandomIndex(wizardData.COAT_COLOR)], wizardData.EYES_COLOR[getRandomIndex(wizardData.EYES_COLOR)]);
    wizardsArray.push(wizard);
  }
  return wizardsArray;
};
/*клонирую то, что было в теге темплайт, а дальше вставляю в нужные элементы нужные атрибуты и текст из объектов волшебников*/
var renderWizardsElements = function (wizard) {
  var wizardElement = wizardTemplateElement.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};
/*Вставляю сгенерированные html элементы во фрагмент*/
var appendWizardsElements = function (wizardData) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardData.length; i++) {
    var wizardItem = wizardData[i];
    fragment.appendChild(renderWizardsElements(wizardItem));
  }

  return fragment;
};
/*ну а здесь вызываю все нужные функции и методы =)*/
var wizardsArray = renderWizardsArray(WIZARD_DATA);
var htmlWizards = appendWizardsElements(wizardsArray);
similarListItem.appendChild(htmlWizards);
