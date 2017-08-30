//显示推荐邮箱
function showobj(){
    $(".hint").show();
}



//手机注册校验
function checkRegisterByPhone(){
    var flag = bRet = 0;
    if(!checkIsSubmit())
    {
        return false;
    }
    if(!checkIsRead()){
        flag = 1;
    }
    if(!checkPhone('phone','phone_err')){        
        $("#phone").focus();
        bRet = 1;
        flag = 1;
    }
    if(!checkUserPwd('userpwd','pwd_err')){
        if (bRet == 0) {
            $("input[id='userpwd-clone']").remove();
            $("input[type='password']").show();
            $("#userpwd").focus();
            bRet = 1;
        }       
        flag = 1;
    }
    if(!checkUserPwdCfm('cfmpwd','userpwd','pwdcfm_err')){
        if (bRet == 0) {
            $("input[id='cfmpwd-clone']").remove();
            $("input[type='password']").show();
            $("#cfmpwd").focus();
            bRet = 1;
        }       
        flag = 1;
    }        
    if($("#verifycodechked").val() == '0'){
        if(!checkVerifyCode()){
            if (bRet == 0) {
                $("#verifycode").focus();
                bRet = 1;
            }       
            flag = 1;
        } 
    }
             
    if(!chkPhoneCode('phonecode','phonecode_err')){
        if (bRet == 0) {
            $("#phonecode").focus();
            bRet = 1;
        }      
        flag = 1;
    }      
    if(flag == 1){      
        return false;
    } 
    $("#submitbtn")[0].disabled = true;    
    return true;
}


//邮箱注册校验
function checkRegister(){  
    var flag = bRet = 0;
    if(!checkIsRead()){
        flag = 1;
    }
    if(!checkUserEmail('useremail','email_err')){
        $("#useremail").focus();
        flag = 1;
        bRet = 1;
    }  
    if(!checkUserPwd('userpwd','pwd_err')){
        if (bRet == 0) {
            $("input[id='userpwd-clone']").remove();
            $("input[type='password']").show();
            $("#userpwd").focus();
            bRet = 1;
        }        
        flag = 1;
    }
    if(!checkUserPwdCfm('cfmpwd','userpwd','pwdcfm_err')){
        if (bRet == 0) {
            $("input[id='cfmpwd-clone']").remove();
            $("input[type='password']").show();
            $("#cfmpwd").focus();
            bRet = 1;
        }        
        flag = 1;
    }         
    if($("#verifycodechked").val() == '0'){
        if(!checkVerifyCode()){
            if (bRet == 0) {
                $("#verifycode").focus();
                bRet = 1;
            }   
            flag = 1;
        } 
    }                 
    if(flag == 1){        
        return false;
    }   
    $("#submitbtn")[0].disabled = true;    
    return true;          
}


function sendPhoneCode(){
    if ($('#btn7').hasClass('unclick'))
    {
        return;
    }
    var phone = $.trim($("#phone").val());
    var verifycode = $.trim($("#verifycode").val());
    if(!checkPhone('phone','phone_err')){
        $("#phone").val("").focus().val(phone);
    }else{
        if(!checkVerifyCode()){
            $("#verifycode").focus();
        }
    }
    if(checkPhone('phone','phone_err') && checkVerifyCode()){
        var url = window.cfg.domain.login + '/ajax/sendphonecode.php?jsoncallback=?';
        $.getJSON(url,{phone:phone,type:5,from_domain:'i',verifycode:verifycode},function(data){
            if(data.result == '1'){
                $("#phone_err").hide();
                $("#phonecode_err").hide();
                $("#verifycode_err").hide();
                timeoutButton(60,'btn7',1);
            }else if(data.scode == '4'){
                $("#verifycode_err").text(lang['verifycode_empty_err']).show();
            }else if(data.scode == '10'){
                $("#phonecode_err").html(lang['phone_used_err']).show();
            }else if(data.scode == '12'){
                $("#phonecode_err").html(lang['sendCode_busy']).show();
            }else if(data.scode == '13'){
                $("#phonecode_err").html(lang['beyond_phone_limit_err']).show();
            }else if(data.scode == '1' || data.scode == '0'){
                $("#account_err").text(lang['failed_done']).parent().show();
            }
        });
    }    
}