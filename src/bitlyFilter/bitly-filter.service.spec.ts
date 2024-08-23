import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const expectCorrectMention = (text: string) => {
    return request(app.getHttpServer())
      .get('/filter-bitly')
      .query({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.arrayContaining(['bitly']));
      });
  };

  it('should include relevant mentions of Bitly in text: "Bitly is a great tool for shortening URLs."', async () => {
    await expectCorrectMention('Bitly is a great tool for shortening URLs.');
  });

  it('should include relevant mentions of Bitly in text: "Bitly is not working as good as I would like to."', async () => {
    await expectCorrectMention(
      'Bitly is not working as good as I would like to.',
    );
  });

  it('should include relevant mentions of Bitly in text: "The Bitly service is down again."', async () => {
    await expectCorrectMention('The Bitly service is down again.');
  });

  it('should include relevant mentions of Bitly in text: "Bitly is a company that provides link shortening services."', async () => {
    await expectCorrectMention(
      'Bitly is a company that provides link shortening services.',
    );
  });

  it('should include relevant mentions of Bitly in text: "Bitly has a new feature for business users."', async () => {
    await expectCorrectMention('Bitly has a new feature for business users.');
  });

  it('should include relevant mentions of Bitly in text: "The platform Bitly offers is very reliable."', async () => {
    await expectCorrectMention('The platform Bitly offers is very reliable.');
  });

  it('should include relevant mentions of Bitly in text: "I encountered an issue with Bitly links today."', async () => {
    await expectCorrectMention(
      'I encountered an issue with Bitly links today.',
    );
  });

  it('should include relevant mentions of Bitly in text: "There was a downtime reported by Bitly users."', async () => {
    await expectCorrectMention('There was a downtime reported by Bitly users.');
  });

  it('should include relevant mentions of Bitly in text: "Bitly is offering a refund due to service failures."', async () => {
    await expectCorrectMention(
      'Bitly is offering a refund due to service failures.',
    );
  });

  it('should include relevant mentions of Bitly in text: "Bitly is a startup in the tech industry."', async () => {
    await expectCorrectMention('Bitly is a startup in the tech industry.');
  });

  it('/filter-bitly (GET) should exclude short links like https://bit.ly/3YX4Nr9', () => {
    const text = 'Check out this link: https://bit.ly/3YX4Nr9';
    return request(app.getHttpServer())
      .get('/filter-bitly')
      .query({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(0);
      });
  });
});
