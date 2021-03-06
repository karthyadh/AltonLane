/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// @module Header
define(
	'Header.MiniCartItemCell.View'
,	[
		'Transaction.Line.Views.Options.Selected.View'
	,	'Profile.Model'

	,	'header_mini_cart_item_cell.tpl'

	,	'Backbone'
	,	'Backbone.CompositeView'
	,	'Backbone.CollectionView'
	]
,	function (
		TransactionLineViewsOptionsSelectedView
	,	ProfileModel

	,	header_mini_cart_item_cell_tpl

	,	Backbone
	,	BackboneCompositeView
	)
{
	'use strict';

	// @class Header.MiniCart.View @extends Backbone.View
	return Backbone.View.extend({

		template: header_mini_cart_item_cell_tpl

	,	initialize: function ()
		{
			BackboneCompositeView.add(this);
		}

	,	childViews: {
			'Item.SelectedOptions': function ()
			{
				return new TransactionLineViewsOptionsSelectedView({
					model:this.model
				});
			}
		}

		// @method getContext
		// @return {Header.MiniCart.View.Context}
	,	getContext: function ()
		{

			//console.log('this.model Cart',this.model);
			var item = this.model.get('item');
			debugger; 
            var myOptions=this.model.get('options').models;
            //console.log('item',this.model);
            var guid='',idcs='';
            for(var mo=0;mo<myOptions.length;mo++){
                var label=this.model.get('options').models[mo].get('label');
                if(label=='Custom Shoe GUID'){
                	try{
                		guid=this.model.get('options').models[mo].get('value').internalid;	
                	}
                	catch(e){
                		guid='';
                	}
                    
                }
                if(label=='Custom Shoe IDCS'){
                     try{
                       idcs=this.model.get('options').models[mo].get('value').internalid;
                       }
                	catch(e){
                		idcs='';
                	}
                }
            }
            var _3dImage='',companyID=SC.ENVIRONMENT.companyId;
            if(guid && idcs){
                _3dImage="https://backoffice.bespokefactory.com/empresas/" +idcs + "/orders/temp/" + guid + "/1.jpg"
            }

			// @class Header.MiniCart.View.Context
			return {
				line: this.model
				//@property {Number} itemId
			,	itemId: this.model.get('item').id
				//@property {String} itemType
			,	itemType: this.model.get('item').get('itemtype')
				//@property {String} linkAttributes
			,	linkAttributes: this.model.getFullLink({quantity:null,location:null,fulfillmentChoice:null})
				// @property {ImageContainer} thumbnail
			,	thumbnail: this.model.getThumbnail()
				//TODO REMOVE THIS FROM HERE!!!
				// @property {Boolean} isPriceEnabled
			,	isPriceEnabled: !ProfileModel.getInstance().hidePrices()
			 	// @property {String/Boolean} customImage
            ,   customImage:_3dImage!='' ? _3dImage : false
			};
			// @class Header.MiniCart.View
		}
	});
});