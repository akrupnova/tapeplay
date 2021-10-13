import { config } from 'dotenv';
import AuthHelper from '../helpers/auth.helper';
import ConfigHelper from '../helpers/config.helper';

config();

before(async function() {
    const authResult = await AuthHelper.post(process.env.LOGIN!, process.env.PASSWORD!);
    process.env.TOKEN = authResult.response.data.token;
});

after(async function() {
    await ConfigHelper.clear();
});