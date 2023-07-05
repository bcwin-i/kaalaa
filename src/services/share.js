async function shareCanvasAsImage(url, index) {
  const blob = await (await fetch(url)).blob();
  let bac = { status: false, message: "" };

  // Create file form the blob
  const image = new File([blob], "canvas.png", { type: blob.type });

  // Check if the device is able to share these files then open share dialog
  if (navigator.canShare && navigator.canShare({ files: [image] })) {
    try {
      await navigator
        .share({
          url:
            window.location.href + "?id=" + localStorage.getItem("Kaalaa") ||
            "" + "&itemId=" + url + "-" + index,
          files: [image], // Array of files to share
          title: "shared by kaalaa.io", // Share dialog title
          text: "Provided by kaalaa.io",
        })
        .then(
          (e) => (bac = { status: true, message: "Image shared successfully" })
        );
    } catch (error) {
      bac = { status: false, message: "Sharing failed!" };
      console.log("Sharing failed!", error);
    }
    return bac;
  } else {
    console.log("This device does not support sharing files.");
    return {
      status: false,
      message: "This device does not support sharing files.",
    };
  }
}

window.fbAsyncInit = function () {
  window.FB.init({
    appId: "584076899715460",
    status: true,
    xfbml: true,
    version: "v2.7", // or v2.6, v2.5, v2.4, v2.3
  });

  shareToFaceBook();
  // loginToFacebook();
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

const shareToFaceBook = async function (image) {
  return new Promise(async (resolve, reject) => {
    try{
    if (image) {
      window.FB.getLoginStatus(async function (response) {
        if (response.status === "connected") {
          window.FB.ui(
            {
              method: "share",
              href: window.location.hostname + image,
              hashtag: "Kaalaa Reward Campaign " + window.location.href,
              redirect_uri: window.location.href,
            },
            (response) => {
              if (response && !response.error_message) {
                resolve({ status: true, message: "Image shared successfully" });
              } else {
                console.log({ response });
                resolve({ status: false, message: "Sharing failed!" });
              }
            }
          );
        } else {
          resolve({
            status: false,
            message:
              "Sharing failed, please login to facebook on this browser!",
          });
        }
      });
    } else
      resolve({
        status: false,
        message: "Sharing failed, please login to facebook on this browser!",
      });
    }catch(e){
      resolve({
        status: false,
        message: "An error occured while trying to share your image.",
      });
    }
  });
};

async function checkFacebookLogin() {
  return window.FB.getLoginStatus(async function (response) {
    if (response.status === "connected") {
      return true;
    } else {
      return false;
    }
  });
}

function loginToFacebook() {
  window.FB.login(function (response) {
    if (response.authResponse) {
      // proceed
      console.log("FB Login: ", true);
      return true;
    } else {
      // not auth / cancelled the login!
      console.log("FB Login: ", false);
      return false;
    }
  });
}

// async function shareToFaceBook(url) {
//   try {
//     const share = await init(url);
//     console.log({ share });
//     return share;
//   } catch (e) {
//     console.error(e);
//     return false;
//   }
// }

function convertImageToCanvas(image) {
  var canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.getContext("2d").drawImage(image, 0, 0);

  return canvas;
}

export { shareCanvasAsImage, shareToFaceBook };
