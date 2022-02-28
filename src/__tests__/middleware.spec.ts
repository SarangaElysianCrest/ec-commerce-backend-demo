import {getTokenData} from '../middleware/customAuth';


// test case for the getTokenDat function

test('access token middleware test',async () => {
    const token = '12345';
    const  data = await  getTokenData(token);
    // @ts-ignore
    // expect(data).toBe(12345)
    expect(data).toEqual({"permissions": ["work", "add", "edit"], "role": "Admin", "userId": "12345"})
})