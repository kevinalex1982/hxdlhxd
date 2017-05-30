/**
 * Created by kevin on 2017/5/27.
 */
//检测密码是否两次相同
function checkPSWSame(inputpsw1,inputpsw2,showtext) {
    var isSame = false;
    if ($("#"+inputpsw2).val() != $("#"+inputpsw1).val()) {

        $("#"+showtext).show();
      /*  if (!($("#"+border1).hasClass("has-danger"))) {
            $("#"+border1).addClass("has-danger");
        }
        if (!($("#"+border2).hasClass("has-danger"))) {
            $("#"+border2).addClass("has-danger");
        }*/
        isSame = false;
    }
    else {
        $("#"+showtext).hide();
      /*  if ($("#"+border1).hasClass("has-danger")) {
            $("#"+border1).removeClass("has-danger");
        }
        if ($("#"+border2).hasClass("has-danger")) {
            $("#"+border2).removeClass("has-danger");
        }*/
        isSame = true;
    }
    return isSame;
}