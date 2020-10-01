get_lan_ip = function() {
  var os = require("os");

  var interfaces = os.networkInterfaces();

  const interface = Object.keys(interfaces).find(interface =>
    interface.match(/以太网|Ethernet|eno1/)
  );

  const adapter = interfaces[interface];

  const address = adapter.find(
    address => address.family === "IPv4" && !address.internal
  );

  return address.address;
};

module.exports = { get_lan_ip };
