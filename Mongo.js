import mongoose from 'mongoose';
import { locationSchema } from './schemas';

const MONGO_URL = "mongodb://localhost:27017/mydb";

export default class Mongo {
  constructor() {
    mongoose.Promise = global.Promise;
    this.connect();
    this.db.on('connected', function () {
      console.log('Mongoose default connection open to ');
    });

    // If the connection throws an error
    this.db.on('error',function (err) {
      console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    this.db.on('disconnected', function () {
      console.log('Mongoose default connection disconnected');
    });
  }

  connect() {
    mongoose.connect(MONGO_URL);
    this.db = mongoose.connection;
  }

  close() {
    this.db.close();
  }

  find(collection, params = {}) {
    const db = this.db;
    const model = mongoose.model(locationSchema.options.collection, locationSchema);
    const {
      query = {},
      fields = {},
      options = {},
      limit = 0,
    } = params;
    return new Promise((resolve, reject) => {
      db.on('error', (err) => reject(err));
      db.on('open', () => {
        model.find(query, fields, options)
          .limit(limit)
          .exec()
          .then(docs => resolve(docs))
          .catch(err => reject(err));
        });
      });
  };
}
