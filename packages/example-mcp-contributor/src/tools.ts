import { z }  from "zod";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { McpTool, McpToolConfig } from "@somenamespace/mcp-contributor-api"

export class ExampleTool implements McpTool {
    getConfig(): McpToolConfig {
        const config: McpToolConfig = {
            title: "exampleTitle",
            description: "exampleDescription",
            inputSchema: {
                someInputVar: z.string().describe("an input argument to be used for example purposes")
            },
            annotations: {
                readOnlyHint: true
            }
        };
        return config;
    }

    getName(): string {
        return "exampleName";
    }

    exec(input?: Record<string, unknown>): Promise<CallToolResult> {
        const result: CallToolResult = {
            content: [{
                type: "text",
                text: "The input that was received: " + JSON.stringify(input)
            }]
        }
        return Promise.resolve(result);
    }
}