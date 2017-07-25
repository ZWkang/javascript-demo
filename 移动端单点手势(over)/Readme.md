## simple touch.js
### support one figure

#### how to use
- 
- <script src="index.js"></script>
- first you should make a container
- let container = document.querySlector('#xxx')
- let touchContainer = kangtouch(container)
- now you can use touchContainer to listener your children touch evenet
- more you can see the test.html


_on(eventName,name,callbackfunction,proxyClassName)
_remove(event,name)


if you Create touch object
you can use public property
_events = {};//event Object save all the event
_ele = element;//init select Dom Object
_id = 0;//Differentiate different dom objects
_removecallback = null;//to remove DOM Listener

