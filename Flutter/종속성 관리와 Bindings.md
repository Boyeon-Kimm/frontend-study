# 종속성 관리와 Bindings

Created by: Boyeon Kim
Created time: November 23, 2023 9:21 AM
Tags: Frontend Study

# 종속성 인스턴스

GetX의 종속성 인스턴스는 다음과 같다

1. `Get.put`
2. `Get.lazyPut`
3. `Get.putAsync`
4. `Get.create`

## `Get.put()`

- 종속성을 주입하는 일반적인 방법

```dart
class SampleScreen extends StatelessWidget {
	// Get.put(SomeClass());
	// Get.put(SampleController(), permanent: true);
	// Get.put(SampleController, tag: "some unique string");

	final controller = Get.put(SampleController());

	@override
	Widget build(BuildContext context) {
		return Scaffold(
			...
		);
	}
}
```

## `Get.lazyPut()`

- 인스턴스를 바로 만들지 않고 사용되는 시점에 생성된다

```dart
class SampleScreen extendx StatelessWidget {
	// final controller = Get.lazyPut(() {
	//
	// return SampleController(); 
	//	});
}
```

## `Get.putAsync`

- 추가하려는 인스턴스가 Future를 반환하는 경우 사용

```dart
Get.putAsync<SharedPreferences>(() async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setInt('counter', 12345);
  return prefs;
});

Get.putAsync<YourAsyncClass>( () async => await YourAsyncClass() )
```

## `Get.create`

- `put` 처럼 인스턴스가 생성되는 것은 똑같지만 isSingleton이 false라서 계속 생성 가능
- `Get.create` 는 `GetWidget` 과 함께 사용되어야 함.

```dart
Get.create<SomeClass>(() => SomeClass());
Get.create<LoginController>(() => LoginController());
```

## `Get.find`

- 메모리에 추가한 인스턴스는 `Get.find` 를 통해 찾아서 사용할 수 있다

```dart
class SampleScreen extends StatelessWidget {
	final controller = Get.find<SampleController>();
	// SampleController controller = Get.find();

}
```

## `Get.delete`

- 인스턴스 제거할 때 사용

```dart
Get.delete<SampleController>();
Get.delete<SampleController>(tag: 'TAG_NAME');
```

## `Get.reset`

- 인스턴스를 초기화하는 것, 테스트에서 주로 사용됨

```dart
Get.reset<SampleController>();
```

# Bindings

- bindings는 주로 라우트와 같은 페이지 이동에 쓰인다.
- 예를 들어, A 페이지에서 B 페이지로 이동할 때 B페이지에 필요한 인스턴스를 바인딩하여 전달하면 B페이지 이동 후 바로 인스턴스가 선언되어 사용할 수 있고 페이지가 pop 되면 바인딩 된 인스턴스가 삭제 처리가 된다.
- 해당 페이지에서 사용되고 있는 인스턴스에 대한 관리에 대한 신경을 덜어주는 역할

```dart
// sample_binding.dart
// 1️⃣ class를 만들고, Bindings를 상속받고 implement method인 dependencies를 넣어준다.
// 2️⃣ dependencies에 추가할 인스턴스를 넣어주기

import 'package:get/get.dart';
import 'package:getx_sample/sample_controller.dart';

class SampleBinding extends Bindings {
	@override
	void dependencies() {
		Get.put(SampleController());
	}
}
```

### 👉 GetMaterialApp에서 `GetPage` 를 이용

```dart
GetMaterialApp(
   .
   .
   .
   getPages: [
     GetPage(
       name: '/',
       page: () => SampleScreen(),
       binding: SampleBinding(),
     ),
   ],
   initialRoute: '/',
);
```

### 👉 `[Get.to](http://Get.to)` 를 이용한 방법

```dart
Get.to(SampleScreen(), binding: SampleBinding());
```

### 👉 `BindingsBuilder` 를 이용한 방법

```dart
GetMaterialApp(
   .
   .
   .
   getPages: [
     GetPage(
       name: '/',
       page: () => SampleScreen(),
       binding: BindingsBuilder(() {
          Get.put(SampleController());
       }),
     ),
   ],
   initialRoute: '/',
);

Get.to(
  SecondPage(),
  binding: BindingsBuilder(() {
    Get.put(SampleController());
  }),
);
```