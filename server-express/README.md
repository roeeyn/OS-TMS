npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,role:integer
npx sequelize-cli model:generate --name Comment --attributes userId:integer,taskId:integer,commentText:string 
npx sequelize-cli model:generate --name Task --attributes status:integer,description:string
npx sequelize-cli model:generate --name UserTask --attributes userId:integer,taskId:integer 

