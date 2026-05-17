import type { Schema, Struct } from '@strapi/strapi';

export interface ProductFilter extends Struct.ComponentSchema {
  collectionName: 'components_product_filters';
  info: {
    description: 'Product filter attributes';
    displayName: 'Filter';
  };
  attributes: {
    filterName: Schema.Attribute.Enumeration<
      ['size', 'style', 'woodType', 'colorCount', 'craftType', 'shape', 'theme']
    > &
      Schema.Attribute.Required;
    filterValue: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface QuoteCustomDesign extends Struct.ComponentSchema {
  collectionName: 'components_quote_custom_designs';
  info: {
    description: 'Custom design upload in a quote request';
    displayName: 'Custom Design';
  };
  attributes: {
    colorCount: Schema.Attribute.Enumeration<
      ['single', 'two', 'three', 'multicolor', 'not_sure']
    >;
    designName: Schema.Attribute.String;
    fileName: Schema.Attribute.String;
    fileUrl: Schema.Attribute.String;
    height: Schema.Attribute.Decimal;
    notes: Schema.Attribute.Text;
    productType: Schema.Attribute.Enumeration<
      ['printing_block', 'logo_block', 'wall_plate', 'pichwai', 'other']
    >;
    quantity: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    unit: Schema.Attribute.Enumeration<['inch', 'cm']>;
    width: Schema.Attribute.Decimal;
  };
}

export interface QuoteItem extends Struct.ComponentSchema {
  collectionName: 'components_quote_items';
  info: {
    description: 'Catalog item in a quote request';
    displayName: 'Quote Item';
  };
  attributes: {
    notes: Schema.Attribute.Text;
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
    quantity: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    selectedSize: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'product.filter': ProductFilter;
      'quote.custom-design': QuoteCustomDesign;
      'quote.item': QuoteItem;
    }
  }
}
