import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { UniqueUserFieldsEnum } from './enums/unique-user-fields.enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserDto): Promise<void> {
    await this.validateUserExists(data);
    await this.userRepository.createUser(data);
  }

  async validateUserExists(data: CreateUserDto): Promise<void> {
    const filters = [
      { key: UniqueUserFieldsEnum.EMAIL, value: data.email },
      { key: UniqueUserFieldsEnum.CPF, value: data.cpf },
      { key: UniqueUserFieldsEnum.PHONE, value: data.phone },
    ];

    if (data.cnpj)
      filters.push({ key: UniqueUserFieldsEnum.CNPJ, value: data.cnpj });

    const existingUser =
      await this.userRepository.findByMultipleParams(filters);

    if (existingUser) {
      const conflictField = filters.find(
        (filter) => existingUser[filter.key] === filter.value,
      );

      if (conflictField) {
        throw new HttpException(
          `User with ${conflictField.key} ${conflictField.value} already exists.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
