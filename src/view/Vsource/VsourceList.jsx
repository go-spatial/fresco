import PropTypes from 'prop-types';
import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

import Vfield from '../Vfield';

export default class VsourceList extends React.Component {
	static propTypes = {
		handle: PropTypes.object,
		match: PropTypes.object,
		sources: PropTypes.object
	}

	constructor(props) {
		super(props);

		const {handle} = props;

		this.state = {
			searchShow:false,
			search:null
		};

		this.handle = {
			...handle,
			searchShow:()=>{
				this.setState({searchShow:true});
			},
			searchHide:()=>{
				this.setState({
					searchShow:false,
					search:null
				});
			},
			searchChange:(field)=>{
				this.setState({search:field.value});
			},
			onDragEnd:(result)=>{
				console.log('draggable res:',result.source.index,result.destination.index);
				//Mlayer.reorder(result.source.index,result.destination.index);
			}
		};

		for (let i in this.handle){
			this.handle[i] = this.handle[i].bind(this);
		}
	}

	render (){
		const {error, match, sources} = this.props;

		const baseUrl = match.url;

		return <div>
			<div className="left-col-title list-border-right">
				{this.state.searchShow ? 
					<div className="px-2 m-0 text-nav row">
						<div className="flex-2 property pt-1 pr-1">
							<Vfield field={{
								type:'string',
								name:'search',	
								value:this.state.search,
								placeholder:'Search for source',
								controlled:false,
								inputClass:'form-control-sm font-sm',
								inputNoAC:true,
								autoFocus:true
							}} key="type" handle={{
								change:this.handle.searchChange
							}}/>
						</div>
						<div className="">
							<span className="icon-btn gray" onClick={this.handle.searchHide}>
								<i className="material-icons md-14">close</i>
							</span>
						</div>
					</div>
					:
					<h2 className="px-2 m-0 text-nav bg-light row">
						<div className="flex-2 text-overflow-ellipsis font-med">
							Sources ({sources.size})
						</div>
						<div className="">
							<span className="icon-btn gray" onClick={this.handle.searchShow}>
								<i className="material-icons md-14">search</i>
							</span>
							<Link className="ml-1 icon-btn gray" to={baseUrl+'/add'}>
								<i className="material-icons md-14">add_circle_outline</i>
							</Link>
						</div>
					</h2>
				}
			</div>
			<div className="bg-light font-sm">
				<DragDropContext onDragEnd={this.handle.onDragEnd}>
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<div ref={provided.innerRef}>
								{sources !== undefined && sources.keySeq().map((key)=>{

									const source = sources.get(key);
									const path = baseUrl+'/'+encodeURIComponent(key);

									if (this.state.search && key.toLowerCase().indexOf(this.state.search.toLowerCase()) === -1) return;

									let className = 'px-2 py-1 d-block link-list list-border-right position-relative';
									if (error.hasIn(['sources',key])) className += ' error';

									return <Draggable key={key} draggableId={key} index={key}>
										{(provided, snapshot) => (
											<div ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}>
												<NavLink to={path} 
													className={className} key={key}>
													{key}
												</NavLink>
											</div>
										)}
									</Draggable>
								})}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		</div>
	}
};