let webPush = require("web-push");

const vapidKeys = {
   publicKey:
      "BPzVLmC78AArtg8hCBCIUwASL1RPrX2Iw9CdNgeMbzO9O5C3eO28jp0joAaPOKXqQ5ez6Q9Z95N5r6MxynoAPxU",
   privateKey: "8pIb84tBCp5Nfvr7Qq8pobktp6n6GUDaBZveKZ0c-pI",
};
webPush.setVapidDetails(
   "mailto:example@yourdomain.org",
   vapidKeys.publicKey,
   vapidKeys.privateKey
);
const pushSubscription = {
   endpoint:
      "https://fcm.googleapis.com/fcm/send/c3IBLYR5yck:APA91bFISeU8vZyopFq0150KU2Ot1XVa2AB_3d7qbnwAocT6OroWTOBrEQH8mH0eU6Z1vcWejJBK_04oonSFuiGaCbK1GhWwW7kVjgP7HsB7smSmYpAzl1O6ifKBBk10GUCNojVdf83s",
   keys: {
      p256dh:
         "BJOTlpMxUc6EUrPsHG+jFtAISQSGqP/NprQ3rfd3iVNmj7Fik9w2hJLGwOA6kcYn/b311bXQKvJ58unCai++M2g=",
      auth: "BAjMKFEB+0tTv6nhLuCyKg==",
   },
};
const payload = "Pantau jadwal pertandingan\n sepak bola dunia terUpdate!";

const options = {
   gcmAPIKey: "1093472055283",
   TTL: 60,
};
try {
   webPush.sendNotification(pushSubscription, payload, options);
} catch (err) {
   console.error(err);
}