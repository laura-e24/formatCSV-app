import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import axios from "axios"
import { useEffect, useState } from 'react';

function App() {

  const [files, setFiles] = useState([])
  
  useEffect(() => {
    const getData = async () => {
      const response = await axios('http://localhost:3001/files/data')
      setFiles(response.data)
    }
    getData()
  }, [])

  return (
    <>
    <Navbar variant="light" style={{backgroundColor: '#ff6666'}}>
      <h3 className='font-weight-bold p-2' style={{color: 'white'}}>
        FormatCSV App
      </h3>
    </Navbar>
    <div className='mt-4 w-100 px-5 mx-auto table-responsive'>
      {!!files.length ? (
        <Table className='table-sm' striped bordered hover>
          <thead>
            <tr>
              <th className='h4 p-3'>File name</th>
              <th className='h4 p-3'>Text</th>
              <th className='h4 p-3'>Number</th>
              <th className='h4 p-3'>Hex</th>
            </tr>
          </thead>
          <tbody>
            {files.map(f => (
              f.lines.map(l => (
                <tr key={Math.random()}>
                  <td className='p-3'>
                    {f.file}
                  </td>
                  <td className='p-3'>
                    {l.text}
                  </td>
                  <td className='p-3'>
                    {l.number}
                  </td>
                  <td className='p-3'>
                    {l.hex}
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </Table>
      ) : (
        <Card className='my-auto'>
          <p className='fs-3 fw-semibold py-5 text-center my-auto'>Cargando, por favor espere...</p>           
        </Card>
      )}
    </div>
    </>
  );
}

export default App;