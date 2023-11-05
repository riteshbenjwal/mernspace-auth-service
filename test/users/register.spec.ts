import request from 'supertest';
import app from '../../src/app';

describe('POST /auth/register', () => {
    describe('Given all fields', () => {
        it('should return the 201 status code', async () => {
            //AAA -> arrange, act, assert
            //Arrange
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@email.com',
                password: '123456',
            };
            //Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            // Assert
            expect(response.statusCode).toBe(201);
        });

        it('should return valid json response', async () => {
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@email.com',
                password: '123456',
            };

            const response = await request(app)
                .post('/auth/register')
                .send(userData);

            expect(
                (response.headers as Record<string, string>)['content-type'],
            ).toEqual(expect.stringContaining('json'));
        });

        it('should persist the user in the database', async () => {
            //AAA -> arrange, act, assert
            //Arrange
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@email.com',
                password: '123456',
            };
            //Act
            await request(app).post('/auth/register').send(userData);

            // Assert
        });
    });

    describe('Fields are missing', () => {});
});
