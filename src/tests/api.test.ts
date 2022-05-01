import {describe,expect,test} from 'vitest'
import * as user from '../api/user'

// @vitest-environment happy-dom
describe('api functions', async()=>{
    test('sign up',async()=>{
        const ret=await user.apiSignup('test')
        expect(ret).toHaveProperty('message')
        expect(ret.message).toBeTypeOf('string')
    })
    test('sign in',async()=>{
        const ret=await user.apiSignin('test')
        expect(ret).toHaveProperty('id')
        expect(ret).toHaveProperty('username')
        expect(ret).toHaveProperty('accessToken')
    })
})