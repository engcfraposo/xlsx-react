import React, { useEffect, useState } from 'react'
import Dropzone from '../Dropzone'
import { useDispatch, useSelector } from 'react-redux'
import readXlsxFile from 'read-excel-file'
import { getExcel } from '../../store/ducks/excel/actions'

// import { Container } from './styles';

function Workbook() {
  const dispatch = useDispatch()

  const { users } = useSelector(state => state.excel)
  const [selectedFile, setSelectedFile] = useState(null);
  const [tableRaw, setTableRaw] = useState({
    headers: null,
    body: null
  })

  useEffect(()=>{
    if(!!users.body){
      console.log(users.body[0]["Nome Completo"])
    }
  },[users])

useEffect(()=>{
  dispatch(getExcel(tableRaw))
},[tableRaw, dispatch])



  const handleSubmit = async e => {
    e.preventDefault()

    const file = selectedFile

    if(!file) return

    const rows = await readXlsxFile(file)

    const headers = rows[0]

    let array = []

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      let obj = {}

      for (let j = 0; j < headers.length; j++) {
        obj = { 
          ...obj, 
          [headers[j]]: row[j] 
        }
      }

      array.push(obj)
      
    }
    
    setTableRaw({
      ...tableRaw,
      headers,
      body: array
    })
  }

  const renderHeader = () => {
    const headers = users.headers || []

    return (
      <tr>
        {headers.map((header, i) => <th key={i}>{header}</th>)}
      </tr>
    )
  }

  const renderBody = () => {
    const data = users.body || []

    return data.map((obj, i) => {
      return (
        <tr key={i}>
          {
            Object.keys(obj).map((column, j) => {
              return (
                <td key={j}>{obj[column]}</td>
              )
            })
          }
        </tr>
      )
    })
    }
    return (
      <div className={`text-center d-flex flex-column align-items-center justify-content-center text-white fade-in`}
      style={{ height: "100vh", backgroundColor: "#0644A0" }}>
        <h1 className={`display-1`}>Sorteador Pipoco do Trovão</h1>
        <br/>
        <p>Selecione um arquivo excel que segue o formato:</p>
        <ul>
          <li><b>1º linha: </b> Cabeçalho</li>
          <li><b>2º linha: </b> Corpo da tabela</li>
        </ul>
        <form onSubmit={handleSubmit} className="container-fluid">
        <Dropzone onFileUploaded={setSelectedFile}/>
          <br/>
          <button style={{backgroundColor: "orange", borderColor: "white"}} type="submit" className={"btn btn-secondary"}>Preparar Sorteio</button>
        </form>
      </div>
    );
}

export default Workbook
