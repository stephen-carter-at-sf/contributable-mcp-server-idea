import { Services, TelemetryEvent, TelemetryService } from "@somenamespace/mcp-provider-api";

export class ServicesImpl implements Services {
    getTelemetryService(): TelemetryService {
        return new TelemetryServiceImpl();
    }
}

export class TelemetryServiceImpl implements TelemetryService {
    sendTelemetryEvent(eventName: string, event: TelemetryEvent): void {
        // Just using dummy implementation for now
        console.log(`sendTelemetryEvent called with:\neventName: '${eventName}\n` +
            `event: ${JSON.stringify(event)}`);
    }
}