function s2huffman()
{
	this.clean = function(o, t, ext)
		{ if('object'==typeof o){ if(o.length==1)return this.clean(o[0], t, ext); o[0] = this.clean(o[0], t, ext + '0'); o[1] = this.clean(o[1], t, ext + '1'); } else t[o] = ext; return o; };
	this.compress = function(s)
	{
		if(s.length<2)return null; 		
		var [ts, o, t, r, r1] = [{}, [], [], '', 0];
		(s=s.split('').map(x=>x.charCodeAt(0).toString(16).padStart(2, '0'))).map(x=>(undefined==ts[x]?ts[x]=[1,x]:ts[x][0]+=1));
		ts = Object.values(ts); do{ ts = ts.sort(function(a, b){ return b[0]-a[0]; }); result = ts.pop(); 
		if(r1 = ts.pop())ts.push([result[0]+r1[0], result.slice(1), r1.slice(1)]); }while(r1); 
		this.clean((result = result.slice(1)), t, ''); while(s.length)r+=t[s.pop()]; if(!(r1=r.length))return null;
		while(en = r.slice(-8)){ o.push(parseInt(en, 2).toString(16).padStart(2, '0')); r = r.slice(0, -8); }; result = JSON.stringify(result);
		for(var i in (p={'\x22':'', ',':'M', '\\\[\\\[':'L', '\\\]\\\]':'K', '\\\(\\\(':'J', '\\\)\\\)':'I', '\\\(\\\[':'H', '\\\)\\\]':'G'}))result = result.replace(new RegExp(i, 'g'), p[i]);
		return 's2'+result+'.'+r1.toString(16).padStart(4, '0')+o.join('');
	};
	this.decompress = function(s)
	{
		if('s2'!=s.substr(0, 2))return null; var result = '';
		if((e = s.split('.')).length==2)
		{
			e[0] = e[0].substr(2);
			for(var i in (p={'G':')]', 'H':'([', 'I':'))', 'J':'((', 'K':']]', 'L':'[[', 'M':'","', '\\\]':'"]', '\\\]\\\x22':']', '\\\[':'["', '\\\x22\\\[':'['}))e[0] = e[0].replace(new RegExp(i, 'g'), p[i]);
			if(e[0]=JSON.parse(e[0]))
			{			
				var lu = (lu = e[1].substr(4).match(/.{1,2}/g).map(x=>parseInt(x, 16).toString(2).padStart(8, '0')).reverse().join('')).substr(-parseInt(e[1].substr(0, 4), 16));
				var ptr = e[0]; for(var i = 0; i<lu.length; i++)if('string'==typeof ptr[lu[i]]){ result=String.fromCharCode(parseInt(ptr[lu[i]], 16))+result; ptr = e[0]; } else ptr = ptr[lu[i]];
			};
		};
		return result;
	};
};
