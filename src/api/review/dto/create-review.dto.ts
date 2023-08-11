import { IsNotEmpty, Max, Min } from 'class-validator';

export class CreateReviewDTO {
  @IsNotEmpty()
  public sushiId: number;

  @IsNotEmpty()
  public contents: string;

  @IsNotEmpty()
  @Min(0)
  @Max(5)
  public stars: number;
}
