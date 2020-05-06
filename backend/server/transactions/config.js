const TRANSACTION = "TRANSACTION";
const ERROR = "ERROR";
const READ = "READ";
const CREDIT = "CREDIT";
const DEBIT = "DEBIT";
const OK = "OK";
const REJECTED = "REJECTED";
const BALANCE = "BALANCE";
const FIND = "FIND";

module.exports = {
    constants: {
        TRANSACTION,
        ERROR,
        READ,
        CREDIT,
        DEBIT,
        REJECTED,
        OK,
        BALANCE,
        FIND,
    },
    validOperations: [ CREDIT, DEBIT ]
}