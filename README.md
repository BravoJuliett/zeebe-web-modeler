# zeebe-web-modeler

This example uses [bpmn-js](https://github.com/bpmn-io/bpmn-js) to implement the zeebe-web-modeler.

## About

This example is a node-style web application that builds a user interface around the bpmn-js BPMN 2.0 modeler.


## Building

You need a [NodeJS](http://nodejs.org) development stack with [npm](https://npmjs.org) installed to build the project.

To install all project dependencies execute

```
npm install
```
<br>
Build the application (including [bpmn-js](https://github.com/bpmn-io/bpmn-js)) via

```
npm run all
```

This builds the zeebe-modeler.js library that can be included in other web-applications<br><br>

You may also spawn a development setup by executing
```
npm run dev
```
This task generates the distribution ready client-side modeler application into the `public` folder.

## Sync with zeebe

the sync-tasks.sh pulls the zeebe extensions from the zeebe-modeler repository and updates the app/custom-modeler/custom folder.

```
sh sync-task.sh
```

All changes in the app/custom-modeler/custom folder get lost!

## TODOS

* Styling
* Buttons
* Library Generation for external usage