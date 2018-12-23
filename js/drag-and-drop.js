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

      window.popup.userModalElement.style.top = (window.popup.userModalElement.offsetTop - shift.y) + 'px';
      window.popup.userModalElement.style.left = (window.popup.userModalElement.offsetLeft - shift.x) + 'px';
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

  var playerElement = window.popup.userModalElement.querySelector('.setup-player');
  var shopElement = window.popup.userModalElement.querySelector('.setup-artifacts-shop');
  var artifactElement = shopElement.querySelector('img');
  var playerBackpackElement = playerElement.querySelector('.setup-artifacts');
  var handleElement = window.popup.userModalElement.querySelector('.upload');

  window.dragAndDrop = {
    addDragStart: function () {
      artifactElement.addEventListener('dragstart', artifactDragStartHandler);
    },
    removeDragStart: function () {
      artifactElement.removeEventListener('dragstart', artifactDragStartHandler);
    },
    addDragEnd: function () {
      artifactElement.addEventListener('dragend', artifactDragEndHandler);
    },
    removeDragEnd: function () {
      artifactElement.removeEventListener('dragend', artifactDragEndHandler);
    },
    addHandleElementMouseDown: function () {
      handleElement.addEventListener('mousedown', handleElementMouseDownHandler);
    },
    removeHandleElementMouseDown: function () {
      handleElement.removeEventListener('mousedown', handleElementMouseDownHandler);
    }
  };

})();
