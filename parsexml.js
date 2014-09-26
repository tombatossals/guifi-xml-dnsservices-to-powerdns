var fs = require('fs'),
    parseString = require('xml2js').parseString;

var ZONEID_172 = 6,
    ZONEID_10 = 5;

var getReverseIP = function(ip) {
    var ipreverse = ip.split('.');
    ipreverse.reverse();
    return ipreverse.join('.') + '.in-addr.arpa';
};

fs.readFile(__dirname + '/ips.xml', 'ascii', function(err, xml) {

    console.log("delete from records where records.id in (select r1.id from (select r.id from domains d, records r where d.name='10.in-addr.arpa' and d.id = r.domain_id and r.type='PTR') as r1);")
    console.log("delete from records where records.id in (select r1.id from (select r.id from domains d, records r where d.name='16.172.in-addr.arpa' and d.id = r.domain_id and r.type='PTR') as r1);")

    parseString(xml, function (err, result) {
        if (result && result.cnml && result.cnml.subnet) {
            for (var i in result.cnml.subnet) {
                var subnet = result.cnml.subnet[i];
                subnet.IP.forEach(function(ip) {
                    var ip = ip.$;
                    var address = ip.address,
                        name = ip.nick;

                    var zoneid;
                    if (address.indexOf('172.16.') === 0) {
                        zoneid = ZONEID_172;
                    } else {
                        zoneid = ZONEID_10;
                    }
                    var reverseip = getReverseIP(address);
                    console.log("INSERT INTO `records` (`domain_id`, `name`, `type`, `content`, `ttl`, `prio`, `change_date`, `drupal_user`) VALUES (" + zoneid + ", '" + reverseip + "', 'PTR', '" + name + "', 604800, 0, NULL, NULL);");
                });
            };
        }
    });

});
