const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const {userOne,userOneId,setUpDatabase} = require('./fixtures/db')


beforeEach(setUpDatabase);
test("should signup a new user", async () => {
  const response =await request(app)
    .post("/users")
    .send({
      name: "karter smith",
      email: "karter@example.com",
      password: "karter@123",
    })
    .expect(201);

    //Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    //Assert that the response has the correct properties
    expect(response.body.user).toMatchObject({
            name: "karter smith",
            email: "karter@example.com",
    })
    expect(user.password).not.toBe("karter@123")
});

test("should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({ email: userOne.email, password: userOne.password })
    .expect(200);

    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
});
    
test("should not login non-existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({ email: "non-existing-email", password: "non-existing-password" })
    .expect(401);
});
test("should get user profile", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);
});

test("should not get user profile if not authenticated", async () => {
  await request(app)
    .get("/users/me")
    .expect(401);
});

test("should delete user profile", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200)

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
})

test("should not delete user profile if not authenticated", async () => {
  await request(app)
   .delete("/users/me")
   .expect(401);
})

test("should upload avatar image", async () => {
  await request(app)
   .post("/users/me/avatar")
   .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
   .attach("file", "tests/fixtures/profile-pic.jpg")
   .expect(201)
   
  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer))
})

test("should update valid user fields", async () => {
    await request(app)
     .patch("/users/me")
     .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
     .send({ name: "updated-testuser", email: "updated-testuser@example.com" })
     .expect(200)
})

test("should not update invalid user fields", async () => {
    await request(app)
     .patch("/users/me")
     .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
     .send({ location: "invalid-location" })
     .expect(404)
})