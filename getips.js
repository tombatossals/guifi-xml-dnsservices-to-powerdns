var casper = require('casper').create();

if (!casper.cli.args.length === 2) {
    casper.echo('Usage: casperjs manage.js <username> <password>');
    casper.exit();
}

var user = casper.cli.get(0),
    pass = casper.cli.get(1);

if (user && pass) {
    casper.start('http://guifi.net/user/login', function() {
        casper.waitForSelector('form#user-login', function() {
          this.fill('form#user-login', { name: user, pass: pass }, true);
        });
    });

    casper.then(function() {
        casper.open('http://guifi.net/dump/ips');
    });

    casper.run(function() {
        this.echo(this.getPageContent());
        casper.exit();
    });

} else {
    casper.exit();
}
