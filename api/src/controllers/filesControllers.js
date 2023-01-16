const axios = require('axios');

const getFormattedFiles = async (req, res) => {
  const allFiles = await axios('https://echo-serv.tbxnet.com/v1/secret/files', {
    headers: {
      Authorization: 'Bearer aSuperSecretKey'
    }
  })
  
  const { data } = allFiles
  const quitar = data.files.filter(f => f !== 'test4.csv' && f !== 'test5.csv')


  const parseData = async () => {
    try {
      const result = await Promise.all(quitar.map(async(filename) => {
     
        const oneFileData = await axios(`https://echo-serv.tbxnet.com/v1/secret/file/${filename}`, {
          headers: {
            Authorization: 'Bearer aSuperSecretKey'
          }
        })
        const fileContent = oneFileData.data
        const formatCSV = fileContent?.split('\n').map(c => c.split(',')).slice(1)
        const removeLinesWErrors = formatCSV.map(f => f.filter(filt => filt !== '')).filter(fil => fil.length === 4)

        const parsedData = removeLinesWErrors.map(line => ({
          "text": line[1],
          "number": line[2],
          "hex": line[3]
        }))
     
        return {
          "file": filename,
          "lines": parsedData
        }
      }))
      return result
    } catch (error) {
      console.log('err')
    }
  }
  const formattedData = await parseData()
  res.status(200).json(formattedData)
}

// const formatData = async (req, res) => {



//   try {
//     const dirname = '../api/src/files/';
//     const readDirectory = async () => {
//       let result = await fs.readdir(dirname, (err, files) => files);
//       return result
//     }

//     const files = await readDirectory()
  

//     const formattedFiles = await Promise.all(files.map(async (filename) => {
//       const fileContent = await fs.readFile(dirname + filename, 'utf-8');

//       // Don't format files with errors
//       if (parsingJSON(fileContent)) return;

//       const formatCSV = fileContent.split('\n').map(c => c.split(',')).slice(1)

//       const removeEmptyLines = formatCSV.map(f => f.filter(filt => filt !== ''))
//       const parsedData = removeEmptyLines.map(line => ({
//         "text": line[1],
//         "number": line[2],
//         "hex": line[3]
//       }))

//       return {
//         "file": filename,
//         "lines": parsedData
//       }
//     }))

//     // Remove files with errors (null)
//     res.status(200).json(formattedFiles.filter(file => file))
//   } catch (error) {
//     res.status(500).send(error)
//   }
// }

module.exports = { getFormattedFiles }