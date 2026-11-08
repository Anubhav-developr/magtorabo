import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App(){
  return <main className="react-shell">
    <iframe title="Magtora Post Office" src="/legacy.html" />
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
