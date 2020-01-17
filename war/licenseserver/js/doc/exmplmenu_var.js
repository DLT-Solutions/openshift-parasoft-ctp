/***********************************************************************************
*	(c) Ger Versluis 2000 version 5.41 24 December 2001	          *
*	For info write to menus@burmees.nl		          *
*	You may remove all comments for faster loading	          *		
***********************************************************************************/

	var NoOffFirstLineMenus=6;			// Number of first level items
	var LowBgColor='#666666';			// Background color when mouse is not over
	var LowSubBgColor='#666666';			// Background color when mouse is not over on subs
	var HighBgColor='#666666';			// Background color when mouse is over
	var HighSubBgColor='#999999';			// Background color when mouse is over on subs
	var FontLowColor='#666666';			// Font color when mouse is not over
	var FontSubLowColor='white';			// Font color subs when mouse is not over
	var FontHighColor='#666666';			// Font color when mouse is over
	var FontSubHighColor='#333333';			// Font color subs when mouse is over
	var BorderColor='#999999';			// Border color
	var BorderSubColor='#999999';			// Border color for subs
	var BorderWidth=1;				// Border width
	var BorderBtwnElmnts=1;			// Border between elements 1 or 0
	var FontFamily="arial, helvetica, sans-serif"	// Font family menu items
	var FontSize=8;				// Font size menu items
	var FontBold=0;				// Bold menu items 1 or 0
	var FontItalic=0;				// Italic menu items 1 or 0
	var MenuTextCentered='left';			// Item text position 'left', 'center' or 'right'
	var MenuCentered='left';			// Menu horizontal position 'left', 'center' or 'right'
	var MenuVerticalCentered='top';		// Menu vertical position 'top', 'middle','bottom' or static
	var ChildOverlap=.2;				// horizontal overlap child/ parent
	var ChildVerticalOverlap=.2;			// vertical overlap child/ parent
	var StartTop=84;				// Menu offset x coordinate
	var StartLeft=157;				// Menu offset y coordinate
	var VerCorrect=0;				// Multiple frames y correction
	var HorCorrect=0;				// Multiple frames x correction
	var LeftPaddng=5;				// Left padding
	var TopPaddng=4;				// Top padding
	var FirstLineHorizontal=1;			// SET TO 1 FOR HORIZONTAL MENU, 0 FOR VERTICAL
	var MenuFramesVertical=1;			// Frames in cols or rows 1 or 0
	var DissapearDelay=100;			// delay before menu folds in
	var TakeOverBgColor=1;			// Menu frame takes over background color subitem frame
	var FirstLineFrame='navig';			// Frame where first level appears
	var SecLineFrame='space';			// Frame where sub levels appear
	var DocTargetFrame='space';			// Frame where target documents appear
	var TargetLoc='';				// span id for relative positioning
	var HideTop=0;				// Hide first level when loading new document 1 or 0
	var MenuWrap=1;				// enables/ disables menu wrap 1 or 0
	var RightToLeft=0;				// enables/ disables right to left unfold 1 or 0
	var UnfoldsOnClick=0;			// Level 1 unfolds onclick/ onmouseover
	var WebMasterCheck=0;			// menu tree checking on or off 1 or 0
	var ShowArrow=0;				// Uses arrow gifs when 1
	var KeepHilite=1;				// Keep selected path highligthed
	var Arrws=['/jsp/js/tri.gif',5,10,'/jsp/js/tridown.gif',10,5,'/jsp/js/trileft.gif',5,10];	// Arrow source, width and height

function BeforeStart(){return}
function AfterBuild(){return}
function BeforeFirstOpen(){return}
function AfterCloseAll(){return}


// Menu tree
//	MenuX=new Array(Text to show, Link, background image (optional), number of sub elements, height, width);
//	For rollover images set "Text to show" to:  "rollover:Image1.jpg:Image2.jpg"

Menu1=new Array("<IMG SRC='/jsp/js/images/products.gif' NAME='products' BORDER='0' HSPACE='16'>","/jsp/products.jsp","",9,13,80);
	Menu1_1=new Array("Jtest","/jsp/products/home.jsp?product=Jtest","",0,20,117);
	Menu1_2=new Array("Insure++","/jsp/products/home.jsp?product=Insure","",0);
	Menu1_3=new Array("WebKing","/jsp/products/home.jsp?product=WebKing","",0);
	Menu1_4=new Array("CodeWizard","/jsp/products/home.jsp?product=Wizard","",0);
	Menu1_5=new Array("C++Test","/jsp/products/home.jsp?product=CppTest","",0);
	Menu1_6=new Array("Jcontract","/jsp/products/home.jsp?product=Jcontract","",0);
	Menu1_7=new Array("DataRecon","/jsp/products/home.jsp?product=Recon","",0);
	Menu1_8=new Array("SOAPtest","/jsp/products/home.jsp?product=SOAP","",0);
    Menu1_9=new Array("<IMG SRC='/jsp/js/images/support.gif' NAME='support' BORDER='0' HSPACE='20'>","/jsp/products/support.jsp","",2,13,80);
	Menu1_9_1=new Array("Jtest","/jsp/products/home.jsp?product=Jtest","",0,20,117);
	Menu1_9_2=new Array("Insure++","/jsp/products/home.jsp?product=Insure","",0);

    
Menu2=new Array("<IMG SRC='/jsp/js/images/support.gif' NAME='support' BORDER='0' HSPACE='20'>","/jsp/products/support.jsp","",8,13,80);
	Menu2_1=new Array("Jtest","/jsp/products/manuals.jsp?product=Jtest&manual=jtest/support/index.html","",0,20,117);
	Menu2_2=new Array("Insure++","/jsp/products/manuals.jsp?product=Insure&manual=insure/support/index.html","",0);
	Menu2_3=new Array("WebKing","/jsp/products/manuals.jsp?product=WebKing&manual=webking/manuals/index.html","",0);
	Menu2_4=new Array("CodeWizard","/jsp/products/manuals.jsp?product=Wizard&manual=wizard/support/index.html","",0);
	Menu2_5=new Array("C++Test","/jsp/products/manuals.jsp?product=CppTest&manual=ctest/support/index.html","",0);
	Menu2_6=new Array("Jcontract","/jsp/products/manuals.jsp?product=Jcontract&manual=jtract/support/index.html","",0);
	Menu2_7=new Array("DataRecon","/jsp/products/manuals.jsp?product=Recon&manual=recon/manuals/index.html","",0);
	Menu2_8=new Array("SOAPtest","/jsp/products/manuals.jsp?product=SOAP&manual=soap/manuals/1_0/index.html","",0);

Menu3=new Array("<IMG SRC='/jsp/js/images/download.gif' NAME='download' BORDER='0' HSPACE='15'>","/jsp/OutputSpecPage?thepath=/products/&pname=devtools","",8,13,80);
	Menu3_1=new Array("Jtest","/jsp/CreateDlForm?product=jtest&formname=create","",0,20,117);
	Menu3_2=new Array("Insure++","/jsp/CreateDlForm?product=insure&formname=create","",0);
	Menu3_3=new Array("WebKing","/jsp/CreateDlForm?product=webking&formname=create","",0);
	Menu3_4=new Array("CodeWizard","/jsp/CreateDlForm?product=wizard&formname=create","",0);
	Menu3_5=new Array("C++Test","/jsp/CreateDlForm?product=cpptest&formname=create","",0);
	Menu3_6=new Array("Jcontract","/jsp/CreateDlForm?product=jtract&formname=create","",0);
	Menu3_7=new Array("DataRecon","/jsp/CreateDlForm?product=recon&formname=create","",0);
	Menu3_8=new Array("SOAPtest","/jsp/CreateDlForm?product=soap&formname=create","",0);

Menu4=new Array("<IMG SRC='/jsp/js/images/about.gif' NAME='about' BORDER='0' HSPACE='24'>","/jsp/pr/company.jsp","",9,13,80);
	Menu4_1=new Array("Parasoft History","/jsp/products/article.jsp?label=Corporate+History","",0,20,117);
	Menu4_2=new Array("Executive Bios","/jsp/products/article.jsp?label=Biographies","",0);
	Menu4_3=new Array("Partners","/jsp/pr/partners.jsp","",0);
	Menu4_4=new Array("Distributors","/jsp/pr/distributors.jsp","",0);
	Menu4_5=new Array("Locations","/jsp/pr/locations.jsp","",0);
	Menu4_6=new Array("Careers","/jsp/pr/careers.jsp","",0);
	Menu4_7=new Array("Press Room","/jsp/pr/press_room.jsp","",0);
	Menu4_8=new Array("Events","/jsp/pr/events.jsp","",0);
	Menu4_9=new Array("Newsletter","/jsp/pr/runtimes.jsp?intro=","",0,20,100);

Menu5=new Array("<IMG SRC='/jsp/js/images/news_events.gif' NAME='events' BORDER='0' HSPACE='5'>","/jsp/pr/press_room.jsp","",7,13,80);
	Menu5_1=new Array("Press Releases","/jsp/products/press_releases.jsp?type=current","",0,20,117);
	Menu5_2=new Array("In the News","/jsp/pr/reviews.jsp","",0);
	Menu5_3=new Array("Tech Papers","/jsp/pr/tech_papers.jsp","",0);
	Menu5_4=new Array("Newsletter","/jsp/pr/runtimes.jsp?intro=","",0);
	Menu5_5=new Array("Testimonials","/jsp/pr/testimonials.jsp","",0);
	Menu5_6=new Array("Awards","/jsp/pr/awards.jsp","",0);
	Menu5_7=new Array("PR Contacts","/jsp/products/article.jsp?label=PR+Contact","",0);

Menu6=new Array("<IMG SRC='/jsp/js/images/resources.gif' NAME='resources' BORDER='0' HSPACE='15'>","/jsp/pr/tech_papers.jsp","",0,13,80);
