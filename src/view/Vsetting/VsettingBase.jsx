import React from 'react';

import Mstyle from '../../model/Mstyle';

import styleSpec from '../../vendor/style-spec/style-spec';

import Vproperty from '../Vproperty';
import VpropertyAdd from '../Vproperty/VpropertyAdd';

export default class VsettingBase extends React.Component {
	constructor(props) {
		super(props);
		const {style, handle} = props;

		this.state = {
			deleteShow:false,
			focus:null
		};

		this.handle = {
			change:(field)=>{
				let key = field.name.split('.');
				key.forEach((k,i)=>{
					if (/^\d+$/.test(k)) key[i] = Number(k);
				});
				Mstyle.setIn(key,field.value);
			},
			deleteConfirm:()=>{
				handle.routeHome();
				Mstyle.remove().then(()=>{

				});
			},
			deleteShow:()=>{
				this.setState({deleteShow:true});
			},
			deleteHide:()=>{
				this.setState({deleteShow:false});
			},
			removeIn:(pos)=>{
				//console.log('Mstyle:',Mstyle);
				Mstyle.removeIn(pos);
			},
			focus:(pos)=>{
				//console.log('focus:',pos);
				this.setState({focus:pos});
			}
		};
		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {style, error} = this.props;

		const spec = styleSpec.latest.$root;

		let addSpec = {
			name:spec.name,
			metadata:spec.metadata,
			center:spec.center,
			zoom:spec.zoom,
			bearing:spec.bearing,
			pitch:spec.pitch,
			light:spec.light,
			sprite:spec.sprite,
			glyphs:spec.glyphs,
			transition:spec.transition
		};

		const maxContentH = window.innerHeight - 44;

		return <div className="h-100 o-y-scroll" style={{maxHeight:maxContentH+'px'}}>
			<div className="">
				<h2 className="px-2 m-0 text-nav bg-light font-med">
					Base Settings
					<div className="float-right">
						
					</div>
				</h2>
				<div className="p-2">
					{style.keySeq().map((key)=>{
						//console.log('styleSpec key:',key);
						if (!addSpec[key]) return;
					
						return <Vproperty key={key} property={{
							name:key,
							label:key,
							spec:addSpec[key],
							value:style.get(key),
							error:error && error.get && error.get(key),
							required:addSpec[key].required
						}} focus={this.state.focus} handle={this.handle}/>
					})}

					<div className="property">
						<VpropertyAdd 
							spec={addSpec} 
							layerGroup={style} 
							focus={this.state.focus}
							handle={this.handle}/>
					</div>

					{this.state.deleteShow ?
						<div className="form-group mt-4 text-right">
							<button onClick={this.handle.deleteConfirm} type="submit" className="btn btn-danger btn-sm mr-2">
								Delete Style
							</button>
							<button onClick={this.handle.deleteHide} type="submit" className="btn btn-light btn-sm">
								<i className="material-icons md-18">close</i>
							</button>
						</div>
						:
						<div className="form-group mt-4 text-right">
							<button onClick={this.handle.deleteShow} type="submit" className="btn btn-light btn-sm">
								<i className="material-icons md-18">delete</i>
							</button>
						</div>
					}
				</div>
			</div>
		</div>;

	}
};