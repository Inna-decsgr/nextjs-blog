### 자바스크립트 비동기

- 자바스크립트 실행 순서  
자바스크립트는 기본적으로 한 번에 한 가지 일만 처리할 수 있기 때문에 동기적(순차적)으로 진행된다고 볼 수 있다. 이렇게 한 번에 한 가지 일만 수행하는 것을 싱글스레드(Single Thread), 동기적으로 진행된다고 말한다. 따라서 무거운 작업이나, 오래 걸리는 작업을 수행하는 것은 좋지 않다.

### 콜백 비동기 사용해보기  
자바스크립트 언어 자체는 동기적으로 작성하지만, 자바스크립트 런타임 환경에서 제공해주는 즉, 호스트 환경에서 제공해주는 다양한 API가 있다. 브라우저라면 Web APIs, 노드 환경이라면 node에서 제공해주는 다양한 API들이 있다. 이 API들은 비동기적(병렬적)으로 실행되기 때문에 싱글 스레드(Single Thread)가 아니라 멀티 스레드(Multi Thread) 환경에서 동작한다. API들을 사용하면 다양한 일들을 동시다발적으로 처리할 수가 있고 비동기적인 일도 충분히 할 수 있다. Web APIs에는 `DOM API`, `setTimeout`, `setInterval`, `fetch`, `event listener` 등이 있다. 그 중 네트워크 통신을 하는 fetch 라는 API를 이용해서 다른 web 서버에 네트워크 통신을 주고받을 수 있다. 

```js
function asyncFunction(callback) {
    setTimeout(function() {
        console.log("비동기 작업 완료!");
        callback(); 
    }, 3000);
}

asyncFunction(function() {
    console.log("콜백 함수 호출됨");
});
```
setTimeout을 예로 들자면 비동기 함수를 정의하고 3초 뒤에 우리가 호출할 callback을 함께 전달한다. "3초 뒤에 callback을 호출해줘"라고 던져두고 이 타이머가 가동되는 동안 작성해둔 코드를 하나씩 수행한 다음 3초가 지나서 타이머가 종료되면 브라우저는 우리가 던져둔 callback 함수를 task queue라는 곳에 전달한다. 자바스크립트 환경에 있는 event loop가 call stack과 task queue를 감시하고있다가 call stack이 비었을 때 전달받은 callback을 수행하게 된다.  


### 프로미스 시작!
자바스크립트 프로미스(Promise)는 비동기 작업의 결과를 나타내는 객체이다. 프로미스는 주어진 작업이 성공적으로 완료되었는지 또는 실패했는지를 나타내며, 비동기 작업이 완료될 때 실행할 콜백 함수를 지정할 수 있다.  
프로미스를 사용하여 비동기 작업을 처리할 때, 작업의 결과를 처리하는 콜백 함수를 지정할 수 있습니다. 이는 ***.then()*** 메서드를 사용하여 성공적으로 완료된 경우와 ***.catch()*** 메서드를 사용하여 실패한 경우에 각각 호출된다. 그리고 최종적으로 모든 일이 끝났을 때 성공 또는 실패 여부와 관계없이 항상 실행해야 하는 정리 작업 등을 수행할 때 ***.finally()*** 가 실행된다.  

### 프로미스 병렬 처리  
프로미스를 병렬로 처리하려면 Promise.all() 또는 Promise.allSettled() 메서드를 사용할 수 있다.
1. `Promise.all()`은 여러 프로미스를 병렬로 실행하고, 모든 프로미스가 완료될 때까지 기다린 다음에 한 번에 그 결과를 반환한다. 만약 하나의 프로미스라도 실패하면, 모든 작업이 실패로 처리된다.
2. `Promise.allSettled()`은 `Promise.all()`과 유사하지만, 모든 프로미스가 완료될 때까지 기다렸다가 각 프로미스의 성공 또는 실패 여부에 관계 없이 모든 프로미스 결과를 반환한다.  

### async, await  
`async`와 `await`는 Javascript에서 비동기 작업을 더 쉽게 다룰 수 있게 해주는 문법이다.
* ***async*** : 함수 선언 앞에 `async` 키워드를 붙이게 되면 해당 함수는 비동기 함수가 된다. `async` 함수는 항상 Promise를 반환하며, 해당 Promise는 `async` 함수가 반환하는 값 또는 발생한 예외를 처리한다.
* ***await*** : `await` 키워드는 `async`로 선언된 함수 내부에서만 사용할 수 있다. `await`는 Promise가 처리될 때까지 `async` 함수의 실행을 일시 중지하고, Promise가 완료될 때까지 기다렸다가 결과 값을 반환합니다. 이 때, `await` 키워드를 사용하는 표현은 Promise가 아닌 것처럼 동작한다.  


```js
async function fetchFruits() {
	const banana = await getBanana();
	const apple = await getApple();
	return [banana, apple]; 
}
```
fetchFruits() 함수는 async가 붙었기 때문에 비동기함수이다. 이 함수를 호출하면 Promise가 반환되는데 함수 내부에서는 좀 더 동기적인 코드를 작성할 수 있다. banana를 가져올 때 await를 붙이지 않고 `const banana = getBanana()`하게 되면 banana에는 Promise가 저장된다. 우리가 원하는 것은 값이기 때문에 await를 붙여서 getBanana의 Promise가 다 끝날때까지 기다렸다가(await) 값 자체를 banana 변수에 할당해준다.  
=> Promise를 쓸 때 함수 안에서 getBanana와 getApple은 Promise를 반환하는데 이때 then.과 then.으로 엮는 것이 아니라 함수 앞에 붙은 async 키워드로 인해서 함수 내에서 비동기적인 코드를 동기적으로(절차적) 동작하게 할 수 있다. 단, Promise를 반환하는 함수이기 때문에 await라는 키워드를 써서 Promise 값이 resolve가 되면 기다렸다가 그 값을 banana와 apple에 할당해야 한다. 그냥 값을 return 할지라도 함수 앞에 async 키워드가 붙었기 때문에 함수의 값은 [banana, apple] 배열을 resolve하는 Promise가 만들어진다. 따라서 fetchFruit이라는 함수가 호출이 되면 결국 Promise가 반환되고 이 Promise 안에서 await들이 비동기적으로 처리되고 다 끝날때까지 기다렸다가 값을 resolve하는 Promise가 된다.