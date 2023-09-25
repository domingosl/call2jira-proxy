import 'dotenv/config'

import '../app/services/db.js';
import Numbers from '../app/models/numbers.js';
import Extensions from '../app/models/extensions.js';

const numbers = [
    {
        identifier: '+441213876593',
        type: 'local',
        location: {
            country: 'england',
            place: 'birmingham',
            flag: '🇬🇧',
            geo: {
                coordinates: [52.47754, -1.894053]
            }
        }

    }
];

const process = async () => {

    for (const number of numbers) {

        console.log("Now processing...", number.identifier);
        const newNumber = await Numbers.findOneAndUpdate({identifier: number.identifier}, number, {upsert: true, new: true});

        for(let ext = 1; ext < 10000; ext++) {

            const extension = new Extensions({
                to: newNumber._id,
                number: String(ext).padStart(4, '0')
            });

            await extension.save();
        }

        console.log("Done!");

    }
}

process();



