const assert = require('assert');

process.env.MONGODB_CONNSTRING = 'mongodb://localhost:27017'


it("Check env", () => {
	let envvar = process.env.MONGODB_CONNSTRING;
	expect(envvar).toBe("mongodb://localhost:27017");
});

const movieServices = require('../src/services/moviesServices');

it("Verify get decisions", async () => {
	
    let sessionId="testsession";
     await movieServices.saveApprovedMovie({sessionId:sessionId,
     movieId: "tt0068646",
     yesNo: "yes",
     userId: "asd"});

     await movieServices.saveApprovedMovie({sessionId:sessionId,
        movieId: "att0068646",
        yesNo: "no",
        userId: "asd"});

	let decisions = await movieServices.getMovieDecisions("asd", sessionId);
    console.log(decisions);

	expect(decisions).not.toBe(null);
	expect(decisions.length).toBeGreaterThanOrEqual(2);
	// expect(user.insertedId).not.toBe("bob");


});
