import { McpContributor } from "@somenamespace/mcp-contributor-api";
import { ExampleMcpContributor } from "@somenamespace/example-mcp-contributor"

export function createMcpContributors(): McpContributor[] {
    return [
        new ExampleMcpContributor(),
        // ... add more here
    ];
}