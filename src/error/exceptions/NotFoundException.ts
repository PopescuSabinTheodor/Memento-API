import { CustomException } from './customException';

export class NotFoundException extends CustomException {
  constructor(resourceType: string, resourceValue: string) {
    super(
      404,
      `Resource of type <${resourceType}> and value <${resourceValue}> was not found.`,
      new Date().toISOString(),
    );
  }
}
