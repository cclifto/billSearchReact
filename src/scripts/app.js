//make sure you're importing all the right structures from their respective nodes
import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import ListView from './views/listView'

var app = function() {

//MODEL
	var BillCollection = Backbone.Collection.extend({
		url: "https://congress.api.sunlightfoundation.com/bills/search",
		_key: '149a2a8730aa4936bab76017c47d8dab'
	})

//VIEW


//CONTROLLER
	var BillzRouter = Backbone.Router.extend({
		routes:{
			'home': 'homeHandler',
			'search/:term': 'searchHandler',
			'detail/:id': 'detailHandler',
			'*default': 'defaultHandler'
		},
		homeHandler: function(){
			var bills = new BillCollection()
			var promise = bills.fetch({
				dataType: 'jsonp',
				data: {
					apikey: bills._key
				}
			})
			console.log(bills)
			promise.then(
				function(){
					console.log(bills)
					ReactDOM.render(<ListView collection={bills} />, document.querySelector(".container"))


			})

			// fetch returns a promise. you should capture that promse in a variable

			// when your promise is fulfilled, run a function that will console.log the bills collection

			// if you get that, start building your view out of react components. 
		},
		searchHandler: function(searchTerm){
			console.log(searchTerm)
		},
		detailHandler: function(id){
			console.log(id)
		},
		defaultHandler: function(){
			console.log("handling default")
			location.hash = 'home'
		},
		initialize: function() {
			Backbone.history.start()
		}


	})

	var r = new BillzRouter()

}

app()