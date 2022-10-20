// ...............GPS
  const successCallback = (position) => {
    console.log("Location: ", position);
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  function handleClass(element, className, condition, timer) {
  const valid = element.classList.contains(className);
  if (condition) {
    if (!valid) {
      element.classList.add(className);
      element.setAttribute("timer", timer);
    }
  } else {
    if (valid) element.classList.remove(className);
  }
}