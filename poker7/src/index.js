const comparativeRoles = require("./comparativeRoles");
const comparative7 = require("./comparative7")
const comparisonResults = require("./comparisonResults")

module.exports = Judge = ({ alice, bob }) => {
  let aliceType, bobType;
  if (alice.length === 14) {
    if (alice.indexOf("X") == -1) {
      aliceType = comparative7(alice);
    } else {
      aliceType = comparativeRoles(alice);
    }
    if (bob.indexOf("X") == -1) {
      bobType = comparative7(bob);
    } else {
      bobType = comparativeRoles(bob);
    }
    if (aliceType.type > bobType.type) {
      return { alice: alice, bob: bob, result: 1 };
    } else if (aliceType.type < bobType.type) {
      return { alice: alice, bob: bob, result: 2 };
    } else {
      return {
        alice: alice,
        bob: bob,
        result: comparisonResults(aliceType.pai, bobType.pai, aliceType.type),
      };
    }}
};
