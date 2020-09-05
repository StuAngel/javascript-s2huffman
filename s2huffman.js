function s2huffman()
{
	this.clean = function(o, t, ext)
		{ if('object'==typeof o){ if(o.length==1)return this.clean(o[0], t, ext); o[0] = this.clean(o[0], t, ext + '0'); o[1] = this.clean(o[1], t, ext + '1'); } else t[o] = ext; return o; };
	this.compress = function(s)
	{
		if(s.length<2)return null; 		
		var r = [], o = [], t = {}, h='', result = null;
		var s = s.split('').map(x=>x.charCodeAt(0).toString(16));
		s.map(x=>t[x]=(t[x]?t[x]+1:1));
		for(var i in t){ o.push([t[i], i]); t[i]=''; };
		while(o.length&&(o = o.sort(function(a,b){ return b[0]-a[0]; })))
			if((result = o.pop())&&(_r = o.pop()))o.push([result[0]+_r[0], result.slice(1), _r.slice(1)]);
		result = result.slice(1);
		this.clean(result, t, '');
		var len = (s = s.map(x=>t[x]).join('')).length;
		while(node = s.substr(-8)){ h = parseInt(node, 2).toString(16).padStart(2, '0').toUpperCase()+h; s = s.substr(0, s.length-8); };
		r = JSON.stringify(result); for(var i in (p={'\x22':'', ',':'M', '\\\[\\\[':'L', '\\\]\\\]':'K', '\\\(\\\(':'J', '\\\)\\\)':'I', '\\\(\\\[':'H', '\\\)\\\]':'G'}))r = r.replace(new RegExp(i, 'g'), p[i]);
		return 's2'+r+'.'+len.toString(16).padStart(4, '0')+(h.toUpperCase());
	};
	this.decompress = function(s)
	{
		if('s2'!=s.substr(0, 2))return null; var result = '';
		if((e = s.substr(2).split('.')).length==2)
		{
			for(var i in (p={'G':')]', 'H':'([', 'I':'))', 'J':'((', 'K':']]', 'L':'[[', 'M':'","', '\\\]':'"]', '\\\]\\\x22':']', '\\\[':'["', '\\\x22\\\[':'['}))e[0] = e[0].replace(new RegExp(i, 'g'), p[i]);
			if(e[0]=JSON.parse(e[0]))
			{				
				var lu = e[1].substr(4).match(/.{1,2}/g).map(x=>parseInt(x, 16).toString(2).padStart(8, '0')).join('').padStart(parseInt(e[1].substr(0, 4), 16), '0').split('');
				var ptr = e[0]; for(var i = 0; i<lu.length; i++)if('string'==typeof ptr[lu[i]]){ result+=String.fromCharCode(parseInt(ptr[lu[i]], 16)); ptr = e[0]; } else ptr = ptr[lu[i]];
			};
		};
		return result;
	};
};
