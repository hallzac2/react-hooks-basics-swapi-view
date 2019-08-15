import React from 'react'
import { ClassSwapiViewer } from './components/ClassSwapiViewer'
import HooksSwapiViewer from './components/HooksSwapiViewer'
import './App.css'

function App() {
  return (
    <div class="flex-container">
      <ClassSwapiViewer/>
      <HooksSwapiViewer/>
    </div>
  );
}

export default App;
