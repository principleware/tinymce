define(
  'ephox.alloy.api.ui.TieredMenu',

  [
    'ephox.alloy.api.ui.Sketcher',
    'ephox.alloy.data.Fields',
    'ephox.alloy.ui.single.TieredMenuSpec',
    'ephox.boulder.api.FieldSchema',
    'ephox.boulder.api.Objects'
  ],

  function (Sketcher, Fields, TieredMenuSpec, FieldSchema, Objects) {
    var tieredData = function (primary, menus, expansions) {
      return {
        primary: primary,
        menus: menus,
        expansions: expansions
      };
    };

    var singleData = function (name, menu) {
      return {
        primary: name,
        menus: Objects.wrap(name, menu),
        expansions: { }
      };
    };

    return Sketcher.single({
      name: 'TieredMenu',
      configFields: [
        Fields.onStrictKeyboardHandler('onExecute'),
        Fields.onStrictKeyboardHandler('onEscape'),

        Fields.onStrictHandler('onOpenMenu'),
        Fields.onStrictHandler('onOpenSubmenu'),

        FieldSchema.defaulted('openImmediately', true),

        FieldSchema.strictObjOf('data', [
          FieldSchema.strict('primary'),
          FieldSchema.strict('menus'),
          FieldSchema.strict('expansions')
        ]),

        FieldSchema.defaulted('fakeFocus', false),
        Fields.onHandler('onHighlight'),
        Fields.onHandler('onHover'),
        Fields.tieredMenuMarkers(),


        FieldSchema.defaulted('navigateOnHover', true),

        FieldSchema.defaulted('tmenuBehaviours', { }),
        FieldSchema.defaulted('eventOrder', { })
      ],

      factory: TieredMenuSpec.make,

      extraApis: {
        tieredData: tieredData,
        singleData: singleData
      }
    });
  }
);