import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateJournalistDto{
    @IsUUID()
    @IsNotEmpty()
    readonly userId: string

    @IsString()
    @IsNotEmpty()
    readonly dni: string

    @IsString()
    @IsNotEmpty()
    readonly socialSecurityNumber: string

    @IsEmail()
    @IsNotEmpty()
    readonly publicEmail: string

    @IsString()
    @IsNotEmpty()
    readonly branch: string
}

export class UpdateJournalistDto{
    @IsUUID()
    @IsNotEmpty()
    readonly journalistId: string


    @IsString()
    @IsOptional()
    @IsNotEmpty()
    readonly socialSecurityNumber: string

    @IsEmail()
    @IsOptional()
    @IsNotEmpty()
    readonly publicEmail: string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    readonly branch: string
}