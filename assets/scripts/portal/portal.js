(function (){
  function getVoucherInput(){
    let vi = document.getElementsByName('code')[0]
    if(!vi) {
      try {
        vi = document.getElementsByClassName('eload-voucher')[0].children[0].children[0]
      } catch (e) {}
    }
    if(!vi){
      try {
        vi = document.getElementsByClassName('product-list')[0].children[0].children[0].children[0]
        if(vi.name !== 'search') vi = null
      } catch (e) {}
    }
    return vi
  }

  function initQrScanner(){
    var old_els = document.getElementsByClassName("fa-qrcode qr-icon")
    for(var i = 0; i < old_els.length; i++){
      var _e = old_els[i]
      _e.remove()
    }
    var qi = document.createElement('i');
    qi.classList.add("fa");
    qi.classList.add("fa-qrcode");
    qi.classList.add("qr-icon");
    var vi = getVoucherInput()
    if(!vi) return;
    var is_eload = !!document.getElementsByClassName('eload-voucher')[0]
    var is_eload_search = vi.name === 'search'
    if (is_eload_search) {
      qi.style = 'right: 45px; position: absolute; font-size: 28px; cursor: pointer; margin-top: 30px;';
    } else if (is_eload) {
      qi.style = 'right: 40px; position: absolute; font-size: 28px; cursor: pointer; top: auto !important; margin-top: -36px;';
    }else {
      qi.style = 'right: 125px;position: absolute;margin-left: -172px;font-size: 28px;cursor: pointer;top: 4px;';
    }
    qi.id = 'qr-btn'
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
      var vi =getVoucherInput()
      if(!vi) return;

      html5QrCode.scanFile(imageFile, false)
      .then(function(code){
        vi.value = code
        vi.dispatchEvent(new Event("input"))
        vi.dispatchEvent(new Event("change"))
        setTimeout(function(){
          vi.form.dispatchEvent(new Event("submit"))
        })
      })
      .catch(function(err){
        alert("Voucher QR code can't be recognized!")
        vi.value = ""
        vi.dispatchEvent(new Event("input"))
        vi.dispatchEvent(new Event("change"))
        console.log(`Error scanning file. Reason: ${err}`)
      }).finally(function(){
        ie.value = null;
      })
    });
  }
  setInterval(function(){
    var is_initialized = document.getElementsByClassName("fa-qrcode qr-icon").length > 0
    if (!is_initialized) initQrScanner()
  }, 2000)
})();