if (!window.Parasoft) {
    window.Parasoft = {};
}

if (!Parasoft.DataCache) {
	Parasoft.DataCache = {};
}

Parasoft.DataCache = function (options) {
    this._cache = {};
    this._emptyListener = options == null ? null : options.emptyListener;
    this._notEmptyListener = options == null ? null : options.notEmptyListener;
};

Parasoft.DataCache.prototype.contains = function(key) {
    return this.get(key) != null;
};

Parasoft.DataCache.prototype.put = function(key, value) {
    var size = this.size();
    this._cache[key] = value;
    if (size == 0){
        if (this._notEmptyListener != null) {
            this._notEmptyListener();
        }                
    }
};           

Parasoft.DataCache.prototype.get = function(key) {
    return this._cache[key];
};

Parasoft.DataCache.prototype.clear = function(key) {
    this._cache = {};
    if (this.size() == 0) {
        if (this._emptyListener != null) {
            this._emptyListener();
        }
    }                
    
};            

Parasoft.DataCache.prototype.remove = function(key) {
    delete this._cache[key];
    if (this.size() == 0) {
        if (this._emptyListener != null) {
            this._emptyListener();
        }
    }
};   

Parasoft.DataCache.prototype.entrySet = function() {
    var res = new Array();
    for (var key in this._cache) {
        res.push({key: key, value: this._cache[key]});    
    }
    return res;
};

Parasoft.DataCache.prototype.size = function() {
    var count = 0;
    for (property in this._cache) {
        count++;                           
    }            
    return count;
};