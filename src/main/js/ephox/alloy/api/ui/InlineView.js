define(
  'ephox.alloy.api.ui.InlineView',

  [
    'ephox.alloy.alien.ComponentStructure',
    'ephox.alloy.api.behaviour.Behaviour',
    'ephox.alloy.api.behaviour.Positioning',
    'ephox.alloy.api.behaviour.Sandboxing',
    'ephox.alloy.api.ui.GuiTypes',
    'ephox.alloy.api.ui.UiSketcher',
    'ephox.alloy.sandbox.Dismissal',
    'ephox.alloy.ui.schema.InlineViewSchema',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Future',
    'ephox.katamari.api.Merger',
    'ephox.sugar.api.properties.Css'
  ],

  function (ComponentStructure, Behaviour, Positioning, Sandboxing, GuiTypes, UiSketcher, Dismissal, InlineViewSchema, Fun, Future, Merger, Css) {
    var schema = InlineViewSchema.schema();

    var make = function (detail, spec) {
      return Merger.deepMerge(
        {
          uid: detail.uid(),
          dom: detail.dom(),
          behaviours: Behaviour.derive([
            Sandboxing.config({
              isPartOf: function (container, data, queryElem) {
                return ComponentStructure.isPartOf(data, queryElem);
              },
              getAttachPoint: function () {
                return detail.lazySink()().getOrDie();
              }
            }),
            Dismissal.receivingConfig({
              isExtraPart: Fun.constant(false)
            })
          ]),

          apis: {
            showAt: function (sandbox, anchor, thing) {
              var sink = detail.lazySink()().getOrDie();
              Css.set(sandbox.element(), 'visibility', 'hidden');
              Css.set(sandbox.element(), 'position', Positioning.getMode(sink));
              Sandboxing.open(sandbox, Future.pure(thing)).get(function () {
                
                Positioning.position(sink, anchor, sandbox);
                
                Css.remove(sandbox.element(), 'visibility');
                detail.onShow()(sandbox);
              });
            },
            hide: function (sandbox) {
              Sandboxing.close(sandbox);
            }
          }
        }
      );
    };

    var sketch = function (spec) {
      return UiSketcher.single(InlineViewSchema.name(), schema, make, spec);
    };

    return Merger.deepMerge(
      {
        sketch: sketch
      },
      GuiTypes.makeApis([ 'showAt', 'hide' ])
    );
  }
);