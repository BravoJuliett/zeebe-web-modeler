'use strict';


var inherits = require('inherits');

var PropertiesActivator = require('bpmn-js-properties-panel/lib/PropertiesActivator');
var idProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps'),
nameProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps'),
executableProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/ExecutableProps');

var is = require('bpmn-js/lib/util/ModelUtil').is;

var inputOutput = require('./parts/InputOutputProps'),
inputOutputParameter = require('./parts/InputOutputParameterProps');

var headers = require('./parts/HeadersProps');

var taskDefinition = require('./parts/TaskDefinitionProps');


var getInputOutputParameterLabel = function(param) {

  if (is(param, 'camunda:InputParameter')) {
    return 'Input Parameter';
  }

  if (is(param, 'camunda:OutputParameter')) {
    return 'Output Parameter';
  }

  return '';
};


function createGeneralTabGroups(element, bpmnFactory, elementRegistry) {
  var generalGroup = {
    id: 'general',
    label: 'General',
    entries: []
  };
  idProps(generalGroup, element, elementRegistry);
  nameProps(generalGroup, element);
  executableProps(generalGroup, element);
  taskDefinition(generalGroup, element, bpmnFactory);

  return[
  generalGroup
  ];
}





function createHeadersGroups(element, bpmnFactory, elementRegistry) {

  var headersGroup = {
    id : 'headers-properties',
    label: 'Headers',
    entries: []
  };
  headers(headersGroup, element, bpmnFactory);

  return [
  headersGroup
  ];
}



function createInputOutputTabGroups(element, bpmnFactory, elementRegistry) {

  var inputOutputGroup = {
    id: 'input-output',
    label: 'Parameters',
    entries: []
  };

  var options = inputOutput(inputOutputGroup, element, bpmnFactory);

  var inputOutputParameterGroup = {
    id: 'input-output-parameter',
    entries: [],
    enabled: function(element, node) {
      return options.getSelectedParameter(element, node);
    },
    label: function(element, node) {
      var param = options.getSelectedParameter(element, node);
      return getInputOutputParameterLabel(param);
    }
  };

  inputOutputParameter(inputOutputParameterGroup, element, bpmnFactory, options);

  return [
  inputOutputGroup,
  inputOutputParameterGroup
  ];
}

function ZeebePropertiesProvider(eventBus, bpmnFactory, elementRegistry) {

  PropertiesActivator.call(this, eventBus);
  this.getTabs = function(element) {
    var generalTab = {
      id: 'general',
      label: 'General',
      groups: createGeneralTabGroups(element, bpmnFactory, elementRegistry)
    };

    var inputOutputTab = {
      id: 'input-output',
      label: 'Input/Output',
      groups: createInputOutputTabGroups(element, bpmnFactory, elementRegistry)
    };

    var headersTab = {
      id: 'headers-tab',
      label: 'Headers',
      groups: createHeadersGroups(element, bpmnFactory, elementRegistry)
    };

    return [
    generalTab,
    inputOutputTab,
    headersTab
    ];
  };
}
inherits(ZeebePropertiesProvider, PropertiesActivator);

module.exports = ZeebePropertiesProvider;
