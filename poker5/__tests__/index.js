const fs = require("fs");

const { matches: input_matches } = require("../src/match.json");
const { matches: result_matches } = require("../src/match_result.json");
const comparative = require("../src/index");

input_matches.map((item, index) => {
  test(`the ${index} times`, () => {
    expect(comparative(item)).toEqual(result_matches[index]);
  });
});
