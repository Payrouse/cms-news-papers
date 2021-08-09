import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreatePublisherDto{
    @IsUUID()
    @IsNotEmpty()
    readonly userId: string

    @IsString()
    @IsNotEmpty()
    readonly section: string
}

export class UpdatePublisherDto{
    @IsUUID()
    @IsNotEmpty()
    readonly publisherId: string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    readonly section: string
}