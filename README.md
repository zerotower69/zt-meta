*Metadata for MySQL in JavaScript*

> 这是针对mysql开发的元数据包,初衷是为了实
> 现前端版本的Java代码生成器。

> 由于个人能力有限，因此本包强烈依赖于mysql.js,在原生的配置选项以及自定义的错误选项照搬了其设计，要了解我的设计请先参考mysql的设计

[github参看mysql](https://github.com/mysqljs/mysql)

# 连接配置选项

[Client](./types/Client.d.ts)

> 使用该配置必须给定host和user等选项,以免报错。

# 定义的方法

## [listDatabases()](./docs/listDatabases.md)

## [listTables()](./docs/listTables.md)

## [listColumns()](./docs/listColumns.md)

## [find_PrimaryKey()](._/docs/find_PrimaryKey.md)

> 如果有任何的建议请通过issue直接提出或者邮箱联系 zero@zerotwoer.xyz

>欢迎光临 [zerotower的技术小屋](https://www.zerotower.xyz)
