!function(){function getVoucherInput(){let vi=document.getElementsByName("code")[0];if(!vi)try{vi=document.getElementsByClassName("eload-voucher")[0].children[0].children[0]}catch(e){}if(!vi)try{vi=document.getElementsByClassName("product-list")[0].children[0].children[0].children[0],"search"!==vi.name&&(vi=null)}catch(e){}return vi}setInterval(function(){0<document.getElementsByClassName("fa-qrcode qr-icon").length||function(){for(var old_els=document.getElementsByClassName("fa-qrcode qr-icon"),i=0;i<old_els.length;i++)old_els[i].remove();var qi=document.createElement("i");qi.classList.add("fa"),qi.classList.add("fa-qrcode"),qi.classList.add("qr-icon");var is_eload_search,s,e,ie,html5QrCode,vi=getVoucherInput();vi&&(s=!!document.getElementsByClassName("eload-voucher")[0],is_eload_search="search"===vi.name,qi.style=is_eload_search?"right: 45px; position: absolute; font-size: 28px; cursor: pointer; margin-top: 30px;":s?"right: 40px; position: absolute; font-size: 28px; cursor: pointer; top: auto !important; margin-top: -36px;":"right: 125px;position: absolute;margin-left: -172px;font-size: 28px;cursor: pointer;top: 4px;",qi.id="qr-btn",s=document.createElement("script"),(e=document.createElement("div")).id="reader",(ie=document.createElement("input")).type="file",ie.id="qr-input-file",ie.accept="image/*",ie.capture="environment",ie.setAttribute("capture","environment"),ie.style="opacity:0;width:1px;",s.onload=function(){document.body.appendChild(e),document.body.appendChild(ie),html5QrCode=new Html5Qrcode("reader"),vi.parentElement.appendChild(qi)},s.setAttribute("src","/plugins/voucher-qr-reader/assets/scripts/html5-qrcode.min.js"),document.body.appendChild(s),qi.onclick=function(){(!window.JSInterface||!window.JSInterface.scanQr||window.JSInterface.scanQr())&&ie.click()},ie.addEventListener("change",function(imageFile){var vi;imageFile.target.files&&imageFile.target.files.length&&(imageFile=imageFile.target.files[0],(vi=getVoucherInput())&&html5QrCode.scanFile(imageFile,!1).then(function(code){vi.value=code,vi.dispatchEvent(new Event("input")),vi.dispatchEvent(new Event("change")),setTimeout(function(){vi.form.dispatchEvent(new Event("submit"))})}).catch(function(err){alert("Voucher QR code can't be recognized!"),vi.value="",vi.dispatchEvent(new Event("input")),vi.dispatchEvent(new Event("change"))}).finally(function(){ie.value=null}))}))}()},2e3)}();