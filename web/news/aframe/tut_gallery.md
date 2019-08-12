

![360&deg; Image Viewer](https://aframe.io/images/docs/360-image-viewer.png)

[registry]: https://aframe.io/registry/

这里我们将一起实现**360&deg; image gallery**. 界面设计如图所示，我们需要三个交互面板，并可以点击，当用户点击之后会淡入淡出背景 360&deg; VR图片.

[ecs]: ../introduction/entity-component-system.md

本教程中将涉及到[entity-component][ecs]中的几个概念:

1. 使用原生组件.
2. 使用社区组件.
3. 实现自己需要的组件.

<!--toc-->

## 框架

从我们的 scene 开始:

```html
<a-scene>
  <a-assets>
    <audio id="click-sound" src="https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg"></audio>

    <!-- Images. -->
    <img id="city" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg">
    <img id="city-thumb" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-city.jpg">
    <img id="cubes" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/cubes.jpg">
    <img id="cubes-thumb" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg">
    <img id="sechelt" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg">
    <img id="sechelt-thumb" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-sechelt.jpg">
  </a-assets>

  <!-- 360-degree image. -->
  <a-sky id="image-360" radius="10" src="#city"></a-sky>

  <!-- Link we will build. -->
  <a-entity class="link"></a-entity>

  <!-- Camera + Cursor. -->
  <a-camera>
    <a-cursor id="cursor">
      <a-animation begin="click" easing="ease-in" attribute="scale"
                   fill="backwards" from="0.1 0.1 0.1" to="1 1 1" dur="150"></a-animation>
      <a-animation begin="cursor-fusing" easing="ease-in" attribute="scale"
                   from="1 1 1" to="0.1 0.1 0.1" dur="1500"></a-animation>
    </a-cursor>
  </a-camera>
</a-scene>
```

[a-sky]: ../primitives/a-sky.md
[ams]: ../core/asset-management-system.md
[animation-begin]: ../components/animation.md
[camera]: ../primitives/a-camera.md
[component]: ../core/component.md
[cursor]: ../components/cursor.md

We have predefined:

- Several images to choose from in the [Asset Management System][ams] within `<a-assets>`.
- Our 360&deg; image placeholder with [`<a-sky>`][a-sky].
- A [cursor][cursor] with visual feedback using event-driven
[animations][animation-begin], fixed to the [camera][camera].

## 运用原生组件

aframe中会提供一些原生组件，原生库. 下面我们将尝试运用这些组件，以类似html语法的方式.

在这里我们想要创建一个文本面板作为连接，并且当我们点击它时，将会改背景的图片. 首先我们从一个空的entity开始. 不包含任何组件也不会渲染任何内容的一个entity:

```html
<a-entity class="link"></a-entity>
```

[geometry]: ../components/geometry.md

给它设定现状, 我们需要 [geometry 组件][geometry]. 值得注意的，我们设定一个组件的语法与css很类似:

```html
<a-entity class="link"
  geometry="primitive: plane; height: 1; width: 1"></a-entity>
```

[material]: ../components/material.md

然后我们要给面板上色, 用到了 [material
组件][material].  我们设置 `shader` 为 `flat` 为了让图片不受全局光照影响. 接着设置 `src` 为 `#cubes-thumb`,  [Asset Management System][ams] 中定义的素材选择器.

```html
<a-entity class="link"
  geometry="primitive: plane; height: 1; width: 1"
  material="shader: flat; src: #cubes-thumb"></a-entity>
```

[sound]: ../components/sound.md

我们继续添加更多的属性和更多插件特性.
现在尝试更多的组件, [sound 组件][sound].
为我们提供音效的功能，这里我们用来设置按钮点击后的音效.
语法是类似的，不同的是写在了sound属性中.
设置 `on` 为 `click` ，表示在clik事件触发时播放音效.
并设置 `src` 为 `#click-sound`, `<audio>` 元素的选择器.

```html
<a-entity class="link"
  geometry="primitive: plane; height: 1; width: 1"
  material="shader: flat; src: #cubes-thumb"
  sound="on: click; src: #click-sound"></a-entity>
```

好！现在，我们实现了一个点击时可以播放点击音效的文本panel.

## 运用社区组件

[npm]: https://www.npmjs.com/search?q=aframe-component&page=1&ranking=optimal

aframe本身只带有一小部分核心组件，值得关注的是来自社区的大量的开源组件.
我们可以从这些地方找到开组件 [npm][npm] 或者 [A-Frame
Registry][registry]. 我们可以将它们放入我们的 scene 中并直接在HTML中使用它们。 组件可以做任何事情。 通过使用其他人开发的组件，我们获得了功能，而无需编写自己的代码。

我们使用了这三个社区组件:

- [template](https://ngokevin.github.io/kframe/components/template/)
- [layout](https://ngokevin.github.io/kframe/components/layout/)
- [event-set](https://ngokevin.github.io/kframe/components/event-set/)

社区组件通常可以通过GitHub获得并在npm上发布。
引用组件的一种简单方法是使用[unpkg.com CDN]（http://unpkg.com/），
它允许我们将npm上托管的组件作为脚本标记包含在内，即使支持指定模糊版本也是如此。
我们通常只需要知道组件的npm包名称和路径：

```html
<html>
  <head>
    <title>360° Image Browser</title>
    <script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
    <script src="https://unpkg.com/aframe-template-component@3.x.x/dist/aframe-template-component.min.js"></script>
    <script src="https://unpkg.com/aframe-layout-component@3.x.x/dist/aframe-layout-component.min.js"></script>
    <script src="https://unpkg.com/aframe-event-set-component@3.x.x/dist/aframe-event-set-component.min.js"></script>
  </head>
  <body>
    <a-scene>
      <!-- ... -->
    </a-scene>
  </body>
</html>
```

### Template 组件

现在，我们已经有了一个link，我们想要更多，并对应不同的图片.

[template]: https://github.com/ngokevin/aframe-template-component

The [template component][template] integrates templating engines into A-Frame.
This lets us do things such as encapsulate groups of entities, passing data to
generate entities, or iteration. Since we want to turn one link into three,
without copy-and-pasting HTML, we can use the template component.

If we read the [template component's documentation][template], we see one way
to define a template is via a script tag in `<a-assets>`. Let's make our link a
template and give it a name using an `id`:

```html
<a-assets>
  <!-- ... -->
  <script id="plane" type="text/html">
    <a-entity class="link"
      geometry="primitive: plane; height: 1; width: 1"
      material="shader: flat; src: #cubes-thumb"
      sound="on: click; src: #click-sound"></a-entity>
  </script>
</a-assets>
```

Then we can use the template to create multiple planes without much work:

```html
<a-entity template="src: #plane"></a-entity>
<a-entity template="src: #plane"></a-entity>
<a-entity template="src: #plane"></a-entity>
```

[templateliteral]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals

But then they'll all be displaying the same image texture and look the same.
Here is where we'll need a template engine with variable substitution. The
template component comes with simple [ES6 string
interpolation][templateliteral] (i.e., `${var}` format). Though the template
component supports many popular templating engines such as Nunjucks, Jade,
Handlebars, or Mustache.

[data]: https://developer.mozilla.org/docs/Web/Guide/HTML/Using_data_attributes

To allow each instance of the template to be customizable, we define a
`${thumb}` variable in the template, which we can pass using [data
attributes][data]:

```html
<a-assets>
  <!-- ... -->
  <script id="plane" type="text/html">
    <a-entity class="link"
      geometry="primitive: plane; height: 1; width: 1"
      material="shader: flat; src: ${thumb}"
      sound="on: click; src: #click-sound"></a-entity>
  </script>
</a-assets>

<!-- ... -->

<!-- Pass image sources to the template. -->
<a-entity template="src: #plane" data-thumb="#city-thumb"></a-entity>
<a-entity template="src: #plane" data-thumb="#cubes-thumb"></a-entity>
<a-entity template="src: #plane" data-thumb="#sechelt-thumb"></a-entity>
```

The template component has allowed us to not have to repeat a lot of HTML,
keeping our scene very readable.

### Layout Component

[layout]: https://www.npmjs.com/package/aframe-layout-component

Because the default position of an entity is `0 0 0`, the entities will
overlap. While we could manually position each link, we could instead use the
[layout component][layout] to do it for us. The layout component will
automatically position its children to the specified layout.

We create a wrapper entity around our links and attach the layout component
using the `line` layout:

```html
<a-entity id="links" layout="layout: line; margin: 1.5" position="-3 -1 -4">
  <a-entity template="src: #plane" data-thumb="#city-thumb"></a-entity>
  <a-entity template="src: #plane" data-thumb="#cubes-thumb"></a-entity>
  <a-entity template="src: #plane" data-thumb="#sechelt-thumb"></a-entity>
</a-entity>
```

Now our links are no longer overlapping without us having to calculate and
fiddle with positions. The layout component supports other layouts including
grid, circle, and dodecahedron.

### Event-Set Component

[cursor-events]: ../components/cursor.md#events
[event-set]: https://www.npmjs.com/package/aframe-event-set-component
[scale]: ../components/scale.md

Lastly, we'll add some visual feedback to our links. We want them to scale up
and scale back when they are hovered or clicked. This involves writing an event
listener to do `setAttribute`s on the [scale component][scale] in response to
[cursor events][cursor-events]. This is a fairly common pattern so there is an
[event-set component][event-set] that does `setAttribute` in response to
events.

[multiple]: ../core/component.md#multiple-instancing

Let's attach event listeners on our links to scale them up when they are gazed
over, scale them down as they are being clicked, and scale them back when they
are no longer gazed upon. We are mimicking CSS `:hover` states. We can specify
event names with `_event` properties, and the rest of the properties define the
`setAttribute` calls. Notice that the event-set component can have [multiple
instances][multiple]:

```html
<a-assets>
  <!-- ... -->
  <script id="link" type="text/html">
    <a-entity class="link"
      geometry="primitive: plane; height: 1; width: 1"
      material="shader: flat; src: ${thumb}"
      sound="on: click; src: #click-sound"
      event-set__1="_event: mousedown; scale: 1 1 1"
      event-set__2="_event: mouseup; scale: 1.2 1.2 1"
      event-set__3="_event: mouseenter; scale: 1.2 1.2 1"
      event-set__4="_event: mouseleave; scale: 1 1 1"></a-entity>
  </script>
</a-assets>
```

Wielding components, we were able to do a lot with surprisingly little HTML.
Though the ecosystem has a lot to offer, non-trivial VR applications will
require us to write application-specific components.

## Writing an Application-Specific Component

> View the full [`set-image` component on GitHub](https://github.com/aframevr/360-image-viewer-boilerplate/blob/master/components/set-image.js).

We want to write the component that fades the sky into a new 360&deg; image
once one of the links are clicked. We'll call it `set-image`. The [component
API documentation][component] provides a detailed reference for writing a
component. A basic component skeleton might look like:

Here is the skeleton for our set-image component.

```js
AFRAME.registerComponent('set-image', {
  schema: {
    // ...
  },

  init: function () {
    // ...
  }
});
```

Now we decide what the API for our image-setting component will be. We need:

- An event name to listen to.
- Which entity to change the texture of.
- The image texture.
- An animation fade duration.

So we translate those properties to the schema:

```js
AFRAME.registerComponent('set-image', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    dur: {type: 'number', default: 300}
  },

  init: function () {
    // ...
  },

  setupFadeAnimation: function () {
    // Appends an <a-animation> that fades to black.
  }
});
```

Now we set up the event listener to change the image while the texture has
faded to black. Whenever the event is emitted (in our case, a click), then the
component will trigger the animation (which is listening for `set-image-fade`),
wait the appropriate amount of time, and swap the image:

```js
  //...

  init: function () {
    var data = this.data;
    var el = this.el;

    this.setupFadeAnimation();

    el.addEventListener(data.on, function () {
      // Fade out image.
      data.target.emit('set-image-fade');
      // Wait for fade to complete.
      setTimeout(function () {
        // Set image.
        data.target.setAttribute('material', 'src', data.src);
      }, data.dur);
    });
  }

  //...
```

And that concludes our 360&deg; image gallery.

> **[Try it out!](https://aframe-gallery.glitch.me)**
