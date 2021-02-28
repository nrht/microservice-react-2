import { Subjects, Publisher, ExpirationCompleteEvent } from '@nrht-ms-demo/common';

export class ExpirationCompletePublisher extends Publisher<
ExpirationCompleteEvent
> {
   subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}