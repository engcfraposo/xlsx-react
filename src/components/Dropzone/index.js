import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import { RiFileExcel2Line } from 'react-icons/ri';
import './styles.css';


const Dropzone = ({ onFileUploaded }) => {
  const [selectedFile, setSelectedFile] = useState('');

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const fileName = file.name;

      setSelectedFile(fileName);
      onFileUploaded(file);
    },
    [onFileUploaded],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  return (
    <div className="dropzone" {...getRootProps()}>

    <input {...getInputProps()} accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' />

   {
     selectedFile
     ? (
        <p>
        <RiFileExcel2Line />
            {selectedFile}
        </p>
     ) 
     : (
        <p>
        <FiUpload color={"#fff"}/>
            Insira o excel com os dados incluso a coluna - Nome Completo
        </p>
     )
   }

  </div>
  );
};

export default Dropzone;