console.log("KĀĀlĀĀ script initiated");

let images = [];

function existArray(data, array) {
  const index = array.findIndex((object) => {
    return object?.data?.src === data?.data?.src;
  });

  return index;
}

setInterval(async () => {
  await images.forEach((img) => {
    const view = elementInViewport(img.data);
    const existImages = existArray(img, images);
    if (view && existImages !== -1) {
      let currImg = [...images];
      currImg[existImages] = {
        ...img,
        timer: img.timer === 0 ? 0 : img.timer - 1,
      };
      images = currImg;
      console.log("Current: ", images);
    }
  });
}, 2000);

function addImage(img) {
  const exist = existArray(img, images);
  // console.log("New image: ", images.some(e => e.data.src === img.src))
  if (!images.some(e => e.data.src === img.src) && img.src) {
    const size = `${img?.width}x${img?.height}`;
    // if (size === "100x100")
    console.log("Adding: ", exist)
    images.push({ data: img, timer: 10 });
  }
}

async function getAllImages() {
  await Array.prototype.map.call(document.images, function (i) {
    addImage(i);
  });
}

getAllImages()

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    getAllImages()
  }
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
