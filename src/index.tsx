/* @refresh reload */
import { Router } from '@solidjs/router';
import { render } from 'solid-js/web';

import App from './App';
import { initialize as initializeCache } from './lib/cache';
import './style.css';

initializeCache();

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);
