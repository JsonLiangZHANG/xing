function timeoutButton(p_iExpireTime, p_sElementId, p_iType)
{
    var oElement = $('#' + p_sElementId);

    if (!oElement.hasClass('unclick'))
    {
        oElement.toggleClass("unclick");
    }

    if (p_iExpireTime <= 1)
    {
        oElement.toggleClass("unclick");
        oElement.text(p_iType == 1 ? lang['sendCodeAgain'] : lang['sendEmailAgain']);
        $("#not_received").show();
    }
    else
    {
        p_iExpireTime -= 1;
        oElement.text(p_iExpireTime + lang['send']);
        setTimeout('timeoutButton('+ p_iExpireTime +', "'+ p_sElementId +'",'+ p_iType +')',"1000");
    }
}
function checkPhone(strPhone){
    var errId = arguments[1] || ""
    var isId = arguments[2] || "1";
    var checkUsed = arguments[3] || "1";
    var sReg = /^(1[34578]{1,1}[0-9]{9,9})$/;
//  var errDiv = $("#" + errId).length > 0 ? $("#" + errId) : null;
    var strPhone=$('#phone_num').val();
    if(strPhone == ''){
         $('#phone_num').css('border-color:red');
        return false;
    }
    if(getlength(strPhone) != 11 || !sReg.test(strPhone)){
        $('#phone_num').css('border-color:red');
        return false;
    }
    if(checkUsed == "1"){
        var flag = 0;
        $.ajaxSettings.async = false;
        var url = window.cfg.domain.login + '/ajax/checkinfo.php?jsoncallback=?';
        $.getJSON(url,{value:strPhone,type:'mobile'},function(data){
            if(data.result == '1'){
                flag = 1;               
            }
        });
        $.ajaxSettings.async = true;
    }
    if(flag == 1){
        if(errDiv){  
            if($("#lang").val() == 'c'){
                var htm = '该手机号码已被使用，是否<a href="'+window.cfg.domain.login+'/login.php?val='+strPhone+'">直接登录</a>'
            }else{
                var htm = 'This phone number has already existed.<a href="'+window.cfg.domain.login+'/login.php?lang=e&val='+strPhone+'">Sign In</a>';
            }
            errDiv.html(htm).show();
        }
        return false;
    }
    return true;
}