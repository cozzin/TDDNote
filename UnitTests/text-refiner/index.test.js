const { test, expect } = require("@jest/globals");
const { $dataMetaSchema } = require("ajv");
const { fake } = require("faker");
const faker = require("faker");
const sut = require("./index"); // sut = system under test

// parameterized test
// 반복되는 테스트에 대해 양질의 결과물을 받아볼 수 있음
test.each`
    source | expected
    ${"hello  world"} | ${"hello world"}
    ${"hello   world"} | ${"hello world"}
    ${"hello    world"} | ${"hello world"}
    ${"hello     world"} | ${"hello world"}
    ${"hello      world"} | ${"hello world"}
    ${"hello       world"} | ${"hello world"}
`('sut transforms "$source" to "$expected"', ({ source, expected }) => {
    const actual = sut(source);
    expect(actual).toBe(expected);
});

test.each`
    source | expected
    ${"hello\t world"} | ${"hello world"}
    ${"hello \tworld"} | ${"hello world"}
`(
    'sut transforms "$source" that contains tab character to "$expected"', 
    ({ source, expected }) => {
    const actual = sut(source);
    expect(actual).toBe(expected);
});

test.each`
    source | bannedWords | expected
    ${"hello mockist"} | ${["mockist", "purist"]} | ${"hello *******"}
    ${"hello purist"} | ${["mockist", "purist"]} | ${"hello ******"}
`(
    'sut transforms "$source" to "$expected"', 
    ({ source, bannedWords, expected }) => {
    const actual = sut(source, { bannedWords });
    expect(actual).toBe(expected);
});

describe('given banned word', () => {
    const bannedWord = faker.lorem.word();
    const source = "hello " + bannedWord;
    const expected = "hello " + "*".repeat(bannedWord.length);

    test('{$bannedWord} when invoke sut then it returns ${expected}', () => {
        const actual = sut(source, { bannedWords: [bannedWord] });
        expect(actual).toBe(expected);
    });
});

test.each`
    source | expected
    ${" hello world"} | ${"hello world"}
`('sut correctly trims whitespaces', ({ source, expected }) => {
    const actual = sut(source);
    expect(actual).toBe(expected);
})