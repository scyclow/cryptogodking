const fetch = require('node-fetch')

const tokens = 143
const start = 44000000
const end = start + tokens

let promises = []
for (let i = start; i < end; i++) {
  promises.push(
    fetch(`https://api.artblocks.io/token/${i}`)
      .then(r => r.json())
      .then(r => r['token hash'])
  )
}

Promise.all(promises).then(r => console.log(JSON.stringify(r)))
