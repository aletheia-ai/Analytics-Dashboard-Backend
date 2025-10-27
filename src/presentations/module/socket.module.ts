import { Module } from '@nestjs/common';

import { AppGateway } from '@src/utils/shared/socket';
@Module({
  providers: [AppGateway],
  exports: [AppGateway],
})
export class SocketModule {}
