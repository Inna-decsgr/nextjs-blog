## 간단한 컴포넌트  

React 컴포넌트는 입력 데이터를 받아들이고 화면에 표시할 내용을 반환하는 `render()` 메서드를 구현한다. 이 예제는 JSX라는 XML과 유사한 구문을 사용합니다. 컴포넌트로 전달된 입력 데이터는 `render()` 내에서 `this.props`를 통해 접근할 수 있다.

```jsx
class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

root.render(<HelloMessage name='Taylor' />);
```

## 선언

React를 사용하면 대화형 UI를 생성하는 것이 간편해진다. 애플리케이션의 각 상태에 대한 간단한 뷰를 설계하고, 데이터가 변경될 때 React는 효율적으로 업데이트하고 필요한 컴포넌트만 렌더링한다.

 _emphasis_ 그리고 **important emphasis**를 활용한 문단이다.

>  ~취소선~ and a URL: https://reactjs.org.이 있는 블록 인용구이다.

- Lists
- [ ] todo
- [x] done

## 컴포넌트 기반

자체 상태를 관리하는 캡슐화된 컴포넌트를 구축한 다음 이를 조합하여 복잡한 UI를 만든다.  
컴포넌트 로직이 템플릿이 아닌 JavaScript로 작성되기 때문에 앱을 통해 풍부한 데이터를 쉽게 전달하고 상태를 DOM에서 유지할 수 있다.

## 한 번 배우고 어디서든 쓸 수 있어요

React는 사용자의 기술 스택에 대한 가정을 하지 않기 때문에 기존 코드를 다시 작성하지 않고도 React로 새로운 기능을 개발할 수 있다.  
또한 React는 Node를 사용하여 서버에서 렌더링하고 React Native를 사용하여 모바일 앱을 제작할 수 있다.
