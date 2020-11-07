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
      "https://fcm.googleapis.com/fcm/send/dQOtJU74CWk:APA91bEVV5t4ate8UNpfimBnkkkD6_XitjTECPfFerOrtw9abBIqe4df12HJikhdhOvvKQfEU_oOW3q2U75D0OrJUQUgJ5IDlgOlDodHIHTnT0fLZ-jtvZpPJYvscd9qnDY_I6T29BQB",
   keys: {
      p256dh:
         "BFL8D2c/F6b0dP6QCrZP+HRrlZh5LaMZZFevA/j5mn/uZwsYHhBAzpiCBS3iK/d0OOBgezp0xHAnp+5Am5duJko=",
      auth: "YbQtCDEPobsL4m8fIVFQIQ==",
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