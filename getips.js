var casper = require('casper').create();

if (!casper.cli.args.length === 2) {
    casper.echo('Usage: casperjs manage.js <username> <password>');
    casper.exit();
}

var user = casper.cli.get(0),
    password = casper.cli.get(1);

if (user && password) {
    casper.start('http://guifi.net/user/login', function() {
        casper.waitForSelector('form#user-login', function() {
          this.fill('form#user-login', { name: username, pass: password }, true);
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
