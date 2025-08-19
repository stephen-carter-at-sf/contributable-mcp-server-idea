# contributable-mcp-server-idea
This repo provides an example of how we can create an mcp server that other teams can contribute tools, resources, and prompts to.

The top level idea is that there would be a `mcp-provider-api` package that provided interfaces that associate to the registration points of an MCP Server. Specifically it contains a `McpProvider` interface that other teams could implement in order to provide their own tools, resources, and prompts to a server. 

The `mcp-server` package here is an example of how an MCP Server could register various `McpProvider` instances and use them generically. This MCP Server can do its own validation, wrapping, etc as needed on what the providers return. It could also take the primary responsibility of sending top level telemetry events associated with the server and pass services (like a telemetry service) to the providers.

The `example-mcp-provider` shows an example of how another team could create a package that depended on the `mcp-provider-api` to provide an MCP Tool and leverage the telemetry service to send custom telemetry events.