import { isPresent } from '@ember/utils';

const FACEBOOK_APP_ID = '1004569109682616';

export default function share(platform) {
  switch (platform) {
    case 'facebook':
      return open('https://www.facebook.com/v2.12/dialog/share', {
        app_id: FACEBOOK_APP_ID,
        display: 'popup',
        href: 'https://cookformom.com',
        quote: `I'm learning to cook a 3-course gourmet meal that will impress mom this Mother's Day. Come join me at https://cookformom.com!` // eslint-disable-line max-len
      });
  }
}

function open(url, queryParams) {
  let queryString;

  if (isPresent(queryParams)) {
    queryString = Object.keys(queryParams)
      .map((key) => {
        return `${key}=${encodeURIComponent(queryParams[key])}`;
      })
      .join('&');
  }

  url = [url, queryString]
    .compact()
    .join('?');

  window.open(url);
}
