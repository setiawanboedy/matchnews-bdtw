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
      "https://fcm.googleapis.com/fcm/send/eYaE3EsNOIE:APA91bFYC5FBrSye9cPqKvpZ4hI2F3JedkB6D9LRswgZVVsgeemWKK8q_gIuhrBwTfdxtwgFkIbeMr9X3ek7R5j6RFiR3G078FAZhFAzfIPEszu55z8xOHPBOqK9EKjYLDfQ0OrbvDV_",
   keys: {
      p256dh:
         "BKEhNWh9Z2QdhUHRPW09VqXi/bK8tTkw2KWM8DNTMe+20SvUL1fV4B6KlbDVrpU1JhBttZMHCj9NYtVrLnAVlQM=",
      auth: "EhWQDiOPRDURgOVx72Z9CQ==",
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