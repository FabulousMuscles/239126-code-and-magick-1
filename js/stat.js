'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var X_MESSAGE_POS = 120;
var Y_MESSAGE_POS = 25;
var Y_MESSAGE_GAP = 20;
var X_PLAYER_NAME = 150;
var Y_PLAYER_NAME = 250;
var Y_PLAYER_NAME_GAP = 10;
var X_PLAYER_NAME_GAP = 85;
var MAX_BAR_HEIGHT = -150;
var BAR_WIDTH = 40;
var whiteColor = '#ffffff';
var shadowColor = 'rgba(0, 0, 0, 0.7)';
var textColor = '#000000';
var message = 'Ура вы победили!\nСписок результатов:';
var barColorRed = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getRandomBlue = function () {
  return 'rgba(0, 0, 255,' + (Math.random() + 0.10).toString() + ')';
};

var renderMessage = function (ctx, textData) {
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = textColor;
  var messageArray = textData.split('\n');
  for (var i = 0; i < messageArray.length; i++) {
    ctx.fillText(messageArray[i], X_MESSAGE_POS, Y_MESSAGE_POS + (i * Y_MESSAGE_GAP));
  }
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderPlayers = function (ctx, names, times) {
  if (names.length > times.length) {
    names.length = times.length;
  }
  var maxTime = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = textColor;
    ctx.fillText(names[i], X_PLAYER_NAME + (X_PLAYER_NAME_GAP * i), Y_PLAYER_NAME);
    if (names[i].valueOf('Вы')) {
      ctx.fillStyle = barColorRed;
    } else {
      ctx.fillStyle = getRandomBlue();
    }
    ctx.fillRect(X_PLAYER_NAME + (X_PLAYER_NAME_GAP * i), Y_PLAYER_NAME - Y_PLAYER_NAME_GAP, BAR_WIDTH, Math.floor((times[i] * MAX_BAR_HEIGHT) / maxTime));
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, shadowColor);
  renderCloud(ctx, 100, 10, whiteColor);
  renderMessage(ctx, message);
  renderPlayers(ctx, names, times);
};
