const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setUpDatabase} = require('./fixtures/db')


beforeEach(setUpDatabase);

test('should create a task for user',async() => {
    const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        task:'Test task',
        description: 'Test task description',
        completed: false
    })
    .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.task).toBe('Test task')
 
})

test('should not create a task with invalid data',async() => {
    await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({})
    .expect(400)
})

test('should get all tasks for userOne',async() => {
    const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200)

    const tasks = response.body
    expect(tasks.length).toBe(2)
    expect(tasks[0].task).toBe('Test task 1')
    expect(tasks[1].task).toBe('Test task 3')
})

test('should not delete other users task',async() => {
    const response=await request(app)
    .delete(`/tasks/${taskTwo._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(404)

    const task = await Task.findById(taskTwo._id)
    expect(task).not.toBeNull()
})