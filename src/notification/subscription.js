import request from "../services/httpRequest";

const convertedVapidKey = urlBase64ToUint8Array(
  "BJI3FjjK1dkCDW0_2koQuEBdJr7-ipNk80H7NIBoH7FGKgfOsj1952GJDi5k4tBcodtfPadsaBYgf8Kjdy1wIEc"
);

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  // eslint-disable-next-line
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function sendSubscription(subscription) {
  const response = await request("notifications/subscribe", {
    subscription: subscription,
    title: "Notification subscription",
    description: "You've successfully suscribed to push notifications",
    icon: "https://drive.google.com/uc?id=1C-LIFfdiqOp6tVc2s-X1Lyn-2ygLqw1S",
    userId: "1671456885889",
  });

  return response;
}

//conditional render
let clicked = true;

export function subscribeUser() {
  if (clicked) {
    console.log("Subcribing to notifications");
    if ("serviceWorker" in navigator) {
      console.log("Service worker present");
      navigator.serviceWorker.ready
        .then(function (registration) {
          if (!registration.pushManager) {
            console.log("Push manager unavailable.");
            return;
          }

          registration.pushManager
            .getSubscription()
            .then(function (existedSubscription) {
              if (existedSubscription === null) {
                console.log("No subscription detected, make a request.");
                registration.pushManager
                  .subscribe({
                    applicationServerKey: convertedVapidKey,
                    userVisibleOnly: true,
                  })
                  .then(function (newSubscription) {
                    console.log("New subscription added.", newSubscription);
                    sendSubscription(newSubscription);
                  })
                  .catch(function (e) {
                    if (Notification.permission !== "granted") {
                      console.log("Permission was not granted.");
                    } else {
                      console.error(
                        "An error ocurred during the subscription process.",
                        e
                      );
                    }
                  });
              } else {
                console.log("Existed subscription detected.");
                sendSubscription(existedSubscription);
              }
            });
        })
        .catch(function (e) {
          console.error(
            "An error ocurred during Service Worker registration.",
            e
          );
        });
    } else console.log("Service worker not worker");
  } else {
    console.log("Can not reachable to the service worker");
  }
}
