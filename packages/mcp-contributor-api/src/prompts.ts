import { PromptCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ZodOptional, ZodType, ZodTypeDef } from "zod";

export interface McpPromptsProvider {
    providePrompts(): McpPrompt[];
}

export interface McpPrompt {
    getName(): string
    
    getConfig(): {
        title?: string;
        description?: string;
        argsSchema?: PromptArgsRawShape;
    }

    prompt: PromptCallback<PromptArgsRawShape>
}

// For some reason PromptArgsRawShape is not exported from "@modelcontextprotocol/sdk/server/mcp.js";
export type PromptArgsRawShape = {
    [k: string]: ZodType<string, ZodTypeDef, string> | ZodOptional<ZodType<string, ZodTypeDef, string>>;
};