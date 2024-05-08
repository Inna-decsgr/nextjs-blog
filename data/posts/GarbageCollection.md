## 쓰레기 수집(Garbage Collection)
메모리는 한정된 자원이기 때문에 사용하지 않거나 필요가 없는 부분은 메모리 누수로 이어지게 된다. 따라서 사용하지 않거나 필요가 없는 부분은 비워주는 것이 좋다. c언어는 개발자가 직접 메모리 관리를 하고 청소를 하지만 자바스크립트 언어에서는 메모리 관리를 직접 할 필요가 없고 다 쓴 메모리도 직접 청소할 필요가 없다. Garbage Collector(쓰레기 수집가)가 알아서 해준다.

* 자바스크립트에서 Garbage Collection(메모리 관리 기술 중 하나로, 가비지 컬렉터에 의해 수행되는 프로세스를 의미)이 발생하는 원리는 자바스크립트 엔진에서 자체적으로 제공해주고 백그라운드에서 동작하는 Garbage Collector 덕분이다.  


객체를 변수에 할당하면 객체는 메모리 heap에 만들어지고 변수는 메모리가 만들어진 heap의 주소를 가리키게 된다.
```js
let apple = {
    name: 'apple',
}
let orange = apple;
orange = null;
apple = null;
```
apple과 orane 모두 동일한 heap의 주소를 가지게 된다. 즉, 그 말은 동일한 오브젝트를 가리키고 있다는 것이다.  
orange와 apple에 null을 할당하게 되면 orange와 apple 모두 아무것도 가리키고 있지 않게 된다. 이제 그 어떤 변수도 해당 오브젝트를 가리키거나 참조하거나 사용하고 있지 않다. 이렇게 아무도 오브젝트를 참조하고 있지 않을 때 바로 ***Garbage Collector***가 나타난다.  
이 Garbage Collector가 주기적으로 해당 오브젝트를 참조하고 있는 변수가 있는지 없는지 확인한 다음 아무도 오브젝트를 참조하고 있지 않다면 "이거 쓰레기네! 아무도 쓰고 있지 않잖아?"라고 쓰레기로 간주해서 메모리에서 깔끔하게 청소해준다.  
따라서 우리가 신경 쓸 일은 없지만 이 Garbage Collector가 동작하는 것도 일이기 때문에 CPU가 일을 하게 된다. 일을 수행하게 되면 비용이 발생하기 때문에 너무 자주 쓰레기를 수집해서 쓰레기 수집에 resource를 다 쓰면 안된다.  
Garbage Collector를 너무 믿지 말고 불필요한 메모리를 많이 할당하거나 재할당하지 말고 필요한만큼 쓰는 것이 중요하다. 특히 전역 변수는 앱이 종료될 때까지 계속 메모리에 유지되기 때문에 전역적으로 변수를 선언하고 쓰는 것은 이름 충돌, 메모리 낭비 모든 면에서 좋지 않다.

## 렉시컬 환경

__렉시컬 환경에 대해 알아보기 전에 스코프에 대해 알아보자__
- **스코프**라는 영어 단어 자체는 범위, 영역을 뜻한다. 프로그래밍에서 스코프란 변수를 참조할 수 있는(접근할 수 있는) 유효한 범위를 말한다. 또는 식별자(변수, 함수, 클래스 이름)가 유효한 범위라고도 할 수 있다. 따라서 스코프란 변수나 함수나 클래스가 어디에서 선언이 되고 어디에서 접근하냐에 따라서 접근할 수 있는지 없는지 유효 범위가 결정된다. 밖에서는 스코프 내부 있는 것에 접근을 할 수 없다. 그 이유는 스코프는 각각의 렉시컬 환경이라는 것이 있는데 그 안에 외부 렉시컬 환경 참조를 통해(스코프 체인을 통해서) 찾아가면서 부모의 데이터에 접근할 수 있기 때문이다.


__그렇다면 이 이 유효한 범위를 어떻게 결정하는가❓__  
* 바로 블록으로 결정한다.
```js
{
    // 블록 안의 변수는 블록 안에서만 유효하다
}
```
만약 블록 안에서 a라는 변수를 선언했다면 해당 블록 안에서는 a 변수를 참조, 할당, 출력, 접근이 가능하지만 블록 밖에서는 a라는 변수를 참조할 수 없다. 왜냐면 블록 안의 변수는 블록 안에서만 유효하기 때문이다.  


__이런 스코프가 왜 존재할까❓__ 
* 스코프가 있어야 이름 충돌을 방지할 수 있다. 그리고 블록 안의 변수는 블록이 끝나는 순간 자동으로 메모리에서 제거가 되는데 이때 블록으로 변수의 유효 범위를 지정해주면 "이 블록이 끝나면 메모리에서 제거해도 돼!"라고 해주기 때문에 메모리도 절약할 수 있다.

__변수, 식별자는 최대한 필요한 곳에서 정의해야 한다❗__ 
* {}, if(), for(){}, function(){}, switch 등과 같은 코드 블록 외부에서는 블록 내부의 변수를 참조할 수 없다. 마찬가지로 함수 외부에서도 함수의 매개변수를 참조할 수 없다. 또한, 아무리 블록이 중첩되어 있어도 자식 블록은 부모(상위)블록에 있는 변수를 참조할 수 없다.  

__그렇다면 렉시컬 환경이란❓__  
* 렉시컬 환경은 식별자와 그에 상응하는 값을 저장하는 공간이다. 이 환경은 변수들이나 함수들이 선언될 때 생성되며, 해당 변수나 함수가 스코프 체인(Scope Chain)에 의해 접근될 수 있게 한다.  
  
  

렉시컬 환경은 크게 두 가지 컴포넌트로 구성된다.
1. 환경 레코드(Environment Record) : 현재 블록에 해당하는 데이터. 환경 레코드는 해당 실행 컨텍스트에서 사용되는 모든 변수와 함수에 대한 정보를 담고 있다. 이 정보에는 변수의 이름과 값, 함수의 이름과 코드 블록 등이 포함된다. 
2. 외부 렉시컬 환경 참조(Outer Lexical Environment Reference) : 외부 환경(부모 블록)에 대한 데이터. 현재 렉시컬 환경이 참조하는 외부 렉시컬 환경에 대한 참조이다. 이는 함수의 중첩이나 스코프 체인을 통해 현재 환경이 어디에있는지 결정하는 데 사용된다.

* 렉시컬 환경, 스코프 체인을 통해 배울 수 있는 점!
메모리 절약뿐만 아니라, 성능을 위해서라도 변수를 최대한 필요한 곳에서 정의해야한다. 중첩된 스코프가 있는데 필요한 곳에서 변수를 선언하지 않으면 모든 스코프체인을 돌아다니면서 어디에 있는지 검사해야하기 때문에 성능에도 좋지 않다.  


***다음 포스트에서는 렉시컬 환경과 밀접한 관계가 있는 클로저에 대해 알아보자***