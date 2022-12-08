const url = [
    "http://kaalaa-server-env.eba-q2w26yfd.us-west-2.elasticbeanstalk.com/",
    "http://localhost:5050/",
  ];
  const baseURL = url[1];

async function request(url, obj) {
  try {
    // if (!obj.userId && url !== "user") return;
    var credentials = btoa(
      "a2FhbGFhX2FjY2VzcyB1c2VybmFtZQ==" +
        ":" +
        "a2FhbGFhX2FjY2VzcyBwYXNzd29yZA=="
    );

    const response = await fetch(baseURL + url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Content-Security-Policy": "upgrade-insecure-requests",
        Authorization: `Basic ${credentials}`,
      },
      body: JSON?.stringify(obj),
    });

    const data = await response.json();

    return data;
  } catch (e) {
    console.error(e);
    return {
      status: false,
      message: "An error occured, please try again later.",
    };
  }
}

export default request