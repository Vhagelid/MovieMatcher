
const assert = require('assert');

process.env.MONGODB_CONNSTRING = 'mongodb://localhost:27017'


it("Check env", () => {
	let envvar = process.env.MONGODB_CONNSTRING;
	expect(envvar).toBe("mongodb://localhost:27017");
});

const users = require('../src/repositories/usersRepository');

it("Create user, return id", async () => {
	
	let user = await users.createUser("bob", "pass");
	expect(user).not.toBe(null);
	expect(user.acknowledged).toBe(true);
	expect(user.insertedId).not.toBe("bob");


});

it("get user, return user object", async () => {
	
	let user = await users.getUser("bob");
	console.log(user);
	expect(user).not.toBe(null);

	expect(user.username).toBe("bob");

});

// require dbServce
// const dbServiceUsers = require('../src/services/dbServiceUsers');
it("Create user, only if not exisist", async () => {
	var numbOfBobs1 = await users.countUsers("bob");
	let user = await users.createUserIfNotExists("bob", "pass");
	var numbOfBobs2 = await users.countUsers("bob");

	expect(numbOfBobs2).toEqual(numbOfBobs1);
	expect(user.username).toEqual("bob");

});




it("Simple find user", async () => {

	let { MongoClient } = require('mongodb');
	let url = process.env.MONGODB_CONNSTRING;
	let client;
	try {
		client = await MongoClient.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		// console.log('connecting to the DB...')
		const db = client.db("MovieMatcherDB");

		const user = await db.collection("users").findOne({ username: "bob" });
		expect(user.username).toBe("bob");


	} catch (error) {
		expect("user").toBe(error);

	}
	finally {

		client.close();

	}

});


it("First user", async () => {

	let { MongoClient } = require('mongodb');
	let url = process.env.MONGODB_CONNSTRING;
	let client;
	try {
		client = await MongoClient.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		// console.log('connecting to the DB...')
		const db = client.db("MovieMatcherDB");

		const user = await db.collection("users").findOne();
		expect(user.username).toBe("bob");


	} catch (error) {
		expect("user").toBe(error);

	}
	finally {

		client.close();

	}

});

