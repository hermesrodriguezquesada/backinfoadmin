# API REST NODEJS + EXPRESS.

API para brindar los servicios de acceso al sistema de información al aspirante

### Pre-requisitos

_Nota: Se debe tener instalado NodeJS y NPM…_

-   Instalar NodeJs en Linux

```
sudo su
wget -qO - http://nexus.prod.uci.cu/keys/nodejs/nodesource.gpg.key | apt-key add -

sudo tee -a /etc/apt/sources.list <<-'EOF'
# Node10.x
deb http://repos.prod.uci.cu/nodesource/deb_10.x/ bionic main
EOF

sudo apt update
sudo apt install nodejs
```

-   Crear archivo `.npmrc` en la carpeta del usuario con el siguiente contenido:

```
registry = http://nexus.prod.uci.cu/repository/npm-all
no-proxy = nexus.prod.uci.cu
strict-ssl = false
```

-   Instalar express para todos los usuarios del sistema

```
sudo npm install -g express
```

-   Clonar el código fuente desde el GIT

```
git clone https://gitlab.prod.uci.cu/fortes/sigies-info-back.git
```

-   Crear BD en el postgres y ajustar las configuraciones de conexión a la BD del objeto `development` en el fichero `src/database/config/config.json`

### Siga los siguientes pasos para encender el servidor del API

_Nota: Acceder a la carpeta raiz del proyecto y ejecutar los siguientes comandos_

1. `nmp install` para instalar todas las dependencias del proyecto

2. `npx sequelize db:migrate` para correr las migraciones de la BD

3. `npm run dev` para encender el servidor

### Comandos útiles de sequelize

-   `npx sequelize db:migrate` para ejecutar las migraciones
-   `npx sequelize db:migrate:undo` para revertir una migración
-   `npx sequelize db:migrate:undo:all` para revertir todas las migraciones
-   `npx sequelize db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js` Revertir a una migración específica
-   `sequelize migration:create --name xxxxx` Para crear una migración no asociada a modelos
-   Para generar un nuevo model se usa el comando `model:generate` que necesita dos opciones:

1. name: El nombre del modelo;
2. attributes: una lista de los atributos de la tabla.

_Ejemplo de uso:_

`npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string`

_Nota: Lo anterior genera el modelo user en la carpeta de modelos definida en la configuración de sequelize y además genera un fichero con la migración corresponiente con un nombre similar a `XXXXXXXXXXXXXX-create-user.js` en la carpeta migrations_

### CREAR CARPETAS PARA SUBIDA DE FICHEROS

-   public/plans
-   public/images
