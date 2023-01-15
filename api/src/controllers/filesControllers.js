var fs = require('fs').promises;

const formatData = async (req, res) => {

  const parsingJSON = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }


  try {
    const dirname = '../api/src/files/';
    const readDirectory = async () => {
      let result = await fs.readdir(dirname, (err, files) => files);
      return result
    }

    const files = await readDirectory()
  

    const formattedFiles = await Promise.all(files.map(async (filename) => {
      const fileContent = await fs.readFile(dirname + filename, 'utf-8');

      // Don't format files with errors
      if (parsingJSON(fileContent)) return;

      const formatCSV = fileContent.split('\n').map(c => c.split(',')).slice(1)

      const removeEmptyLines = formatCSV.map(f => f.filter(filt => filt !== ''))
      const parsedData = removeEmptyLines.map(line => ({
        "text": line[1],
        "number": line[2],
        "hex": line[3]
      }))

      return {
        "file": filename,
        "lines": parsedData
      }
    }))

    // Remove files with errors (null)
    res.status(200).json(formattedFiles.filter(file => file))
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = { formatData }