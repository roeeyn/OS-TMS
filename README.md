1. Agregar tablas
```
npx sequelize-cli init

npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string,role:integer

npx sequelize-cli model:generate --name Comment --attributes comment:string

npx sequelize-cli model:generate --name Task --attributes status:integer,description:string
```

2. Agregar relaciones en codigo

3. Hacer CRUD de Usuarios

