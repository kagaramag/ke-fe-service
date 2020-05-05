import firebase from "firebase";

firebase.initializeApp({
  serviceAccount: {
    "type": "service_account",
    "project_id": "keetela-web-app",
    "private_key_id": "a77361732b9e6dec5e96e8cf800f98ab64818a0b",
    "private_key": "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCx7ICJEDGQMZQq\nhSih55lhIIkrgnxJoAagF63zH33l6VMiFAwiXonGz2zTFASzIRNqHAnt7U5mRxEp\nalArfG9wndfj7OJ2uNQVP5N7cxb2UX0bVveJLfrO2BaXP7Bn6Fpg3O8j7mS8ufF7\n6na3bU3UcrCoJ3aCXNA/Rw9zEY+/XCrQaI8tX+FPF1+MkB/4caXLwbtpNHdS09f4\nT2oeIgvBtopfowxhtXwqhrFF/zr+BHneBiTUVy7QbSEEz8RCp8yqkMH6uoaLATlF\nJdA1l3rXAGb9sVAgjED/XeMxBKQE2QM9DNXWAlETUYgloUPBhs0bP4lCc4eyRRgv\nP2NFyz8FAgMBAAECggEAEpmXQaeMOYySoTP6G0bYssh8c9cjGBf0aVsLB8NZ3Xrx\nV7rXHpFZ1OCipJmko3dIjiCv7GFmVJcxqkM0w1RcWrOy5InDOPG51h4nKad5QIx5\n8tg6GMCnm2UH+OLNwGcQFQKJC21ktugMtc1n1hAaq/lwvKYiI58BSYQruiCdXD3g\n/6ZmUXGZxfcEmpgyA+mQQs+a+6jiub7SISVK8oJ9/A7sn2ztvg3uYBStKdB1bs1d\nmKkrgzdB69OaK2DQrfaaE91XUrGHN5vKVNXIwmrcxkNIJFh8aRvtDjdpIS9rr1tH\nzXIV3+IuxZomilr/dtyMbgtLC0Ppx6mr/6JS+xoMFwKBgQDtTPH34zfsHzOBt2YO\n3sxUE3/xPKSNOsvT2ezrbJKgghAv6joUWR/+Scqf3oowoTX4nS1vPh30JZg+4HFz\ncVL+zwU8RPcxaAASJieyF3mALjY/1+fBSlRxz5zMtDyVxmUqZq33a2nv9CzY6+as\nI88F684LpEE8KyurWn+A8L9pJwKBgQC/8cCjkGHRJSyEBpguFGL+l2+gcFx8C+Ei\npENwu3uvCOMkEmtsKtklMhjR2FdbQyzKAPQN/7DwK0UOUl3NiN/fS9hTvol/7ZPE\nMkZ96pD4xIaHyix/39ogehnn9prZBklhhp4Ehkf+SNC+LYig2ch4QKxR7C5CALiM\nSbYgl8F58wKBgQCYp9dBULq4+5l26TSOfGWV8LVty0VQVXKqZpczHDV3bDRdnqCe\nVndubqobDl53yj2eIf8IgT1jwoueZ2SUj2KE6UjE7NjYv77L7h+7Qb635wKfL5W3\nksmgLZ8BUTFoaKjMDiH7+O29n6b6JUfPlXmopXl3o8MTofIF2cIMgNOiIQKBgD9K\njgThFQALy/P04LVBD6t3b91tb3GP0TrFA1/m0k/TFGLOmBFgx51WOYzoU1XKfrhV\nPCRpjYSEIA8q5bdiTL+qmLh0eY5vXmwxT8ExWYBN/TZFWgsIWzqeSHCOhlzNj+DS\nrMQ9KvwUMpCjHww7A7lzSd7xjAdDiZbor19r6uY1AoGAZDVebCTMKtzMllYqPWYp\np/Wg768A9S0l1xqJ8RwfPd4d0FNIqwCNca68WDumU9ILSO1C4bG6vX/Pj6gfovRH\n0WvvKUx0rfRO4v7cvFISGsnZhAJVQ5itkkdXJrJlM9GO0qk+19UJyKYnlA4ApdJp\nrhloDv38NZixCfx9wLKq4ec=",
    "client_email": "keetela-web-app@appspot.gserviceaccount.com",
    "client_id": "101076576488356890251",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/keetela-web-app%40appspot.gserviceaccount.com"
  },
  databaseURL: "https://keetela-web-app.firebaseio.com"
});

const db = firebase.database();

class FirebaseHelper {

  static save = (path, data) => {
    return new Promise((resolve, reject) => {
      try {
        const create = db.ref(path);
        create.push(data).key;
        resolve('Record has been created');
      } catch (error) {
        reject(error);
      }
    });
  };

  static get = path => {
    return new Promise((resolve, reject) => {
      let values =[];
      try {
        const query = db.ref(path);
        query.once('value')
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            // key will be "ada" the first time and "alan" the second time
            var key = childSnapshot.key;
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            const data = {
              key,
              ...childData
            };
            values = [...values, data];
        });
      resolve(values);
      });
      } catch (error) {
        reject(error);
      }
    });
  };

}

export default FirebaseHelper;
