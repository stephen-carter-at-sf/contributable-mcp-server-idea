import { McpPrompt, McpPromptsProvider } from "./prompts.js";
import { McpResource, McpResourcesProvider, McpResourceTemplate } from "./resources.js";
import { McpTool, McpToolsProvider } from "./tools.js";

export abstract class McpContributor implements McpResourcesProvider, McpToolsProvider, McpPromptsProvider {
    providePrompts(): McpPrompt[] {
        return [];
    }

    provideResources(): McpResource[] {
        return [];
    }

    provideResourceTemplates(): McpResourceTemplate[] {
        return [];
    }

    provideTools(): McpTool[] {
        return [];
    }
}