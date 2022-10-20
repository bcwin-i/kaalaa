console.log("KĀĀlĀĀ script initiated");
import axios from "https://cdn.skypack.dev/axios";

let images = [];
let activeImages = [];
let user = {};

const getMeta = async () => {
  const res = await axios.get("https://geolocation-db.com/json/");
  const meta = navigator.userAgent;
  const userMata = {
    ip: res.data?.IPv4,
    metaData: meta.replaceAll(" ", ""),
  };

  user = userMata;
  console.log(user);
  return user;
};

async function addTracking(obj) {
  const resquest = axios({
    url: `http://localhost:5050/track/add`,
    method: "POST",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
    data: obj,
  });
}

function existArray(data, array) {
  const index = array.findIndex((object) => {
    return object?.data?.src === data?.data?.src;
  });

  return index;
}

function createWrapper(img) {
  const id = img.data.src + "-" + img.index;
  let htmlObject = document.createElement("div");
  htmlObject.className = "product_wrapper";
  htmlObject.id = img.data.src + "-" + img.index + "_mainwrapper";

  let imageWrapper = document.createElement("div");
  imageWrapper.className = "product_image_wrapper";

  const Icon = new Image();
  Icon.className = "product_image";
  Icon.src = "https://cdn-icons-png.flaticon.com/512/833/833655.png";

  // let Row = document.createElement("p");
  // Row.className = "row";
  // Row.appendChild(Icon);

  // let Timer = document.createElement("span");
  // Timer.id = img.data.src + "?" + img.index;
  // Timer.innerHTML = img.timer - 1 + " secs";
  // Row.appendChild(Timer);

  // let Overlay = document.createElement("div");
  // Overlay.className = "overlay";
  // Overlay.appendChild(Row);

  let timerWrapper = document.createElement("div");
  timerWrapper.className = "timer_container";
  timerWrapper.id = id;

  timerWrapper.innerHTML = `<svg xmlns:svg="http://www.w3.org/2000/svg" 
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

  let image = new Image(img.data.width, img.data.height);
  image.src = img.data.src;
  image.alt = img.data.alt;
  image.className = "product_image";
  imageWrapper.appendChild(image);
  imageWrapper.appendChild(timerWrapper);

  let productName = document.createElement("h2");
  productName.innerText = "Product name#";
  productName.className = "product_name";

  let productDesc = document.createElement("p");
  productDesc.innerText = "Descrition of the prodcut";
  productDesc.className = "product_desc";

  let button = document.createElement("button");
  button.innerText = "BUY FOR $10";
  button.className = "product_button";
  button.id = id + "_product_button";

  htmlObject.appendChild(imageWrapper);
  htmlObject.appendChild(productName);
  htmlObject.appendChild(productDesc);
  htmlObject.appendChild(button);

  img.data.replaceWith(htmlObject);
}

function startTimer() {
  setInterval(async () => {
    await images.forEach((img) => {
      const id = img.data.src + "-" + img.index;
      const element = document.getElementById(id);
      const view = element
        ? elementInViewport(element)
        : elementInViewport(img.data);
      const existImages = existArray(img, images);

      if (view && existImages !== -1) {
        let currImg = [...images];
        currImg[existImages] = {
          ...img,
          timer: img.timer === 0 ? 0 : img.timer - 1,
        };
        images = currImg;

        if (currImg[existImages].timer - 1 === 0)
          addTracking({
            itemID: id,
            userID: getCookie("Kaalaa"),
          });

        const timer = document.getElementById(id);
        const active = activeImages.findIndex((e) => e.index === img.data.src);
        if (timer && active !== -1) {
          timer.innerHTML =
            images[existImages].timer === 0
              ? "Watched"
              : images[existImages].timer;
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
    const size = `${img.width}x${img.height}`;
    // console.log("Size: ", size)
    if (size === "100x100") {
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
  if (document.readyState === "complete") {
    // getAllImages();
    getMeta();

    let cookie = getCookie("Kaalaa");
    if (!cookie) {
      if (localStorage.getItem("Kalaa")) {
        setCookie("Kaalaa", localStorage.getItem("Kalaa"), 1);
        createDownload();
      } else
        await getMeta()
          .then(async (data) => {
            const res = await axios({
              url: `http://localhost:5050/user`,
              method: "POST",
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              },
              data,
            });

            if (res.data?.status) {
              localStorage.setItem("Kalaa", getCookie("Kaalaa"));
              createDownload();
            }
          })
          .catch((e) => console.error(e));
    } else createDownload();

    getAllImages();
    startTimer();
  }
};

async function generateQRCode(data) {
  // console.log("QR generator called: ", data);
  const container = document.querySelector("#QRContainer");
  console.log("Container: ", container);
  const res = await new QRCode(container, {
    text: `${data}`,
    width: 180, //default 128
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  console.log("QR resilts: ", res);
  // images[0].data.appendChild(res)
}

async function createDownload() {
  const newdiv = document.createElement("div");
  newdiv.id = "QRContainer";
  newdiv.style.padding = "20px";
  document.body.appendChild(newdiv);

  const downloadlink = document.createElement("a");
  downloadlink.href =
    "https://drive.google.com/file/d/19n93mxv6WOFo6DCMu-_zwuz4lC1vUvso/view?usp=sharing";
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
  const idPlain = id?.split("-")[0];

  const timer_container = document.getElementById(
    id?.replace("_mainwrapper", "")
  );
  const button = document.getElementById(idPlain + "_product_button");
  console.log(id + "_product_button", button);

  // console.log("Plain", activeImages);
  if (id.includes("_")) {
    setTimeout(() => {
      const imagesExist = images.findIndex((e) => e?.data?.src === idPlain);
      const activeExist = activeImages.findIndex(
        (e) => e?.data?.src === idPlain
      );

      // console.log(imagesExist, activeExist);
      // console.log({ id: idPlain, idExist: images[0]?.data?.src });
      if (activeExist === -1 && imagesExist !== -1) {
        activeImages.push(images[imagesExist]);
      }
      console.log("Active: ", activeImages);
      timer_container.style.opacity = 1;
      if (button) {
        // button?.style?.width = "100%";
        // button?.style?.height = "48px";
      }
    }, 3000);
  }
});

document.addEventListener("mouseout", (e) => {
  const id = e.target.id;
  const idPlain = id?.split("-")[0];

  const timer_container = document.getElementById(
    id?.replace("_mainwrapper", "")
  );

  console.log(timer_container.style.id);

  if (id.includes("_")) {
    activeImages = activeImages.filter((e) => e?.data?.src !== idPlain);
  }
});
