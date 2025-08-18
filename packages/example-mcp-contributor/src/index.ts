import { McpContributor, McpPrompt, McpResource, McpResourcesProvider, McpTool, McpToolsProvider } from "@somenamespace/mcp-contributor-api";
import { ExampleTool } from "./tools.js";

export class ExampleMcpContributor extends McpContributor {
    provideTools(): McpTool[] {
        return [new ExampleTool()];
    }
}