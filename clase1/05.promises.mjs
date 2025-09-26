import fs from 'node:fs/promises'
import { readFile } from 'node:fs'
// utilidad que viene incorporada de forma nativa en el módulo util, nos deja convertir métodos que funcionan con callbacks a promesas...
// Siempre es aconsejable utilizar métodos nativos de promesas, sólo usar cuando no tenga la versión en promesa...
import { promisify } from 'node:util'

// podemos utilizar readFilePromise con promesas en lugar de callbacks
const readFilePromise = promisify(readFile)

readFilePromise('./archivo.txt', 'utf-8') // utilizando promisify para convertir readFile a promesa...
  .then(data => console.log(data))

console.log('ejecutando más código') // mientras se resuelve la promesa de arriba se sigue ejecutando código...

fs.readFile('./archivo2.txt', 'utf-8') // método readFile nativo con soporte a promesas de forma nativa
  .then(data => console.log(data))

console.log('ejecutando más código 2')