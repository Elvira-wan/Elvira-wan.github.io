### 数据库基本概念

------

- 数据库简称**DB**

- 用于储存和管理数据的仓库
- 数据库**特点**
  1. 持久化储存数据
  2. 方便的管理数据
  3. 使用了统一的方式来操作数据库





### MySQL

------

- MySQL服务启动
  1. cmd-->services.msc,然后手动
  2. cmd-->net stop mysql/net start mysql
- MySQL服务登录
  1. mysql  -uroot  -p密码（1234）
  2. mysql  -hip  -uroot  -p连接目标的密码
  3. mysql  --host=ip  --user=root  --password=连接目标的密码
- MySQL退出
  1. exit
  2. quit
- MySQL目录结构
  - 安装目录
    - 配置文件：my.ini
  - 数据目录
    - 数据库：文件夹
    - 表：文件
    - 数据





### SQL

------

- 什么是SQL

  - 定义了操作所有关系型数据库的规则 

- SQL通用语法

  - 以单行或多行书写，以分号结尾
  - 使用tab或者空格提高可读性
  - 不区分大小写，但建议用大写
  - 3种注释
    - 单行注释：-- 注释内容 或者 #注释内容
    - 多行注释：/* 注释 */

- SQL的分类

  - DDL：操作数据库和表

    1. 操作数据库：CRUD

       - C(Create)：创建
         - create database 数据库名称；
         - create  database if not exists 数据库名称（条件语句判断此数据库是否存在，不存在就创建一个新库）
         - 创建数据库指定字符集create database 数据库名称  character  set  gbk/utf8
       - R(Retrieve)：查询
         - 查询所有数据库的名称：show databases；
         - 查看某个数据库的字符集：show create database 数据库名称；
       - U(Update)：修改
         - 修改数据库字符集：alter database 数据库名称 character set 字符集名称；
       - D(Delete)：删除
         - 删除数据库：drop database 数据库名称；
         - 也可加判断

    2. 使用数据库

       - 查询当前正在使用的数据库的名称
         - select database();

    3. 操作表

       - C(Create)：创建

         - create table 表名(

           ​	列名1 数据类型1，

           ​	列名2 数据类型2，

           ​	....

           ​	列名n，数据类型n

           )；

         - create  database if not exists 数据库名称（条件语句判断此数据库是否存在，不存在就创建一个新库）

         - 创建数据库指定字符集create database 数据库名称  character  set  gbk/utf8

       - R(Retrieve)：查询

         - 查询某数据库中所有的表名称：show tables；
         - 查询表结构：desc 表名；

       - U(Update)：修改

         - 修改表名：alter table 表名 rename to 新表名；
         - 修改表的字符集：alter table 表名 character set 字符集名称；
         - 添加一列：alter table 表名 add 列名 数据类型；
         - 修改列名称 类型：
           1. alter table 表名 change 列名 新列名 新数据类型；
           2. alter table 表名 modify 列名 新数据类型；
         - 删除列：alter table 表名 drop 列名；

       - D(Delete)：删除

  - DML：增删改表中的数据

    - 添加数据
      - 语法：insert into 表名（列名1，列名2，...列名n ）values（值1，值2，....值n）；
      - 注意：列名与值一一对应，如果要给每个列都添加值可以不必列举列名
    - 删除数据
      - 语法：delete from 表名 where 条件；
      - 注意：如果不加条件，则删除表中所有记录
      - 如果要删除所有记录
        1. delete from 表名；
        2. TRUNCATE table 表名；——推荐使用 效率更高，原理是删除本表，再创建一个一模一样的空表
    - 修改数据
      - update 表名 set 列名1 = 值1，列名2 = 值2，...[where 条件]

  - DQL：查询表中的数据

    - 查询表中记录select * from 表名；

    - 语法：

      ​		select

      ​				字段列表

      ​		from

      ​				表名列表

      ​		where

      ​				条件列表

      ​		group up

      ​				分组字段

      ​		having

      ​				分组之后条件

      ​		order by

      ​				排序

      ​		limit

      ​				分页限定

    - 基础查询：
      1. 多个字段的查询：select 字段名1，字段名2....from 表名；
      2. 去除重复：select distinct 列名 from 表名；
      3. 计算列：若有null，则 IFNULL（原始值，替换值）
      4. 起别名： AS 新名字
    - 条件查询：
      1. where 子句后跟条件
      2. 

  - DCL：进行操作授权

- 客户端图形化工具SQLYog