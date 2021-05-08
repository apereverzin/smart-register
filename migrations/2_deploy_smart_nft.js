const SmartRegister = artifacts.require("SmartRegister");
//const SmartLoan = artifacts.require("SmartLoan");

module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
    await deployer.deploy(SmartRegister);
//    await deployer.deploy(
//                    SmartLoan,
//                    SmartRegister.address,
//                    "c1",
//                    "SmartLoan",
//                    "LNC",
//                    100000
//                  );
    });
};
