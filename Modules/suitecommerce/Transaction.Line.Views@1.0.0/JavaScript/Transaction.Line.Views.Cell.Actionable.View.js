/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

//@module Transaction.Line.Views
define('Transaction.Line.Views.Cell.Actionable.View'
,	[
		'Transaction.Line.Views.Price.View'
	,	'Transaction.Line.Views.Options.Selected.View'
	,	'ProductLine.Stock.View'
	,	'ProductLine.Sku.View'
	,	'ProductLine.StockDescription.View'

	,	'Backbone.CollectionView'
	,	'Backbone.CompositeView'

	,	'transaction_line_views_cell_actionable.tpl'

	,	'Backbone'
	,	'underscore'
	]
,	function (
		TransactionLineViewsPriceView
	,	TransactionLineViewsOptionsSelectedView
	,	ProductLineStockView
	,	ProductLineSkuView
	,	ProductLineStockDescriptionView

	,	BackboneCollectionView
	,	BackboneCompositeView

	,	transaction_line_views_cell_actionable_tpl

	,	Backbone
	,	_
	)
{
	'use strict';

	//@class Transaction.Line.Views.Actionable.View @extend Backbone.View
	return Backbone.View.extend({

		template: transaction_line_views_cell_actionable_tpl

		//@method initialize
		//@param {Transaction.Line.Views.Cell.Actionable.Initialize.Options} options
		//@return {Void}
	,	initialize: function ()
		{
			BackboneCompositeView.add(this);
		}

	,	childViews: {
			'Item.Price': function ()
			{
				return new TransactionLineViewsPriceView({
					model: this.model
				});
			}
		,	'Item.Sku': function ()
			{
				return new ProductLineSkuView({
					model: this.model
				});
			}
		,	'Item.SelectedOptions': function ()
			{
				return new TransactionLineViewsOptionsSelectedView({
					model: this.model
				});
			}
		,	'ItemViews.Stock.View': function ()
			{
				return new ProductLineStockView({
					model: this.model
				});
			}
		,	'Item.Summary.View': function ()
			{
				return new this.options.SummaryView(_.extend({
					model: this.model
				,	application: this.options.application
				}, this.options.summaryOptions || {}));
			}
		,	'Item.Actions.View': function ()
			{
				return new this.options.ActionsView(_.extend({
					model:this. model
				,	application: this.options.application
				}, this.options.actionsOptions || {}));
			}
		,	'StockDescription': function ()
			{
				return new ProductLineStockDescriptionView({
					model: this.model
				});
			}
		}

		//@method getContext
		//@return {Transaction.Line.Views.Actionable.View.Context}
	,	getContext: function ()
		{
			var item = this.model.get('item');
			debugger; 
            var myOptions=this.model.get('options').models;
            console.log('item',this.model);
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

			//@class Transaction.Line.Views.Actionable.View.Context
			return {
					//@property {OrderLine.Model|Transaction.Line.Model} line
					line: this.model
					//@property {OrderLine.Model|Transaction.Line.Model} model is an alias for line
				,	model: this.model
					//@property {String} lineId
				,	lineId: this.model.get('internalid')
					//@property {Item.Model} item
				,	item: item
					//@property {String} itemId
				,	itemId: item.get('internalid')
					//@property {String} linkAttributes
				,	linkAttributes: this.model.getFullLink({quantity:null,location:null,fulfillmentChoice:null})
					//@property {Boolean} isNavigable
				,	isNavigable: !!this.options.navigable && !!item.get('_isPurchasable')
					//@property {Boolean} showCustomAlert
				,	showCustomAlert: !!item.get('_cartCustomAlert')
					//@property {String} customAlertType
				,	customAlertType: item.get('_cartCustomAlertType') || 'info'
					//@property {Boolean} showActionsView
				,	showActionsView: !!this.options.ActionsView
					//@property {Boolean} showSummaryView
				,	showSummaryView: !!this.options.SummaryView
					//@property {Boolean} showAlert
				,	showAlert: !_.isUndefined(this.options.showAlert) ? !!this.options.showAlert : true
					//@property {Boolean} showGeneralClass
				,	showGeneralClass: !!this.options.generalClass
					//@property {String} generalClass
				,	generalClass: this.options.generalClass
					// @property {ImageContainer} thumbnail
				,	thumbnail: this.model.getThumbnail()
				// @property {String/Boolean} customImage
                ,   customImage:_3dImage!='' ? _3dImage : false
			};
			//@class Transaction.Line.Views.Actionable.View
		}
	});
});


//@class Transaction.Line.Views.Cell.Actionable.Initialize.Options
//@property {Transaction.Line.Model} model
//@property {String} generalClass Class name used in the generated HTML
//@property {Backbone.View} SummaryView View to show details
//@property {Backbone.View} ActionsView View to show actions buttons
//@property {Object} actionsOptions Any object used to extend the options sent to the Action View
//@property {Object} summaryOptions Any object used to extend the options sent to the Summary View
//@property {Boolean} navigable
//@property {Boolean} showAlert Indicate if a place holder is added in the final HTML, used when the action can generate errors
//@property {ApplicationSkeleton} application
//@property {Boolean} hideComparePrice Property used to bypass to the TransactionLineViewsPriceView
