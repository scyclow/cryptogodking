const fetch = require('node-fetch')

const tokens = 180
const start = 44000143
const end = start + 37//tokens

let promises = []
for (let i = start; i < end; i++) {
  promises.push(
    fetch(`https://api.artblocks.io/token/${i}`)
      .then(r => r.json())
      .then(r => r['token hash'])
  )
}

Promise.all(promises)
  .then(r => console.log(JSON.stringify(r)))
  .catch(console.error)
