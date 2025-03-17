import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Logger } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
    })
      .setLogger(new Logger())
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  // describe('topic', () => {
  //   it('should create a topic', () => {
  //     return request(app.getHttpServer())
  //       .post('/graphql')
  //       .send({
  //         query: `
  //             mutation CreateTopic($name: String!) {
  //                 createTopic(name: {
  //                     "name": "Оборона Смоленска"
  //                     })
  //                 {
  //                     id
  //                     name
  //                 }
  //             }
  //           `,

  //       })
  //       .expect(200)
  //       .expect((res) => {
  //         expect(res.body.data.createTopic).toEqual({
  //           id: 1,
  //           name: 'Оборона Смоленска',
  //         });
  //       });
  //   });
  // });
});
