if (!window.Parasoft) {
    window.Parasoft = {};
}

if (!Parasoft.DTP) {
	Parasoft.DTP = {};
}

Parasoft.DTP.initialize = function(options) {
	
    jQuery.getJSON("/grs/api/v1/html/resources", function(data) {
        if (data == null) {
            return;
        }
        jQuery.each(data, function() {  
            
            switch (this.type) {
                case "css":
                    if (document.createStyleSheet){
                        document.createStyleSheet(this.url);
                    } else {
                        var link = jQuery('<link rel="stylesheet" href="' + this.url + '" type="text/css" media="screen" />');
                        jQuery('head').append(link);                          
                    }                       
                    break;
                case "js":
                    var script = jQuery('<script type="text/javascript" src="' + this.url + '"/>');
                    jQuery('head').append(script);
                    break;
            }           
        });	
        
    });
};