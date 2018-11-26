## 实现markdown文档查看

### 背景

现在开发项目都有markdown文档，但无法在本地便捷的查看文档，所以开发这个小工具，方便在本地查看文档

### 安装

```bash
npm install node-markdown-docs --save
```

### 配置package.json
```
"scripts": {
    "docs": "md-server start"
}
```

### 运行

```bash
npm run docs
```

### 自定义配置

在项目根目录创建 .docsrc：
```
{
    "host": "127.0.0.1",
    "port": "3001"
}
```

| 配置项 | 说明 | 默认值 |
|:----:|:----:|:----:|
| host | 服务host | 127.0.0.1 |
| port | 服务port | 3001 |

### markdown文件路径

相对项目根目录，编写绝对路径：[README.md - /README.md](/README.md)