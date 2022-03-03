import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EntityCaseNamingStrategy, MikroORM } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import configuration from './config/configurations';
import { MoviesModule } from './modules/movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    LoggerModule.forRootAsync({
      providers: [ConfigService],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          pinoHttp: {
            level: configService.get('logger.level'),
            prettyPrint: {
              levelFirst: true,
              colorize: true,
              translateTime: true,
              singleLine: true,
            },
          },
          exclude: configService.get('logger.log.requests') ? [] : ['/(.*)'],
        };
      },
    }),
    MikroOrmModule.forRootAsync({
      // documentation ref: https://mikro-orm.io/docs/metadata-providers/
      providers: [ConfigService],
      inject: [ConfigService, PinoLogger],
      useFactory: (configService: ConfigService, logger: PinoLogger) => {
        logger.setContext('MikroORM');
        return {
          metadataProvider: TsMorphMetadataProvider,
          namingStrategy: EntityCaseNamingStrategy,
          entities: ['./dist/**/entities/*.entity.js'],
          entitiesTs: ['./src/**/entities/*.entity.ts'],
          debug: configService.get('logger.log.queries'),
          migrations: {
            path: './src/migrations',
            pattern: /^[\w-]+\d+\.js$/,
            emit: 'js',
            // disableForeignKeys: false, //https://github.com/mikro-orm/mikro-orm/issues/190
          },
          type: 'mysql',
          dbName: configService.get('database.name'),
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          user: configService.get('database.user'),
          password: configService.get('database.password'),
          logger: (msg): unknown => logger.debug(msg),
        };
      },
    }),
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly orm: MikroORM) {}

  async onApplicationBootstrap(): Promise<void> {
    try {
      const migrator = this.orm.getMigrator();
      await migrator.up();
    } catch (e) {
      console.error(e);
    }
  }
}
