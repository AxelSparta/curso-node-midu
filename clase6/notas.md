# Diferencias entre HTTP y Web Sockets

**HTTP**
Usa TCP como protocolo de transporte
- Stateless: cacheable siempre una url devuelve lo mismo
- Casos de uso: recursos (html, js, img), REST API
- No es event driven

El usuario hace una petición y el server envia la response

**WEB SOCKETS**
Usa TCP como protocolo de transporte
- Stateful: no cacheable
- Casos de uso: real time, info ida y venida, poca latencia, bidireccional
- Es event driven

Al inicio el usuario siempre hace la primera petición indicando que se usará web sockets, luego quedará una conexión persistente donde tanto el server como el usuario se pueden enviar información y al final la conexión se puede cerrar por el usuario o por el servidor

Dependencias npm de web sockets: ws, socket.io