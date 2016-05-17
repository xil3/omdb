# omdb

*** Installation ***

Bower will need to be installed, in order to install the dependencies. It can be installed using npm, with the following command.

npm install -g bower

Once bower is installed, run the following command, in the /vendors directory

bower install


*** Testing ***

To do the Jasmine tests, open tests/jasmine.html in a browser, and that should run those automatically.

For the integration tests, you'll need protractor installed - you can find out how @ http://www.protractortest.org/#/. Once that is installed, and the webdriver-manager is started, you can run the following command, under /tests.

protractor conf.js

