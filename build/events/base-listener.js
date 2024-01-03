"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
class Listener {
    constructor(channel) {
        this.channel = channel;
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            // Ensure the exchange exists
            yield this.channel.assertExchange(this.subject, 'topic', {
                durable: false,
            });
            // Assert a queue exists and bind it to the exchange
            const q = yield this.channel.assertQueue(this.queueGroupName, {
                durable: true,
            });
            yield this.channel.bindQueue(q.queue, this.subject, '');
            // Consume messages from the queue
            this.channel.consume(q.queue, (msg) => {
                if (msg) {
                    console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);
                    const data = this.parseMessage(msg);
                    this.onMessage(data, msg);
                    // Acknowledge the message
                    // this.channel.ack(msg);
                }
            });
        });
    }
    parseMessage(msg) {
        const content = msg.content;
        return JSON.parse(content.toString());
    }
}
exports.Listener = Listener;
