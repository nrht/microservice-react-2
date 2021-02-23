import { Publisher, Subjects, TicketCreatedEvent } from '@nrht-ms-demo/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
   subject: Subjects.TicketCreated = Subjects.TicketCreated;
}