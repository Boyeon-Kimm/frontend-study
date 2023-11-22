# 상태관리 라이브러리 GetX

Created by: Boyeon Kim
Created time: November 21, 2023 11:20 PM
Tags: Frontend Study

## GetX를 통한 상태관리 방식

1. 단순 상태 관리
    1. 기존의 데이터와 변경되는 데이터가 같은지 확인하지 않는다.

```dart
import 'package:get/get.dart';

// 👉 GetxController를 상속받아 GetX 패턴을 사용한 상태 관리를 위한 컨트롤러를 정의한디
class SimpleController extends GetxController {
	int counter = 0;

	void increase() {
		counter++;
		// 👉 update 메소드 호출하여 UI 갱신.
		// GetX 패턴에서 상태 변경을 알리는 방법
		update();
	}
}
```

```dart
// 👉 StatelessWidget을 상속받아 상태가 변하지 않는 위젯 정의
class MyHomePage extends StatelessWidget {
	// 👉 생성자에서 선택적 key 매개변수를 받고, 상위 클래스의 생성자에게 전달
	MyHomePage({Key? key}) : super(key: key);

	// 👉 build 메소드 오버라이드하여 UI 구성
	@override
	Widget build(BuildContext context) {
		// 👉 Getx 라이브러리의 put 메소드를 사용하여 SimpleController 인스턴스를 의존성 주입 컨테이너에 등록한다.
		Get.put(SimpleController());
		return Scaffold(
			appBar: AppBar(
				title: const Text('단순 상태관리'),
			),
			body: Center(
				// 👉 GetBuilder를 사용하여 SimpleController의 상태 변화를 감지한다.
				child: GetBuilder<SimpleController>(
					// 👉 builder 콜백에서 SimpleController 인스턴스에 접근한다.
					builder: (controller) {
						return ElevatedButton(
							child: Text('현재 숫자: ${controller.counter}',
							),
							onPressed: () {
								controller.increase();
							}
						);
					}
				)
			)
		)
	}
}
```

> controller 사용하기 위해 `Get.put` 으로 controller를 등록해준다.
`GetBuilder()` 아래의 모든 위젯은 controller에서 변경되는 데이터를 실시간으로 반영할 수 있는 상태가 된다. 
`controller.counter` 은 `controller` 의 변수를 실시간으로 반영하게 되고 `controller.increase()` 는  의 `counter` 데이터를 실시간으로 증가시키기게 된다. 
**만약 `GetBuilder` 를 사용하지 않을 경우** `Get.find<Controller 종류>().[변수 혹은 함수]` 로 컨트롤러의 데이터를 실시간 변경 혹은 반영할 수 있다.
> 
1. 반응형 상태 관리
    1. 데이터가 변화가 있을 때만 재렌더링을 하게 됨
    2. workers 라는 추가 기능도 있음

```dart
import 'package:get/get.dart';

class ReactiveController extends GetxController {
	// 👉 변수의 타입을 RxInt, RxString 등 Rx{타입}의 방식으로 선언하고 변수의 값은 .obs 붙임
	// update의 경우 update() 함수를 부르지 않아도 됨!
	RxInt counter = 0.obs;

	void increase() {
		counter++;
	}
}
```

```dart
class MyHomePage extends StatelessWidget {
  MyHomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Get.put(SimpleController()); // 단순 상태 관리 controller 등록
    Get.put(ReactiveController()); // 반응형 상태 관리 controller 등록
    return Scaffold(
      appBar: AppBar(
        title: const Text("단순 / 반응형 상태관리"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            GetBuilder<SimpleController>( // 단순 상태 관리
              builder: (controller) {
                return ElevatedButton(
                  child: Text(
                    '[단순]현재 숫자: ${controller.counter}',
                  ),
                  onPressed: () {
                    controller.increase();
                    // Get.find<SimpleController>().increase();
                  },
                );
              },
            ),
            GetX<ReactiveController>( // 반응형 상태관리 - 1
              builder: (controller) {
                return ElevatedButton(
                  child: Text(
                    '반응형 1 / 현재 숫자: ${controller.counter.value}', // .value 로 접근
                  ),
                  onPressed: () {
                    controller.increase();
                    // Get.find<ReactiveController>().increase();
                  },
                );
              },
            ),
            Obx( // 반응형 상태관리 - 2
                  () {
                    return ElevatedButton(
                      child: Text(
                        '반응형 2 / 현재 숫자: ${Get.find<ReactiveController>().counter.value}', // .value 로 접근
                      ),
                      onPressed: () {
                        Get.find<ReactiveController>().increase();
                      },
                    );
              },
            ),
          ],
        ),
      ),
    );
  }
}
```

> 1. controller를 사용하기 위해 `Get.put()` 으로 controller 등록해준다.
> 

반응형 상태관리에서 데이터를 실시간으로 반영하는 방식에는 두 가지가 있음

1️⃣ **GetX()** : GetX() 아래의 모든 위젯은 controller에서 변경되는 데이터를 실시간으로 반영할 수 있는 상태가 된다. `controller.counter.value` (단순 상태 관리와는 다르게, `.value` 를 추가해 주어야 함. controller는 변수를 실시간으로 반영하게 되고 `controller.increase()` 는 controller의 counter 데이터를 실시간으로 증가시킴. 

⚠️ 만약 GetX를 사용하지 않을 경우 `Get.find<Controller 종류>().[변수 혹은 함수]` 로 컨트롤러의 데이터를 실시간 변경 혹은 반영할 수 있다.

2️⃣ Obx() : Obx() 아래의 모든 위젯은 GetX()와 마찬가지로 controller에서 변경되는 데이터를 실시간으로 반영할 수 있는 상태가 된다. 사용 방식은 거의 동일하지만 GetX()와 달리 controller 이름을 지정할 수가 없어서 `Get.find()` 방식으로 접근해야한다.

### 반응형 상태 관리의 추가 기능 - `worker`

Worker은 controller 안에서 `onInit()` 함수를 `override` 하고 그 안에 추가해서 사용하게 되는데 아래의 4가지 종류가 있다.

- `Ever` : 매번 변경 될 때 실행
- `Once` : 처음 변경 되었을 때만 실행
- `Interval` : 계속 변경이 있는 동안 특정 지정 시간 인터벌이 지나면 실행
- `Debounce` : 인터벌이 끝나고 나서 특정 시간 이후에 한 번만 실행

```dart
import 'package:get/get.dart';

class ReactiveController extends GetxController {
	static ReactiveController get to => Get.find();
	RxInt counter = 0.obs;

	@override
	void onInit() {
		once(counter, (_) {
			print('once: $_이 처음으로 변경되었습니다.');
		});

		ever(counter, (_) {
			print('ever: $_이 변경되었습니다.');
		});

		debounce(counter, (_) {
			print('debounce: $_가 마지막으로 변경된 이후, 1초간 변경이 없습니다.');
		}, time: Duration(seconds: 1), );
	
		interval(counter, (_) {
			print('interval $_가 변경되는 중입니다. (1초마다 호출)');
		}, time: Duration(seconds: 1), );

		super.onInit();
	}

	void increase() {
		counter++;
	}
}
```

## `Get.find()` 를 보다 간단하게 사용하는 방법

### 1️⃣ Getter 사용

- `Get.find<controller 종류>().[변수 혹은 함수]` 를 보다 간단하게 사용하기 위해서는 아래와 같이 controller 내부에 getter를 생성해주면 된다.

```dart
class SimpleController extends GetxController {
	static SimpleController get to => Get.find();
}
```

- `Get.find()` 를 기존보다 더 짧은 코드로 사용할 수 있게 된다.

```dart
// 전
Get.find<SimpleController>().increase();

// 후
SimpleController.to.increase();
```

### 2️⃣ GetView 사용

- `Get.find()` 를 사용하는 클래스에 `StatelessWidget` 대신 `GetView` 를 상속받는 방식이다

```dart
// 전
class SimpleState extends StatelessWidget{}

// 후
class SimpleState extends GetView<SimpleController>{}
```

- `Get.find()`를 기존보다 더 짧은 코드로 사용할 수 있게 된다

```dart
// 전
Get.find<SimpleController>().increase();

// 후
controller.increase();
```