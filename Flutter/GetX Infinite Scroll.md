# GetX Infinite Scroll

Created by: Boyeon Kim
Created time: November 23, 2023 1:03 PM
Tags: Frontend Study

# Scroll Controller

스크롤이 가능한 위젯을 제어하는 클래스

일반적으로 `ListView` , `GridView` , `CustomScrollView` 와 주로 함께 사용됨.

## 기본 속성

`position` : ScrollPosition을 알려주는 값, 이 값을 통해서 스크롤 방향이나 위치 등을 알 수 있음

- `position.pixels` : 축 방향의 반대 방향으로 움직일 수 있는 픽셀 수
- `position.maxScrollExtent` : 픽셀의 최댓값 (스크롤 할 수 있는 최대 픽셀)
- `position.userScrollDirection` : 사용자가 변경하려고 하는 방향

즉 현재 스크롤 위치, 최대 스크롤 위치와 사용자가 스크롤하는 방향을 탐지해서 스크롤 동작에 따라 제어할 수 있음

## 코드작성

### 1️⃣ Controller

```dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class InfiniteScrollController extends GetxController {
  var scrollController = ScrollController().obs;

  var data = <int>[].obs;
  var isLoading = false.obs;
  var hasMore = false.obs;
	var isShow = true.obs;

  @override
  void onInit() {
    _getData();

    this.scrollController.value.addListener(() {
      if (this.scrollController.value.position.pixels ==
              this.scrollController.value.position.maxScrollExtent &&
          this.hasMore.value) {
        _getData();
      }

			final direction = scrollController.value.position.userScrollDirection;
      if (direction == ScrollDirection.forward) {
        isShow.value = true;
      } else {
        isShow.value = false;
      }
    });

    super.onInit();
  }

  _getData() async {
    isLoading.value = true;

    await Future.delayed(Duration(seconds: 2));

    int offset = data.length;

    var appendData = List<int>.generate(10, (i) => i + 1 + offset);

    data.addAll(appendData);

    isLoading.value = false;

    hasMore.value = data.length < 30;
  }
}
```

- GetxController를 이용하여 스크롤을 제어할 Controller 만들기
- `data` : 스크롤 화면에 뿌려질 데이터
- `isLoading` : 다음 데이터가 들어올 때 상태를 위한 변수
- `hasMore` : 들어올 데이터가 더 있는지
- `isShow` : 스크롤 방향에 따라 BottomNavigationBar를 조절하기 위한 변수

10개의 데이터를 화면에 출력하고 아래로 내리면 추가적으로 데이터를 계속해서 불러오도록 구현, 또한 스크롤을 내리면 BottomNavigationBar가 사라지고 다시 스크롤을 올리면 나오도록 구현

- 10개 단위로 계속해서 데이터를 생성하도록 작성
- 데이터가 30개가 되면 더이상 불러오지 않도록 작성

### 2️⃣ Result Page 작성

```dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sample/controller/infinite_scroll_controller.dart';

class InfiniteScrollView extends GetView<InfiniteScrollController> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Infinite Scroll'),
      ),
      body: Obx(
        () => ListView.separated(
          controller: controller.scrollController.value,
          separatorBuilder: (_, index) => Divider(),
          itemCount: controller.data.length + 1,
          itemBuilder: (_, index) {
            print(controller.hasMore.value);

            if (index < controller.data.length) {
              var datum = controller.data[index];
              return ListTile(
                title: Text('$datum 번째 데이터'),
              );
            }

            if (controller.hasMore.value || controller.isLoading.value) {
              return Center(child: RefreshProgressIndicator());
            }

            return Container(
              child: Center(
                child: Text('데이터의 마지막 입니다.'),
              ),
            );
          },
        ),
      ),
			bottomNavigationBar: Obx(() => AnimatedContainer(
            decoration: BoxDecoration(
              color: Colors.lightBlue,
            ),
            curve: Curves.fastLinearToSlowEaseIn,
            duration: Duration(milliseconds: 200),
            height: controller.isShow.value ? 60 : 0,
            child: Container(
              child: Center(
                  child: Text(
                'BottomNavigationBar',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              )),
            ),
          )),
    );
  }
}
```

### 3️⃣ Binding

```dart
import 'package:get/get.dart';
import 'package:sample/controller/infinite_scroll_controller.dart';

class AppBinding extends Bindings {
  @override
  void dependencies() {
    Get.put(InfiniteScrollController());
  }
}
```

### 참고 링크

[[Flutter] ScrollController 사용해보기](https://velog.io/@leeeeeoy/Flutter-ScrollController-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0)

[Flutter 매우 간단한 무한 스크롤 만들기](https://empering.tistory.com/entry/%EB%A7%A4%EC%9A%B0-%EA%B0%84%EB%8B%A8%ED%95%9C-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0)

[flutter_infinite_scroll](https://gist.github.com/empering/53d4fd10b6f3ca15c1338943bb155012)