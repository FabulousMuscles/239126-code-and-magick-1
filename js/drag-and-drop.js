'use strict';
(function () {
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

var playerElement = document.querySelector('.setup-player');
var shopElement = document.querySelector('.setup-artifacts-shop');
var artifactElement = shopElement.querySelector('img');
var playerBackpackElement = playerElement.querySelector('.setup-artifacts');

window.dragAndDrop = {
  artifactElement: artifactElement,
  artifactDragStartHandler: artifactDragStartHandler,
  artifactDragEndHandler: artifactDragEndHandler
};

})();
