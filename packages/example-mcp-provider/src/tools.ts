import { z }  from "zod";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { McpTool, McpToolConfig, TelemetryService, Toolset } from "@somenamespace/mcp-provider-api";

export class ExampleTool implements McpTool {
    private readonly telemetryService: TelemetryService;

    constructor(telemetryService: TelemetryService) {
        this.telemetryService = telemetryService;
    }

    getToolset(): Toolset {
        return Toolset.EXPERIMENTAL;
    }

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
        this.telemetryService.sendTelemetryEvent('sampleEvent', {
            someAttribute: 'someAttributeValue'
        });
        const result: CallToolResult = {
            content: [{
                type: "text",
                text: "The input that was received: " + JSON.stringify(input)
            }]
        }
        return Promise.resolve(result);
    }
}