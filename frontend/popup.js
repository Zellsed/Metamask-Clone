document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("accountList")
    .addEventListener("click", changeAccount);

  document
    .getElementById("userAddress")
    .addEventListener("click", coppyAddress);

  document.getElementById("transferFund").addEventListener("click", handler);

  document
    .getElementById("header_network")
    .addEventListener("click", getOpenNetwork);

  document
    .getElementById("network_item")
    .addEventListener("click", getSelectedNetwork);

  document.getElementById("add_network").addEventListener("click", setNetwork);

  document.getElementById("loginAccount").addEventListener("click", loginUser);

  document
    .getElementById("accountCreate")
    .addEventListener("click", createUser);

  document.getElementById("openCreate").addEventListener("click", openCreate);

  document.getElementById("sign_up").addEventListener("click", signUser);

  document.getElementById("login_up").addEventListener("click", login);

  document.getElementById("logout").addEventListener("click", logout);

  document
    .getElementById("open_Transfer")
    .addEventListener("click", openTransfer);

  document.getElementById("goBack").addEventListener("click", goBack);

  document.getElementById("open_Import").addEventListener("click", openImport);

  document
    .getElementById("goBack_Import")
    .addEventListener("click", importGoBack);

  document.getElementById("open_assets").addEventListener("click", openAssets);

  document
    .getElementById("open_activity")
    .addEventListener("click", openActivity);

  document.getElementById("goHomePage").addEventListener("click", goHomePage);

  document
    .getElementById("open_Account_Import")
    .addEventListener("click", openImportmodel);

  document
    .getElementById("close_import_account")
    .addEventListener("click", closeImportModel);

  document.getElementById("add_new_token").addEventListener("click", addToken);

  document
    .getElementById("add_New_Account")
    .addEventListener("click", addAccount);
});

let providerURL =
  "https://eth-holesky.g.alchemy.com/v2/XbTCI1sk-nWg_2lJu90LU9FjQS6I94qj";

let address;
let privateKey;
let mnemonic;

function handler() {
  const amount = document.getElementById("amount").value;
  const address = document.getElementById("address").value;

  document.getElementById("field").style.display = "none";

  document.getElementById("transfer_center").style.display = "flex";

  const provider = new ethers.JsonRpcProvider(providerURL);
  let wallet = new ethers.Wallet(privateKey, provider);

  const tx = {
    to: address,
    value: ethers.parseEther(amount),
  };

  let activityDiv = document.querySelector(".activity");

  let a = document.getElementById("link");
  a.href = "somelink url";

  wallet
    .sendTransaction(tx)
    .then((txObj) => {
      document.getElementById("field").style.display = "none";
      document.getElementById("transfer_center").style.display = "none";
      const a = document.getElementById("link");

      a.href = `https://holesky.etherscan.io/tx/${txObj.hash}`;

      document.getElementById("link").style.display = "block";

      let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
      transactions.push({
        amount,
        to: address,
        txHash: txObj.hash,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("transactions", JSON.stringify(transactions));
    })
    .catch((error) => {
      activityDiv.innerHTML = "Transaction failed. Please try again.";
    });
}

function checkBlance(address) {
  const provider = new ethers.JsonRpcProvider(providerURL);

  provider.getBalance(address).then((balance) => {
    const balanceInEth = ethers.formatEther(balance);

    document.getElementById("accountBalance").innerHTML = `${balanceInEth.slice(
      0,
      8
    )} - ETH`;

    const shortAddress = `${address.slice(0, 10)}...${address.slice(-4)}`;
    const userAddressEl = document.getElementById("userAddress");

    userAddressEl.textContent = shortAddress;
    userAddressEl.setAttribute("data-address", address);
  });
}

function getOpenNetwork() {
  document.getElementById("network").style.display = "block";
}

function getSelectedNetwork(e) {
  const element = document.getElementById("selected_network");
  element.innerHTML = e.target.innerHTML;

  if (e.target.innerHTML === "Ethereum Mainnet") {
    providerURL =
      "https://rpc.ankr.com/eth/d7c889bad82df25cd7f3d2b619e978d5dfb069349b55b1b804f9dae157bd0bf3";
    document.getElementById("network").style.display = "none";
  } else if (e.target.innerHTML === "Ethereum Holesky") {
    providerURL =
      "https://eth-holesky.g.alchemy.com/v2/XbTCI1sk-nWg_2lJu90LU9FjQS6I94qj";
    document.getElementById("network").style.display = "none";
  } else if (e.target.innerHTML === "Ethereum Sepolia") {
    providerURL =
      "https://rpc.ankr.com/eth_sepolia/d7c889bad82df25cd7f3d2b619e978d5dfb069349b55b1b804f9dae157bd0bf3";
    document.getElementById("network").style.display = "none";
  } else if (e.target.innerHTML === "Polygon Mainnet") {
    providerURL =
      "https://rpc.ankr.com/polygon/d7c889bad82df25cd7f3d2b619e978d5dfb069349b55b1b804f9dae157bd0bf3";
    document.getElementById("network").style.display = "none";
  } else if (e.target.innerHTML === "Polygon Amoy") {
    providerURL =
      "https://rpc.ankr.com/polygon_amoy/d7c889bad82df25cd7f3d2b619e978d5dfb069349b55b1b804f9dae157bd0bf3";
    document.getElementById("network").style.display = "none";
  }

  console.log(providerURL);
}

function setNetwork() {
  document.getElementById("network").style.display = "none";
}

function loginUser() {
  document.getElementById("createAccount").style.display = "none";
  document.getElementById("LoginUser").style.display = "block";
}

function createUser() {
  document.getElementById("createAccount").style.display = "block";
  document.getElementById("LoginUser").style.display = "none";
  document.getElementById("center").style.display = "none";
}

function openCreate() {
  document.getElementById("createAccount").style.display = "none";
  document.getElementById("create_popUp").style.display = "block";
}

function signUser() {
  const name = document.getElementById("sign_up_name").value;
  const email = document.getElementById("sign_up_email").value;
  const password = document.getElementById("sign_up_password").value;
  const passwordConfirm = document.getElementById(
    "sign_up_password_confirm"
  ).value;

  document.getElementById("field").style.display = "none";
  document.getElementById("center").style.display = "block";

  const wallet = ethers.Wallet.createRandom();

  if (wallet.address) {
    const url = "http://localhost:3000/api/v1/auth/sign-up";

    const data = {
      name: name,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic.phrase,
    };

    console.log("data", data);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        document.getElementById("createdAddress").innerHTML = wallet.address;
        document.getElementById("createdPrivateKey").innerHTML =
          wallet.privateKey;
        document.getElementById("createdMnemonic").innerHTML =
          wallet.mnemonic.phrase;

        document.getElementById("center").style.display = "none";
        document.getElementById("accountData").style.display = "block";
        document.getElementById("sign_up").style.display = "none";

        const userWallet = {
          address: wallet.address,
          privateKey: wallet.privateKey,
          mnemonic: wallet.mnemonic.phrase,
        };

        const jsonObj = JSON.stringify(userWallet);
        localStorage.setItem("userWallet", jsonObj);

        document.getElementById("goHomePage").style.display = "block";
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }
}

function login() {
  document.getElementById("login_form").style.display = "none";
  document.getElementById("center").style.display = "block";

  const email = document.getElementById("login_email").value;
  const password = document.getElementById("login_password").value;

  const url = "http://localhost:3000/api/v1/auth/login";

  const data = {
    email: email,
    password: password,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      const userWallet = {
        address: result.data.user.address,
        privateKey: result.data.user.privateKey,
        mnemonic: result.data.user.mnemonic.phrase,
      };

      const jsonObj = JSON.stringify(userWallet);
      localStorage.setItem("userWallet", jsonObj);

      window.location.reload();
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function logout() {
  localStorage.removeItem("userWallet");
  window.location.reload();
}

function openTransfer() {
  document.getElementById("transfer_form").style.display = "block";
  document.getElementById("home").style.display = "none";
}

function goBack() {
  document.getElementById("transfer_form").style.display = "none";
  document.getElementById("home").style.display = "block";
}

function openImport() {
  document.getElementById("import_token").style.display = "block";
  document.getElementById("home").style.display = "none";
}

function importGoBack() {
  document.getElementById("import_token").style.display = "none";
  document.getElementById("home").style.display = "block";
}

function openActivity() {
  document.getElementById("activity").style.display = "block";
  document.getElementById("assets").style.display = "none";
}

function openAssets() {
  document.getElementById("activity").style.display = "none";
  document.getElementById("assets").style.display = "block";
}

function goHomePage() {
  document.getElementById("create_popUp").style.display = "none";
  document.getElementById("home").style.display = "block";
}

function openImportmodel() {
  document.getElementById("import_account").style.display = "block";
  document.getElementById("home").style.display = "none";
}

function closeImportModel() {
  document.getElementById("import_account").style.display = "none";
  document.getElementById("home").style.display = "block";
}

function addToken() {
  const address = document.getElementById("token_address").value;
  const name = document.getElementById("token_name").value;
  const symbol = document.getElementById("token_symbol").value;

  const url = "http://localhost:3000/api/v1/token/create-token";

  const data = {
    name: name,
    address: address,
    symbol: symbol,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      window.location.reload();
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function addAccount() {
  const privateKey = document.getElementById("add_account_private_key").value;

  const provider = new ethers.JsonRpcProvider(providerURL);

  let wallet = new ethers.Wallet(privateKey, provider);

  const url = "http://localhost:3000/api/v1/account/create-account";

  const data = {
    privateKey: privateKey,
    address: wallet.address,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    });
}

function myFunction() {
  const str = localStorage.getItem("userWallet");
  const parsedObj = JSON.parse(str);

  if (parsedObj?.address) {
    document.getElementById("LoginUser").style.display = "none";
    document.getElementById("home").style.display = "block";

    privateKey = parsedObj.privateKey;
    address = parsedObj.address;

    checkBlance(parsedObj.address);
  }

  const tokenRender = document.querySelector(".assets");
  const accountRender = document.querySelector(".accountList");
  const transactionRender = document.querySelector(".activity");

  const url = "http://localhost:3000/api/v1/token/all-token";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let elements = "";

      data.map(
        (token) =>
          (elements += `
              <div class="assets_item">
              <img class="assets_item_img" 
              src="./assets/zell.png"
              alt=""/>

              <span>${token.address.slice(0, 15)}...</span>
              <span>${token.symbol}</span>
              </div>
      `)
      );

      tokenRender.innerHTML = elements;
    })
    .catch((error) => console.log(error));

  fetch("http://localhost:3000/api/v1/account/all-account")
    .then((response) => response.json())
    .then((data) => {
      let accounts = "";

      data.map((account, i) => {
        accounts += `         
      <div class="lists">
        <p>${i + 1}</p>
        <p class="accountValue" data-address="${
          account.address
        }" data-privateKey="${account.privateKey}">
          ${account.address.slice(0, 25)}...
        </p>
      </div>`;
      });

      accountRender.innerHTML = accounts;
    });

  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  let transactionList = "";

  transactions
    .slice(0, 3)
    .reverse()
    .map((transaction, index) => {
      transactionList += `
              <div class="assets_item">
              <img class="assets_item_img" 
              src="./assets/zell.png"
              alt=""/>

              <span>${transaction.to.slice(0, 15)}...</span>
              <span>${transaction.amount} ETH</span>
              </div>
      `;

      transactionRender.innerHTML = transactionList;
    });
}

function coppyAddress(event) {
  const fullAddress = event.target.getAttribute("data-address");

  navigator.clipboard.writeText(fullAddress);
}

function changeAccount() {
  const data = document.querySelector(".accountValue");
  const address = data.getAttribute("data-address");
  const privateKey = data.getAttribute("data-privateKey");

  const userWallet = {
    address: address,
    privateKey: privateKey,
    mnemonic: "Changed",
  };

  const jsonObj = JSON.stringify(userWallet);

  localStorage.setItem("userWallet", jsonObj);

  window.location.reload();
}

window.onload = myFunction;
