### Capturing이란?

이벤트 **캡처링**은 브라우저에서 이벤트가 발생하는 순서를 설명하는 개념 중 하나로 이벤트가 DOM 트리를 통해 전파되는 방식이다. 일반적으로 이벤트는 타겟 요소에서부터 시작해서 상위 요소로 전파되는데, 이때 이벤트 캡처링은 이벤트가 타겟 요소에서 시작하여 상위 요소로 전파되기 전에, 최상위 부모 요소에서부터 시작해서 타겟 요소까지 전파되는 과정을 말합니다. 정리하자면 **상위요소에서 하위요소로의 이벤트 전파방식**을 의미한다.

```js
  <body>
    <div class="outer">
      <div class="middle">
        <button>Click Me</button>
      </div>
    </div>
    <script>
      const outer = document.querySelector('.outer');
      const middle = document.querySelector('.middle');
      const button = document.querySelector('button');

      outer.addEventListener('click', event => {
        console.log(`outer: ${event.currentTarget}, ${event.target}`);
      });
      middle.addEventListener('click', event => {
        console.log(`middle ${event.currentTarget}, ${event.target}`);
      });
      button.addEventListener('click', event => {
        console.log(`button1 ${event.currentTarget}, ${event.target}`);
      });
    </script>
  </body>
```
위 코드를 예시로 설명해보자면 Click Me 버튼을 클릭하고 콘솔창을 확인해보면 outer, middle, button 모두 event가 발생한다. 사용자가 button을 click하게 되면 브라우저가 capturing을 거치기 때문이다. 즉, 부모 컨테이너인 outer에서부터 시작해서 middle, button까지 capturing해서 내려오게 되고 button에 등록된 이벤트 핸들러를 호출하게 된다. 여기서 끝나는 것이 아니라 이벤트는 bubbling up을 하게 되는데 상위에 있는 부모(middle)에게 이벤트가 발생했다고 알림으로써 부모 요소에 등록된 이벤트 핸들러까지 호출하게 된다. 그리고 또 bubbling up을 해서 그 상위에 있는 부모(outer)의 이벤트 핸들러를 호출하게 된다. 대부분은 capturing 단계에서 무언가를 처리하는 것은 흔하지 않다.

### Bubbling이란?
그렇다면 Bubbling이란 무엇일까? 이벤트 **버블링**이란, **하위요소에서 상위요소로의 이벤트 전파 방식** 으로, 말그대로 HTML 구조상 자식요소에 발생한 이벤트가 상위의 부모요소에까지 영향을 미치는 것이다. capturing 예제에서 버튼을 하나 더 추가해보자.
```js
<body>
    <div class="outer">
      <div class="middle">
        <button>Click Me</button>
      </div>
    </div>
    <script>
      const outer = document.querySelector('.outer');
      const middle = document.querySelector('.middle');
      const button = document.querySelector('button');

      outer.addEventListener('click', event => {
        console.log(`outer: ${event.currentTarget}, ${event.target}`);
      });
      middle.addEventListener('click', event => {
        console.log(`middle ${event.currentTarget}, ${event.target}`);
      });
      button.addEventListener('click', event => {
        console.log(`button1 ${event.currentTarget}, ${event.target}`);
      });
      button.addEventListener('click', event => {
        console.log(`button2 ${event.currentTarget}, ${event.target}`);
      });
    </script>
  </body>
```
 button을 클릭한 다음 콘솔창을 확인해보니 button1과 button2는 currentTarget과 target 모두 ButtonElement라고 출력되지만 middle과 outer의 currentTarget은 Div이고 target만 button이라고 출력된다. middle과 outer의 현재 타겟은 div이지만 이벤트가 일어난 타겟은 button인 것을 알 수가 있다. 즉, 이 말은 middle과 outer에서 일어난 이벤트가 아니라는 의미이다.

* stopPropagation을 이용해서 bubbling을 막아본다면?
```js
button.addEventListener('click', event => {
  console.log(`button1 ${event.currentTarget}, ${event.target}`); 
  event.stopPropagation();
});
```
button에 event.stopPropagation()을 걸어주면 button만 핸들링되고 더 이상 bubbling up이 일어나지 않는다. propagate는 위로 전달하다라는 의미로 stopPropagation은 위로 전달하는 것을 그만하라는 뜻이다.  
* 함께 등록된 event listener도 방지하고 싶다면?
```js
button.addEventListener('click', event => {
  console.log(`button1 ${event.currentTarget}, ${event.target}`); 
  event.stopImmediatePropagetion();
});
```
event.stopImmediatePropagetion()을 해주면 해당 요소를 제외하고는 모두 무시해버리기 때문에 button1만 click 되고 나머지 이벤트 핸들러들은 작동하지 않는다. 

* 먄약 button2에서 쓰게 된다면?
```js
button.addEventListener('click', event => {
  console.log(`button1 ${event.currentTarget}, ${event.target}`); 
});
button.addEventListener('click', event => {
  console.log(`button1 ${event.currentTarget}, ${event.target}`); 
  event.stopImmediatePropagetion();
});
```
button1과 button2 모두 클릭이 되는데 이는 button1이 먼저 등록이 되었고 그 다음에 button2가 등록되었기 때문이다. button2에서 stopImmediatePropagetion을 한다고 해도 button2 그 이후부터 stop이 되고 그 이전(button1)까지는 그대로 이벤트 핸들러가 실행이 된다.  

하지만 stopImmediatePropagetion은 가능한 사용하지 않는 것이 좋다. 해당 이벤트와 연관된 다른 이벤트가 있거나, 다른 부모 요소에서 처리할 수 있는 이벤트가 있을 수 있는데 stopImmediatePropagetion 해버리게 되면 예상하지 못한 오류가 발생해서 디버깅을 오래하게 되는 경우가 발생하기 때문이다.  

* 그렇다면 어떻게 해야할까?
```js
outer.addEventListener('click', event => {
  if (event.target !== event.currentTarget) {
    return;
  }
  console.log(`outer: ${event.currentTarget}, ${event.target}`);
});
middle.addEventListener('click', event => {
  if (event.target !== event.currentTarget) {
    return;
  }
  console.log(`middle ${event.currentTarget}, ${event.target}`);
});
button.addEventListener('click', event => {
  console.log(`button1 ${event.currentTarget}, ${event.target}`);
});
button.addEventListener('click', event => {
  console.log(`button2 ${event.currentTarget}, ${event.target}`);
});
```
stopPropagation나 stopImmediatePropagetion을 사용해서 이벤트를 막는 것이 아니라 event.target과 event.currentTarget이 같을 때만  이벤트가 작동하도록 해준다.
middle과 outer는 event.target과 event.currentTarget이 각각 button과 div로 동일하지 않기 때문에 따로 처리하는 것이 없다. 이렇게 해주면 관심있는 target일 경우에만 이벤트를 처리할 수 있다. stopPropagation나 stopImmediatePropagetion는 되도록 사용하지 않는 것이 좋다.