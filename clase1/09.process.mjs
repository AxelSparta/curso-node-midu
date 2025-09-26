// process es un objeto el cual nos da información y control sobre el proceso actual de ejecución

// argumentos de entrada cuando ejecutamos un comando en el cli
console.log(process.argv)
// primer elemento sería node
// segundo elemento sería el archivo
// luego tenemos los argumentos adicionales

// podemos controlar la salida del proceso
// process.exit(1) // 0: código de salida ok, 1: código de salida de error

console.log(process.cwd()) // current working directory... nos dice en que directorio desde donde estamos ejecutando el proceso...

console.log(process.env) // obtenemos las variables de entorno


