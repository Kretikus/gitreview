function createEditElement()
{
	var el = document.createElement("div");
	el.innerHTML = '<textarea>Add your comment... </textarea></BR>' +
				   '<button type="button" class="btn btn-primary" onclick="resetComment(this)">Reset</button> ' +
				   '<button type="button" class="btn btn-success" onclick="submitComment(this)">Submit</button>';
	return el;
}

function addComment(elem) {
		elem.after(createEditElement());
}

function resetComment(elem) {
		elem.parentNode.remove();
}
function show_file_patch(elem, input)
{
	//console.log('TEST:' + elem + input);
	//return input;
	var lines = input.split('\n');
	//console.log("Split: ", lines);
	for (var i=0; i < lines.length; ++i) {
		var classes = '';
		if (lines[i].startsWith('+')) {
			classes = 'addedLine';
		} else if (lines[i].startsWith('-')) {
			classes = 'removedLine';
		}

		lines[i] = '<div onclick="addComment(this)" id="line-' + i + '" class="' + classes + '">' + 
		           lines[i] + '</div>';
	}
	$(elem).html(lines.join(''));
}

function get_filename(patch) {
	var splittedPatch = patch.split('\n');
	var matches = splittedPatch[0].match(/^.* b\/(.*)/);
	console.log(matches);
	return matches[1];
/*
	if (splittedPatch.length < 4) return '';
	var fline = splittedPatch[3];
	//console.log('F: ', fline);
	var matches = fline.match(/\+\+\+ b\/(.*)/);
	if (matches && matches.length > 1) {
		return matches[1];
	} else {
		console.log(matches);
		return "";
	}
*/
}

function show_patch(elem, input)
{
	var patch_per_file = input.split('diff --git ');
	var codesHtml = '';
	for (var i=0; i < patch_per_file.length; ++i) {
		if (patch_per_file[i].length > 0) {
			codesHtml += '<p>' +
                                     '<div><button onclick="hide_show_file(this)" type="button" class="btn">-</button> ' + get_filename(patch_per_file[i]) + '<div>' +
                                     '<pre><code id="commit-' + i + '"></code></pre></p>';
		}
	}
	$(elem).html(codesHtml);
	for (var i=0; i < patch_per_file.length; ++i) {
		if (patch_per_file[i].length > 0) {
			show_file_patch('#commit-'+i, patch_per_file[i]);
		}
	}
	
}
