if (!window.Parasoft) {
    window.Parasoft = {};
}

if (!Parasoft.Remoting) {
	Parasoft.Remoting = {};
}

Parasoft.Remoting.getComponentInstance = function(name)
{
	Seam.Remoting.displayLoadingMessage = function() {};
	Seam.Remoting.hideLoadingMessage = function() {};
	return Seam.Component.getInstance(name);
}

Parasoft.Remoting.newComponentInstance = function(name)
{
	Seam.Remoting.displayLoadingMessage = function() {};
	Seam.Remoting.hideLoadingMessage = function() {};
	return Seam.Component.newInstance(name);
}