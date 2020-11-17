const comparativeRoles = require("./comparativeRoles");
const comparisonResults = require("./comparisonResults");

module.exports = comparative = ({ alice, bob }) => {
  let aliceWin = comparativeRoles(alice);
  let bobWin = comparativeRoles(bob);
  if (aliceWin > bobWin) {
    return { alice: alice, bob: bob, result: 1 };
  } else if (aliceWin < bobWin) {
    return { alice: alice, bob: bob, result: 2 };
  } else {
    return {
      alice: alice,
      bob: bob,
      result: comparisonResults(alice, bob, aliceWin),
    };
  }
};
