const SmartRegister = artifacts.require("SmartRegister");

contract("SmartRegister", function(accounts) {
  it("SmartRegister should be deployed", function(done) {
    var smartRegister = SmartRegister.deployed();
    assert.isTrue(true);
    done();
  });
});

contract("SmartRegister", accounts => {
  it("Should register address", () => {
    let contractInstance;
    let contractOwner;

    return SmartRegister.deployed()
      .then(instance => {
        contractInstance = instance;
      })
      .then(() => {
        return contractInstance.getCount();
      })
      .then(val => {
        assert.equal(
          val,
          0,
          "Count should be 0"
        );
      })
      .then(() => {
          return contractInstance.getAddressById("contract1");
      })
      .then(val => {
        assert.equal(
          val,
          0,
          "ContractId 'contract1' should not be registered"
        );
      })
      .then(() => {
        return contractInstance.registerAddress("contract1", accounts[4]);
      })
      .then((val) => {
        return contractInstance.getAddressById("contract1");
      })
      .then(val => {
        assert.equal(
          val,
          accounts[4],
          "Registered address with id 'contract1' wasn't " + accounts[4]
        );
      })
      .then(() => {
        return contractInstance.getCount();
      })
      .then(val => {
        assert.equal(
          val,
          1,
          "Count should be 1"
        );
      })
      .then(() => {
        return contractInstance.registerAddress("contract1", accounts[5]);
      })
      .then(assert.fail)
      .catch(function(error) {
        assert(
          error.message,
          'ContractId already registered',
          'Should throw "ContractId already registered" exception.'
        )
      })
      .then(() => {
        return contractInstance.getAddressById("contract1");
      })
      .then(val => {
        assert.equal(
          val,
          accounts[4],
          "Registered address with id 'contract1' wasn't " + accounts[4]
        );
      })
      .then(() => {
        return contractInstance.registerAddress("contract2", accounts[5]);
      })
      .then((val) => {
        return contractInstance.getAddressById("contract2");
      })
      .then(val => {
        assert.equal(
          val,
          accounts[5],
          "Registered address with id 'contract2' wasn't " + accounts[5]
        );
      })
      .then(() => {
        return contractInstance.getCount();
      })
      .then(val => {
        assert.equal(
          val,
          2,
          "Count should be 2"
        );
      })
      ;
  });
});
