import 'dotenv/config'

import '../app/services/db.js';
import Numbers from '../app/models/numbers.js';

const numbers = [
    {
        identifier: '+441213876593',
        type: 'local',
        location: {
            country: 'england',
            place: 'birmingham',
            geo: {
                coordinates: [52.47754, -1.894053]
            }
        }

    }
];

const process = async () => {
    for (const number of numbers) {

        console.log("Now processing...", number.identifier);
        await Numbers.findOneAndUpdate({identifier: number.identifier}, number, {upsert: true});
        console.log("Done!");

    }
}

process();



