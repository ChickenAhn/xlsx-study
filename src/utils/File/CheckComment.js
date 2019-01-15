import XLSX from 'xlsx'

async function readFileAsync(file) {
  const rABS = true

  return new Promise((resolve, reject) => {
    let reader = new FileReader()

    reader.onload = function(e) {
      let data = e.target.result
      if (!rABS) data = new Uint8Array(data)

      const workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' })
      resolve(workbook)
    }

    reader.onerror = reject

    if (rABS) reader.readAsBinaryString(file)
    else reader.readAsArrayBuffer(file)
  })
}

async function checkComment(file) {
  try {
    let result = []

    const workbook = await readFileAsync(file)
    console.log(workbook)

    Object.keys(workbook.Sheets).map(sheetName => {
      const comment = getComment(workbook.Sheets[sheetName])
      comment.length > 0 && result.push({ [sheetName]: comment })
    })

    return result.length > 0 && result
  } catch (err) {
    console.log(err)
  }
}

function getComment(sheet) {
  let result = []

  Object.keys(sheet).map(cellIndex => {
    if (typeof sheet[cellIndex].c !== 'undefined') {
      result.push({
        [cellIndex]: sheet[cellIndex].c
      })
    }
  })
  return result
}

export default checkComment
