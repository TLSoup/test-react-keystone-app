import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; 

console.clear();

let reactPanel = new CR.Panel({
  region: 'center',
  listeners: {
    afterrender: () => {
      CR.Script.includeJSCSS({
        url: 'https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js',
        callBackFunction: (args) => {
          console.log('loaded react-bootstrap js', args);
        }
      });
    }
  },
  html: `<div id='${CR.Script.scriptDefaultPanelId}'></div>`
});

CR.Core.viewPort = new Ext.Viewport({
  layout: 'border',
  items: [reactPanel]
});

const domNode = document.getElementById(`${CR.Script.scriptDefaultPanelId}`);
const root = createRoot(domNode);
root.render(<App />);