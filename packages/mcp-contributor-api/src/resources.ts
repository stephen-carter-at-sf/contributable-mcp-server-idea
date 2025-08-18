import { ReadResourceCallback, ReadResourceTemplateCallback, ResourceMetadata, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";

export interface McpResourcesProvider {
    provideResources(): McpResource[];
    provideResourceTemplates(): McpResourceTemplate[];
}

export interface McpResource {
    getName(): string
    
    getUri(): string

    getConfig(): ResourceMetadata
    
    read: ReadResourceCallback
}

export interface McpResourceTemplate {
    getName(): string
    
    getTemplate(): ResourceTemplate

    getConfig(): ResourceMetadata
    
    read: ReadResourceTemplateCallback
}