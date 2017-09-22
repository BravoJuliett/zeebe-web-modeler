'use strict';

var Modeler = require('bpmn-js/lib/Modeler');

var assign = require('lodash/object/assign'),
    isArray = require('lodash/lang/isArray');

var inherits = require('inherits');


function CustomModeler(options) {
  Modeler.call(this, options);

  this._customElements = [];
}

inherits(CustomModeler, Modeler);

CustomModeler.prototype._modules = [].concat(
  CustomModeler.prototype._modules,
  [
    require('./custom')
  ]
);

CustomModeler.prototype.resetZoom = function (callback) {
    var self = this;

    self.get('zoomScroll').reset();
};


module.exports = CustomModeler;

