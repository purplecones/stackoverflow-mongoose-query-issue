import Mongo from './Mongo';

import 'babel-core/register';
import 'babel-polyfill';

const main = async () => {
  const mongo = new Mongo();

  const dataSet1 = await mongo.find('locations', {
    limit: 1,
  });
  // const dataSet2 = await mongo.find('articles', {
  //   limit: 2,
  // });

  mongo.close();

  // console.log({
  //   dataSet1,
  //   dataSet2,
  // });
};

main();
