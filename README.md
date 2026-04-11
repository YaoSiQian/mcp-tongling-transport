# 铜陵公交 MCP

![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![MCP](https://img.shields.io/badge/protocol-MCP-purple) ![Node](https://img.shields.io/badge/node-%3E%3D18-orange)

> 让你的 AI 助手成为铜陵公交百事通——查线路、找站点、看实时公交、规划换乘路线。

这是一个基于 MCP 的铜陵公交查询 Skill。安装后，你的 AI 助手就能帮你查询铜陵公交线路信息、站点信息、实时车辆位置、换乘方案等。

告别打开 APP 翻找的繁琐，直接问你的 AI 助手就行。

## 功能特性

| 能力 | 你可以问 | 示例 |
|------|----------|------|
| **站点搜索** | "搜索拼音 cy 开头的站点" | `getStationNameAutocomplete` |
| **线路查询** | "39路公交几点发车？" | `getLineInfoByLineName` |
| **站点线路** | "铜陵站有哪些公交经过？" | `getLineInfosByStation` |
| **实时公交** | "39路现在车到哪儿了？" | `getLineStationGpsData` |
| **发车计划** | "下一班车什么时候发？" | `getLinePlanInfos` |
| **换乘方案** | "从铜陵站到铜陵北站怎么走？" | `getTransferInfo` |
| **公告通知** | "有什么新的公交通知？" | `getNotice` |

## 技术协议

| 项目 | 说明 |
|------|------|
| 协议 | MCP (Model Context Protocol) |
| 传输 | Stdio |
| 数据来源 | 铜陵公交官方 API (wx.tlgjzgs.com) |
| 运行环境 | Node.js >= 18 |

## 目录结构

```
mcp-tongling-transport/
├── src/
│   ├── index.ts          # MCP 服务器入口，注册所有工具
│   └── api.ts            # 铜陵公交 API 封装
├── dist/                 # 编译输出目录
├── api.yaml              # OpenAPI 规范文档
├── package.json
├── tsconfig.json
├── README.md
└── LICENSE
```

## 安装

### 方式一：通过 MCP 客户端配置（推荐）

在支持 MCP 协议的 AI 客户端中添加以下配置：

```json
{
  "mcpServers": {
    "tongling-transport": {
      "command": "npx",
      "args": ["mcp-tongling-transport"]
    }
  }
}
```

或手动指定路径：

```json
{
  "mcpServers": {
    "tongling-transport": {
      "command": "node",
      "args": ["/path/to/mcp-tongling-transport/dist/index.js"]
    }
  }
}
```

### 方式二：手动克隆安装

```bash
# 克隆仓库
git clone https://github.com/your-username/mcp-tongling-transport.git

# 进入目录
cd mcp-tongling-transport

# 安装依赖
pnpm install

# 编译
pnpm build

# 运行
pnpm start
```

## 使用示例

安装后，直接告诉你的 AI 助手你想查询什么：

> "帮我查一下从铜陵站到铜陵北站怎么坐公交"

> "39路公交车现在到哪儿了？"

> "搜索拼音 tl 开头的站点"

AI 助手会自动调用对应的 MCP 工具为你查询。

## API 工具列表

| 工具名 | 描述 |
|--------|------|
| `getStationNameAutocomplete` | 根据拼音首字母获取匹配的站点名称列表 |
| `getNotice` | 获取系统公告内容 |
| `getLineInfoByLineName` | 根据线路名称查询线路基本信息 |
| `getLineInfosByStation` | 根据站点名称查询经过该站点的所有线路 |
| `getLineStationGpsData` | 获取线路站点列表及车辆实时位置 |
| `getLinePlanInfos` | 获取线路下一班计划发车时间 |
| `getTransferInfo` | 查询起点站到终点站的换乘方案 |

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式（自动编译）
pnpm watch

# 构建
pnpm build

# 运行
pnpm start
```

## 许可证

[MIT LICENSE](LICENSE)

---

> 本项目为开源项目，数据来源于铜陵公交官方接口，仅供学习交流使用。
