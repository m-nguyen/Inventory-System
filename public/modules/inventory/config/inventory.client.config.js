'use strict';

// Configuring the Articles module
angular.module('inventory').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Inventory', 'inventory', 'dropdown', '/inventory(/create)?');
		Menus.addSubMenuItem('topbar', 'inventory', 'List Inventory', 'inventory');
		Menus.addSubMenuItem('topbar', 'inventory', 'New Part Type', 'inventory/create');
	}
]);
