var valueSelectors = 
(function(){
	this.verticalSlider = function(containerData, entityData)
	{
		$('#container').append('<div style="position: absolute;" id="valueContainer'+ containerData.id +'"><div class="valueSlider">');
		$('#valueContainer'+ containerData.id).append('<input type="text" size="3" value='+ containerData.currentValue +' id="sliderValue'+ containerData.id + '" style="border:0; color:#f6931f; font-weight:bold;" />');
		$(function() {$('#valueContainer'+ containerData.id).draggable({  containment: 'parent', scroll: false });});
		$('#valueContainer'+ containerData.id).children('.valueSlider').css({"width":  containerData.width, "height" : containerData.height });
		$('#valueContainer'+ containerData.id).css({'top' : containerData.positionY + 'px', 'left' : containerData.positionX  + 'px', "width":  (containerData.width + 20), "height" : (containerData.height + 20) });
		$(function() {$('#valueContainer'+ containerData.id).draggable('destroy');});
		
		$('#valueContainer'+ containerData.id).children('.valueSlider')
		.slider(
				{
					
				orientation: "vertical",
				range: "min",
				min : entityData.min, 
				max : entityData.max, 
				step : entityData, 
				value : containerData.currentValue,
				slide: function(event, ui) {
					$("#sliderValue"+ containerData.id).val(+ ui.value);
				}

			});		
	};
	
	this.horizontalSlider = function(containerData, entityData)
	{
		$('#container').append('<div style="position: absolute;" id="valueContainer'+ containerData.id +'"><div class="valueSlider">');
		$('#valueContainer'+ containerData.id).append('<input type="text" size="3" value='+ containerData.currentValue +' id="sliderValue'+ containerData.id + '" style="border:0; color:#f6931f; font-weight:bold;" />');
		$(function() {$('#valueContainer'+ containerData.id).draggable({  containment: 'parent', scroll: false });});
		$('#valueContainer'+ containerData.id).children('.valueSlider').css({"width":  containerData.width, "height" : containerData.height });
		$('#valueContainer'+ containerData.id).css({'top' : containerData.positionY + 'px', 'left' : containerData.positionX + 'px', "width":  (containerData.width + 20), "height" : (containerData.height + 20) });
		$(function() {$('#valueContainer'+ containerData.id).draggable('destroy');});
		
		$('#valueContainer'+ containerData.id).children('.valueSlider')
		.slider(
				{ 
				range: "min",
				min : entityData.min, 
				max : entityData.max, 
				step : entityData, 
				value : containerData.currentValue,
				slide: function(event, ui) {
					$("#sliderValue"+ containerData.id).val(+ ui.value);
				}

			});
		//$('#valueContainer'+ containerData.id).draggable({containment: 'parent'}).resizable({containment: 'parent'});
	};
});