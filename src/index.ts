import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as z from "zod/v4";
import {
  getStationNameAutocomplete,
  getNotice,
  getLineInfoByLineName,
  getLineInfosByStation,
  getLineStationGpsData,
  getLinePlanInfos,
  getTransferInfo,
} from "./api.js";

const server = new McpServer({
  name: "tongling-transport",
  version: "1.0.0",
});

server.registerTool(
  "getStationNameAutocomplete",
  {
    description: "根据输入的拼音首字母获取匹配的站点名称列表，仅返回前10个结果。注意：仅支持拼音首字母查询，不支持中文直接查询。",
    inputSchema: z.object({
      stationName: z.string().describe("站点名称的拼音首字母（如 `cy` 匹配 \"陈瑶湖镇\"）"),
    }),
  },
  async ({ stationName }) => {
    const result = await getStationNameAutocomplete(stationName);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

server.registerTool(
  "getNotice",
  {
    description: "获取系统公告内容，返回HTML格式或纯文本字符串",
    inputSchema: z.object({}),
  },
  async () => {
    const result = await getNotice();
    return {
      content: [
        {
          type: "text",
          text: result,
        },
      ],
    };
  }
);

server.registerTool(
  "getLineInfoByLineName",
  {
    description: "根据线路名称（如 `39`、`T3`）查询线路的基本信息，包括首末班时间、起终点站等",
    inputSchema: z.object({
      lineName: z.string().describe("线路名称，如 `39`、`T3`"),
    }),
  },
  async ({ lineName }) => {
    const result = await getLineInfoByLineName(lineName);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

server.registerTool(
  "getLineInfosByStation",
  {
    description: "根据站点名称查询经过该站点的所有线路信息",
    inputSchema: z.object({
      stationName: z.string().describe("站点名称（中文），如 `铜陵站`"),
    }),
  },
  async ({ stationName }) => {
    const result = await getLineInfosByStation(stationName);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

server.registerTool(
  "getLineStationGpsData",
  {
    description: "根据线路ID和方向获取该线路的所有站点列表以及当前运行车辆的实时位置信息",
    inputSchema: z.object({
      lineid: z.string().describe("线路ID"),
      direction: z.number().int().min(1).max(2).describe("方向，1为主方向，2为副方向"),
    }),
  },
  async ({ lineid, direction }) => {
    const result = await getLineStationGpsData(lineid, direction);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

server.registerTool(
  "getLinePlanInfos",
  {
    description: "根据线路ID和方向获取下一班计划发车时间",
    inputSchema: z.object({
      lineid: z.string().describe("线路ID"),
      direction: z.number().int().min(1).max(2).describe("方向，1为主方向，2为副方向"),
    }),
  },
  async ({ lineid, direction }) => {
    const result = await getLinePlanInfos(lineid, direction);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

server.registerTool(
  "getTransferInfo",
  {
    description: "根据起点站和终点站查询换乘方案",
    inputSchema: z.object({
      startStationName: z.string().describe("起点站名称（中文），如 `铜陵站`"),
      endStationName: z.string().describe("终点站名称（中文），如 `铜陵北站`"),
    }),
  },
  async ({ startStationName, endStationName }) => {
    const result = await getTransferInfo(startStationName, endStationName);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("MCP server is running...");
}

main().catch(console.error);
