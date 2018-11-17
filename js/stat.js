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
var MAX_BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var CURRENT_PLAYER = 'Вы';
var WHITE_COLOR = '#ffffff';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var TEXT_COLOR = '#000000';
var MESSAGES = ['Ура вы победили!', 'Список результатов:'];
var BAR_COLOR_RED = 'rgba(255, 0, 0, 1)';
var FONT = '16px PT Mono';
var TEXT_BASELINE = 'hanging';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getRandomBlue = function () {
  return 'rgba(0, 0, 255,' + (Math.random() + 0.10) + ')';
};

var renderMessage = function (ctx, textData) {
  ctx.font = FONT;
  ctx.textBaseline = TEXT_BASELINE;
  ctx.fillStyle = TEXT_COLOR;

  textData.forEach(function(message, i){
    ctx.fillText(message, MESSAGE_POS_X, MESSAGE_POS_Y + (i * MESSAGE_GAP_Y));
  })
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
  var playerXPosition;
  var playerBarYPosition;
  var barSize;
  for (var i = 0; i < names.length; i++) {
    playerXPosition = PLAYER_NAME_X + (PLAYER_NAME_GAP_X * i);
    playerBarYPosition = PLAYER_NAME_Y - PLAYER_NAME_GAP_Y;
    barSize = Math.floor((times[i] * -MAX_BAR_HEIGHT) / maxTime);

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[i], playerXPosition, PLAYER_NAME_Y);
    ctx.fillStyle = names[i] === CURRENT_PLAYER ? BAR_COLOR_RED : getRandomBlue();
    ctx.fillRect(playerXPosition, playerBarYPosition, BAR_WIDTH, barSize);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, WHITE_COLOR);
  renderMessage(ctx, MESSAGES);
  renderPlayers(ctx, names, times);
};
