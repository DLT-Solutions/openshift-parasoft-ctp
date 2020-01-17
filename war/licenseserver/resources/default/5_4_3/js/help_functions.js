function showManual(sLink)
{
    open_win(sLink, 0.9, 'right', 0.8, 'bottom', 'yes', 'yes', 'GRSManual');
}

function open_win(what_link, x_size, x_pos, y_size, y_pos, scrolls, resize, name){
    var the_url = "."
    var the_x = x_size;
    var the_y = y_size;
    var how_wide = screen.availWidth;
    var how_high = screen.availHeight;
    
    if (what_link != "") {
    	the_url=what_link;
    }

    var the_toolbar = "no";
    var the_addressbar = "no";
    var the_directories = "no";
    var the_statusbar = "no";
    var the_menubar = "no";
    var the_scrollbars = scrolls;
    var the_do_resize =  resize;
    var the_copy_history = "no";
    var the_name = "DisplayWindow";

    if(name != null && name != "") {
    	the_name=name.replace(/ /g, "_");
    }
    if(the_x == 0) {
        the_x = how_wide;
    } else if (the_x < 1) { // fraction of screen widh
        the_x = the_x * how_wide;
    }
    if(the_y == 0) {
        the_y = how_high;
    } else if (the_y < 1) { // fraction of screen height
        the_y = the_y * how_high
    }
    if(x_pos == "left") {
        left_pos = 0;
    } else if(x_pos == "right") {
        left_pos = how_wide -  the_x;
    } else {
        left_pos = (how_wide/2) -  (the_x/2);
    }
    if(y_pos == "top") {
        top_pos = 0;
    } else if(y_pos == "bottom") {
        top_pos = how_high -  the_y;
    } else {
        top_pos = (how_high/2) -  (the_y/2);
    }
    var option = "toolbar="+the_toolbar+",location="+the_addressbar+",directories="+the_directories+",status="+the_statusbar+",menubar="+the_menubar+",scrollbars="+the_scrollbars+",resizable="+the_do_resize+",Width="+the_x+",Height="+the_y+",copyhistory="+the_copy_history+",left="+left_pos+",top="+top_pos;
    site=open('', the_name, option);
    site.location=the_url;
    if(site.open){site.focus();}
    site.resizeTo(the_x,the_y);
    site.focus();
}


