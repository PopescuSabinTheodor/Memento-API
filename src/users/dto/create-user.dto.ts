import { Folder } from 'src/folders/folder.model';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  folder: Folder[];
}
