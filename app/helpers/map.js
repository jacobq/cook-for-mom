import { helper } from '@ember/component/helper';

export default helper(function([collection], { by }) {
  return collection.mapBy(by);
});
