### 프로세스와 스레드?

**프로세스란?**  
운영체제 위에서 연속적으로, 독립적으로 실행되고 있는 프로그램을 말한다. 각각의 프로세스는 서로 독립적으로 메모리 위에서 실행되고 있다. 만약 3개의 프로세스 중 첫 번째 프로세스에서 문제가 발생했다면 그 프로세스만 죽게 된다. 각각의 프로세스는 저마다 리소스(자원들)가 정해져 있는데, 프로세스마다 할당된 메모리나 데이터들이 지정되어있다.  
프로세스는  
1. code : 프로그램을 위해서 작성된 프로그램을 실행하기 위한 코드
2. stack : 함수들이 어떤 순서대로 실행되어야하는지, 이 함수가 끝나면 어디로 다시 돌아가야하는지에 대한 정보를 저장하고 있다
3. Heap : 우리가 객체를 생성하거나 데이터를 만들 때 그 데이터들이 저장되는 공간이다. heap에는 동적으로 할당된 변수들이 할당된다.
4. Data : 전역변수나 static한 변수들이 저장되어 있다.  

**스레드란?**
한 프로세스 안에서 여러 개의 스레드가 동작할 수 있다. 스레드는 각각 저마다 해야하는 업무를 배정받아서 일꾼이라고도 불린다. 스레드는 자기들만의 수행해야하는 함수의 호출을 기억해야하기 때문에 스레드마다 stack이 할당돼있다. 하지만 프로세스 안에서 동작하는 일꾼들은 결국은 한 프로그램을 위해서 일해야 하므로 프로세스에 저장되어져있는 code, heap, data에 공통적으로 접근해서 업데이트가 가능하다.  

ex)만약 음악을 들으면서 사진을 편집할 수 있는 어플리케이션이 있다면 음악을 재생할 수 있는 스레드, 사진을 편집할 수 있는 스레드와 같이 각각 저마다의 할 일이 있다. 그리고 스레드는 동시다발적으로 발생할 수 있기 때문에 프로세스가 좀 더 효율적으로 일할 수 있도록 도와준다. 만약 프로세스가 하나의 일밖에 하지 못한다면 음악을 듣는 동안 사진 편집을 할 수 없다.  

❗ 여기서 포인트는 스레드는 자신들의 일을 수행할 때 어디서부터 어디까지 일을 진행했고 그 다음엔 어디로 가야하는지와 같은 일의 흐름을 기억할 수 있는 고유의 stack이 지정되어져있다. 하지만 code, heap, data와 같은 공통적인 데이터 리소스는 스레드가 아닌 프로세스에 있기 때문에 스레드들은 이 프로세스에 할당된 공통적인 리소스에 동시다발적으로 접속해서 동시다발적으로 업데이트를 해야하기 때문에 서로 공유하면서 사용한다. 따라서 멀티스레딩을 잘 못하면 공통적으로 업데이트하면서 순서가 잘 맞지 않게 되기 때문에 문제가 발생할 수 있어서 좀 어렵고 까다로운 면이 있다.  

=> 정리를 해보자면 프로세스는 프로그래밍을 동작하는 최고의 단위이고, 스레드는 프로그램 안에서 동시에 여러 개가 수행될 수 있는 일꾼 단위이다.  


**자바스크립트 런타임 환경**  
자바 언어는 언어자체에서 멀티스레딩이 지원이 된다. 그 말은 우리가 프로그래밍을 할 때 사용자가 데이터를 보고 있는 동안 A 스레드에서는 서버에서 데이터를 받아오고, B 스레드에서는 또 다른 일을 각각 지정할 수 있고 총 몇 개의 스레드가 동시에 동작하는 지에 대한 다양한 것들을 할 수 있다.  
하지만❗❗ 자바스크립트는 Single Threaded 언어이다. 자바스크립트 언어 자체에는 멀티스레딩 할 수 있는 방법이 없지만, 자바스크립트가 동작하는 브라우저 위에서는 멀티스레딩이 가능하기 때문에 Web APIs를 이용하면 된다. 그리고 자바스크립트가 동작하는 Runtime 환경에서는 다양한 방식을 이용해서 멀티스레딩과 같은 효과를 낼 수가 있다. 멀티스레딩뿐만 아니라 이벤트 루프를 이용해서 좀 더 다양한 동작을 실행할 수 있다.

**우리의 웹 어플리케이션이 브라우저 위에 올라가는 순간 자바스크립트 엔진이 우리가 작성한 자바스크립트 코드를 한줄 한줄 읽고, 분석하고 실행하게 되는데 원리가 뭘까❓**  
프로세스에 Heap과 Stack이 있는 것처럼 자바스크립트 엔진도 Memory Heap과 Call Stack으로 나눠져있다. 
1. Memory Heap : 우리가 데이터를 만들 때 즉, 변수를 선언해서 객체를 할당하거나 문자열이나 숫자를 할당하게 되면 그 데이터들은 모두 Memory Heap에 저장된다. 그리고 구조적으로 정리된 자료구조가 아니라 데이터들이 여기저기 퍼져서 저장되어있다.
2. Call stack : 우리가 함수를 실행하는 순서에 따라서 차곡차곡 쌓인다. main(), first(), second()와 같이 순서대로 쌓여져있다. stack은 자료구조 중 하나로 LIFO(Last In First Out, 후입선출)라고도 불린다. 제일 나중에 들어온 것이 제일 처음으로 나가는 자료구조이다.  

![task queue](https://postfiles.pstatic.net/MjAyNDA1MDJfNDQg/MDAxNzE0NTkzMDk4ODcw.Z5oImKC4zkrpsxgSejgeKZUFLk7ibP49oBzK4AtjMegg.-TixZRCjFAzp6kowgh03No6BKxxgNm5ULv5yJcyia4Mg.PNG/image09.png?type=w773)


**브라우저 런타임 환경 이해**  
자바스크립트 엔진의 Call stack에는 함수들이 순서대로 담겨져있는데 Web APIs를 통해서 등록한 콜백함수는 어떻게 동작하는건가요❓ 어떻게 Web APIs와 자바스크립트 엔진이 동작하는 건가요❓  

* 예를 들어 main, first, second 다음에 setTimeout()을 호출해서 3초 뒤에 콘솔에 hello를 출력한다고 가졍해보자! setTimeout을 호출하는 순간 setTimeout은 call stack에서 사라지고 Web API는 timer를 시작하게 된다. timer가 실행되고 있는 동안에도 즉, timer와 자바스크립트 엔진은 병렬적으로 실행되고 있다가 지정된 시간 3초가 끝나면 Web APIs는 'timer 끝났어! 그리고 여기 등록해둔 콜백이다'라고 하면서 callback 자체를 Task Queue에 넣는다.  
* 여기서 **Queue**는 무엇인가? FIFO(First In First Out, 선입선출)인 자료구조 중 하나로 처음에 들어온 것이 제일 처음으로 나간다. 큐의 대표적인 api로는 add와 remove가 있다.
* 이렇게 지정된 setTimeout이 끝나게 되면 setTimeout을 호출할 때 등록했던 callback이 Task Queue에 들어온다. Web APIs는 우리가 등록한 콜백함수를 원하는 때에 지정된 시간에 Task Queue에 넣어준다. 그럼 Task Queue에 들어있는 콜백은 언제 실행되는가? Task Queue와 call stack을 관찰하는 아이가 하나 있는데 이게 바로 **event loop**이다. 이 event loop는 while,for와 같은 loop를 계속해서 빙글빙글 돌면서 call stack과 Task Queue를 관찰한다. 빙글빙글 돌다가 '아직 call stack에 할일들이 남아있네?' call stack에 일이 남아있다면 call stack이 비워질 때까지 기다린다. call stack이 텅텅 비워져서 더 이상 자바스크립트 엔진이 일을 하고 있지 않으면 Task Queue에 있던 일들을 call stack으로 옮겨온다. 그러면 자바스크립트 엔진이 call stack에 들어온 timeout callback을 실행한다. 예를 들어 button에 click listener를 등록해두었는데 브라우저에서 버튼이 클릭이 돼서 click이라는 이벤트가 발생했다고 가정해보자. Web APIs는 click이라는 callback 함수를 Task Queue에 넣고 버튼 클릭이 한 번 더 발생하면 click callback 함수가 또 Task Queue에 들어간다. event loop는 call stack에 timeout callback이 끝날 때까지 기다렸다가 call stack이 비워지면 Task Queue에 있는 click 콜백 함수 하나를 call stack으로 가져온다. 이때 한 번에 하나만 call stack으로 가져올 수 있다. 가져온 click 콜백 함수가 다 실행될 때까지 기다렸다가 다 실행이 돼서 call stack이 비워지면 그때 나머지 click 콜백함수를 가져와서 실행될 수 있도록 도와준다.

**전반적인 큰 그림 이해**
* call stack에서 현재 수행 중인 일은 끝날 때까지 보장된다. 즉, 수행 도중 다른 task나 다른 일들을 할 수 없고 현재 수행 중인 code block이 끝날 때까지 event loop가 기다렸다가 끝나면 call stack의 다른 작업이 수행되거나 Task Queue에 있는 작업을 옮겨와서 실행한다.  

![microtask queue](https://postfiles.pstatic.net/MjAyNDA1MDJfMTc0/MDAxNzE0NTkyOTg0ODU3.n06QoYk0iDx0wwC0iW0_ROvgFgYEJFOOMlGZhWdq5Acg.3Mxwt8Tj_hN6KQloKoA6iot2uyY9sqbUybDC4o25w94g.PNG/image08.png?type=w773)

**Microtask Queue와 Render**
* Web APIs에서 우리가 등록한 콜백함수를 특정한 이벤트가 발생했을 때 Task Queue에 넣는다. **Microtask Queue**에는 우리가 흔히 쓰는 promise에 등록된 callback 즉, promise가 다 수행이 되고 나면 그 다음 then에 등록해둔 callback과 mutation observer라는 Web APIs에 등록된 callback이 들어오게 된다. 만약 백엔드에서 데이터를 받아오는 fetch를 사용해서 프로그램을 만들었다고 가정해보자. promise의 then에 callback 함수를 등록해두고 이 promise가 성공적으로 끝나서 resolve가 된다면 그 때 우리가 등록해둔 callback이 Microtask Queue에 들어오게 된다.  
* 주기적으로 브라우저에서 요소들을 움직이거나 애니메이션을 할 때 업데이트를 해줘야하는데 화면에 주기적으로 업데이트하는 것을 **Render**라고 한다. 브라우저에서 우리가 변경한 Dom 요소가 표기되기 위해서는 Render Tree가 만들어져야 하고, layout 크기와 위치들이 계산된 다음에 paint와 composite 과정을 거쳐야 한다. Web APIs 중에 Request Animation Frame이라는 API가 있는데 이 API를 통해서 callback을 등록해두면 다음 브라우저 업데이트 전에 등록해둔 callback을 실행할 수 있다. 이때 우리가 호출하는 callback은 Request Animation Frame의 queue 안에 차곡곡 쌓인다.  

* 그렇다면 브라우저는 어떻게 이렇게 많은 것들을 순서대로 잘 실행할 수 있나❓  
event loop는 white이 true인 것처럼 계속해서 빙글빙글 돌고 있다. event loop가 계속 돌다가 call stack에 수행 중인 함수가 있다면 그 함수가 끝날 때까지 꼼짝도 하지 않고 머물러 있다. 그래서 만약 call stack에 등록한 A라는 함수에서 시간이 오래 걸리는 일을 수행하게 되면 더 이상 사용자에게 업데이트된 화면을 보여줄 수 없고 다른 클릭 이벤트가 발생해도 그 클릭 이벤트에 등록된 콜백함수가 실행되지 않는다. event loop가 A 함수에 계속 머무러 있기 때문이다. A 함수가 다 실행돼서 끝나면 그때서야 다시 빙글빙글 돌기 시작하는데 이때 Render 쪽으로 갈 수도 있고 안 갈 수도 있다. 그 이유는? 브라우저에서는 우리가 업데이트하는 내용들을 사용자에게 60fps(16.7ms) = 1초동안 60개의 프레임을 보여주려고 노력한다. 브라우저 위에서도 사용자 눈에 부드럽게 애니메이션 된다는 느낌을 받게 하기 위함이다. event loop는 1ms보다 훨씬 빨리 빙글빙글 돌고 있기 때문에 매번 1ms마다 render를 할 필요가 전혀 없다. 따라서 어느 정도 시간이 있다가 16.7ms 범위안에서 render를 업데이트 해주고 다시 다른 일을 하면서 몇 바퀴 더 돌다가 16.7m에 가까워졌다 싶으면 render tree를 업데이트하는 방식으로 운영되고 있다. render를 지나치고 microtask queue를 봤는데 아이템들이 남아 있다면 microtask queue에 멈춰서 queue안에 들어있는 아이템들이 없어질 때까지 기다렸다가 아이템들을 하나하나씩 call stack으로 가져간다. 이렇게 promise된 callback을 call stack에 넣게 되고 promise then이 끝나게 되면 다시 mutation observer라는 것을 넣게 된다. 포인트는 microtask queue에 머물러있는 동안 microtask queue에 또 다른 콜백이 들어온다면 나중에 들어온 아이템도 전부 다 끝날때까지 microtask queue이 '텅텅 빌때까지 계속' call stack으로 가져와서 수행하게 된다.  

* 만약 mutation observer라는 콜백이 끝나기 전에 또 다른 promise then 콜백이 Microtask Queue에 들어오게 되면 mutation observer가 끝나는 순간 새로 들어온 then 콜백이 수행된다. 따라서 event loop가 Microtask Queue에 머무르면서 다른 아이템들이 계속해서 들어오게 된다면 계속해서 그 아이템들을 처리한다. 계속 처리하다가 Microtask Queue가 텅텅 비게 된다면 그 때 다시 순회를 재개하면서 task Queue로 넘어오게 되는데 task Queue에서는 한 번에 딱 하나의 아이템만 call stack으로 가져갈 수 있다. Microtask Queue에서는 아이템들이 없어질 때까지 심지어 새로 들어오는 아이들도 전부 끝날 때까지 기다린 반면에 task queue에서는 아이템 하나만 call stack으로 보내놓고 이 call back이 끝날때까지 기다린다. 이렇게 call stack에 있는 callback이 다 끝나고 나서야 event loop는 동그라미 순회를 시작한다.  

* 다시 순회를 시작하고 나서 보니까 이제 슬슬 브라우저에 업데이트할 때가 되었는데? 하고 Render로 이동한다. Render Sequence에 들어와서 먼저 Request Animation Frame을 통해서 queue에 등록된 callback 함수들을 천천히 하나씩 실행한 다음에 Render tree로 와서 tree를 만들고 그 tree를 이용해서 layout를 계산하고 paint를 통해서 브라우저에 업데이트한 다음 event loop는 순회를 다시 시작한다. 그렇게 순회를 하다보면 Task Queue에 click 이벤트가 남아있다면 다시 call stack으로 가져오게 되고 call stack에서 click callback을 실행하게 된다.

