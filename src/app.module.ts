import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'path';
import { importSchema } from 'graphql-import';
import { resolvers } from './resolvers';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const typeDefs = importSchema(path.resolve('src/schema.graphql'));

@Module({
  imports: [
    GraphQLModule.forRoot({
        typeDefs,
        installSubscriptionHandlers: true,
        resolvers,
        context: async ({ req, connection }) => {
          return {
            ...req,
          };
        },
        debug: true,
        playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {

  constructor() {}

}