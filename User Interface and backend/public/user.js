const socket = io();

$("#text").
  on("blur", function () {
    makeCode();
  }).
  on("keydown", function (e) {
    if (e.keyCode == 13) {
      makeCode();
    }
  });

//on clicking the pay now button
document.querySelector('.pay-btn').onclick = e => {
  document.querySelector('.pay-btn').style.background = "orange";
  document.querySelector('#qrcode').hidden = false;
  axios.get('/getQR').then(res => {
    document.querySelector('.pay-btn').style.background = "";
    document.querySelector('.pay-btn').style.display = "none";
    let {id, username, balance} = res.data;
      const qrcode = new QRCode(document.getElementById("qrcode"), {
        text: JSON.stringify({
          id,
          username,
          balance
        }),
        width: 200,
        height: 200,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H,
        display : 'inline',
    });
    setTimeout(() => {
      Array.from(document.querySelector('#qrcode').children).forEach(child => {
        child.remove();
      });
      document.querySelector('.pay-btn').style.display = "";
    }, 10000);
  });
}


//on clicking add user button
document.forms.username.onsubmit = e => {
  e.preventDefault();
  axios.post('/newUser', {
    username : document.querySelector('.username-input').value,
  }).then(res => {
      let {id} = res.data;
      socket.emit('join', id);
      document.getElementById('qrcode').dataset.id = id;
      document.querySelector('.balance-amount').hidden = false;
      document.querySelector('.login-msg').hidden = true;
      document.querySelector('.pay-btn').hidden = false;
      document.forms.username.hidden = true;
      document.forms.balance.hidden = false; 
  });
}

//on clicking the top up button
document.forms.balance.onsubmit = e => {
  e.preventDefault();
  document.forms.balance.lastElementChild.style.background = 'orange';
  axios.post('/topUp', {
    topUpAmt : + document.querySelector('.balance-input').value,
  }).then(res => {
    document.forms.balance.lastElementChild.style.background = '';
    document.forms.balance.reset();
    let {newBalance} = res.data;
    document.querySelector('.amt').innerText = newBalance;
  });
}

//when server sends deduct event
socket.on('deduct', deductedAmt => {
  let current = + document.querySelector('.amt').innerText;
  document.querySelector('.amt').innerText = current - deductedAmt;
  document.querySelector('.amt').style.background = 'red';
  let deductedAmtDisplay = document.querySelector('.deducted-amt');
  deductedAmtDisplay.innerText = deductedAmt;
  deductedAmtDisplay.style.opacity = 1;
  setTimeout(() => {
    deductedAmtDisplay.style.opacity = 0;
    document.querySelector('.amt').style.background = '';
  }, 3000);
});

