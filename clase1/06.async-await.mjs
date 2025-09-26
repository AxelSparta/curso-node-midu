// Con ES Modules podemos utilizar await en el ámbito global...
//  Tiene el nombre de top level await
import fs from 'node:fs/promises'

const readingFile = async () => {
  // Dentro de la función se está ejecutando código asíncrono de forma secuencial por el await... Pero no es bloqueante por lo que se puede seguir ejecutando el código... La prueba de ello es el console.log() de fuera de la arrow function
  const firstText = await fs.readFile('./archivo.txt', 'utf-8')
  console.log(firstText)
  const secondText = await fs.readFile('./archivo2.txt', 'utf-8')
  console.log(secondText)
}

readingFile()
console.log('ejecutando más código')