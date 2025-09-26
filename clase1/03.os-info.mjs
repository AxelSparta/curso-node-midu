// Para importar módulos nativos siempre utilizar esta forma: node:module_name
import os, { freemem } from 'node:os'

console.log('Nombre del sistema operativo', os.platform())
console.log('Versión del sistema operativo', os.release())
console.log('Arquitectura', os.arch())
console.log('CPUs', os.cpus())
console.log('Memoria libre MB', freemem() / 1024 / 1024)
console.log('uptime', os.uptime() / 60 / 60)