console.log("KĀĀlĀĀ script initiated");

const url = ["https://kaalaa-app.herokuapp.com/", "http://localhost:5050/"];
const baseURL = url[1];
const auth = {
  username: "a2FhbGFhX2FjY2VzcyB1c2VybmFtZQ==",
  password: "a2FhbGFhX2FjY2VzcyBwYXNzd29yZA==",
};

const isMobile =
  navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i);
let images = [];
let activeImages = [];
let active = "";
let user = {};
const stopTime = `
<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="46" height="46" fill="url(#pattern0)"/>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_62_542" transform="scale(0.005)"/>
</pattern>
<image id="image0_62_542" width="200" height="200" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
`;
const moveTime = `<svg xmlns:svg="http://www.w3.org/2000/svg" 
xmlns="http://www.w3.org/2000/svg" 
xmlns:xlink="http://www.w3.org/1999/xlink"
version="1.0" width="64px" height="64px" 
viewBox="0 0 128 128" xml:space="preserve">
<rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF"/>
<g>
<path d="M63.88 0A63.88 63.88 0 1 1 0 63.88 63.88 63.88 0 0 1 63.88 0zm0 11.88a52 52 0 1 1-52 52 52 52 0 0 1 52-52zm0 46.2a5.8 5.8 0 1 1-5.8 5.8 5.8 5.8 0 0 1 5.8-5.8z" fill-rule="evenodd" fill="#000000"/>
<path d="M58.25 5h11.3v59h-11.3V5z" fill="#000000"/>
<animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="2880ms" repeatCount="indefinite"/>
</g>
</svg>`;
const reward = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="10" cy="8" r="2.5" stroke="black"/>
<path d="M10.5248 1.81414C10.2332 1.52854 9.76679 1.52854 9.4752 1.81414L8.02577 3.23379L5.99702 3.25485C5.5889 3.25908 5.25908 3.5889 5.25485 3.99702L5.23379 6.02577L3.81414 7.4752C3.52854 7.76679 3.52854 8.23321 3.81414 8.5248L5.23379 9.97423L5.25485 12.003C5.25908 12.4111 5.5889 12.7409 5.99702 12.7452L8.02577 12.7662L9.4752 14.1859C9.76679 14.4715 10.2332 14.4715 10.5248 14.1859L11.9742 12.7662L14.003 12.7452C14.4111 12.7409 14.7409 12.4111 14.7452 12.003L14.7662 9.97423L16.1859 8.5248C16.4715 8.23321 16.4715 7.76679 16.1859 7.4752L14.7662 6.02577L14.7452 3.99702C14.7409 3.5889 14.4111 3.25908 14.003 3.25485L11.9742 3.23379L10.5248 1.81414Z" stroke="black" stroke-linejoin="round"/>
<path d="M7 12.5V18.5L10 17.0333M13 12.5V18.5L10 17.0333M10 17.0333V14.1667" stroke="black" stroke-linejoin="round"/>
</svg>
`;

const getMeta = async () => {
  let res;
  await fetch("https://geolocation-db.com/json/").then(async (e) => {
    await e.json().then((obj) => {
      res = obj;
    });
  });

  const meta = navigator.userAgent;
  const userMata = {
    ip: res?.IPv4,
    metaData: meta.replaceAll(" ", ""),
  };

  user = userMata;
  return user;
};

async function request(url, obj) {
  // if (!obj.userId && url !== "user") return;
  var credentials = btoa(
    "a2FhbGFhX2FjY2VzcyB1c2VybmFtZQ==" +
      ":" +
      "a2FhbGFhX2FjY2VzcyBwYXNzd29yZA=="
  );

  var auth = { Authorization: `Basic ${credentials}` };

  const response = await fetch(baseURL + url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify(obj),
  });

  const data = await response.json();
  console.log("Req res: ", data)
  return data
}

function existArray(data, array) {
  const index = array.findIndex((object) => {
    return object?.data?.src === data?.data?.src;
  });

  return index;
}

function createWrapper(img) {
  const id = /*img.data.src + "-" +*/ img.index;
  let htmlObject = document.createElement("div");
  htmlObject.className = "product_wrapper";
  // htmlObject.id = id + "_mainwrapper";
  htmlObject.setAttribute("data-timer", img.data.src + "-" + img.index);

  let imageWrapper = document.createElement("div");
  imageWrapper.className = "product_image_wrapper";

  const Icon = new Image();
  Icon.className = "product_image";
  Icon.src = "https://cdn-icons-png.flaticon.com/512/833/833655.png";

  let timerWrapper = document.createElement("div");
  timerWrapper.className = "timer_container";
  timerWrapper.id = img.data.src + "-" + img.index;

  timerWrapper.innerHTML = moveTime;

  let image = new Image(img.data.width, img.data.height);
  image.src = img.data.src;
  image.alt = img.data.alt;
  image.id = id + "_mainwrapper";
  image.style.cursor = "pointer";
  image.setAttribute("data-timer", img.data.src + "-" + img.index);
  // image.className = "product_image";
  imageWrapper.appendChild(image);
  imageWrapper.appendChild(timerWrapper);

  let productName = document.createElement("h2");
  productName.innerText = "Product name#";
  productName.className = "product_name";

  let productDesc = document.createElement("p");
  productDesc.innerText = "Descrition of the prodcut";
  productDesc.className = "product_desc";

  let button = document.createElement("button");
  button.innerText = "BUY FOR $1";
  button.className = "product_button";
  button.id = id + "_product_button";
  // button.setAttribute("data-timer", img.data.src + "-" + img.index);

  htmlObject.appendChild(imageWrapper);
  // htmlObject.appendChild(productName);
  // htmlObject.appendChild(productDesc);
  // htmlObject.appendChild(button);

  img.data.replaceWith(htmlObject);
}

function startTimer() {
  setInterval(async () => {
    await images.forEach((img) => {
      const id = /*img.data.src + "-" +*/ img.index;
      const timer = document.getElementById(img.data.src + "-" + img.index);
      const element = document.getElementById(img.data.src + "-" + img.index);
      const view = element
        ? elementInViewport(element)
        : elementInViewport(img.data);
      const existImages = existArray(img, images);
      const active = activeImages.findIndex(
        (e) => e === img?.index?.toString()
      );
      // console.log(view, existImages);
      // if (view && isMobile && timer) {
      //   timer.innerHTML = moveTime;
      // }
      // if (!view && isMobile && timer) {
      //   timer.innerHTML = stopTime;
      // }

      if (view && existImages !== -1) {
        let currImg = [...images];
        // console.log("Active: ", active)
        if (!isMobile) {
          if (active !== -1) {
            currImg[existImages] = {
              ...img,
              timer: img.timer === 0 ? 0 : img.timer - 1,
            };
          }
        } else {
          currImg[existImages] = {
            ...img,
            timer: img.timer === 0 ? 0 : img.timer - 1,
          };
        }

        images = currImg;

        if (currImg[existImages].timer - 1 === 0)
          request("track/add", {
            itemId: id,
            userId: getCookie("Kaalaa"),
          });
        // console.log(img.data.src + "-" + img.index, timer)

        const button = document.getElementById(img.index + "_product_button");

        if (timer) {
          if (images[existImages].timer === 0) {
            button ? (button.style.display = "flex") : null;
            timer.style.width = "max-content";
            timer.style.opacity = 1;
            timer.innerHTML = reward + " Claim for $1";
            timer.setAttribute("data-timer", img.data.src + "-" + img.index);
            timer.setAttribute("data-reward", "yes");
          }
        } else {
          createWrapper(img);
        }
      }
    });

    // console.log("Images: ", images);
  }, 1000);
}

function addImage(img) {
  const exist = existArray(img, images);
  // console.log("New image: ", images.some(e => e.data.src === img.src))
  if (!images.some((e) => e.data.src === img.src) && img.src) {
    const size = { width: img.width, height: img.height };
    // console.log("Size: ", img.height !== 180.5 && img.width !== 180.5)
    if (img.height !== 180 && img.width !== 180)
      if (size.height >= 100 && size.width >= 100) {
        const index = images.length + 1;
        images.push({ data: img, index, timer: 10, active: false });
      }
  }
}

async function getAllImages() {
  await Array.prototype.map.call(document.images, function (i) {
    addImage(i);
  });
}

document.onreadystatechange = async () => {
  // console.log("Platform Mobile: ", isMobile);
  if (document.readyState === "complete") {
    // getAllImages();
    getMeta();

    let cookie = getCookie("Kaalaa");
    if (!cookie) {
      if (localStorage.getItem("Kaalaa")) {
        setCookie("Kaalaa", localStorage.getItem("Kaalaa"), 1);
        createDownload();
      } else
        await getMeta()
          .then(async (data) => {
            const res = await request("user", data);
            // console.log("Token: ", res)
            if (res.status) {
              setCookie("Kaalaa", res?.token, 1);
              localStorage.setItem("Kaalaa", res?.token);
              createDownload();
            }
          })
          .catch((e) => console.error(e));
    } else {
      if (!localStorage.getItem("Kaalaa")) {
        localStorage.setItem("Kaalaa", getCookie("Kaalaa"));
      }
      createDownload();
    }

    getAllImages();
    // console.log("Images: ", images);
    startTimer();
  }
};

async function generateQRCode(data) {
  // console.log("QR generator called: ", data);
  const container = document.querySelector("#QRContainer");
  // console.log("Container: ", container);
  const res = await new QRCode(container, {
    text: `${data}`,
    width: 180, //default 128
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  // console.log("QR resilts: ", res);
  // images[0].data.appendChild(res)
}

async function createDownload() {
  const newdiv = document.createElement("div");
  newdiv.id = "QRContainer";
  newdiv.style.padding = "20px";
  document.body.appendChild(newdiv);

  const downloadlink = document.createElement("a");
  downloadlink.href = ` https://play.google.com/store/apps/details?id=com.kaalaa_app&referrer=utm_source%3Dgoogle%26utm_campaign%3D${getCookie(
    "Kaalaa"
  )}`;
  downloadlink.target = "_blank";
  downloadlink.className = "downloadQR";
  downloadlink.innerText = "Download App";

  await generateQRCode(getCookie("Kaalaa"));

  const newdiv2 = document.createElement("div");
  newdiv2.style.padding = "20px";
  document.body.appendChild(newdiv2);

  newdiv2.appendChild(downloadlink);
}

window.onscroll = async function (e) {
  getAllImages();
};

function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    top + height <= window.pageYOffset + window.innerHeight &&
    left + width <= window.pageXOffset + window.innerWidth
  );
}

function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");

  // Loop through the array elements
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");

    /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
    if (name == cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }

  // Return null if not found
  return null;
}

function setCookie(name, value, daysToLive) {
  // Encode value in order to escape semicolons, commas, and whitespace
  var cookie = name + "=" + encodeURIComponent(value);

  if (typeof daysToLive === "number") {
    /* Sets the max-age attribute so that the cookie expires
      after the specified number of days */
    cookie += "; max-age=" + daysToLive * 24 * 60 * 60;

    document.cookie = cookie;
  }
}

document.addEventListener("mouseover", (e) => {
  const id = e.target.id;
  // console.log("attribute: ", e.target.dataset.timer);
  // id.attributes
  const idPlain = splitGetIndex(id);
  // console.log(active, idPlain);

  const timer_container = document.getElementById(e.target.dataset.timer);

  console.log("Plain: ", idPlain);
  // console.log("Sure: ", images[0].index);
  if (id.includes("_")) {
    setTimeout(() => {
      const active = e.target.matches(":hover");
      const imagesExist = images.findIndex(
        (e) => e?.index?.toString() === idPlain
      );
      const activeExist = activeImages.findIndex((e) => e === idPlain);

      console.log({
        activeExist,
        imagesExist,
        idPlain,
        active,
      });
      if (
        activeExist === -1 &&
        imagesExist !== -1 &&
        idPlain &&
        idPlain !== "" &&
        !isMobile &&
        active
      ) {
        activeImages.push(idPlain);
        timer_container.innerHTML = moveTime;
      }
      // console.log("Active: ", activeImages);
      timer_container.style.opacity = 1;
    }, 3000);
  }
});

document.addEventListener("mouseout", (e) => {
  const id = e.target.id;
  const idPlain = splitGetIndex(id);
  // console.log("Plain leave: ", idPlain);
  active = "";

  activeImages = activeImages.filter((e) => e !== idPlain);
  const timer = document.getElementById(e.target.dataset.timer);
  if (timer)
    timer.innerHTML =
      timer.style.width === "max-content" ? reward + " Claim for $1" : stopTime;

  console.log("Active: ", activeImages);
});

document.addEventListener("click", (e) => {
  const id = e.target.id;
  const itemId = e.target.dataset.timer;
  const reward = e.target.dataset.reward;

  if (itemId && reward) {
    request("reward/add", {
      itemId,
      userId: getCookie("Kaalaa"),
      amount: 1,
    });
  }
});

function splitGetIndex(id) {
  return id?.split("_")[0];
}
