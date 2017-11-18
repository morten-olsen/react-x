# React-X (PoC web and native compilation)

As we can all agree, the future of apps are the web, but as history could often has show, making a web app that delivers the same experience as a native app can be difficult as javascript commonly are running both logic and UI in a single thread (Have a look research project into the ability to multithread redux https://github.com/morten-olsen/research-redux-webworker) and as javascript are doing garbage collection, which on lower tier devices can be quite devastating for the user experience (http://sealedabstract.com/rants/why-mobile-web-apps-are-slow/ and oldie but a goodie).

The philosophy behind react-x is to be able to write in a simple common language to be able to create applications which can run in the browser, or being run as native apps, with the speed improvements this brings.

Be aware that this project is not runnable, as a lot of boilerplate files has been removed to only show relevant files

This is done by using `webpack` to resolve to different low level bindings between components for `react` and `react-native`. In this simple PoC two components are added, _text_ which bind to `span` on the web and `text` on native. these can be found in `src/blocks/{platform}/index.js`. In this example `styled-components` has been used, the reason behind this is to easily be able to use standard CSS to layout views, which should then become identical on both the web and the native version.

As showed in `src/components/app`, the component for the current platform is available as `blocks`.

### Limitation and mitigations

As you need to provide a common API, lowest common denominator becomes relevant. This can be mitigated by adding more high level wrappers, but will require more work, so the correct cut between high or low level components will be dependant on the project.

As routing is not included here, this is also something that needs to be resolved, either inside the blocks directory (or instance by creating high level `App` components, which handles the routing) or inside the platform entry file `src/{platform}`.

As this relies heavily on webpacks resolve features, this can not run in tools which does not support building a webpack project. If really needed nodes module loader could be monkey patched to resolve these paths, allowing compatibility with most tools.

If a project relies on external components, which are either react or react-native based, an alternative for the other platform might be needed and an API remapping, to ensure that the same API can be used on both platforms. Alternative, if the component is a react web component, an alternative solution would be to add it to the web blocks, and add a `WebView` wrapped version for react-native.

One limitation on devices with limited resources is scrolling long list. This is mitigated with ArrayAdapters on Android and ViewSources on iOS, but there are no web equivalent to this. It could therefore be of value to create a block component for the web which complies to react native's list component, so long lists on the native version would benefit from these improvements.

### Using web syntax

It should in theory also be possible to use `div` `span` and alike, to allow for as close to a web development experience as possible, by monkey patching `React.createElement`, to map html element strings to blocks. I would not really recommend this approach, but it should be possible if you are feeling brave.
