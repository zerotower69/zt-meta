"use strict";
class Client {
    constructor(host, user, port = "3306", password) {
        this.host = host;
        this.user = user;
        this.port = port;
        this.password = password;
    }
}
module.exports = Client;
