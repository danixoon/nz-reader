import { Router, RequestHandler, Response } from "express";

import Book from "../../models/Book";
import createApiMiddleware, { ApiAccess, IAPI, apiError } from "../../middleware/api";

import * as joi from "joi";

const router = Router();

function isEmpty(str: string) {
  return str === undefined || str === null || /\s+/.test(str);
}

const API: IAPI = {
  get: {
    find: {
      schema: {
        search: joi.string().allow("")
      },
      access: ApiAccess.GUEST,
      execute: async ({ search }) => {
        const books = !isEmpty(search) ? await Book.find({ $or: [{ label: { $regex: search } }, { description: { $regex: search } }] }).exec() : await Book.find().exec();
        return books.map(b => b.toObject());
      }
    },
    byId: {
      schema: {
        ids: joi.array()
      },
      access: ApiAccess.GUEST,
      execute: async ({ ids }) => {
        const books = await Book.find({ _id: { $in: ids } }).exec();
        return books.map(b => b.toObject());
      }
    },
    create: {
      schema: {
        label: joi.string().required(),
        description: joi.string().required(),
        author: joi.string().required(),
        imageUrl: joi.string().required()
      },
      access: ApiAccess.GUEST,
      execute: async ({ label, description, imageUrl, author }) => {
        const book = await new Book({ label, description, imageUrl, author }).save();
        return book.toObject();
      }
    }
  }
};

// @route WHATEVER api/job
// @decs ALL WHAT U WANT
// @access Public
const middleware = createApiMiddleware(API);
router.all("/:method", middleware);

export default router;
