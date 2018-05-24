import PropTypes from 'prop-types';
import React from 'react';
import {NavLink, Route, Switch} from 'react-router-dom';

import Valert from '../Valert';
import Vfield from '../Vfield';

import Mstyle from '../../model/Mstyle';
import MstyleSource from '../../model/MstyleSource';

export default class VstyleAdd extends React.Component {
	static propTypes = {
		handle: PropTypes.object,
		match: PropTypes.object
	}

	constructor(props) {
		super(props);
		const {handle} = props;

		this.state = {
			name:'',
			url:'',
			file:undefined,
			error:null
		};

		this.handle = {
			close:()=>{
				handle.route('');
			},
			submitNew:(e)=>{
				e.preventDefault();

				Mstyle.add({name:this.state.name}).then((style)=>{
					handle.route('style/'+style.id+'/source/add');
				}).catch((e)=>{
					this.setState({error:e});
					console.error(e);
				});
			},
			submitFromSource:(e)=>{
				e.preventDefault();

				MstyleSource.addFromSource(this.state.url).then((style)=>{
					console.log('style:',style);
					if (style !== undefined){
						handle.route('style/'+style.id);
					}

				}).catch((e)=>{
					console.log('error:',e);
					this.setState({error:e.message});
					
				});
			},
			submitUpload:(e)=>{
				e.preventDefault();
				
				if (!this.state.file){
					this.setState({error:'select a file'})
					return; //error
				} 

				var reader = new FileReader();
				reader.onloadend = (e)=>{
					//console.log('text:',e.target.result);
					const text = e.target.result;
					let json;
					try {
						json = JSON.parse(text);
					} catch (e){
						return console.error(e);
					}
					Mstyle.add(json).then((style)=>{
						handle.route('style/'+style.id);
						//MstyleSource.setStyleSourceJSON(style);
					}).catch((e)=>{
						this.setState({error:e});
						console.error(e);
					});
				};
				reader.readAsText(this.state.file);
			},
			nameChange:(field)=>{
				this.setState({
					name:field.value,
					error:null
				});
			},
			urlChange:(field)=>{
				this.setState({
					url:field.value,
					error:null
				});
			},
			fileChange:(file)=>{
				//console.log('file change:',val);
				this.setState({
					file:file,
					error:null
				});
			},
			clearError:()=>{
				this.setState({
					error:null
				});
			}
		};

		for (const i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	componentWillReceiveProps (nextProps){
		this.setState({error:null});
	}

	render (){
		return <div className="p-3 bg-white h-100 position-relative">
			<button onClick={this.handle.close} className="btn btn-light btn-xs position-absolute close-pos">
				<i className="material-icons md-14">
					close
				</i>
			</button>
			<h2>Add Style</h2>
			<ul className="nav nav-tabs">
				<li className="nav-item">
					<NavLink className="nav-link" to="/add/new">New</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" to="/add/upload">Upload</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" to="/add/fromSource">From Source</NavLink>
				</li>
			</ul>
			<div className="p-2">
				<Switch>
					<Route path="/add/new">
						<form onSubmit={this.handle.submitNew} className="mt-2">
							<Vfield key="name" field={{
								type:'string',
								label:'Style name',
								name:'styleName',
								value:this.state.name,
								placeholder:'any name, you can change it later',
								controlled:false
							}} handle={{change:this.handle.nameChange}}/>
							<div className="mt-3">
								<button type="submit" className="btn btn-primary">Add</button>
							</div>
						</form>
					</Route>
					<Route path="/add/upload">
						<form onSubmit={this.handle.submitUpload} className="mt-2">
							<Vfield key="style" field={{
								type:'file',
								label:'Style JSON',
								name:'styleFile',
								value:this.state.file,
								placeholder:'map stylesheet',
								controlled:false
							}} handle={{change:this.handle.fileChange}}/>
							<div className="mt-3">
								<button type="submit" className="btn btn-primary">Upload</button>
							</div>
						</form>
					</Route>
					<Route path="/add/fromSource">
						<form onSubmit={this.handle.submitFromSource} className="mt-2">
							<Vfield key="style" type="string" field={{
								type:'string',
								label:'URL',
								name:'styleUrl',
								value:this.state.url,
								placeholder:'map data url (Tegola endpoint)',
								controlled:false
							}} handle={{change:this.handle.urlChange}}/>
							<div className="mt-3">
								<button type="submit" className="btn btn-primary">Add</button>
							</div>
						</form>
					</Route>
				</Switch>
				<div className="mt-3">
					<Valert message={this.state.error}/>
				</div>
			</div>
		</div>
	}
};