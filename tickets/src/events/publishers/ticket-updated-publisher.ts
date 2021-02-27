import { Publisher, Subjects, TicketUpdatedEvent } from '@nrht-ms-demo/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
   subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}