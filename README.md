## Background
This repo relates to a stackoverflow question posted [here](http://stackoverflow.com/questions/41618668/mongoose-hangs-on-second-query). The gist of it is that mongoose successfully returns data when doing an initial query, but when a second query is executed right after, it hangs.

## Usage
Install dependencies
```
yarn install
```

Start a local MongoDB instance. Needs MongoDB cli installed globally, refer to official MongoDB docs.
```
yarn run start-mongo
```

Imports a small set of sample data
```
yarn run import
```

Starts the demo app
```
yarn start
```

## One Query
```javascript
const mongo = new Mongo();

const dataSet1 = await mongo.find('locations', {
  limit: 1,
});
// const dataSet2 = await mongo.find('locations', {
//   limit: 2,
// });

mongo.close();

console.log({
  dataSet1,
  // dataSet2,
});
```
Here we are querying the `locations` collection and just returning one document.
```bash
Mongoose default connection open to
{ dataSet1:
   [ { _id: 5877b4568f5c931b5f84cd93,
       name: 'Jane Doe',
       address: '123 Main St',
       city: 'Whereverville',
       state: 'CA',
       zip: '90210' } ] }
Mongoose default connection disconnected
```
As expected, one document is returned.

## Two Queries
```javascript
const mongo = new Mongo();

const dataSet1 = await mongo.find('locations', {
  limit: 1,
});
const dataSet2 = await mongo.find('locations', {
  limit: 2,
});

mongo.close();

console.log({
  dataSet1,
  dataSet2,
});
```
Here we are making a second query to the `locations` collection for two documents.

```bash
>>> RESTARTING <<<
(node:87245) DeprecationWarning: Calling an asynchronous function without callback is deprecated.
Mongoose default connection open to
^C
```
The process hangs and does not return anything. Can't quite figure out why this happens.
