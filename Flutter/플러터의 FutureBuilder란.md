# 플러터의 FutureBuilder란?

Created by: Boyeon Kim
Created time: November 21, 2023 10:37 PM
Tags: Frontend Study

# `FutureBuilder`

- Future와의 상호작용의 가장 최신 스냅샷을 기반으로 스스로 빌드되는 위젯
- UI 에서 비동기 연산을 처리하는 데 주로 사용됨

## 개념

- 비동기 연산(Asynchronous Operation) : 잠재적으로 값이나 에러가 될 수 있는 `Future` 와 함께 동작하도록 설계 됐다. 네트워크 요청이나 DB 쿼리와 같은 비동기 작업에 사용 됨.
- 상태 관리 : `Future` 의 상태는 `not started` , `in progress` , `completed with data`, `completed with error` 가 있는데 이에 따라 UI를 재구성하여 비동기 작업의 상태관리를 처리한다.

## 주요 속성

- `Future` : 이 빌더가 연결된 `Future` 이다. 데이터의 소스이고 빌더는 UI를 빌드하기 위해 이 데이터를 갖다 쓴다
- `builder` : 위젯 트리를 빌드하는 함수이다. `Future` 의 상태에 따라 렌더링할 UI를 정의한다. `BuildContext` 와 `Future` 결과의 비동기 스냅샷 `AsyncSnapshot` 에 액세스할 수 있다.

## Best Practice

- 모든 상태 처리하기 : `Future` 의 모든 상태 `loading` , `success` , `error` 에 대한 처리를 해주자
- `Future` 재생성(Recreation) 방지 : 모든 빌드에서 퓨처가 다시 생성되지 않도록 하려면, `build` 메서드 외부에서 `Future` 를 정의하거나 `Future Provider` 를 사용해야 한다.
- 오류 처리 : `Future` 가 오류와 함께 완료되는 경우에 대비해 꼼꼼한 오류 처리 구현

## 사용

- 데이터 가져오기 : 비동기로 데이터를 가져올 때
- 동적 콘텐츠 : 위젯의 콘텐츠가 비동기 데이터의 결과에 따라 달라지는 경우 유용하다

## 사용 예제 1️⃣

```dart
// 👉 FutureBuilder 위젯 생성, Future가 반환하는 데이터의 타입 == TypeOfData
// FutureBuilder는 비동기적으로 생성되는 데이터와 함께 UI를 구축하는 데 사용된다
FutureBuilder<TypeOfData>(
	// 👉 FutureBuilder에 사용할 Future 지정한다.
	// myFutureMethod()는 비동기적으로 데이터를 가져오거나 계산하는 메소드
	future: myFutureMethod(),
	// 👉 Future의 현재 상태에 따라 UI를 구축하는 함수
	// context와 snapshot 두 개의 매개변수를 받음.
	// context : 위젯의 빌드 컨텍스트
	// snapshot : Future의 현재 상태와 반환된 데이터 포함
	builder: (context, snapshot) {
		// 데이터 로드 중인 경우
		if(snapshot.connectionState == ConectionState.waiting) {
			return CircularProgressIndicator();
		} else if(snapshot.hasError) {
			return Text('Error: ${snapshot.error}');
		} else {
			return MyWidget(data: snapshot.data);
		}
	},
)

📢 비동기적으로 데이터를 로드하고, 로드 중에는 로딩 인디케이터를 표시하며, 오류 발생 시 오류 메시지 보여주고, 데이터가 성공적으로 로드 되면 해당 데이터를 사용하여 위젯을 생성하는 것.
```

## 사용 예제 2️⃣

```dart
// 👉 HomeScreen 위젯을 관리하는 클래스 정의
// _HomeScreenState 클래스는 State 클래스를 상속받아 HomeScreen 위젯의 상태를 관리한다.
class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        centerTitle: true, // 타이틀 중앙 배치
        title: const Text( // 앱 바의 제목 설정
            'CodingFactory Youtube Example'
        ),
        backgroundColor: Colors.black,
      ),
			// 👉 FutureBuilder 위젯을 사용하여 비동기적으로 List<VideoModel> 타입의 데이터를 처리한다
      body: FutureBuilder<List<VideoModel>>(
				// 👉 FutureBuilder에서 사용할 Future를 지정한다.
				// 비동기적으로 비디오 목록을 가져올 메소드
        future: YoutubeRepository.getVideos(),
				// 👉 현재 상태에 따라 UI를 구축하는 builder 함수
        builder: (context, snapshot) {
          // 👉 completed with error 처리
          if (snapshot.hasError) {
            return Center(
                child: Text(
                    snapshot.error.toString()
                )
            );
          }

          // 👉 completed without data 처리
					// 아직 데이터를 받지 못한 경우, 로딩중
          if (!snapshot.hasData) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }

          // 👉 completed with data 처리
					// 로딩 완료 시, 새로고침 기능을 포함하는 RefreshIndicator 반환
          return RefreshIndicator(
						// 새로고침 동작 정의 setState 호출하여 위젯 재빌드
            onRefresh: () async {
              setState(() {});
            },
						// 스크롤 가능한 목록 생성
            child: ListView(
              physics: const BouncingScrollPhysics(), // 스크롤 효과 설정
							// 👉 snapshot.data를 사용하여 CustomYoutubePlayer 위젯의 리스트를 생성
              children: snapshot.data!
                  .map((e) => CustomYoutubePlayer(videoModel: e))
                  .toList(),
            ),
          );
        },
      ),
    );
  }
}

📢 Youtube 동영상 목록을 비동기적으로 로드하고, 로딩 상태에 따라 적절한 UI(오류메시지, 로딩 인디케이터, 동영상 목록)을 표시하는 Flutter 앱의 홈 화면을 구성한다.
```

### 📃 공식문서

[FutureBuilder class - widgets library - Dart API](https://api.flutter.dev/flutter/widgets/FutureBuilder-class.html)