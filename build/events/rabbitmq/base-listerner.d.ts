import amqp, { ConsumeMessage } from 'amqplib';
import { Subjects } from '../subjects';
interface Event {
    subject: Subjects;
    data: any;
}
export declare abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract queueGroupName: string;
    abstract onMessage(data: T['data'], msg: ConsumeMessage): void;
    protected channel: amqp.Channel;
    constructor(channel: amqp.Channel);
    listen(): Promise<void>;
    parseMessage(msg: ConsumeMessage): any;
}
export {};
