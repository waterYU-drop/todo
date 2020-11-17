const fs = require("fs");

const { matches: input_matches } = require("../src/seven_cards_with_ghost.json");
const { matches: result_matches } = require("../src/seven_cards_with_ghost_result.json");
const Judge = require("../src/index");

input_matches.map((item, index) => {
  test(`the ${index} times`, () => {
    expect(Judge(item)).toEqual(result_matches[index]);
  });
});
