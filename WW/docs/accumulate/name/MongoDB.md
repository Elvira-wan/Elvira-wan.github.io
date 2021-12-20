## MongoDB

启动 MongoDB：

- 配置环境变量：

  在此电脑 -> 属性 -> 高级系统设置 -> 环境变量 -> 用户变量 -> path 中，添加 MongoDB 的 bin 目录路径；

- 输入 mongod 启动 mongoDB服务器 (用来保存数据)，不关闭窗口

  如果想指定数据库存储在其他位置：`mongod --dbpath D:\软件\mongoDB\data\db --port 12345`，但端口号最大不超过65535

- 重新打开一个 cmd 窗口，输入 mongo 启动客户端 (用来操作数据)，连接mongoBD



自动启动MongoDB：

1. 在想要存放数据的位置创建 `data` 文件夹；

2. 在 `data`下创建 `db` 和 `log` 文件夹；

3. 创建配置文件，在 `MongoDB` 的 存放`bin`目录的文件夹下添加一个配置文件 `mongod.cfg`；

4. 以管理员的身份打开命令行窗口；

5. 执行如下的命令：

   ````cmd
   sc.exe create MongoDB binPath= "\"D:\MongoDB\bin\mongod.exe\" --service --config=\"D:\MongoDB\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"
   ````

   **注意：**如果使用该命令之后创建服务报错 1053，则使用 `sc delete MongoDB` 删除之前配置的服务，然后使用以下命令启开：

   ````cmd
   mongod --dbpath=D:\MongoDB\data\db  --logpath=D:\MongoDB\data\logs\MongoDB.log --install --serviceName "MongoDB"
   ````

6. 在任务管理器中启动 `mongodb` 服务

   如果在启动服务时报错，错误2：系统找不到指定的文件错误，可能是因为服务当前运行的文件夹有误，则：

   ````txt
   // 1.cmd跳转到bin文件夹目录下 卸载mongoDB
   mongod.exe --remove --serviceName "MongoDB"
   // 2.重新安装mongoDB
   mongod.exe --install --logpath="D:\MongoDB\data\logs\MongoDB.log" --dbpath="D:\MongoDB\data\db" 
   ````

   重新启动服务，就OK了；

   **提示**：MongoBD最好不要保存在包含中文名的文件夹下；

   

数据库基本概念：

- 数据库 (database)
- 集合 (collection)
- 文档 (document)

在 MongoDB 中，数据库和集合都不需要手动创建，当我们创建文档时，如果文档所在集合或数据库不存在，会自动创建数据库和集合；



操作数据库基本指令：

- 显示当前所有数据库：`show dbs` or `show databases`；
- 进入到指定的数据库中：`use 数据库名`；
- 显示当前在哪个数据库：`db`；
- 显示数据库中所有的集合：`show collections`；



数据库的增删改查 (CRUD) 操作：

- 向数据库中插入文档：`db.<collection>.insert(doc)`

  `insert()` 又可分解为两个方法：插入单个 `insertOne()` 和 插入多个 `insertMany([])`；

  当向数据库中插入文档时，若没有给文档指定 `_id` 属性，则数据库会自动为文档添加 `_id`，该属性作为文档的唯一标识 (根据时间戳来生成的)，可以调用 `ObjectID()` 来手动生成；

  若需要插入多条数据：

  ````js
  // 方法一：调用多次插入方法(效率低)
  for (let i = 1; i < 20000; i++) {
      db.nums.insert({num: i});
  }
  // 方法二：将数据添加进数组中，只调用一次插入方法(效率高)
  const arr = [];
  for (let i = 1; i < 20000; i++) {
      arr.push({num: i});
  }
  db.nums.insert(arr)
  ````

  

- 查询当前集合中的所有符合条件文档：`db.<collection>.find()`

  第一个参数：可以接收一个对象作为条件参数，返回的是一个数组，包含所有符合条件的值；

  第二个参数：也是接受一个对象，表示显示符合条件的结果的哪些数据；

  `findOne()`：返回的是一个符合条件的文档；

  `find().count()`：返回的是数组的长度，表示符合条件文档的数量； 

  如果一个文档中，包含了另一个文档，就称被包含的文档为内嵌文档，MongoDB支持**使用 `.` 的形式来访问内嵌文档**，但若想要 打点属性名 来访问**内嵌文档则属性名必须使用引号包裹**；

  查询结果可以使用 `sort()` 排序，`sort()` 接收一个对象参数，例如：`{sal: 1}`表示按 `sal` 排序且升序排列；若对象中写了多个属性 `{sal: 1, emp: -1}`，表示按 `sal` 升序排列之后，若有 `sal` 相同的文档，则按 `emp` 降序将几个文档排序；

  

- 修改：`db.<collection>.update(查询条件，新对象)`

  默认情况下，新对象会直接替换旧对象，若需要修改对象的指定属性，则需要使用修改操作符来完成；

  ````mssql
  db.<collection>.update(
      {name: 'HH'},
      // 表示修改或添加 name: 'HH' 的文档的 age: '16', 其余不变
      {$set: {
      	age: 16
      }}
  )
  db.<collection>.update(
      {name: 'HH'},
      // 表示删除 name: 'HH' 的文档的 age: '16'属性
      {$unset: {
      	age: 16
      }}
  )
  // $push 用于向数组中添加一个元素
  // $addToSet 用于向数组中添加元素，但若数组中已经存在该元素，则不会添加
  ````

  **注意**：`update()` 默认只修改匹配到的第一个，与 `updateOne()` 效果一样，但若给 `update()` 书写第三个参数 `{multi: true}` 则可以修改多个，与 `updateMany()` 效果一样；

  

- 删除文档：`db.<collection>.remove(查询条件)`

  默认情况下会删除多个，与 `db.<collection>.deleteMany(查询条件)` 效果相同，若传递第二个参数 `true`，则只删除一个符合条件的文档，效果与 `db.<collection>.deleteOne(查询条件)` 相同；

  `remove()` 必须传参，若参数为一个空对象，则将当前集合中的所有文档删除，但是若需要情况集合的话 `db.<collection>.drop()` 是更好的选择，该方法同时也会删除集合，若该集合是数据库中最后一个集合，则集合一删数据库也会不见；

  `db.dropDatabase()`，删除数据库；

  但是一般数据库中的数据不会删除，因此删除方法很少调用，一般会在数据中添加字段，表示数据是否被删除，而并不是真的删除；

  

