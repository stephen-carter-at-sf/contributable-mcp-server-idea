import { McpProvider,  McpTool, Services } from "@somenamespace/mcp-provider-api";
import { ExampleTool } from "./tools.js";

export class ExampleMcpProvider extends McpProvider {
    provideTools(services: Services): McpTool[] {
        return [new ExampleTool(services.getTelemetryService())];
    }
}