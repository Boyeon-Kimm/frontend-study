# Typescript - day01

# Effective TypeScript

## 1장 타입스크립트 알아보기

### 타입스크립트와 자바스크립트의 관계 이해하기

- 타입스크립트는 자바스크립트의 상위 집합이다.
    - `main.js` 파일명을 `main.ts` 로 바꾼다고 해도 달라지는 것은 없음.
    - 모든 자바스크립트 프로그램이 타입스크립트라는 명제는 참이지만, 그 반대는 성립하지 않는다
- 자바스크립트 파일 `.js` `.jsx` 확장자 사용
- 타입스크립트 파일 `.ts` `.tsx` 확장자 사용
- 타입 구문을 사용하는 순간부터 자바스크립트는 타입스크립트 영역으로 들어가게 된다.
- 타입스크립트는 자바 스크립트 런타임 동작을 모델링하는 타입 시스템을 가지고 있기 때문에 런타임 오류를 발생시키는 코드를 찾아내려고 한다. 그러나 모든 오류를 찾아내리라 기대하면 안된다. 타입 체커를 통과하면서도 런타임 오류를 발생시키는 코드는 충분히 존재할 수 있음
- 타입스크립트 타입 시스템은 전반적으로 자바스크립트 동작을 모델링한다. 그러나 잘못된 매개변수 개수로 함수를 호출하는 경우처럼, 자바스크립트에서는 허용되지만 타입스크립트에서는 문제가 되는 경우도 있음.

<br>
<br>

### 타입스크립트 설정 이해하기

- 타입스크립트를 어떻게 사용할 계획인지 동료들이나 다른 도구들이 알 수 있도록 설정 파일을 사용하는 것이 좋다.
- 설정 파일은 `tsc --init` 만 실행하면 간단히 생성된다
- `noImplicitAny`
    - 변수들이 미리 정의된 타입을 가져야 하는지 여부를 제어
    - 다음 코드는 `noImplicitAny` 가 해제되어있을 때는 유효하다
    
    ```tsx
    function add(a, b){
    	return a + b;
    }
    ```
    
    - `any` 타입을 매개변수에 사용하면 타입 체커는 무력해진다.
        - any 타입은 유용하지만 매우 주의해서 사용해야 함!
    - 타입스크립트는 타입 정보를 가질 때 가장 효과적이기 때문에 되도록이면 `noImplicitAny` 를 설정해야한다.
- `strictNullChecks`
    - `null` 과 `undefined` 가 모든 타입에서 허용되는지 확인하는 설정
    - 다음은 `strictNullChecks` 가 해제되었을 때 유효한 코드
    
    ```tsx
    const x: number = null;
    // 정상, null은 유효한 값
    ```
    
    - 하지만 strictNullChecks를 설정하면 오류가 된다
    - `null` 대신 `undefined`를 써도 같은 오류가 난다

<br>
<br>

<br>

### ⚡ 오늘 겪은 VSC ts 초기 셋팅 오류들.. 및 해결하기 위해 참고했던 정보들…

[타입스크립트 쓰는 이유 & 필수 문법 10분 정리](https://www.youtube.com/watch?v=xkpcNolC270)

[PowerShell says "execution of scripts is disabled on this system."](https://stackoverflow.com/questions/4037939/powershell-says-execution-of-scripts-is-disabled-on-this-system)

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```