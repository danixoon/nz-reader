import { Router, RequestHandler, Response } from "express";

import Book from "../../models/Book";
import createApiMiddleware, { ApiAccess, IAPI, apiError } from "../../middleware/api";

import * as joi from "joi";
import Order from "../../models/Order";
import { Transporter } from "nodemailer";

const router = Router();

function isEmpty(str: string) {
  return str === undefined || str === null || /\s+/.test(str);
}

function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const API: IAPI = {
  get: {
    create: {
      schema: {
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        address: joi.string().required(),
        email: joi
          .string()
          .email()
          .required(),
        bookIds: joi
          .array()
          .required()
          .min(1)
      },
      access: ApiAccess.GUEST,
      execute: async ({ address, email, bookIds, firstName, lastName }, req) => {
        const order = await Order.create({ address, email, bookIds, firstName, lastName });
        const books = await Book.find({ _id: { $in: bookIds } }).exec();
        const smpt = req.smpt as Transporter;
        smpt.sendMail({
          to: email,
          from: process.env.SMTP_USER,
          subject: "Спасибо за заказ!",
          text: `Уважаемый ${jsUcfirst(firstName)} ${jsUcfirst(lastName)}, ваш заказ оформлен, его номер:\n${order._id}\n\n${books
            .map(b => `Название: ${b.label || "Без названия"}\nОписание: ${b.description || "Не имеет"}\nАвтор: ${b.author || "Не известен"}`)
            .join("\n\n")}`
        });
        return order.toObject();
        // req.smpt.sendMail()
        // const books = !isEmpty(search) ? await Book.find({ $or: [{ label: { $regex: search } }, { description: { $regex: search } }] }).exec() : await Book.find().exec();
        // return books.map(b => b.toObject());
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
