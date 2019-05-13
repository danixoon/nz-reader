import * as mongoose from "mongoose";

export interface IBook {
  imageUrl: string;
  label: string;
  author: string;
  description: string;
}

export interface IBookModel extends mongoose.Document, IBook {}

const Schema = mongoose.Schema;
const BookSchema = new Schema({
  imageUrl: {
    type: Schema.Types.String,
    required: true
  },
  label: {
    type: Schema.Types.String,
    required: true
  },
  description: {
    type: Schema.Types.String,
    required: true
  },
  author: {
    type: Schema.Types.String,
    required: true
  }
});

const Book: mongoose.Model<IBookModel> = mongoose.model<IBookModel>("Book", BookSchema);
export default Book;
