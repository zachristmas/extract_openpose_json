import './App.css';
import poseImage from './PoseNumbers.png'
import Select from 'react-select'
import {useState} from 'react';
import StyledDropzone from './StyledDropzone';

const options = [
  { value: 0, label: '0: head', mapName: 'head' },
  { value: 1, label: '1: chest', mapName: 'chest' },
  { value: 2, label: '2: left_shoulder', mapName: 'left_shoulder' },
  { value: 3, label: '3: left_elbow', mapName: 'left_elbow' },
  { value: 4, label: '4: left_hand', mapName: 'left_hand' },
  { value: 5, label: '5: right_shoulder', mapName: 'right_shoulder' },
  { value: 6, label: '6: right_elbow', mapName: 'right_elbow' },
  { value: 7, label: '7: right_hand', mapName: 'right_hand' },
  { value: 8, label: '8: left_hip', mapName: 'left_hip' },
  { value: 9, label: '9: left_knee', mapName: 'left_knee' },
  { value: 10, label: '10: left_foot', mapName: 'left_foot' },
  { value: 11, label: '11: right_hip', mapName: 'right_hip' },
  { value: 12, label: '12: right_knee', mapName: 'right_knee' },
  { value: 13, label: '13: right_foot', mapName: 'right_foot' },
  { value: 14, label: '14: left_eye', mapName: 'left_eye' },
  { value: 15, label: '15: right_eye', mapName: 'right_eye' },
  { value: 16, label: '16: left_ear', mapName: 'left_ear' },
  { value: 17, label: '17: right_ear', mapName: 'right_ear' },
]

function App() {
  const [selectedOption, setSelectedOption] = useState([]);
  const handleChange = (options) => {
    setSelectedOption(options);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>OpenPose JSON-2-CSV Extraction</h2>
        <h3>1) First start by running the following command in OpenPose</h3>
        <p><code>bin\OpenPoseDemo.exe --video examples/media/v8.mp4 --net_resolution 320x320 --write_coco_json output_folder_path/keypoints8.json</code></p>
        <h3>2) Then, using the diagram below, choose a keypoint that you would like to extract data for: </h3>
        <img src={poseImage} className="App-logo" alt="logo" />
      </header>
      <div className="App-body">
        <br/>
        <div className="select-container" style={{ color: 'grey' }}>
          <Select options={options} onChange={handleChange} />
          <br />
        </div>
        <p>Your selected keypoint: <strong>{selectedOption.label}</strong></p>
        <br />
        <br />
        <h3>3) Finally, drop the JSON file below to generate your csv: </h3>
        <br />
        <br />
          {selectedOption.label && <StyledDropzone key={selectedOption.label} keypoint={selectedOption.value} label={selectedOption.label} mapName={selectedOption.mapName}/>}
        <br />
        <br />
      </div>

    </div>
  );
}

export default App;
