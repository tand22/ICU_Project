import React, { useEffect, useMemo } from 'react';
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


function BasicDropzone(props: { setRows: any; setRecordID: any; setSelectedAge: any; setSelectedGender: any; setSelectedWeight: any; setSelectedHeight: any; setSelectedICUType: any; }) {
  const [setRows, setRecordID, setSelectedAge, setSelectedGender, setSelectedWeight, setSelectedHeight, setSelectedICUType] = [props.setRows, props.setRecordID, props.setSelectedAge, props.setSelectedGender, props.setSelectedWeight, props.setSelectedHeight, props.setSelectedICUType]

  const handleOnDrop = (files: Blob[], fileRejections: any) => {
    console.log("handleOnDrop called")
    console.log(files)
    console.log(fileRejections)
    const reader = new FileReader()
    reader.onload = () => {
      if (!!reader.result) {
        const resultText = reader.result as string
        let patientTimeData = resultText.split('\n').map(x => x.split(','))
        patientTimeData.pop() // Remove empty line at end
        patientTimeData.shift() // Remove header line

        // Add static data
        for (let i = patientTimeData.length - 1; i>=0; i--) {
          if (patientTimeData[i][1] === 'RecordID') {
            setRecordID(patientTimeData[i][2]);
            patientTimeData.splice(i, 1);
          };
          if (patientTimeData[i][1] === 'Age') {
            setSelectedAge(patientTimeData[i][2]);
            patientTimeData.splice(i, 1);
          };
          if (patientTimeData[i][1] === 'Gender') {
            setSelectedGender(patientTimeData[i][2]);
            patientTimeData.splice(i, 1);
          };
          if (patientTimeData[i][1] === 'Height') {
            setSelectedHeight(patientTimeData[i][2]);
            patientTimeData.splice(i, 1);
          };
          if (patientTimeData[i][1] === 'ICUType') {
            setSelectedICUType(patientTimeData[i][2]);
            patientTimeData.splice(i, 1);
          };
          if (patientTimeData[i][1] === 'Weight') {
            setSelectedWeight(patientTimeData[i][2]);
            patientTimeData.splice(i, 1);
          };
        };

        // Add time-series data
        const newData: { id: number; time: string; parameter: string; value: string; }[] = []
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

  const style: any = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  useEffect(() => {
    loadDefaultLocalFile();
  }, []);

  async function loadDefaultLocalFile() {
    try {
      const response = await fetch('src/assets/142673.txt');
      const blob = await response.blob();
      handleOnDrop([blob], '');
    } catch (error) {
      console.error('Error loading file:', error);
    }
  }

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
