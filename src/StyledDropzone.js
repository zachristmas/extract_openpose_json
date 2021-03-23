import React, { useMemo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';


const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const downloadCSVFromJson = (filename, arrayOfJson) => {
  // convert JSON to CSV
  const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
  const header = Object.keys(arrayOfJson[0])
  let csv = arrayOfJson.map(row => header.map(fieldName =>
    JSON.stringify(row[fieldName], replacer)).join(','))
  csv.unshift(header.join(','))
  csv = csv.join('\r\n')

  // Create link and download
  var link = document.createElement('a');
  link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const StyledDropzone = (props) => {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result
        //console.log(binaryStr)
        console.log(props.label)
        console.log(props.keypoint)
        console.log(props.mapName)
        const keypointSelector = props.keypoint * 3;
        const keypointX = keypointSelector;
        const keypointY = keypointSelector + 1;
        const keypointC = keypointSelector + 2;

        const keypointMap = JSON.parse(binaryStr).map(x => {
          return {
            frame: x.image_id,
            // person_id: x.category_id,
            // score: x.score,
            // keypoints: {
              [props.mapName + '_x']: x.keypoints[keypointX],
              [props.mapName + '_y']: x.keypoints[keypointY],
              [props.mapName + '_c']: x.keypoints[keypointC],
            // }
          }
        })
        console.log(keypointMap);
        // const toCSV = keypointMap.map(x => {
        //   return { 
        //       frame: x.frame, 
        //       right_wrist_x: x.keypoints.right_wrist_x, 
        //       right_wrist_y: x.keypoints.right_wrist_y, 
        //       right_wrist_c: x.keypoints.right_wrist_c }
        // })
        downloadCSVFromJson(props.label,keypointMap)
      }
      reader.readAsBinaryString(file)
    })
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);



  return (
    <div className="container" {...getRootProps({ style })}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
}

export default StyledDropzone;