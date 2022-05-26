const launchesDB = require('./launches.mongo');

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
	flightNumber: 100,
	mission: 'Kepler Exploration X',
	rocket: 'Explorer IS1',
	launchDate: new Date('December 27, 2030'),
	target: 'Kepler-442 b',
	customers: ['ZTM', 'NASA'],
	upcoming: true,
	success: true,
};

saveLaunch(launch);

function existsLaunchWithId(launchId) {
	return launches.has(launchId);
}

function getAllLaunches() {
	return Array.from(launches.values());
}

async function saveLaunch(launch) {
	await launchesDB.updateOne(
		{
			flightNumber: launch.flightNumber,
		},
		launch,
		{ upsert: true }
	);
}

function addNewLaunch(launch) {
	latestFlightNumber++;
	launches.set(
		latestFlightNumber,
		Object.assign(launch, {
			flightNumber: latestFlightNumber,
			customers: ['Zero To Mastery', 'NASA'],
			upcoming: true,
			success: true,
		})
	);
}

function abortLaunchById(launchId) {
	const aborted = launches.get(launchId);
	aborted.upcoming = false;
	aborted.success = false;
	return aborted;
}

module.exports = {
	existsLaunchWithId,
	getAllLaunches,
	addNewLaunch,
	abortLaunchById,
};
