import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  message: Message[] = [];
  clientToUser = {};

  create(createMessageDto: CreateMessageDto, clientId: string) {
    const message = {
      fullName: createMessageDto.fullName,
      name: this.clientToUser[clientId],
      text: createMessageDto.text
    };

    this.message.push(createMessageDto);
    return message;
  }

  findAll() {
    return this.message;
  }

  identify(name: string, cliendId: string) {
    this.clientToUser[cliendId] = name;

    return Object.values(this.clientToUser);
  }

  getClientName(cliendId: string) {
    return this.clientToUser[cliendId];
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
}
