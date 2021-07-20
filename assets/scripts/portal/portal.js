function initQrScanner(){
  var qi = document.createElement('i');
  qi.classList.add("fa");
  qi.classList.add("fa-qrcode");
  qi.classList.add("qr-icon");
  qi.style = 'right: 125px;position: absolute;margin-left: -172px;font-size: 28px;cursor: pointer;top: 4px;';
  qi.id = 'qr-btn'
  var vi = document.getElementsByName('code')[0]
  if(!vi) return;
  var s = document.createElement('script');
  var e = document.createElement('div');
  e.id = 'reader';
  var ie = document.createElement('input')
  ie.type = 'file';
  ie.id = 'qr-input-file';
  ie.accept = 'image/*';
  ie.capture = 'environment';
  ie.setAttribute("capture", "environment");
  ie.style = 'opacity:0;width:1px;'
  var html5QrCode;
  s.onload = function(){
    document.body.appendChild(e);
    document.body.appendChild(ie);
    html5QrCode = new Html5Qrcode("reader");
    vi.parentElement.appendChild(qi)
  }
  s.setAttribute('src','/public/plugins/voucher-qr-reader/assets/scripts/html5-qrcode.min.js');
  document.body.appendChild(s);
  qi.onclick = function(){
    if(window.JSInterface && window.JSInterface.scanQr){
      if(window.JSInterface.scanQr()){
        ie.click()  
      }
    }else{
      ie.click()
    }
  }
  ie.addEventListener('change', function(e){
    if (!e.target.files || !e.target.files.length) return;
    var imageFile = e.target.files[0];
    vi = document.getElementsByName('code')[0]
    html5QrCode.scanFile(imageFile, false)
    .then(function(code){
      vi.value = code
      vi.dispatchEvent(new Event("input"))
      setTimeout(function(){
        vi.form.dispatchEvent(new Event("submit"))
      })
    })
    .catch(function(err){
      alert("Voucher QR code can't be recognized!")
      vi.value = ""
      vi.dispatchEvent(new Event("input"))
      console.log(`Error scanning file. Reason: ${err}`)
    }).finally(function(){
      ie.value = null;
    })
  });
  document.addEventListener("click", function(e){
    var is_button = e.target.tagName == "BUTTON" || e.target.classList.contains("btn")
    if(!is_button) return;
    setTimeout(function(){
      var vi = document.getElementsByName('code')[0]
      if(!vi) return;
      if(document.getElementsByClassName('fa-qrcode qr-icon').length) return;
      vi.parentElement.appendChild(qi)
    }, 200)
  })
}
setTimeout(initQrScanner, 3000);
