'use strict';

var BAR_COLOR_RED = 'rgba(255, 0, 0, 1)';
var BAR_WIDTH = 40;
var CLOUD_COLOR = '#ffffff';
var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CURRENT_PLAYER = 'Вы';
var MAX_BAR_HEIGHT = 150;
var MESSAGE_GAP_Y = 20;
var MESSAGE_FONT = '16px PT Mono';
var MESSAGE_POS_X = 120;
var MESSAGE_POS_Y = 25;
var MESSAGES = ['Ура вы победили!', 'Список результатов:'];
var PLAYER_NAME_GAP_X = 85;
var PLAYER_NAME_GAP_Y = 10;
var PLAYER_NAME_X = 150;
var PLAYER_NAME_Y = 250;
var TIME_SCORE_GAP_Y = MAX_BAR_HEIGHT + 70;
var SHADOW_GAP = 10;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var TEXT_BASELINE = 'hanging';
var TEXT_COLOR = '#000000';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getRandomBlue = function () {
  return 'rgba(0, 0, 255,' + (Math.random() + 0.10) + ')';
};

var renderMessage = function (ctx, textData) {
  ctx.font = MESSAGE_FONT;
  ctx.textBaseline = TEXT_BASELINE;
  ctx.fillStyle = TEXT_COLOR;

  textData.forEach(function (message, i) {
    ctx.fillText(message, MESSAGE_POS_X, MESSAGE_POS_Y + (i * MESSAGE_GAP_Y));
  });
};

var getMaxElement = function (arr, limitedLength) {
  var maxElement = arr[0];
  var limit = Math.min(arr.length, limitedLength);

  for (var i = 0; i < limit; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderPlayers = function (ctx, names, times) {
  var playerXPosition;
  var playerBarYPosition;
  var barSize;
  var floorTimeItem;
  var limit = Math.min(names.length, times.length);
  var maxTime = getMaxElement(times, limit);
  var timeRender;

  for (var i = 0; i < limit; i++) {
    floorTimeItem = Math.floor(times[i]);
    playerXPosition = PLAYER_NAME_X + (PLAYER_NAME_GAP_X * i);
    playerBarYPosition = PLAYER_NAME_Y - PLAYER_NAME_GAP_Y;
    barSize = Math.floor((floorTimeItem * -MAX_BAR_HEIGHT) / maxTime);
    timeRender = TIME_SCORE_GAP_Y + barSize;

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(floorTimeItem, playerXPosition, timeRender);
    ctx.fillText(names[i], playerXPosition, PLAYER_NAME_Y);
    ctx.fillStyle = names[i] === CURRENT_PLAYER ? BAR_COLOR_RED : getRandomBlue();
    ctx.fillRect(playerXPosition, playerBarYPosition, BAR_WIDTH, barSize);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  renderMessage(ctx, MESSAGES);
  renderPlayers(ctx, names, times);
};
