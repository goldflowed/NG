// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
    // msg.sender == Solidity가 기억하는 특수 전역 변수, 현재 호출자의 주소를 이야기함
    address public owner = msg.sender;
    uint256 public last_completed_migration; // 각 이전(migration) 정보를 보관 (index를 붙이는 것)

    // modifier 제어자 == 함수를 제한함..?
    modifier restricted() {
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        );
        _; // 함수를 계속해서 실행한다는 의미
    }

    // 제어범위 restricted : 소유자 만 가능하도록 제한할 것이기 때문에 사용
    function setCompleted(uint256 completed) public restricted {
        last_completed_migration = completed;
    }

    // update 기능을 위한 함수 작성 : 스마트 계약 이전
    function upgrade(address new_address) public restricted {
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_completed_migration);
    }
}
