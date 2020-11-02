let webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BPzVLmC78AArtg8hCBCIUwASL1RPrX2Iw9CdNgeMbzO9O5C3eO28jp0joAaPOKXqQ5ez6Q9Z95N5r6MxynoAPxU",
   "privateKey": "8pIb84tBCp5Nfvr7Qq8pobktp6n6GUDaBZveKZ0c-pI"
};
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cTFZvuR9iMA:APA91bEM-abjaRN8UkkR4cv6Q-1eQOFSAyDS1iyLg52f8HJDmkgvNJUSn3jD6AcMK1pM57Y2vJucJs2_KNp0pANnSHFdAnF817kPzpnj6JKRGpG0qUTHxzZEi3Mvqj0HxotFiFfgVaDx",
   "keys": {
      "p256dh": "BFij+a/vMCUM7Q1+zi4juoK4NPg6rNMU+5wiHtw15FoOOsxioht7vBj1CjQ4+gHGOtz1ISw+nm44GwFMC3NLsvk=",
      "auth": "OXQDegTWSVV71ri1PMNHag=="
   }
};
const payload = 'Pantau jadwal pertandingan\n sepak bola dunia terUpdate!';

const options = {
   gcmAPIKey: '1093472055283',
   TTL: 60
};
try {
   webPush.sendNotification(
      pushSubscription,
      payload,
      options
   );
} catch (err) {
   console.error(err);
}