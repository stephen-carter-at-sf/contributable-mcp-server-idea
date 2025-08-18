import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import { ZodRawShape } from "zod"

export interface McpToolsProvider {
    provideTools(): McpTool[];
}

export interface McpTool {
    getName(): string
    
    getConfig(): McpToolConfig

    exec: ToolCallback<ZodRawShape>
}

export type McpToolConfig = {
    title?: string;
    description?: string;
    inputSchema?: ZodRawShape;
    outputSchema?: ZodRawShape;
    annotations?: ToolAnnotations;
}