import path from 'node:path'
// path nos resuelve 
// unir rutas con path.join
// 

console.log(path.sep) // nos indica cual es la separación de las direcciones...

const filePath = path.join('content', 'img.png')
// nos sirve para unir rutas independientemente del os...

console.log(filePath)

console.log(path.extname(filePath))
console.log(path.basename(filePath)) // nos devuelve el nombre del archivo
console.log(path.basename(filePath, path.extname(filePath))) // removemos la extensión
console.log(path.dirname(filePath)) // nos devuelve el directorio en el que se encuentra el archivo...