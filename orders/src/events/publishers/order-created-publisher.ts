import { Publisher, OrderCreatedEvent, Subjects } from '@nrht-ms-demo/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
   subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
