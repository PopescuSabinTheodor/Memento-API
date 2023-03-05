import { NotFoundException } from './../error/exceptions/NotFoundException';
import { DuplicateException } from './../error/exceptions/DuplicateException';
import { Folder, FolderDocument } from './folder.model';
import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDocument } from 'src/users/user.model';

@Injectable()
export class FoldersService {
  constructor(
    @InjectModel('Folder') private readonly folderModel: Model<FolderDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createFolderDto: CreateFolderDto): Promise<Folder> {
    const exists = await this.folderModel.exists({
      name: createFolderDto.name,
    });
    if (exists) {
      throw new DuplicateException(Folder.name);
    }
    const createdFolder = new this.folderModel(createFolderDto);
    return createdFolder.save();
  }

  findAll(): Promise<Folder[]> {
    return this.folderModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} folder`;
  }

  async findOneByName(name: string): Promise<Folder> {
    const folder = await this.folderModel.findOne({ name: name });
    if (!folder) {
      throw new NotFoundException(Folder.name, name);
    }
    return folder;
  }

  async update(id: string, updateFolderDto: UpdateFolderDto) {
    const folder = await this.folderModel
      .findByIdAndUpdate(
        { _id: id },
        {
          name: updateFolderDto.name,
          owner: new Types.ObjectId(updateFolderDto.owner),
        },
        { new: true },
      )
      .exec();
    if (!folder) {
      throw new NotFoundException(Folder.name, id);
    }
    return folder;
  }

  async remove(id: string): Promise<string> {
    const folder = await this.folderModel.deleteOne({ _id: id });
    if (folder.acknowledged === true && folder.deletedCount > 0) {
      return `Folder with id ${id} deleted`;
    } else {
      throw new NotFoundException(Folder.name, id);
    }
  }
}
