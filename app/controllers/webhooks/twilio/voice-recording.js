import jwt from 'jsonwebtoken';
import fs from 'node:fs';
import appRoot from 'app-root-path';
import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_SECRET });

const tmpDir = path.join(appRoot.path, 'tmp');

if (!fs.existsSync(tmpDir)){
    fs.mkdirSync(tmpDir);
}

export default async ({req, res, body, resolve, forbidden, logger}) => {

    console.log(req.query.session);
    console.log(body);

    const decodedSession = jwt.verify(req.query.session, process.env.JWT_SECRET, {algorithm: ['HS256']});

    resolve();

    console.log(decodedSession);


    const url = body.RecordingUrl + ".mp3";


    const { data: fileStream} = await axios.get(url, { responseType: 'stream' });

    const filePath = path.join(tmpDir, uuidv4().replace("-", "")) + ".mp3";
    const writer = fs.createWriteStream(filePath);
    writer.on('close', async () => {

        const reader = fs.createReadStream(filePath);
        const transcription = await openai.audio.transcriptions.create({
            file: reader,
            model: "whisper-1",
        });

        await axios.post(decodedSession.webhook, {
            cmd: 'newTranscription',
            payload: {
                extension: decodedSession.extension,
                numberId: decodedSession.numberId,
                text: transcription.text,
                callerNumber: decodedSession.callerNumber,
                callerCountry: decodedSession.callerCountry
            }
        });


        fs.unlinkSync(filePath);
    });

    fileStream.pipe(writer);


}