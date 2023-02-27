# admin-express

## 介绍

A api server based on node.js + express + mysql + jwt.

> 本地环境:
>
> - node.js v16
> - mysql v5

## 目录介绍

```txt
├── db                        // 数据库处理
├── router                    // 定义路由
│   └──handler                // 具体逻辑
├── app.js                    // 入口
├── config.js                 // 配置参数
└── package.json              // 依赖管理
```

## 如何运行本项目？

1. 运行 db 中的 .sql 脚本
2. `npm i`
3. `npm run start`
