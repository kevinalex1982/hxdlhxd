/**
 * Created by kevin chen on 2017/5/25.
 */
/*存储常用js方法*/
//inputGroup 输入dom的id组
//返回1为没有空值
function checkInputEmpty(inputGroup) {

   for(var i=0;i<inputGroup.length;i++){
        if($("#"+inputGroup[i]).val()=="")
        {
            return 0;
        }
    }
    return 1;
}


/*
// 清除两边的空格
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};
*/
