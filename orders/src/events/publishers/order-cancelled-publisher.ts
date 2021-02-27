import { Publisher, Subjects, OrderCancelledEvent } from '@nrht-ms-demo/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
   subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}