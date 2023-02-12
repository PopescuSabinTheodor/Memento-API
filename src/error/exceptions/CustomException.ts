export abstract class CustomException {
  constructor(status: number, message: string, timestamp: string) {
    this.status = status;
    this.message = message;
    this.timestamp = timestamp;
  }
  private status: number;
  private message: string;
  private path: string;
  private timestamp: string;

  public getMessage(): string {
    return this.message;
  }

  public getStatus(): number {
    return this.status;
  }

  public getTimestamp(): string {
    return this.timestamp;
  }

  public getPath(): string {
    return this.path;
  }
}
