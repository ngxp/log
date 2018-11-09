import { LogMessage } from '../../log-message';

export type BodyBuilder = (logMessages: LogMessage[]) => string;

export const defaultBodyBuilder: BodyBuilder = (logMessages: LogMessage[]) => JSON.stringify(logMessages);
