var TaggingHistory = base2.Base.extend({
	
	idPrefix : 'tag-',
	
	update: function(tags, currentTime) {
		tags.forEach(function(tag){
			var el = jQuery('#' + this.idPrefix + tag.id);
			
			if (!el.length) {
				// Create an element for it
				el = jQuery('<div/>', { 'class' : 'tag', 'id' : this.idPrefix + tag.id });
				el.append(jQuery('<span/>', { 'class' : 'points', 'text': '+' + tag.score }));
				if (tag.matchingTag) {
					var ownerName = tag.matchingTagOwnerName ? tag.matchingTagOwnerName : 'Anoniempje';
					var title = 'match met ' + tag.matchingTag + ' van ' + ownerName;
					if (tag.pioneer) {
						title += '. Jij hebt deze tag ge�ntroduceerd';
					}
					var iconSrc = '/static/img/' + (tag.pioneer ? 'match-pioneer.png' : 'match-social.png');
					el.append(jQuery('<img/>',  { 'class' : 'icon', 'title' : title, 'src' : iconSrc }));
				}
				el.append(jQuery('<span/>', { 'text'  : tag.tag }));
			} else {
				// Update existing element
				jQuery('span.points', el).text('+' + tag.score);
				if (tag.matchingTag && tag.pioneer) {
					// Add a pioneer icon if one doesn't exist yet
					var createNew = true;
					jQuery('img', el).each(function(i, img) {
						if (img.src.indexOf('pioneer') >= 0) {
							createNew = false;
						}
					});
					if (createNew) {
						var icon = jQuery('<img/>',  { 'class' : 'icon', 'src' : '/static/img/match-pioneer.png' });
						jQuery('span.points', el).append(icon);
					}
				}
			}

			jQuery('#tagList').prepend(el);
		}, this);
	}

});