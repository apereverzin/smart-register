// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SmartRegister is Pausable, Ownable {

    uint256 cnt = 0;

    mapping (string => address) _registeredIds;

    mapping (address => uint) public _registeredAddresses;

    mapping (uint256 => address) public _indexedAddresses;

    mapping (uint256 => string) public _indexedIds;

    constructor() Ownable() {
        //
    }

    function registerAddress(string memory contractId_, address addressToRegister_) public returns (bool) {
        // Address must NOT be registered
        require(_registeredIds[contractId_] == address(0), "ContractId already registered");
        require(_registeredAddresses[addressToRegister_] == 0, "Address already registered");

        _registeredIds[contractId_] = addressToRegister_;

        _indexedAddresses[cnt] = addressToRegister_;
        _indexedIds[cnt] = contractId_;
        cnt+=1;
        _registeredAddresses[addressToRegister_] = 1;

        emit SetRegisteredAddress(contractId_, addressToRegister_);

        return true;
    }

    function getCount() public view returns (uint256) {
        return cnt;
    }

    function getIdByIndex(uint256 ind) public view returns (address) {
        return _indexedAddresses[ind];
    }

    function getAddressByIndex(uint256 ind) public view returns (string memory) {
        return _indexedIds[ind];
    }

    function getAddressById(string memory contractId_) public view returns (address) {
        return _registeredIds[contractId_];
    }

    event SetRegisteredAddress(string contractId, address registeredAddress);
}
