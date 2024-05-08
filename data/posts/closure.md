## 클로저❓
클로저는 폐쇄, 닫히는 느낌이라는 뜻을 가지고 있다. 자바스크립트에서 클로저란
  
> A closure is the combination of a function bundled together (enclosed) with references to its surrounding state(the lexical environment). In other words, a closure gives you access to an outer function ‘s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.  

내부함수에서 외부함수로 접근할 수 있는 것을 말한다.  

```js
function outer() {
    const x = 0;
    function inner() {
        x;
    }
    return inner;
}
const inner = outer();
inner();
```

* 어플리케이션이 시작되면 전역 스코프 렉시컬 환경이 만들어진다. outer 함수가 선언이 되었으니 outer 렉시컬 환경이 만들어지고 이 outer 렉시컬 환경은 부모 전역 렉시컬 환경을 참조하고 있다. const inner = outer()로 outer 함수를 호출하게 되면 컨텍스트 스택에 outer 함수가 들어온다. outer 함수 내부에서 inner라는 함수가 선언이 되었으니 inner 렉시컬 환경이 만들어지고 inner 렉시컬 환경은 outer 렉시컬 환경을 참조하게 된다. 그리고 여기서는 inner 함수를 호출하지 않고 바로 반환한다. 따라서 inner 함수는 별도로 컨텍스트 스택에 들어오지 않고 만들어진 inner 렉시컬 환경이 그대로 return 된다. outer 함수가 끝나면 outer 함수가 stack에서 빠지고 다만 스코프 체인에는 그대로 남아있다. 왜냐면 return 된 inner라는 값이 outer를 참조하고 있기 때문에 outer는 메모리 상에 아직 존재하고 있어야하기 때문이다. 그리고 코드 마지막 부분에서 inner 함수를 호출하게 되면 inner 렉시컬 환경 자체에는 x라는 값이 없지만 참조하고 있는 outer 렉시컬 환경에는 x라는 변수가 있기 때문에 우리는 이 값에 접근할 수 있다.  

* 클로저란 함수와 그 함수를 감싸고 있는 렉시컬 환경에 대한 조합을 말하는데, 즉 inner 함수에서 그 외부에 있는 함수 스코프에 접근할 수 있는 것을 클로저라고 한다.  

* 내부에서 외부를 참조할 수 있다고 해서 다 클로저라고 하는 것이 아니라 중첩된 함수에서 내부에 있는 함수와 그 외부함수에 접근할 수 있는 것을 클로저라고 한다. 외부에 있는 함수의 렉시컬 환경이 저장되어져 있기 때문에 접근할 수 있다. 폐쇄된 느낌, 닫히는 느낌 즉, 내부 함수와 외부 하수의 상태가 묶여있는 느낌이라고 생각하면 좋겠다.

예를 좀 더 들어보자면  

```js
func()

function outer() {
    const x = 0;
    function inner() {
        console.log(`inside inner: ${x}`);
    }
    return inner;
}
const func1 = outer();
func1();
```

* func1을 호출하면 'inside inner: 0'이 출력된다. 클로저에 의해서 inner 함수가 return이 될 때 inner 함수뿐만 아니라 inner 함수 외부에 있는 outer 함수의 렉시컬 환경도 묶여서 클로저로 반환되기 때문에 inner 함수에서도 여전히 outer에 있는 변수에 접근이 가능하다  
=> 함수가 중첩되어 있을 때 내부함수가 외부함수의 렉시컬 환경에 접근할 수 있으니까 외부 환경에 접근이 가능한 것을 클로저라고 한다고 이해하면 된다!  


#### 클로저 활용 예제들
클로저는 캡슐화, 내부 정보를 은닉, 공개 함수(public, 외부)를 통한 데이터 조작을 위해서 쓰인다. 클래스와 private이 없었을 때는 클로저의 특징을 이용해서 정보를 은닉하고 오직 공개 함수를 통해서만 내부 데이터를 조작하기 위해서 클로저를 사용했었다. 하지만 이제 클래스를 사용하면 되기 때문에 클로저를 사용할 필요가 없다. 클래스 private 필드 또는 메소드를 사용하는 효과와 동일하다.


- private 사용 예제
```js
class Counter {
    #count = 0;
    increate() {
        this.#count++;
        console.log(this.#count);
    }
}
const counter = new Counter();
counter.increase();
```
Counter 클래스가 있고 내부적으로 사용하는 count라는 private라는 필드가 있고 만들어지면 항상 0으로 초기화해준다. 외부에서는 이 count에 접근할 수 없다. increase라는 함수를 만들어서 increase 함수 내부에서만 count를 하나씩 증가시킨다. 사용할 때는 counter에 있는 increase 함수를 호출하면 된다.