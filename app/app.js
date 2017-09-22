'use strict';

    window.onbeforeunload = function() {
        //all you can do is provide a message..
        return "Do you really want to close the window?";
    };

var $ = require('jquery');
// inlined diagram; load it from somewhere else if you like
var diagram = require('../resources/diagram.bpmn');

// custom elements JSON; load it from somewhere else if you like
var customElements = require('./custom-elements.json');


// our custom modeler
var CustomModeler = require('./custom-modeler');
var propertiesPanelModule = require('bpmn-js-properties-panel'),
    propertiesProviderModule = require('./custom-modeler/custom/propertyprovider'),
    camundaModdleDescriptor = require('./custom-modeler/custom/zeebe-bpmn-moddle/zeebe');

var modeler = new CustomModeler({
  container: '#canvas',
  keyboard: { bindTo: document },
  propertiesPanel: {
    parent: '#js-properties-panel-content'
  },
  additionalModules: [
    propertiesPanelModule,
    propertiesProviderModule
  ],
  moddleExtensions: {
    camunda: camundaModdleDescriptor
  }
});


var uploadDiagram = $('#js-open-diagram');

function handleManualFileSelect(e) {
        e.stopPropagation();
        e.preventDefault();

        var files = e.target.files;

        var file = files[0];

        var reader = new FileReader();

        reader.onload = function (e) {

            var xml = e.target.result;

            modeler.importXML(xml);
        };


        uploadDiagram[0].value = null;
        reader.readAsText(file);
    }


    uploadDiagram[0].addEventListener('change',
        handleManualFileSelect,
        false);


   $('#js-zoom-reset').click(function (e) {
        e.stopPropagation();
        e.preventDefault();

        modeler.resetZoom();
    });

 //Create new Diagram Button
    $('#js-create-diagram').click(function (e) {
        modeler.createDiagram();
    });


//init Buttons
  $('#js-screen-full').click(function (e) {
        toggleFullScrennTry();
    });


function toggleFullScrennTry(){

        var element = $('#body')[0];
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
}



modeler.importXML(diagram, function(err) {

  if (err) {
    console.error('something went wrong:', err);
  }

  modeler.get('canvas').zoom('fit-viewport');

  function saveSVG(event) {
    modeler.saveSVG(function(err,svg) {
      downloadSvgLink.attr({
        'href': 'data:application/bpmn20-xml;charset=UTF-8,' + svg,
        'download': 'diagram.svg'
      });
    });
  }
  function saveDiagram(event) {
    modeler.saveXML({ format: true }, function(err, xml) {
       var encodedData = encodeURIComponent(xml);
        downloadLink.attr({
          'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
          'download': 'diagram.bpmn'
        });
    });
  }
  var downloadLink = $('#js-download-diagram');
  var downloadSvgLink = $('#js-download-svg');
  downloadLink.on('click',saveDiagram);
  downloadSvgLink.on('click',saveSVG);
});

// expose bpmnjs to window for debugging purposes
window.bpmnjs = modeler;
