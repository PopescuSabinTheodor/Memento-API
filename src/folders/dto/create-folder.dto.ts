import { User } from 'src/users/user.model';

export class CreateFolderDto {
  name: string;
  owner: User;
}
