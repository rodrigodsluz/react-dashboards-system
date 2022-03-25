/* eslint-disable camelcase */
const crypto = require('crypto');
const oauth1a = require('oauth-1.0a');

class Oauth1Helper {
  static getAuthHeaderForRequest(request) {
    const oauth = oauth1a({
      consumer: {
        key: process.env.REACT_APP_CONSUMERKEY,
        secret: process.env.REACT_APP_CONSUMERSECRET,
      },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return crypto
          .createHmac('sha1', key)
          .update(base_string)
          .digest('base64');
      },
    });

    const authorization = oauth.authorize(request, {
      key: process.env.REACT_APP_TOKENKEY,
      secret: process.env.REACT_APP_TOKENSECRET,
    });

    return oauth.toHeader(authorization);
  }
}

export default Oauth1Helper;
