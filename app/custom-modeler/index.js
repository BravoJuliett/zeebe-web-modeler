import Modeler from 'bpmn-js/lib/Modeler';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from './custom/properties-provider';
import camundaModdleDescriptor from './custom/zeebe-bpmn-moddle/zeebe';
import CustomModule from './custom';
import CustomModelingModule from './custom/modeling';

export default class CustomModeler extends Modeler {

  constructor(options) {

    var modelerOptions = {
      container: options.container,
      keyboard: { bindTo: document },
      propertiesPanel: {
        parent: options.propertiesPanel
      },
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    };
    super(modelerOptions);
  }

  resetZoom(callback) {
    var self = this;
    self.get('zoomScroll').reset();
  }
}

CustomModeler.prototype._modules = [
  ...CustomModeler.prototype._modules,
  CustomModule,
  propertiesPanelModule,
  propertiesProviderModule,
  CustomModelingModule
];