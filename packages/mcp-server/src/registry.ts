import { McpProvider } from "../../mcp-provider-api/dist/index.js";
import { ExampleMcpProvider } from "../../example-mcp-provider/dist/index.js"

export function createMcpProviders(): McpProvider[] {
    return [
        new ExampleMcpProvider(),
        // ... add more here
    ];
}