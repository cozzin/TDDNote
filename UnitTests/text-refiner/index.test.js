const { test, expect } = require("@jest/globals");
const { $dataMetaSchema } = require("ajv");
const sut = require("./index"); // sut = system under test

// parameterized test
// 반복되는 테스트에 대해 양질의 결과물을 받아볼 수 있음
test.each`
    source | expected
    ${"hello  world"} | ${"hello world"}
    ${"hello   world"} | ${"hello world"}
    ${"hello    world"} | ${"hello world"}
`('sut transforms "$source" to "$expected"', ({ source, expected }) => {
    const actual = sut(source);
    expect(actual).toBe(expected);
});
