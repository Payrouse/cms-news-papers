import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ComplaintStatus } from "../models/ComplaintEnum";

export class CreateComplaintDto{
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @IsString()
    @IsNotEmpty()
    readonly description: string
}

export class ChangeComplaintStatusDto{
    @IsEnum(ComplaintStatus)
    @IsNotEmpty()
    readonly status: ComplaintStatus
}