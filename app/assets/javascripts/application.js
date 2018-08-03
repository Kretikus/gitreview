// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .
//= require jquery

function escape_html(input) {
	var tagsToReplace = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;'
	};

	var replaceTag = function (tag) {
		return tagsToReplace[tag] || tag;
	};

	return input.replace(/[&<>]/g, replaceTag);
}

function show_patch(elem, input)
{
	//console.log('TEST:' + elem + input);
	//return input;
	var lines = input.split('\n');
	console.log("Split: ", lines);
	for (var i=0; i < lines.length; ++i) {
		var classes = '';
		if (lines[i].startsWith('+')) {
			classes = 'addedLine';
		} else if (lines[i].startsWith('-')) {
			classes = 'removedLine';
		}

		lines[i] = '<div id="line-' + i + '" class="' + classes + '">' + 
		           escape_html(lines[i]) + '</div>';
	}
	$(elem).html(lines.join(''));
}