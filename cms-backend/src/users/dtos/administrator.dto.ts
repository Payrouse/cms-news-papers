import { IsPhoneNumber, IsUUID } from 'class-validator';

export class CreateAdministratorDto {
  @IsUUID()
  readonly administratorId: string;

  @IsPhoneNumber()
  readonly phoneNumber: string;
}

export class UpdateAdministratorPhoneDto{
  @IsPhoneNumber()
  readonly phoneNumber: string;
}
