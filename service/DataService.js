import fs from 'fs'
import path from 'path'

function getRandomArray(array) {
  if (array) {
    return array.sort(_ => {
      return (parseInt(Math.random() * 1000) % 2) ? 1 : -1
    })
  }
  return array
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const projectRoot = path.resolve(__dirname, '../data')
console.log('projectRoot:', projectRoot)
const wfs = fs.readdirSync(projectRoot+'/json', 'utf-8')
let wordFiles = wfs.map(wf =>{
    return wf.substr(0, wf.length - 5)
}) 
console.log('wordFiles:', wordFiles)

const nickNameData = fs.readFileSync(projectRoot + '/nickname.txt', 'utf-8')
const allNameArray = nickNameData.split('\n')
let nameIndex = 0
let allNames = getRandomArray(allNameArray)

// 生成json词库
// const tempData = fs.readFileSync(projectRoot + '/template.txt', 'utf-8')
// console.log(tempData)
// const tempArray = tempData.split('\n')
// let allData = getRandomArray(tempArray)
// const jsonData = JSON.stringify(allData, 0, 4);
// fs.writeFileSync(projectRoot + '/json/xxx.json',jsonData)
// console.log(jsonData)

export default {
  getNextKey() {
    const fileName = wordFiles[getRandomInt(wordFiles.length - 1)]
    const filePath = fs.readFileSync(projectRoot + '/json/' + fileName + '.json', 'utf-8')
    const allWord = JSON.parse(filePath)
    let allKeysMap = new Map()
    allKeysMap.set(fileName, allWord)
    let keyArrays = allKeysMap.get(fileName)
    // console.log('keyArrays:', keyArrays)
    let nextKey = [keyArrays[getRandomInt(keyArrays.length - 1)], fileName]
    console.log('nextKey:', nextKey)

    return nextKey
  },
  getNextName() {
    let keyWord = allNames[nameIndex++]
    if (!keyWord) {
      allNames = getRandomArray(allNames)
      nameIndex = 0
      keyWord = allNames[nameIndex++]
    }
    return keyWord
  }
}
