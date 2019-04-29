import PropTypes from 'prop-types';
import React from 'react';
import {fromJS, Map} from 'immutable';

import styleSpec from '../../vendor/style-spec/style-spec';

import Valert from '../Valert';
import Vproperty from '../Vproperty';
import VpropertyAdd from '../Vproperty/VpropertyAdd';

import Msource from '../../model/Msource';
import Mstyle from '../../model/Mstyle';

import Url from '../../utility/Url' 

export default class VsettingDomains extends React.Component {
	static propTypes = {
		error: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		]),
		handle: PropTypes.object,
		style: PropTypes.object,
	}

	constructor(props) {
		super(props);

		const {handle} = this.props;

		const store = Mstyle.getStore()
		const domains = Mstyle.getDomains()

		let doms = {}
		domains.forEach((d)=>{
			doms[d] = {}
		})

		this.state = {
			domains:store.get('domains') || fromJS(doms),
		};
	
		this.handle = {
			...handle,
			focus:(pos)=>{
				this.setState({focus:pos});
			},
			change:(field)=>{
				const domains = this.state.domains.setIn([field.name],field.value)
				this.setState({domains})
			},
			submit:(e)=>{
				e.preventDefault()
				Mstyle.setDomains(this.state.domains)
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {error, handle, style} = this.props;

		const domains = Mstyle.getDomains()
		const maxContentH = window.innerHeight - 44;

		return <div className="h-100 o-y-scroll" style={{maxHeight:maxContentH+'px'}}>
			<div className="">
				<h2 className="px-2 m-0 text-nav bg-light font-med">
					Domain Headers
				</h2>
				<div className="p-2">
					<form onSubmit={this.handle.submit} className="p-2">
						{domains && domains.map((domain)=>{

							const value = this.state.domains.has(domain) ? this.state.domains.get(domain): Map({})

							return <Vproperty key={domain} property={{
								hideOptions:true,
								name:domain,
								label:domain,
								spec:{doc:'Headers attached to domain requests', type:'*'},
								value:this.state.domains && this.state.domains.get(domain),
								error:error && error.get && error.get(domain)
							}} /*focus={this.state.focus}*/ handle={this.handle}/>
						})}

						<div className="pt-2">
							<button type="submit" className="btn btn-primary">Save</button>
						</div>
						<div className="mt-3">
							<Valert message={this.state.error}/>
						</div>
					</form>
				</div>
			</div>
		</div>;

	}
};