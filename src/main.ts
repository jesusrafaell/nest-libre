import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
//import https from 'https';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  await app.listen(8000);
  console.log(`
    #       ### ######  ######  ####### ######     #     #####  ####### 
    #        #  #     # #     # #       #     #   # #   #     # #     # 
    #        #  #     # #     # #       #     #  #   #  #       #     # 
    #        #  ######  ######  #####   ######  #     # #  #### #     # 
    #        #  #     # #   #   #       #       ####### #     # #     # 
    #        #  #     # #    #  #       #       #     # #     # #     # 
    ####### ### ######  #     # ####### #       #     #  #####  ####### 
  Application is running on: ${await app.getUrl()}
  `);
}
bootstrap();
