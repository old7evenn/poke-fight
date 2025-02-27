import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse {
  @ApiProperty({ description: 'Request status' })
  success!: boolean;

  @ApiProperty({ description: 'Error', nullable: true, required: false })
  reason?: string;
}
