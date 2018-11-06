import { Subject } from 'rxjs';
import { LogManager } from './log-manager';
import { LogMessage } from './log-message';

const log$ = new Subject<LogMessage>();

const defaultLogManager = new LogManager();
