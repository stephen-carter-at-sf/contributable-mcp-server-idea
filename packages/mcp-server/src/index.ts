#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpProvider, McpPrompt, McpResource, McpResourceTemplate, McpTool, Services } from "@somenamespace/mcp-provider-api";
import { createMcpProviders } from "./registry.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ServicesImpl } from "./services.js";
import pkg from '../package.json' with { type: 'json' };

const packageJson: {version: string} = pkg as {version: string};

// Create services
const services: Services = new ServicesImpl();


// Create server
const mcpServer: McpServer = new McpServer({
    name: "some-mcp-server",
    version: packageJson.version
});


// Register features from providers
const providers: McpProvider[] = createMcpProviders();
for (const provider of providers) {
    const prompts: McpPrompt[] = provider.providePrompts(services);
    for (const prompt of prompts) {
        mcpServer.registerPrompt(prompt.getName(), prompt.getConfig(), (...args) => prompt.prompt(...args));
    }

    const resources: (McpResource | McpResourceTemplate)[] = provider.provideResources(services);
    for (const resource of resources) {
        if (resource.kind === 'McpResource') {
            mcpServer.registerResource(resource.getName(), resource.getUri(), resource.getConfig(), (...args) => resource.read(...args));
        } else {
            mcpServer.registerResource(resource.getName(), resource.getTemplate(), resource.getConfig(), (...args) => resource.read(...args));
        }
    }

    const tools: McpTool[] = provider.provideTools(services);
    for (const tool of tools)  {
        mcpServer.registerTool(tool.getName(), tool.getConfig(), (...args) => tool.exec(...args));
    }
}

// Run server
async function runServer() {
    const transport = new StdioServerTransport();
    await mcpServer.connect(transport);
    console.log("Some MCP Server running on stdio");
}
runServer().catch(error => {
    console.error("Fatal error running server:", error);
    process.exit(1);
})