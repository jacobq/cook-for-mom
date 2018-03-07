import { helper } from '@ember/component/helper';

export default helper(function([word]) {
  return word.capitalize();
});
