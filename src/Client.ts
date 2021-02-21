class Client {
  host: string;
  port?: string;
  user: string;
  password?: string;
  constructor(host: string, user: string, port: string = "3306", password?: string) {
    this.host = host;
    this.user = user;
    this.port = port;
    this.password = password;
  }
}

export default Client