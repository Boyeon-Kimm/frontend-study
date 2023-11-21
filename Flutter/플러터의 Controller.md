# 플러터의 Controller 란?

Created by: Boyeon Kim
Created time: November 21, 2023 2:43 PM
Tags: Frontend Study

# Controller 란?

- UI 컴포넌트의 상태와 동작을 관리할 때 자주 사용되는 개념
- UI 요소와 기본 로직 혹은 데이터 사이의 중개자 역할을 한다

## 역할 및 기능

- 상태 관리: 하나 혹은 여러개의 위젯의 상태를 관리한다. 데이터를 보관하고 UI가 현재 상태를 반영하는지 확인한다
- 사용자 입력 처리: 텍스트 필드의 텍스트나 슬라이더 값과 같은 사용자 입력을 처리한다.
- 데이터 바인딩: UI와 데이터 모델 간의 동기화를 가능하게 한다.

## 컨트롤러 유형

- 텍스트 편집 컨트롤러 : 텍스트 필드의 콘텐츠를 관리하는데 사용, 변경사항 추적, 필드에 표시되는 텍스트 제어
- 애니메이션 컨트롤러 : 애니메이션 시퀀스를 관리, 타이밍과 진행을 제어
- 스크롤 컨트롤러 : 스크롤 가능한 위젯의 위치를 모니터링하고 제어

## 컨트롤러의 장점

- 관심사 분리 : UI 코드에서 비즈니스 로직을 분리시켜줌
- 재사용 가능성 : 재사용이 가능하므로 코드 중복 줄일 수 있음
- 테스트 가능성 개선 : 컨트롤러를 UI 컴포넌트와 독립적으로 단위 테스트 가능

## Flutter 코드에서 사용

- 컨트롤러는 일반적으로 `statefulWidget` 내에서 인스턴스화됨
- UI 위젯과 상호작용하여 변경사항을 수신하고 필요에 따라 상태를 업데이트함

## ✨ Best

```
1. dispose 잘하기!! : 메모리 누수 방지를 위해 initState 에서 정보를 초기화하고 dispose에서 컨트롤러를 잘 폐기해주어야 함.
2. Tight Coupling 피하기 : 컨트롤러는 UI 위젯과 최대한 독립적으로 설계해야 함
3. 가볍게 유지하기 : 특정 작업에 집중하고 관련 없는 기능으로 과부하가 걸리지 않도록 해야 함
```

## 다른 프레임워크와 비교 시

- MVC에서 말하는 Controller의 개념과 유사하지만, 여기선 UI의 상태관리에 더 집중된 개념

## 소스코드 예제 (`YoutubePlayerController`)

```dart
// 👉 customYoutubePlayer 위젯의 상태를 관리하는 클래스 정의
class _CustomYoutubePlayerState extends State<CustomYoutubePlayer> {
	// 👉 _CustomYoutubePlayerState 클래스의 멤버 변수로 YoutubePlayerController의 인스턴스를 저장할 수 있는 변수 nullable controller 변수 선언
	// Youtube 동영상을 제어하는 데 사용됨.	
	YoutubePlayerController? controller;

	// 👉 initState 메소드는 위젯의 생명주기 중 초기화 단계에서 호출됨
	// 위젯이 생성될 때 필요한 설정을 수행한다.
	@override
	void initState() {
		// 👉 부모 클래스의 initState 메소드를 호출하여 기본 초기화 작업 수행
		super.initState();

		// 👉 YoutubePlayerController 인스턴스 생성하여 controller 변수에 할당
		// 이 컨트롤러는 동영상을 재생하고 제어하는 데 사용됨
		controller = YoutubePlayerController(
			// 👉 초기에 재생할 유튜브 동영상의 id를 지정. 부모 위젯에서 전달된 모델 객체의 id 속성 사용
			initialVideoId: widget.videoModel.id,
			// 👉 동영상 재생에 대한 플래그 설정. 자동 재생 비활성화
			flags: const YoutubePlayerFlags(
				autoPlay: false
			)
		);
	}

	// 👉 위젯의 UI를 구성하는 메소드
	@override
	Widget build(BuildContext context) {
		return Column(
			crossAxisAlignment: CrossAxisAlignment.stretch,
			children: [
				YoutubePlayer(
					// 👉 앞서 초기화된 유튜브 플레이어 컨트롤러 사용
					controller: controller!,
					// 👉 동영상 재생 시 진행 상태 표시줄을 활성화
					showVideoProgressIndicator: true,
				)
			],
		);
	}

	// 👉 위젯이 제거될 때 호출되는 메소드. 정리 작업 수행
	@override
	void dispose() {
		// 👉 부모 클래스의 dispose 메소드 호출하여 기본 정리 작업을 수행한다
		super.dispose();
		// 👉 YoutubePlayerController의 dispose 메소드를 호출하여 컨트롤러를 적절하게 정리한다.
		// 👉 이는 리소스 누수를 방지하는 중요한 단계이다.
		controller!.dispose();
	}
}
```