import { Publisher } from './base-publisher';
import { TicketCreatedEvent } from './ticket-create-events';
import { Subjects } from './subjects';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
   subject: Subjects.TicketCreated = Subjects.TicketCreated;
}