import request from 'supertest';
import app from '../../src/app';
import { DataSource } from 'typeorm';
import { truncateTables } from '../utils';
import { AppDataSource } from '../../src/config/data-source';
import { User } from '../../src/entity/User';

describe('POST /auth/register', () => {
    let connection: DataSource;

    beforeAll(async () => {
        connection = await AppDataSource.initialize();
    });

    beforeEach(async () => {
        // Database truncate
        await truncateTables(connection);
    });

    afterAll(async () => {
        await connection.destroy();
    });

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

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();

            expect(users).toHaveLength(1);
            expect(users[0].firstName).toBe(userData.firstName);
            expect(users[0].lastName).toBe(userData.lastName);
            expect(users[0].email).toBe(userData.email);
        });

        it('should return an id of created user', async () => {
            //Arrange
            const userData = {
                firstName: 'John',
                lastName: 'Kho',
                email: 'johnho@email.com',
                password: '123456',
            };

            //Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData);

            //Assert
            expect(response.body).toHaveProperty('id');

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();

            expect((response.body as Record<string, string>).id).toBe(
                users[0].id,
            );
        });
    });

    describe('Fields are missing', () => {});
});
