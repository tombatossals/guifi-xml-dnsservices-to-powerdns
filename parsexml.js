var fs = require('fs'),
    parseString = require('xml2js').parseString;

fs.readFile(__dirname + '/ips.xml', 'ascii', function(err, xml) {

    parseString(xml, function (err, result) {
        if (result && result.cnml && result.cnml.subnet) {
            for (var i in result.cnml.subnet) {
                var subnet = result.cnml.subnet[i];
                subnet.IP.forEach(function(ip) {
                    var ip = ip.$;
                    var address = ip.address,
                        name = ip.nick;

                    console.log()
                    console.log(address, name);
                });
            };
        }
    });

});
