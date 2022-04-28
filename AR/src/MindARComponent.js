import React from 'react';
import 'mind-ar';
import './App.css';
import MindARViewer from './mindar-viewer';


function MindARComponent(props) {
 
  return (
    <div >
      <MindARViewer {...props}/>
    </div>
  );
}

export default MindARComponent;
