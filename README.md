# EJECUTAR SERVIDORES NODE

>> Consigna:

Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.

● Agregar en la vista info, el número de procesadores presentes en el servidor.

● Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.

● Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.

● Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.

● Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.

● Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.

NOTA:

Es probable que en el caso de tener activo el child process fork (realizado en el entregable anterior) aparezcan más procesos de node activos que la cantidad esperada. Desactivar el código del fork y su endpoint '/randoms' y verificar que ahora la cantidad de procesos de node corresponda.