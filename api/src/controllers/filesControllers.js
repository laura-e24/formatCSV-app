const axios = require('axios');

const getAllFiles = async () => {
  try {
    const allFiles = await axios('https://echo-serv.tbxnet.com/v1/secret/files', {
      headers: {
        Authorization: 'Bearer aSuperSecretKey'
      }
    })
  
    const { data } = allFiles
    return data
  } catch (error) {
    res.status(error.response.data.status).json({ error: error.response.data })
  }
}

const getOneFileInfo = async (req, res) => { 
  try {
    const fileInfo = await axios(`https://echo-serv.tbxnet.com/v1/secret/file/${req.params?.file || req}`, {
      headers: {
        Authorization: 'Bearer aSuperSecretKey'
      }
    })
    const { data } = fileInfo
    return data
  } catch (error) {
    // console.log('ERROR: ', error.response.data)
  }
}

const getFormattedFiles = async (req, res) => {
  try {
    const allFiles = await getAllFiles()
    const allFilesInfo = allFiles.files.map(async f => {
      const result = await getOneFileInfo(f)
      return { file: f, lines: result }
    })

    const parseData = async () => {
      const filesWInfo = await Promise.all(allFilesInfo)

      return filesWInfo.filter(f => f.lines !== undefined).map(file => {
      const fileContent = file.lines
      const formatCSV = fileContent?.split('\n').map(c => c.split(',')).slice(1)

      const removeLinesWErrors = formatCSV.map(f => f.filter(filt => filt !== '')).filter(fil => fil.length === 4)
      const parsedData = removeLinesWErrors.map(line => ({
        "text": line[1],
        "number": line[2],
        "hex": line[3]
      }))

      return {
        "file": file.file,
        "lines": parsedData
      }
      })
    }
    const formattedData = await parseData()
    res.status(200).json(formattedData)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

module.exports = { getFormattedFiles, getOneFileInfo }