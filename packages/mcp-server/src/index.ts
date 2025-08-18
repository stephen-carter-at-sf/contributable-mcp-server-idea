import path from "node:path";
import {fileURLToPath} from "node:url";
import fs from "node:fs";

import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpContributor, McpPrompt, McpResource, McpResourcesProvider, McpTool, McpToolsProvider } from "@somenamespace/mcp-contributor-api";
import { createMcpContributors } from "./registry.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpResourceTemplate } from "@somenamespace/mcp-contributor-api/dist/resources.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToPackageJson: string = path.join(__dirname, '..', 'package.json');
const packageJson: {version: string} = JSON.parse(fs.readFileSync(pathToPackageJson, 'utf-8')) as {version: string};


// Create server
const mcpServer: McpServer = new McpServer({
    name: "some-mcp-server",
    version: packageJson.version
});


// Register tools
const contributors: McpContributor[] = createMcpContributors();
for (const contributor of contributors) {
    const prompts: McpPrompt[] = contributor.providePrompts();  // TODO: Pass in dependencies like telemetryService
    for (const prompt of prompts) {
        mcpServer.registerPrompt(prompt.getName(), prompt.getConfig(), (...args) => prompt.prompt(...args));
    }

    const resources: McpResource[] = contributor.provideResources(); // TODO: Pass in dependencies like telemetryService
    for (const resource of resources) {
        mcpServer.registerResource(resource.getName(), resource.getUri(), resource.getConfig(), (...args) => resource.read(...args));
    }

    const resourceTemplates: McpResourceTemplate[] = contributor.provideResourceTemplates(); // TODO: Pass in dependencies like telemetryService
    for (const resourceTemplate of resourceTemplates) {
        mcpServer.registerResource(resourceTemplate.getName(), resourceTemplate.getTemplate(), resourceTemplate.getConfig(), (...args) => resourceTemplate.read(...args));
    }

    const tools: McpTool[] = contributor.provideTools(); // TODO: Pass in dependencies like telemetryService
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