import fs from 'node:fs/promises'
import path from 'node:path'

const folder = process.argv[2] ?? '.' // pasamos el directorio de donde queremos extraer la info

fs.readdir(folder)
  .then(files => {
    files.map(async file => {
      const filePath = path.join(folder, file)
      const stats = await fs.stat(filePath)
      console.log(file, stats)
    })
  })
  .catch(err => console.error('Error: No se encontró el directorio', folder))