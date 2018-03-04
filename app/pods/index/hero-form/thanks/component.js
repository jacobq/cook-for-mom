import Component from '@ember/component';

import share from '../../../../utils/share';

const Thanks = Component.extend({
  tagName: 'main',

  form: null,

  share,
  buySupplies() {}
});

Thanks.reopenClass({
  positionalParams: ['form']
});

export default Thanks;
