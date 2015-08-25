
inArray = function(array, p_val) 
{
	for(var i = 0, l = array.length; i < l; i++) {
		if(array[i] == p_val) {
			return true;
		}
	}
	return false;
};


var menuData = 
{
	"selectionType" : 
		[
		 	{"id" : 1, "type" : "menu"},
			{"id" : 2, "type" : "choice"},
			{"id" : 3, "type" : "value"}
		]
	,
	"menuType" : 
		[
			{"id": 1, "type" : "slider", "description" : "Typical slider" }, 
			{"id": 2, "type" : "itunes", "description" : "Itunes style tuneler menu."}, 
			{"id": 3, "type" : "drilldown", "description" : "Drill down menu."}
		],
	"valueType" : 
		[
			{"id" : 1, "type" : "horizontalSlider"},
			{"id" : 2, "type" : "verticalSlider"},
			{"id" : 3, "type" : "plus_notplus"},
			{"id" : 4, "type" : "the_wheel"},
			{"id" : 5, "type" : "graf"}
		],
	"singleMenu" : 
		[
			{"id" : 1, "title" : "Odabir Kave", "imageLocation" : "/images/kofi_choice.png", "action": "menu.drawMenu(1)"},
			{"id" : 2, "title" : "Napravi svoju kavu", "imageLocation" : "/images/custom_choice.png", "action": "menu.drawMenu(2)" }
		],
	"singleChoice" : 
		[
			{"id" : 1, "title" : "Crna Kava", "imageLocation" : "/images/black_kofi.png", "action" : "alert('Narucili ste crnu kavu'); menu.drawMenu(0);" },
			{"id" : 2, "title" : "Bijela Kava", "imageLocation" : "/images/white_kofi.png",  "action" : "alert('Narucili ste bijelu kavu'); menu.drawMenu(0);" },
			{"id" : 3, "title" : "Make It So", "imageLocation" : "/images/Picard.png",  "action" : "alert('Narucili ste svoju super uber kul kavu'); menu.drawMenu(0);"  }		//sto me podsjeca - moramo staviti njegovu sliku za caj i reci da je to njegov .D
		],
	"singleValue" :
		[
			{"id" : 1, "title" : "Secer", "min" : 0, "max" : 10, "step" : 1 },
			{"id" : 2, "title" : "Mlijeko", "min" : 0, "max" : 5, "step" : 1 }
		],
	"menus" :
		[
			{"id" : 0, 
			"menuTypeId" : 1, 
			"children" : 
				[ 
					{"selectionTypeId" : 1, "id" : 1 },
					{"selectionTypeId" : 1, "id" : 2 }
				],
			"containerPositionX" : 300,
			"containerPositionY" : 50,
			"containerDivHeight" : 350, 
			"containerDivWidth" : 400,
			"menuPositionX" : 0,
			"menuPositionY" : 0,
			"menuDivHeight" : 180,
			"menuDivWidth" : 340
			},
			{
			"id" : 1,  
			"menuTypeId" : 1,
			"children" : 
				[
					{"selectionTypeId" : 2, "id" : 1 , "order" : 1 },
					{"selectionTypeId" : 2, "id" : 2 , "order" : 2 }
				],
				"containerPositionX" : 300,
				"containerPositionY" : 50,
				"containerDivHeight" : 350, 
				"containerDivWidth" : 400,
				"menuPositionX" : 20,
				"menuPositionY" : 10,
				"menuDivHeight" : 180,
				"menuDivWidth" : 340
			},
			{
			"id" : 2, 
			"menuTypeId" : 1, 
			"children" : 
				[
					{"selectionTypeId" : 2, "id" : 3 , "positionX" : 100, "positionY" : 100 }
				],
			"valueSelectors" :
				[
					{"valueTypeId" : 1, "id" : 1, "currentValue" : 5, "positionX" : 50, "positionY" : 240, "width": 100, "height": 10},
					{"valueTypeId" : 2, "id" : 2, "currentValue" : 2, "positionX" : 220, "positionY" : 220, "height": 100, "width" : 10}
				],
				"containerPositionX" : 300,
				"containerPositionY" : 50,
				"containerDivHeight" : 350, 
				"containerDivWidth" : 400,
				"menuPositionX" : 20,
				"menuPositionY" : 10,
				"menuDivHeight" : 180,
				"menuDivWidth" : 340

			}
		]
};


function menuBuilder(buildConfig) 
{
	var selectionType = new Array();
	var menuType = new Array();
	var valueType = new Array();
	var singleMenu = new Array();
	var singleChoice = new Array();
	var singleValue = new Array();
	var menuConfiguration = new Array();
	var currentLevel = 0;
	
	
	this.init = function()
	{
		//init the menu configuration variables
		for (i = 0; i < buildConfig["selectionType"].length; i++)
		{
			selectionType[buildConfig["selectionType"][i].id] = buildConfig["selectionType"][i].type;
		}
		
		for (i = 0; i < buildConfig["menuType"].length; i++)
		{
			menuType[buildConfig["menuType"][i].id] = buildConfig["menuType"][i];
		}
		
		for (i = 0; i < buildConfig["valueType"].length; i++)
		{
			valueType[buildConfig["valueType"][i].id] = buildConfig["valueType"][i].type;
		}
		
		for (i = 0; i < buildConfig["singleMenu"].length; i++)
		{
			singleMenu[buildConfig["singleMenu"][i].id] = buildConfig["singleMenu"][i];  
		};
		
		for (i = 0; i < buildConfig["singleChoice"].length; i++)
		{
			singleChoice[buildConfig["singleChoice"][i].id] = buildConfig["singleChoice"][i]; 
		};
		
		for (i = 0; i < buildConfig["singleValue"].length; i++)
		{
			singleValue[buildConfig["singleValue"][i].id] = buildConfig["singleValue"][i]; 
		};
		
		for (i = 0; i < buildConfig["menus"].length; i++)
		{
			menuConfiguration[buildConfig["menus"][i].id] = buildConfig["menus"][i];
		};
		
		//draw the root menu
		currentLevel = 0;
		this.drawMenu(currentLevel);
				
	};

	this.drawMenu = function(level)
	{
		currentLevel = level;
		resetView();
		//set menu content position i size
		$(function() {$("#container").draggable({  containment: 'parent', scroll: false });});	
		$('#container').css({ 'top' : menuConfiguration[level].containerPositionY + 'px', 'left' : menuConfiguration[level].containerPositionX + 'px', 'height' : menuConfiguration[level].containerDivHeight, 'width' :  menuConfiguration[level].containerDivWidth});
		$(function() {$("#container").draggable('destroy');});

		//set menu position
		$(function() {$("#menu").draggable({  containment: 'parent', scroll: false });});	
		$('#menu').css({ 'top' : menuConfiguration[level].menuPositionY + 'px', 'left' : menuConfiguration[level].menuPositionX + 'px', 'height' : menuConfiguration[level].menuDivHeight, 'width' :  menuConfiguration[level].menuDivWidth});
		$(function() {$("#menu").draggable('destroy');});
		

		//get the children 
		childData = new Array();
		if (typeof(menuConfiguration[level].children) != 'undefined')
		{
			for (i = 0; i < menuConfiguration[level].children.length; i++)
			{
				//if (typeof(childData[menuConfiguration[level].children[i].selectionTypeId]) == 'undefined') childData[menuConfiguration[level].children[i].selectionTypeId]	 = new Array();
				if (menuConfiguration[level].children[i].selectionTypeId == 1) selectionArray = singleMenu;
				else selectionArray = singleChoice;
				childData[i] = 
					{
						"entityData" : 	selectionArray[menuConfiguration[level].children[i].id],
						"menuData" : menuConfiguration[level].children[i]
					};
			}	
		}
		
		switch (menuConfiguration[level].menuTypeId) {
		case 1:
			var meni = new menuSlider();
			meni.draw(childData);
			break;
		case 2:
			drawITunesMenu();
			break;
		case 3:
			//tree view
			drawDrillDown();
			break;
		default:
			break;
		}
		
		//value stuff
		if (typeof(menuConfiguration[level].valueSelectors) != 'undefined') 
		{
			for (i = 0; i < menuConfiguration[level].valueSelectors.length; i++)
			{
				 drawValue(menuConfiguration[level].valueSelectors[i]);
			}
		}
		
	};
	
	this.editMoveResize = function ()
	{
		//remove the fullscreen container 
		$('.container-fullscreen').remove();
		$('#container').addClass('editable');
		$(function() {
			$("#container").draggable({  containment: 'parent', scroll: false, stop: divChange});
		});	
		
		$(function() {
			$("#container").resizable({  containment: 'parent', minHeight: 50, minWidth: 50, stop: divChange });
		});
		
		$('#menu').addClass('editable');
		$(function() {
			$("#menu").draggable({ containment: 'parent', scroll: false.constructor, stop: divChange });			
		});	
		$(function() {
			$("#menu").resizable({ containment: 'parent', minHeight: 50, minWidth: 50, stop: divChange});
		});
		
		//value stuff
		if (typeof(menuConfiguration[currentLevel].valueSelectors) != 'undefined') 
		{
			for (i = 0; i < menuConfiguration[currentLevel].valueSelectors.length; i++)
			{
				currentChild = i;
				//valueContainer +menuConfiguration[level].valueSelectors[i]
				$('#valueContainer' + menuConfiguration[currentLevel].valueSelectors[i].id).addClass('editable');
				$(function() {
					$('#valueContainer' + menuConfiguration[currentLevel].valueSelectors[i].id).draggable({ containment: 'parent', scroll: false.constructor, stop: valueContainerChange });			
				});	
				$(function() {
					$('#valueContainer' + menuConfiguration[currentLevel].valueSelectors[i].id).resizable({ containment: 'parent', minHeight: 5, minWidth: 5, stop: valueContainerChange});
				});
			}
		}
		//add exit button
		$('body').append('<input class="move-resize-exit" id="exitMoveResizeButton"type="button" onclick="menu.exitMoveResize()" value="Exit Move Resize">');
	};
	
	this.exitMoveResize = function() 
	{
		$('#exitMoveResizeButton').remove();
		resetView();
		this.drawMenu(currentLevel);
		this.enterEditMode();
	};

	/**
	 * reset the menus, removes all the elements
	 */
	resetView = function()
	{
		$('.main').children().remove();
		$('.main').append('<div class="container" id="container"><div class="menu" id="menu" >');
	};
	
	divChange = function()
	{
		position = $(this).position();
		mainPosition = $('.main').position();
		if (this.id == 'menu') 
		{
			//if you move menu - the position is relative
			mainPosition.top = 0;
			mainPosition.left = 0;
		}
		
		menuConfiguration[currentLevel][ this.id + "PositionY"] = position.top - mainPosition.top; 
		menuConfiguration[currentLevel][ this.id + "PositionX"] = position.left - mainPosition.left;
		menuConfiguration[currentLevel][ this.id + "DivHeight"] = $(this).height();
		menuConfiguration[currentLevel][ this.id + "DivWidth"] = $(this).width();
	};
	
	valueContainerChange = function()
	{
		//get container id from element id from (valueContainer(ID)) 
		id = this.id.match(/\d+/);
		//get the position in the json
		for (i = 0; i < menuConfiguration[currentLevel].valueSelectors.length; i++)
		{
			if (menuConfiguration[currentLevel].valueSelectors[i].id == id) 
			{
				valuePosition = i;
				break;
			}
		}
		
		position = $(this).position();
		mainPosition = $('.main').position();
	
		menuConfiguration[currentLevel].valueSelectors[valuePosition].positionX = position.left ;
		menuConfiguration[currentLevel].valueSelectors[valuePosition].positionY = position.top ;
		menuConfiguration[currentLevel].valueSelectors[valuePosition].height = $(this).height();
		menuConfiguration[currentLevel].valueSelectors[valuePosition].width = $(this).width();		
	};
	
	drawValue = function(valueData)
	{
		
		switch (valueData.valueTypeId) {
		case 1:
			valueSelector.horizontalSlider(valueData, singleValue[valueData.id]);
			break;
		case 2:
			valueSelector.verticalSlider(valueData, singleValue[valueData.id]);
			break;
		default:
			break;
		};
		
	};
	
	this.exitEditMode = function()
	{
		$('.container-fullscreen').remove();
		currentLevel = 0;
		this.drawMenu(currentLevel);
	};
	
	
	this.addRemoveItems = function(level)
	{
		currentLevel = level;
		removeMenuContainer();
		//add list containers
		$('.edit-main-container').append('<div id="current-menu-items-container">');
		$('.edit-main-container').append('<div id="add-menu-items-container">');
		$('#current-menu-items-container').append('<ul id="current-menu-items" class="droptrue">');
		
		$('#add-menu-items-container').append('<ul id="add-menu-items" class="droptrue">');
		
		//add input
		$('.edit-main-container').append('<br /><label for="single-menu-change">Data Type: &nbsp&nbsp</label>');
		$('.edit-main-container').append('<select id="single-menu-change" onchange="menu.addToMenuItems(this.value)"><option value="1">Menu</option><option value="2">Choice</option></select>');
		
		for (i = 0; i < menuConfiguration[currentLevel].children.length; i++)
		{
			child = menuConfiguration[currentLevel].children[i];
			childData = {};
			if (child.selectionTypeId == 1)
			{
				//menu	
				$("#current-menu-items").append('<li id="menu'+ singleMenu[child.id].id +'" class="ui-state-default">'+ singleMenu[child.id].title +'</li>');
			}
			//value
			if (child.selectionTypeId == 2)
			{
				$("#current-menu-items").append('<li id="choice'+ singleChoice[child.id].id +'" class="ui-state-default">'+ singleChoice[child.id].title +'</li>');
			};
						
		}
		
		$(function() {
			$("ul.droptrue").sortable({
				connectWith: 'ul'
			});

			$("ul.dropfalse").sortable({
				connectWith: 'ul',
				dropOnEmpty: false
			});

			$("#current-menu-items, #add-menu-items").disableSelection();
		});
		//add starting menu items
		this.addToMenuItems(1);
		this.changeCurrentLevel();
		
		$('.edit-main-container').append('<br /><input type="button" value="Save" onclick="menu.saveMenuConfiguration()">');
	};
	
	
	this.changeCurrentLevel = function () 
	{
		$('.edit-main-container').append('<br /><label for="menu-type-change-level">Menu Level: </label>');
		$('.edit-main-container').append('<select id="menu-type-change-level" onchange="menu.addRemoveItems(this.value)">');
		//adds the root
		
		$('#menu-type-change-level').append('<option selected value="0">Main screen</option>');
		for (key in singleMenu)
		{
			if (key == currentLevel) 
			{
				$('#menu-type-change-level').append('<option selected value="'+ key +'">'+ singleMenu[key].title +'</option>');
			}
			else 
			$('#menu-type-change-level').append('<option value="'+ key +'">'+ singleMenu[key].title +'</option>');
		}
	};

	this.addToMenuItems = function(id)
	{
		//first remove items
		$("#add-menu-items").children().remove();
		currentItemsId = new Array();
		if (id == 1)
		{
			//if the menu is selected - get the current menu items
			matchValue = /menu(\d+)/;
			type = singleMenu;
			typeName = 'menu';
			
		} else if (id == 2)
		{
			matchValue = /choice(\d+)/;
			type = singleChoice;
			typeName = 'choice';
		}
		else
		{
			return;
		}
		//add items
		currentItems = $("#current-menu-items").sortable('toArray');
		for (i = 0; i < currentItems.length; i++)
		{
			//bugfix
			if (typeof(currentItems[i]) != 'string') continue; 
			menuId = currentItems[i].match(matchValue);
			//if selection type dosen't match 
			if (menuId == null) continue;
			currentItemsId.push(menuId[1]);
		}
		
		//no duplicate items
		for (key in type)
		{
			//check if the key exists 
			if (inArray(currentItemsId,key)) continue;
			$("#add-menu-items").append('<li id="' + typeName + type[key].id +'" class="ui-state-default">'+ type[key].title +'</li>');
		}
	};
	
	
	this.saveMenuConfiguration = function()
	{
		matchValue = /menu/;
		
		currentItems = $("#current-menu-items").sortable('toArray');
		menuConfiguration[currentLevel].children = new Array();
		
		for (i = 0; i < currentItems.length; i++)
		{
			if (currentItems[i].match(/menu/) )
			{
				//menu
				dataId = currentItems[i].match(/menu(\d+)/);
				menuConfiguration[currentLevel].children[i] = {"selectionTypeId" : 1, "id" : dataId[1] , "positionX" : 100, "positionY" : 100 };
			}
			else 
			{//choice
				dataId = currentItems[i].match(/choice(\d+)/);
				menuConfiguration[currentLevel].children[i] = {"selectionTypeId" : 2, "id" : dataId[1] , "positionX" : 100, "positionY" : 100 };
			}
		}
		
		this.exitEditMode();
		this.enterEditMode();
	};
	
	this.changeMenuType = function()
	{
		removeMenuContainer();
		//draw the menu selection box
		$('.edit-main-container').append('<label for="menu-type-change">Menu Level</label>');
		$('.edit-main-container').append('<select id="menu-type-change" onchange="menu.displayMenuDetails(this.value)">');
		$('.edit-main-container').append('<input type="button" value="Save" onclick="menu.saveChangedMenuType()">');
		//display menu details
		this.displayMenuDetails(1);
		for (key in menuType)
		{
			$('#menu-type-change').append('<option value="'+ key +'">'+ menuType[key].type +'</option>');
		}
	};
	
	this.saveChangedMenuType = function()
	{ 
		//get selected type
		selected = parseInt($('#menu-type-change').val());
		//set the root menu type 
		menuConfiguration[0].menuTypeId = selected;
		this.exitEditMode();
		this.enterEditMode();
	};
	
	this.displayMenuDetails = function(value)
	{
		$('.menu-description').remove();
		$('.edit-main-container').append('<div class="menu-description" ><p >' + menuType[value].description);
	};
	
	this.enterEditMode = function()
	{
		//reset view
		$('.container-fullscreen').remove();
		//add fullscreen container
		$('body').append('<div class="container-fullscreen">');
		//menu list
		$('.container-fullscreen').append('<div class="edit-menu-container">');
		$('.container-fullscreen').append('<div class="edit-main-container">');
		$('.edit-menu-container').append('<ul class="edit-menu-items">');
		$('.edit-main-container').append('<p>Welcome to the system for changing menus.</p><p>Select <b>Change Menu Type</b> to change the menus whole apperance. </p><p>Select <b>Move/Resize</b> to move or resize menu containers. </p> <p>Select <b>Add/Remove/Order</b> to add or remove menu items or/and to change their order.</p>');
		
		//$('.edit-menu-items').append('<li class="ui-state-default" onclick="menu.changeMenuType()">Change Menu Type</li>');
		//$('.edit-menu-items').append('<li class="ui-state-default" onclick="menu.editMoveResize()">Move/Resize</li>');
		//$('.edit-menu-items').append('<li class="ui-state-default" onclick="menu.addRemoveItems(0)">Add/Remove/Order</li>');
		//$('.edit-menu-items').append('<li class="ui-state-default" onclick="menu.exitEditMode()">Exit</li>');
		$('.edit-menu-items').append('<div class="buttonBlack"> <a href="#" onclick="menu.changeMenuType()">Change Menu Type</a><span></span></div><div class="clear></div>');
		$('.edit-menu-items').append('<div class="buttonBlack"> <a href="#" onclick="menu.editMoveResize()">Move/Resize</a><span></span>');
		$('.edit-menu-items').append('<div class="buttonBlack"> <a href="#" onclick="menu.addRemoveItems(0)">Add/Remove/Order</a><span></span></div><div class="clear></div>');
		$('.edit-menu-items').append('<div class="buttonBlack"> <a href="#" onclick="menu.exitEditMode()">Exit</a><span></span></div><div class="clear></div>');
	};
		
	removeMenuContainer = function()
	{
		$('.edit-main-container').children().remove();
	};
	
	setupKeys = function()
	{
		$.actionPress('E', function(){ 
			if ($('.container-fullscreen').length != 0) menu.exitEditMode();
			else menu.enterEditMode();
			});
	};

	setupKeys();
	
	/** itunes **/
	drawITunesMenu = function()
	{
		data = generateList();
		$('#menu').append(data);
		$('#original-list').columnview();
	};
	
	drawDrillDown = function()
	{
		data = generateList();
		$('#menu').append(data);
		
		$("#original-list").ddMenu();
			
	};
	


	generateList = function()
	{
		data = '<ul id="original-list">';
		
		for (i = 0; i < menuConfiguration[0].children.length; i++ ) 
		{
			if (menuConfiguration[0].children[i].selectionTypeId == 2)
			{
				data = data + '<li><a href="#" onclick="' + singleChoice[menuConfiguration[0].children[i].id].action + '">' + singleChoice[menuConfiguration[0].children[i].id].title + '</a></li>' ;
			};
			
			if (menuConfiguration[0].children[i].selectionTypeId == 1)
			{
				data = data + '<li><a href="#">' + singleMenu[menuConfiguration[0].children[i].id].title + '</a><ul>';
				data = data + getChildrenData(menuConfiguration[0].children[i].id);
				data = data + '</ul></li>';
			};
		};
		
		data = data + '</ul>';
		return data;
	}
	
	getChildrenData = function(level)
	{
		data = '';
		for (j = 0; j < menuConfiguration[level].children.length; j++ ) 
		{
			if (menuConfiguration[level].children[j].selectionTypeId == 2)
			{
				data = data + '<li><a href="#" onclick="' + singleChoice[menuConfiguration[level].children[j].id].action + '">' + singleChoice[menuConfiguration[level].children[j].id].title + '</a></li>' ;
			};
			
			if (menuConfiguration[level].children[j].selectionTypeId == 1)
			{
				data = data + '<li><a href="#">' + singleMenu[menuConfiguration[level].children[j].id].title + '</a><ul>';
				data = data + getChildrenData(menuConfiguration[level].children[j].id);
				data = data + '</ul></li>';
			}

		};
		
		return data;
	};
	/** end itunes **/
	
};

/*
 * keypress function
 * $.ctrl("S", function(){})
 */
$.actionPress = function(key, callback, args) {
    $(document).keydown(function(e) {
        if(!args) args=[]; 
        if(e.keyCode == key.charCodeAt(0) && e.ctrlKey) {
            callback.apply(this, args);
            return false;
        }
    });
};

