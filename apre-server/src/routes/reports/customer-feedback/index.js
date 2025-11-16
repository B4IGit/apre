/**
 * Author: Professor Krasso
 * Date: 8/14/24
 * File: index.js
 * Description: Apre customer feedback API for the customer feedback reports
 */

"use strict";

const express = require("express");
const { mongo } = require("../../../utils/mongo");
const createError = require("http-errors");

const router = express.Router();

/**
 * @description
 *
 * GET /channel-rating-by-month
 *
 * Fetches average customer feedback ratings by channel for a specified month.
 *
 * Example:
 * fetch('/channel-rating-by-month?month=1')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get("/channel-rating-by-month", (req, res, next) => {
  try {
    const { month } = req.query;

    if (!month) {
      return next(createError(400, "month and channel are required"));
    }

    mongo(async (db) => {
      const data = await db
        .collection("customerFeedback")
        .aggregate([
          {
            $addFields: {
              date: { $toDate: "$date" },
            },
          },
          {
            $group: {
              _id: {
                channel: "$channel",
                month: { $month: "$date" },
              },
              ratingAvg: { $avg: "$rating" },
            },
          },
          {
            $match: {
              "_id.month": Number(month),
            },
          },
          {
            $group: {
              _id: "$_id.channel",
              ratingAvg: { $push: "$ratingAvg" },
            },
          },
          {
            $project: {
              _id: 0,
              channel: "$_id",
              ratingAvg: 1,
            },
          },
          {
            $group: {
              _id: null,
              channels: { $push: "$channel" },
              ratingAvg: { $push: "$ratingAvg" },
            },
          },
          {
            $project: {
              _id: 0,
              channels: 1,
              ratingAvg: 1,
            },
          },
        ])
        .toArray();

      res.send(data);
    }, next);
  } catch (err) {
    console.error("Error in /rating-by-date-range-and-channel", err);
    next(err);
  }
});

// API for customer-feedback-by-product
router.get("/customer-feedback-by-product", (req, res, next) => {
  try {
    mongo(async (db) => {
      const products = await db
        .collection("customerFeedback")
        .distinct("product");
      res.send(products);
    }, next);
  } catch (err) {
    console.error("Error getting products: ", err);
    next(err);
  }
});

// API for customer-feedback-by-product/:product
router.get("/customer-feedback-by-product/:product", (req, res, next) => {
  const product = req.params.product;

  try {
    mongo(async (db) => {
      const customerFeedbackByProduct = await db
        .collection("customerFeedback")
        .aggregate([
          { $match: { product } },
          {
            $group: {
              _id: {
                customer: "$customer",
                product: "$product",
                region: "$region",
              },
            },
          },
          {
            $project: {
              _id: 0,
              customer: "$_id.customer",
              product: "$_id.product",
              region: "$_id.region",
            },
          },
          { $sort: { customer: 1, product: 1 } },
        ])
        .toArray();

      res.send(customerFeedbackByProduct);
    }, next);
  } catch (err) {
    console.error("Error getting customer feedback data by product:", err);
    next(err);
  }
});

module.exports = router;
