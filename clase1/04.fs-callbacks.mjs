// Es quizás el módulo más importante de node
import fs from 'node:fs'

// statSync devuelve info del fichero
const stats = fs.statSync('./archivo.txt')
// console.log(stats)

// para que nos devuelva la info correctamente y no el buffer utilizamos la codificación de caracteres correspondiente
// Éste método es síncrono y bloqueante
const text = fs.readFileSync('./archivo.txt', { encoding: 'utf-8' })
console.log(text)

// Para utilizar código asíncrono podemos utilizar las funciones callbacks, estas se ejecutarán cuando el código asíncrono haya terminado
fs.readFile('./archivo2.txt', {
  encoding: 'utf-8'
},(err, data) => {
  console.log(data)
})
console.log('ejecutando más código') // mientras se resuelve el código asíncrono de arriba se sigue ejecutando el código
