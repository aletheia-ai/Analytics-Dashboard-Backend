import { Module } from "@nestjs/common";
import { AppController } from "../controller/app.controller";
import { AppService } from "../../applications/use-case/app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
