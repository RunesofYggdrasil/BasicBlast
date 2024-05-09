const fetchDB = async (
  route: string,
  methodType: string,
  bodyString: string
) => {
  const routeString = "http://localhost:3000" + route;
  try {
    if (methodType == "GET") {
      const fetchResult = await fetch(routeString);
      const data = await fetchResult.json();
      return data;
    } else {
      const fetchResult = await fetch(routeString, {
        method: methodType,
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyString,
      });
      const data = await fetchResult.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default fetchDB;
