import React from 'react';
import { createRoot } from 'react-dom/client';
import { client } from '@sigmacomputing/plugin';
import EChartsPlugin from './components/plugin';

// Initialize the Sigma plugin client
client.config.configureEditorPanel([]);

// Render the plugin
const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
createRoot(container).render(
  <React.StrictMode>
    <EChartsPlugin />
  </React.StrictMode>
);
