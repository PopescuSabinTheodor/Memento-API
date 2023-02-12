import { CustomException } from './customException';

export class DuplicateException extends CustomException {
  constructor(resourceType: string) {
    super(409, `${resourceType} already exists.`, new Date().toISOString());
  }
}
