import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { updateTicketRouter } from '../routes/update';

interface TicketAttrs {
   title: string;
   price: number;
   userId: string
}

interface TicketDoc extends mongoose.Document {
   title: string;
   price: number;
   userId: string
   version: number;
   orderId?: string;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
   build(attrs: TicketAttrs): TicketDoc;
   findByEvent(event: { id: string, version: number }): Promise<TicketDoc | null>;
}

const ticketSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true
   },
   userId: {
      type: String,
      required: true
   },
   orderId: {
      type: String,

   }
}, {
   toJSON: {
      transform(doc, ret) {
         ret.id = ret._id;
         delete ret._id;
      }
   }
});

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
   return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };