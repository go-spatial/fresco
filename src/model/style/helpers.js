import utilUrl from '../../utility/utilUrl'

const getDomains = ({style})=>{
	const current = style.get('current')

	let domains = []
	const glyphs = current.getIn(['glyphs'])
	const glyphsDomain = utilUrl.getDomain(glyphs)
	if (glyphsDomain) domains.push(glyphsDomain)

	const sprites = current.getIn(['sprites'])
	const spritesDomain = utilUrl.getDomain(sprites)
	if (spritesDomain && !domains.includes(spritesDomain)) domains.push(spritesDomain)

	// loop through sources and get all domains (from tiles too)
	const sources = current.getIn(['sources'])
	if (!sources) return domains
	sources.forEach((source, sourceKey)=>{
		const url = source.get('url')
		if (url){
			const domain = utilUrl.getDomain(url)
			if (domain && !domains.includes(domain)) domains.push(domain)

			/*

			TODO: get domains from soiurceData

			const sourceJson = Store.getState().current.getIn(['_store','sourceJson',url])

			let tiles
			if (source.has('tiles')){
				tiles = source.get('tiles')
			} else if (sourceJson && sourceJson.has('tiles')){
				tiles = sourceJson.get('tiles')
			}

			tiles && tiles.forEach((tile)=>{
				const domain = utilUrl.getDomain(tile)
				if (domain && !domains.includes(domain)) domains.push(domain)
			})
			*/
		}	
	})

	return domains
}

const getRouteFromPath = ({path, route})=>{
	if (path.length < 1) return route

	const styleId = path[0]
	
	return `/style/${styleId}/${route || ''}`
}

export default {
	getDomains,
	getRouteFromPath,
}