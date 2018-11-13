var fireballSize = 22;
var wizardSpeed = 3;
var wizardWidth = 70;

var getFireballSize = function(left) {
  return left ? 5 : 2;
};

var getWizardHeight = function() {
  return 1.337 * wizardWidth;
};

var getWizardX = function(width) {
  var wizardXPosition = (width / 2) - wizardWidth;

  return wizardXPosition;
};

var getWizardY = function(height) {
  var wizardYPosition = height * (2 / 3);

  return wizardYPosition;
};
