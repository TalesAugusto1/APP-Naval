export class Server {
  db: any;
  namespace: string = '';

  constructor(config?: any) {
    this.db = {
      schools: [],
      classes: [],
    };
    if (config) {
      config.call(this);
    }
  }

  get(path: string, handler: any) {
    return { path, handler };
  }

  post(path: string, handler: any) {
    return { path, handler };
  }

  put(path: string, handler: any) {
    return { path, handler };
  }

  patch(path: string, handler: any) {
    return { path, handler };
  }

  delete(path: string, handler: any) {
    return { path, handler };
  }

  shutdown() {
    // Mock shutdown
  }
}

export const createServer = (config?: any) => new Server(config);

export default {
  Server,
  createServer,
};
