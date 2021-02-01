function logins(){
    var ids=login.mid.value;
    var pass=login.mpass.value;

    if(ids==""){
        alert("아이디를 입력해 주세요!");
        return false;
    }
    else if(pass==""){
        alert("비밀번호를 입력해 주세요!");
        return false;
    }
    else{
        login.method="POST";
        login.action="login.php";
        login.submit();
    }
}
