import React, { useMemo } from 'react';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#323232',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    fontSize: '45%',
  };
  
  const focusedStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };


function BasicDropzone(props) {
  const [rows, setRows, setRecordID, setSelectedAge, setSelectedGender, setSelectedWeight, setSelectedHeight, setSelectedICUType] = [props.rows, props.setRows, props.setRecordID, props.setSelectedAge, props.setSelectedGender, props.setSelectedWeight, props.setSelectedHeight, props.setSelectedICUType]

  const handleOnDrop = (files, fileRejections) => {
    console.log("handleOnDrop called")
    console.log(files)
    console.log(fileRejections)
    const reader = new FileReader()
    reader.onload = () => {
      if (!!reader.result) {
        //console.log('reader.result', reader.result)
        const resultText = reader.result as string
        let patientTimeData = resultText.split('\n').map(x => x.split(','))
        const patientStaticData = patientTimeData.splice(0, 7)
        patientTimeData.pop() // Remove empty line at end
        console.log(patientStaticData)
        console.log(patientTimeData)

        // Add static data
        setRecordID(patientStaticData[1][2])
        setSelectedAge(patientStaticData[2][2])
        setSelectedGender(patientStaticData[3][2])
        setSelectedHeight(patientStaticData[4][2])
        setSelectedICUType(patientStaticData[5][2])
        setSelectedWeight(patientStaticData[6][2])

        // Add time-series data
        const newData = []
        patientTimeData.forEach((row, i) => {
          newData.push({
            id: i + 1,
            time: row[0],
            parameter: row[1],
            value: row[2] 
          })})
        
        //console.log(newData)
        setRows(newData)
      }
    }
    reader.readAsText(files[0])
  }

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: {
      'text/plain': ['.txt'],
    },
    onDrop: handleOnDrop,
    multiple: false,
    maxFiles: 1,
  });
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <section className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  );
}

export default BasicDropzone;
