const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "test-user-1",
  email: "testuser1@example.com",
  password: "testuser1@123",
  tokens: [{ token: jwt.sign({ _id: userOneId }, "taskManagerJwtSecret") }],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: "test-user-2",
    email: "testuser2@example.com",
    password: "testuser2@123",
    tokens: [{ token: jwt.sign({ _id: userTwoId }, "taskManagerJwtSecret") }],
  };

  const taskOne ={
    _id: new mongoose.Types.ObjectId(),
    task:"Test task 1",
    description: "Test Task 1 description",
    completed: false,
    owner: userOneId
  }
  const taskTwo ={
    _id: new mongoose.Types.ObjectId(),
    task:"Test task 2",
    description: "Test Task 2 description",
    completed: true,
    owner: userTwoId
  }
  const taskThree ={
    _id: new mongoose.Types.ObjectId(),
    task:"Test task 3",
    description: "Test Task 3 description",
    completed: false,
    owner: userOneId
  }

const setUpDatabase =async()=>{
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
}

module.exports ={
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setUpDatabase

}