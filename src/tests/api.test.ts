import {describe,expect,test} from 'vitest'
import * as exhibit from '../api/exhibit'
import * as user from '../api/user'

const auth:user.authBody={
    username: 'test1',
    password: 'test1'
}
// @vitest-environment happy-dom
describe('api functions', async()=>{
    test('sign up',async()=>{
        const ret=await user.apiSignup(auth)
        console.log(ret)
        expect(ret).toHaveProperty('message')
        expect(ret.message).toBeTypeOf('string')
    })
    test('sign in',async()=>{
        const ret=await user.apiSignin(auth)
        console.log(ret)
        expect(ret).toHaveProperty('id')
        expect(ret).toHaveProperty('username')
        expect(ret).toHaveProperty('accessToken')
    })
    test('get exhibits',async()=>{
        await user.apiSignin(auth);
        console.log(await exhibit.fetchExhibits())
    })
    
})