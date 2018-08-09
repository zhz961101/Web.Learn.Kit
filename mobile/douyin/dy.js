/*
 * 分析：
 * 获取鼠标实时移动的坐标；m_move_x,m_move_y
 * 鼠标按下时的坐标；m_down_x,m_down_y
 * div的坐标；dx,dy
 * 鼠标按下时，鼠标与div的偏移量；md_x,md_y
 * div的新坐标；ndx,ndy
 */

var isDown = false; //记录鼠标状态
var move_div; //要操作的div对象
var m_move_x, m_move_y, m_down_x, m_down_y, dx, dy, md_x, md_y, ndx, ndy;

//鼠标按下
function down() {
    move_div = document.getElementById("move_div");
    isDown = true;

    //获取鼠标按下时坐标
    m_down_x = event.pageX;
    m_down_y = event.pageY;

    //获取div坐标
    dx = move_div.offsetLeft;
    dy = move_div.offsetTop;

    //获取鼠标与div偏移量
    md_x = m_down_x - dx;
    md_y = m_down_y - dy;
}

//鼠标移动
function move() {
    move_div = document.getElementById("move_div");

    //实时更新div的坐标
    dx = move_div.offsetLeft;
    dy = move_div.offsetTop;

    //获取鼠标移动实时坐标
    m_move_x = event.pageX;
    m_move_y = event.pageY;

    //鼠标按下时移动才触发
    if (isDown) {

        //获取新div坐标，鼠标实时坐标 - 鼠标与div的偏移量
        ndx = m_move_x - md_x;
        ndy = m_move_y - md_y;

        //把新div坐标值赋给div对象
        move_div.style.left = ndx + "px";
        move_div.style.top = ndy + "px";

    }

}

//鼠标释放
function up() {
    isDown = false;
}
