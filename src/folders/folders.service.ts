import { NotFoundException } from './../error/exceptions/NotFoundException';
import { DuplicateException } from './../error/exceptions/DuplicateException';
import { Folder, FolderDocument } from './folder.model';
import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FoldersService {
  constructor(
    @InjectModel('Folder') private readonly folderModel: Model<FolderDocument>,
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

  update(id: number, updateFolderDto: UpdateFolderDto) {
    return `This action updates a #${id} folder`;
  }

  remove(id: number) {
    return `This action removes a #${id} folder`;
  }

  async removeByName(name: string): Promise<string> {
    const folder = await this.folderModel.deleteOne({ name: name });
    if (folder.deletedCount === 0) {
      throw new NotFoundException(Folder.name, name);
    }
    return 'Successfully deleted';
  }
}
