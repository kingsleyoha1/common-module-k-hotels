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
exports.Publisher = void 0;
class Publisher {
    constructor(channel) {
        this.channel = channel;
    }
    publish(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Ensure the exchange exists
            yield this.channel.assertExchange(this.subject, 'topic', {
                durable: false,
            });
            // Publish the message to the exchange
            try {
                this.channel.publish(this.subject, // Exchange
                '', // Routing key (empty for a topic exchange with no specific routing)
                Buffer.from(JSON.stringify(data)), // Message
                {} // Options
                );
                console.log(`Event published to subject: ${this.subject}`);
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.Publisher = Publisher;
