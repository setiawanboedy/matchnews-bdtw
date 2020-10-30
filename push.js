let webPush = require('web-push');
     
const vapidKeys = webPush.generateVAPIDKeys();
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/d5x_laEuZp4:APA91bFXQWThNBVc-a6WsEKlZ9AldtylORb70egblvmtBCoZaNWJ8AWSp21bs-q9qVvj5SwemMW4bJ2wxT58VzZ-oLVz6o3G9zb2OHXl6hThTcrjwMyJqTEbhySR0ugwewuLFemoB2KG",
   "keys": {
       "p256dh": "BFzRY+U6yaIg1MPja0CmXj7DHWikGLJf3SmKFvh6xOV98VOpNAlH53iQkYr7t4M5ALMMkH4kInaj5OvGVbzwtg8=",
       "auth": "LPlXSI8XOT1keMkesJ8f1g=="
   }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
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