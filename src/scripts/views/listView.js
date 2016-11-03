import React from "react"
import Header from "./header"

var ListView = React.createClass({
	render: function(){
		console.log("Listview Component", this)
		return (
			<div className="list-view">
				<Header />
				<BillContainer collection={this.props.collection}/>
			</div>
			)
	}
})

var BillContainer = React.createClass({
	_makeBills: function(){
		var jsxArray = []
		for(var i = 0; i < this.props.collection.models.attributes.results.length; i++){
			var billModel = this.props.collection.models.attributes.results[i]
			jsxArray.push(<Bill model={billModel} />)
		}
		return jsxArray
	},
	render: function(){
		console.log("bills seen in bill container", this.props.collection)
		return(
			<div className="bill-container">
				{this._makeBills()}
			</div>
			)
	}
})

var Bill = React.createClass({
	_clickedDiv: function(){
		location.hash = 'detail/' + this.props.collection.models.attributes.get('bill_id')
	},
	render: function(){
		var attributes = this.props.collection.models.attributes
		console.log("these the attributes of the bills", attributes)
		return (
			<div className="bill" onClick={this._clickedDiv}>
			<h2>{attributes.get('short_title')}</h2>
			<p>{attributes.get('official_title')}</p>
			</div>
			)
	}
})
export default ListView