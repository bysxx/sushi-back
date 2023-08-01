import { IsNotEmpty } from "class-validator";

export class CreateSushiDTO {
	@IsNotEmpty()
	public name: string;

  @IsNotEmpty()
	public location: string;
  
  @IsNotEmpty()
  public phone: string;
}