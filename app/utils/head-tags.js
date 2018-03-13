export default function headTags() {
  return [{
    type: 'title',
    tagId: 'title',
    content: 'Cook For Mom'
  }, {
    type: 'meta',
    tagId: 'meta-fb-app_id',
    attrs: {
      property: 'fb:app_id',
      content: '1004569109682616'
    }
  }, {
    type: 'meta',
    tagId: 'meta-twitter-card',
    attrs: {
      name: 'twitter:card',
      content: 'summary_large_image'
    }
  }, {
    type: 'meta',
    tagid: 'meta-twitter-site',
    attrs: {
      name: 'twitter:site',
      content: '@cookformom'
    }
  }, {
    type: 'meta',
    tagid: 'meta-og-url',
    attrs: {
      property: 'og:url',
      content: 'https://cookformom.com'
    }
  }, {
    type: 'meta',
    tagid: 'meta-og-title',
    attrs: {
      property: 'og:title',
      content: 'Cook For Mom'
    }
  }, {
    type: 'meta',
    tagid: 'meta-og-type',
    attrs: {
      property: 'og:type',
      content: 'website'
    }
  }, {
    type: 'meta',
    tagid: 'meta-og-image',
    attrs: {
      property: 'og:image',
      content: 'https://cookformom.com/assets/images/social/share-1.png'
    }
  }, {
    type: 'meta',
    tagid: 'meta-og-image-alt',
    attrs: {
      property: 'og:image:alt',
      content: 'This Mother\'s Day, you feed her'
    }
  }, {
    type: 'meta',
    tagid: 'meta-og-description',
    attrs: {
      property: 'og:description',
      content: 'Get a free gourmet meal plan, plus six free weekly lessons designed for your success.'
    }
  }, {
    type: 'meta',
    tagid: 'meta-description',
    attrs: {
      name: 'description',
      content: 'Get a free gourmet meal plan, plus six free weekly lessons designed for your success. This Mother\'s Day, you feed her.'
    }
  }];
}
