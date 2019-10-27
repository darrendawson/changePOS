/*
  Wrapper class for talking to the Change API

  Endpoints:
   - /do/transaction
   - /
   - /get/transactions/user
   - /get/transactions/store
   - /get/transactions
   - /get/user/profile
   - /get/user/bankaccount
*/

let __url = "http://27c223b7.ngrok.io";

let __defaultProfileID = "5e52a2f9-2e37-4699-94c9-165aa38a7271"
let __defaultStoreID = "b7acdf48-cb62-4cf5-8389-61d361fa727f";


let __defaultTransactionDict = {
  "storeID": __defaultStoreID,
  "userID": __defaultProfileID,
  "store_name": "Ikes Sandwiches",
  "store_loc": JSON.stringify({"lat": "test"}),
  "user_loc": JSON.stringify({"lat": "test"}),
  "store_to_person": true,
  "change_amount": 0.11,
  "cash_amount": 10.2,
  "receipt": "slkdfjlkdsjf"
}


class ChangeAPI {

  // user profile --------------------------------------------------------------

  // gets a users profile
  async getUserProfile(profileID = __defaultProfileID) {
    let api_url = __url + "/get/user/profile?userID=" + profileID;
    let response = await fetch(api_url)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.error(error))

    return response;
  }

  // gets a user's bank account info
  async getUserBankAccount(profileID = __defaultProfileID) {
    let api_url = __url + "/get/user/bankaccount?userID=" + profileID;
    let response = await fetch(api_url)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.error(error));

    return response;
  }

  // Transactions --------------------------------------------------------------

  // performs a transaction (creates a new one)
  async createTransaction(transactionObject) {
    let api_url = __url + "/do/transaction";
    let response = await fetch(api_url, {
      method: 'POST',
     mode: 'cors',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(transactionObject)
    })

    .then(function (data) {
      return data;
    })

    return response;
  }


  // gets all transactions for a user
  async getUserTransactions(profileID = __defaultProfileID) {
    let api_url = __url + "/get/transactions/user?userID=" + profileID;
    let response = await fetch(api_url)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.error(error))
    return response;
  }


  // gets all transactions for a user
  async getStoreTransactions(storeID = __defaultStoreID) {
    let api_url = __url + "/get/transactions/store?storeID=" + storeID;
    let response = await fetch(api_url)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.error(error))
    return response;
  }

  // gets all transactions
  async getAllTransactions() {
    let api_url = __url + "/get/transactions";
    let response = await fetch(api_url)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.error(error))
    return response;
  }


}

export default ChangeAPI;
