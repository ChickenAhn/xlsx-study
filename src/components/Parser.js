import React, { useState } from 'react'
import XLSX from 'xlsx'

import { GetFileExtension } from '../utils/File'

import FileInput from './FileInput'
import Result from './Result'
import { Typography, withStyles } from '@material-ui/core'

const styles = theme => ({
  caption: {
    marginTop: theme.spacing.unit
  }
})

function Parser(props) {
  const { classes } = props

  const [file, setFile] = useState()
  const [template, setTemplate] = useState(false)
  const [data, setData] = useState()

  const handleChange = event => {
    const file = event.target.files[0]
    const ext = GetFileExtension(file.name)
    setTemplate(false)
    if (ext === 'xlsx' || ext === 'xls') {
      setFile(file)
    }
  }

  const rABS = false // true: readAsBinaryString ; false: readAsArrayBuffer
  const handleParse = () => {
    setTemplate(false)
    const reader = new FileReader()
    reader.onload = e => {
      let data = e.target.result
      if (rABS) data = new Uint8Array(data)
      const wb = XLSX.read(data, { type: rABS ? 'binary' : 'array' })

      // Do something here
      const firstSheet = wb.Sheets[wb.SheetNames[0]]
      const json = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })

      // const result = findHeaderIndex(json)
      // const hierarchyData = treeify(result)
      // setData(hierarchyData)
      const result = detectTemplate(json)
      if (result) {
        setTemplate(result.template)
      }
      const r = findHeaderIndex(json)
      console.log(r)
      console.log(treeify(r))
    }
    if (rABS) reader.readAsBinaryString(file)
    else reader.readAsArrayBuffer(file)
  }

  return (
    <>
      <FileInput
        file={file}
        handleChange={handleChange}
        handleParse={handleParse}
      />
      <div className={classes.caption}>
        {template && (
          <Typography
            variant="caption"
            color="textSecondary"
          >{`Template is detected. ${template}`}</Typography>
        )}
      </div>

      <Result data={data} />
    </>
  )
}

export default withStyles(styles)(Parser)

function treeify(list, idAttr, parentAttr, childrenAttr) {
  if (!idAttr) idAttr = 'id'
  if (!parentAttr) parentAttr = 'parent'
  if (!childrenAttr) childrenAttr = 'children'

  let treeList = []
  let lookup = {}
  list.forEach(obj => {
    lookup[obj[idAttr]] = obj
    obj[childrenAttr] = []
  })
  list.forEach(obj => {
    if (obj[parentAttr] !== null) {
      lookup[obj[parentAttr]][childrenAttr].push(obj)
    } else {
      treeList.push(obj)
    }
  })
  return treeList
}

function findDebitCell(data) {
  const targetArr = ['차변']
  let debitCell
  data.forEach((row, r) => {
    row.forEach((col, c) => {
      const str = removeSpace(col)
      if (targetArr.indexOf(str) === 0) {
        debitCell = { r, c }
        return false
      }
    })
  })
  return debitCell
}
function detectTemplate(data) {
  const target = '대변'
  const cell = findDebitCell(data)
  try {
    if (removeSpace(data[cell.r][cell.c + 3]) === target) {
      const header = data[cell.r].slice(cell.c, cell.c + 3 + 2)
      const subHeader = data[cell.r + 1].slice(cell.c, cell.c + 3 + 2)
      return { template: '월합계잔액시산표(더존)', header, subHeader }
    }
  } catch (err) {
    console.log(err)
  }
  return false
}

function findHeaderIndex(data) {
  const result = []
  let id = 1
  let prevLevel = 1
  let parent = 1
  let headerCol

  data.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const str = removeSpace(col)
      const level = getLevel(str)

      // level 1 should be first
      if (!headerCol && level === 1) {
        headerCol = colIndex
      }

      if (headerCol && headerCol === colIndex && level) {
        const obj = {
          id,
          level,
          type: `${prefix}${level}`,
          name: str,
          parent: level === 1 ? null : parent,
          balance: getBalance(data, rowIndex, colIndex, 0)
        }
        result.push(obj)

        if (prevLevel !== level) {
          // after level change
          prevLevel = level
          if (level < 4) {
            parent = id
          }
        }

        id++
      }
    })
  })
  return result
}

function removeSpace(str) {
  return str.toString().replace(/\s/g, '')
}
function removeSeparator(str) {
  return str.replace(/<|>|\[|\]/g, '')
}

const prefix = 'fs'

function getBalance(data, r, c, offset = 0) {
  let left = 0,
    right = 0
  if (offset > 0) {
    right = offset
  } else {
    left = offset
  }
  const debit = {
    balance: data[r][c - 2 + left],
    total: data[r][c - 1 + left]
  }
  const credit = {
    balance: data[r][c + 2 + right],
    total: data[r][c + 1 + right]
  }
  return { debit, credit }
}

function getLevel(str) {
  const reg1 = /^(<<).+(>>)$/
  const reg2 = /^(\[).+(\])$/
  const reg3 = /^(<).+(>)$/

  if (str === '합계' || null) return false

  if (reg1.test(str)) return 1
  else if (reg2.test(str)) return 2
  else if (reg3.test(str)) return 3
  else return 4
}
