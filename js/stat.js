'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var MESSAGE_POS_X = 120;
var MESSAGE_POS_Y = 25;
var MESSAGE_GAP_Y = 20;
var PLAYER_NAME_X = 150;
var PLAYER_NAME_Y = 250;
var PLAYER_NAME_GAP_Y = 10;
var PLAYER_NAME_GAP_X = 85;
var MAX_BAR_HEIGHT = -150;
var BAR_WIDTH = 40;
var CURRENT_PLAYER = 'Вы';
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
    ctx.fillText(messageArray[i], MESSAGE_POS_X, MESSAGE_POS_Y + (i * MESSAGE_GAP_Y));
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
    var playerXPosition = PLAYER_NAME_X + (PLAYER_NAME_GAP_X * i);
    var playerBarYPosition = PLAYER_NAME_Y - PLAYER_NAME_GAP_Y;
    var barSize = Math.floor((times[i] * MAX_BAR_HEIGHT) / maxTime);

    ctx.fillStyle = textColor;
    ctx.fillText(names[i], playerXPosition, PLAYER_NAME_Y);
    ctx.fillStyle = names[i] === CURRENT_PLAYER ? barColorRed : getRandomBlue();
    ctx.fillRect(playerXPosition, playerBarYPosition, BAR_WIDTH, barSize);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, shadowColor);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, whiteColor);
  renderMessage(ctx, message);
  renderPlayers(ctx, names, times);
};
