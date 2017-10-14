import google from 'googleapis';
import key from '../key.json';

const authorize = (cb) => {
  const apiClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/calendar'],
    null
    );

  apiClient.authorize((err, tokens) => {
    if (err) {
      console.log(err);
      return;
    }
    cb(tokens, apiClient);
  });
};

export {
  authorize
};
