const {sum,mutiply }= require('../sum')
describe('sum test cases',()=>{
    it('should return 4',()=>{
        const result = sum(2,2);
        expect(result).toBe(4)
    })
})

describe('sum test cases',()=>{
    it('should return 4',()=>{
        const result = sum(2,2);
        expect(result).toBe(4)
    })
})

describe('multiply test case',()=>{
    it('should return 4',()=>{
        const result = mutiply(2,2);
        expect(result).toBe(4)
    })
})
