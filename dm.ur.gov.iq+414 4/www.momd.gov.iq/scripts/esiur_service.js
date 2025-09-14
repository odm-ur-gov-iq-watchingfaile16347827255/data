var service;

async function esiurService() {
  try {
    //service = await wh.get("iip://localhost:5139/sys/service");

    service = await wh.get("iip://momd.gov.iq:443/sys/service", {
      secure: true,
      wsUrl: "iip",
    });

    return service;
  } catch (error) {
    return error;
  }
}
