import * as mongoose from "mongoose";

export interface IOrder {
  email: string;
  firstName: string;
  secondName: string;
  address: string;
  bookIds: mongoose.Schema.Types.ObjectId[];
}

export interface IOrderModel extends mongoose.Document, IOrder {}

const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  bookIds: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "Book"
  },
  firstName: {
    type: Schema.Types.String,
    required: true
  },
  lastName: {
    type: Schema.Types.String,
    required: true
  },
  address: {
    type: Schema.Types.String,
    required: true
  },
  email: {
    type: Schema.Types.String,
    required: true
  }
});

const Order: mongoose.Model<IOrderModel> = mongoose.model<IOrderModel>("Order", OrderSchema);
export default Order;
