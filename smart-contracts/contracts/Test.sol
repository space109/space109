// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Test{
  string private _text;

  function current() public view returns(string memory){
    return _text;
  }

  function write(string memory newText) public {
    _text = newText;
  }
}