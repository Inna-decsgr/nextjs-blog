### 자바스크립트 렌더링 순서

- 성능 보장 렌더링 순서  
_Critical rendering path_  
requests/response ➡ loading ➡ scripting ➡ rendering ➡ layout ➡ painting  

**requests/response, loading, scripting**   
: html 페이지에서 브라우저가 이해할 수 있도록 브라우저만의 언어로 바꾸는 Construction  
: DOM 요소로 변환, CSS => CSSOM 변환, Render Tree 만들기 등이 포함된다  

**rendering, layout, painting**    
: 만들어진 렌더링 트리를 이용해서 구조를 작성하고 어디에 배치할 것인지 계산한 다음 실제로 브라우저 window 위에 그림을 그려주는(렌더링) 해주는 Operation  

**layout, paint, composition**    
: paint 과정은 브라우저에 바로 그림을 그리는 것이 아니라 요소를 어떻게 배치했느냐에 따라 각각의 부분을 잘게 나누어서 이미지를 컴퓨터가 이해할 수 있는 이미지 비트맵으로 준비한다.  

왜❓ **레이어 별로 준비하는 거지❓**    
=> 브라우저가 성능 개선을 위해서 스스로 준비해두는 것이다. 레이어 기능을 이용하지 않고 전체 이미지를 사용하게 되면 변경이 일어났을 때 전체를 모두 다 변경해야한다. 하지만 레이어 기능을 이용하면 그 레이어만 수정해서 다시 보여주면 되기 때문에 변경이 일어나지 않은 다른 부분까지 렌더링하는 불필요한 작업을 없앨 수 있다. 그렇다고 불필요한 레이어를 많이 만들게 되면 이 또한 브라우저의 성능을 저하시키기 때문에 레이어는 중요하지만 남용해서는 안된다.  

: composition 과정은 미리 준비한 레이어를 차곡차곡 브라우저 위에 표기하는 것이다. z-index 우선순위에 따라 표기한다.  

**Construction 과정에서 중요한 것은❓**   
: DOM 요소가 작으면 작을수록, css 규칙이 작으면 작을수록 DOM에서 Rendering Tree를 빠르게 만들 수 있다. 최대한 요소들을 작게 만드는 것이 중요하다.  

**Operation 과정에서 중요한 것은❓**  
: 나중에 사용자가 클릭을 해서 요소를 움직이거나 애니메이션을 쓸 때 paint가 자주 일어나지 않게 하는 것이 중요하다. 어떤 요소를 이동시킬 때 다른 요소에까지 영향을 미친다면 브라우저는 처음 과정인 layout부터 위치를 계산해야한다. 그것을 기반으로 paint, composition을 다시 해야하기 때문에 성능이 나빠질 수 밖에 없다. 자바스크립트나 css로 DOM 요소를 조작할 때 composition 과정만 일어난다면 제일 좋고 paint 과정까지 일어나는 것도 나쁘지 않지만 layout부터 일어난다면 성능이 최악이다.  

**레이어 데모(will-change 남용❓)**  
: 개발 툴 more tools에서 레이어 확인이 가능하다. css에서 해당 요소에 will-change 속성을 설정해준다면 브라우저는 그 요소를 한 레이어로 따로 만들어둔다. 레이어를 사용하면 성능 개선이 가능하다.

