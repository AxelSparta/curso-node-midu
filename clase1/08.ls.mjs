import fs from 'node:fs'

// leemos el directorio actual recuperando los archivos contenidos
fs.readdir('.', (err, files) => {
  if (err) { console.log(err) }
  files.map(file => console.log(file))
})